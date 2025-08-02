from fastapi import FastAPI, HTTPException, Depends, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel, Field, validator
from typing import List, Dict, Optional, Any
import json
import os
import sqlite3
import hashlib
import logging
from datetime import datetime, timedelta
import uuid
from pathlib import Path

# Import custom modules
from models.roi_models import *
from calculations.roi_calculator import ROICalculator
from services.pdf_service import PDFService
from services.email_service import EmailService
from services.analytics_service import AnalyticsService
from middleware.rate_limiting import RateLimitMiddleware
from utils.currency_utils import CurrencyUtils
from utils.validation_utils import ValidationUtils

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="AmplifyROI Calculator API",
    description="Professional ROI Calculator with 35 business types and 25+ countries",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://amplifyroi.vercel.app"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Rate limiting middleware
app.add_middleware(RateLimitMiddleware)

# Initialize services
roi_calculator = ROICalculator()
pdf_service = PDFService()
email_service = EmailService()
analytics_service = AnalyticsService()
currency_utils = CurrencyUtils()
validation_utils = ValidationUtils()

# Security
security = HTTPBearer()
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "admin123")

# Database initialization
def init_database():
    """Initialize SQLite database for analytics and email submissions"""
    conn = sqlite3.connect("amplifyroi.db")
    cursor = conn.cursor()
    
    # Analytics table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS analytics (
            id TEXT PRIMARY KEY,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            country_code TEXT,
            business_type TEXT,
            scenario_id TEXT,
            calculation_data TEXT,
            session_id TEXT,
            ip_address TEXT,
            user_agent TEXT
        )
    """)
    
    # Email submissions table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS email_submissions (
            id TEXT PRIMARY KEY,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            email TEXT,
            name TEXT,
            company TEXT,
            calculation_id TEXT,
            country_code TEXT,
            business_type TEXT,
            roi_result REAL,
            gdpr_consent BOOLEAN,
            ip_address TEXT
        )
    """)
    
    # PDF exports table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS pdf_exports (
            id TEXT PRIMARY KEY,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            calculation_id TEXT,
            export_type TEXT,
            file_size INTEGER,
            session_id TEXT
        )
    """)
    
    conn.commit()
    conn.close()

# Load data
def load_business_scenarios():
    """Load business scenarios from JSON file"""
    try:
        with open("data/business_scenarios.json", "r") as f:
            return json.load(f)
    except FileNotFoundError:
        logger.error("Business scenarios file not found")
        return {"business_types": []}

def load_countries():
    """Load countries data from JSON file"""
    try:
        with open("data/countries.json", "r") as f:
            return json.load(f)
    except FileNotFoundError:
        logger.error("Countries file not found")
        return {"countries": []}

# Authentication
async def verify_admin_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Verify admin authentication"""
    if credentials.credentials != ADMIN_PASSWORD:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid admin credentials"
        )
    return credentials.credentials

# Helper functions
def get_client_ip(request: Request) -> str:
    """Get client IP address"""
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host

def log_analytics(request: Request, calculation_data: dict):
    """Log calculation analytics"""
    try:
        analytics_service.log_calculation(
            country_code=calculation_data.get("country"),
            business_type=calculation_data.get("business_type"),
            scenario_id=calculation_data.get("scenario"),
            calculation_data=json.dumps(calculation_data),
            session_id=request.headers.get("X-Session-ID", str(uuid.uuid4())),
            ip_address=get_client_ip(request),
            user_agent=request.headers.get("User-Agent", "")
        )
    except Exception as e:
        logger.error(f"Failed to log analytics: {str(e)}")

# API Endpoints

@app.on_event("startup")
async def startup_event():
    """Initialize database and services on startup"""
    init_database()
    logger.info("AmplifyROI API started successfully")

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "version": "1.0.0"
    }

@app.get("/api/business-types", response_model=List[BusinessTypeResponse])
async def get_business_types():
    """Get all business types and their scenarios"""
    data = load_business_scenarios()
    return data["business_types"]

@app.get("/api/business-types/{business_type_id}", response_model=BusinessTypeResponse)
async def get_business_type(business_type_id: str):
    """Get specific business type by ID"""
    data = load_business_scenarios()
    for business_type in data["business_types"]:
        if business_type["id"] == business_type_id:
            return business_type
    raise HTTPException(status_code=404, detail="Business type not found")

@app.get("/api/countries", response_model=List[CountryResponse])
async def get_countries():
    """Get all countries with tax data"""
    data = load_countries()
    return data["countries"]

@app.get("/api/countries/{country_code}", response_model=CountryResponse)
async def get_country(country_code: str):
    """Get specific country by code"""
    data = load_countries()
    for country in data["countries"]:
        if country["code"] == country_code:
            return country
    raise HTTPException(status_code=404, detail="Country not found")

@app.post("/api/calculate-roi", response_model=ROIResponse)
async def calculate_roi(request: Request, calculation_request: ROICalculationRequest):
    """Calculate ROI based on business metrics"""
    try:
        # Validate input data
        validation_utils.validate_calculation_request(calculation_request)
        
        # Get country and scenario data
        countries_data = load_countries()
        scenarios_data = load_business_scenarios()
        
        country = next((c for c in countries_data["countries"] if c["code"] == calculation_request.country), None)
        if not country:
            raise HTTPException(status_code=400, detail="Invalid country code")
        
        # Find business type and scenario
        business_type = None
        scenario = None
        for bt in scenarios_data["business_types"]:
            if bt["id"] == calculation_request.business_type:
                business_type = bt
                for s in bt["scenarios"]:
                    if s["id"] == calculation_request.scenario:
                        scenario = s
                        break
                break
        
        if not business_type or not scenario:
            raise HTTPException(status_code=400, detail="Invalid business type or scenario")
        
        # Perform ROI calculation
        result = roi_calculator.calculate_comprehensive_roi(
            calculation_request, country, scenario
        )
        
        # Log analytics
        log_analytics(request, calculation_request.dict())
        
        return result
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"ROI calculation error: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.post("/api/export-pdf")
async def export_pdf(request: Request, export_request: PDFExportRequest):
    """Generate and return PDF report"""
    try:
        # Generate PDF
        pdf_file = pdf_service.generate_roi_report(
            export_request.calculation_data,
            export_request.country_data,
            export_request.business_data
        )
        
        # Log export
        analytics_service.log_pdf_export(
            calculation_id=export_request.calculation_id,
            export_type="standard",
            file_size=os.path.getsize(pdf_file),
            session_id=request.headers.get("X-Session-ID", str(uuid.uuid4()))
        )
        
        return FileResponse(
            pdf_file,
            media_type="application/pdf",
            filename=f"amplifyroi-report-{datetime.now().strftime('%Y%m%d')}.pdf"
        )
        
    except Exception as e:
        logger.error(f"PDF export error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to generate PDF")

@app.post("/api/send-email")
async def send_email(request: Request, email_request: EmailRequest):
    """Send ROI report via email"""
    try:
        # Validate GDPR consent
        if not email_request.gdpr_consent:
            raise HTTPException(status_code=400, detail="GDPR consent required")
        
        # Send email
        success = email_service.send_roi_report(
            email_request.email,
            email_request.calculation_data,
            email_request.additional_data
        )
        
        if success:
            # Log email submission
            analytics_service.log_email_submission(
                email=email_request.email,
                name=email_request.name,
                company=email_request.company,
                calculation_id=email_request.calculation_id,
                country_code=email_request.calculation_data.get("country"),
                business_type=email_request.calculation_data.get("business_type"),
                roi_result=email_request.calculation_data.get("roi", 0),
                gdpr_consent=email_request.gdpr_consent,
                ip_address=get_client_ip(request)
            )
            
            return {"success": True, "message": "Email sent successfully"}
        else:
            raise HTTPException(status_code=500, detail="Failed to send email")
            
    except Exception as e:
        logger.error(f"Email sending error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to send email")

@app.get("/api/currency/format")
async def format_currency(amount: float, currency_code: str):
    """Format currency amount according to locale"""
    try:
        formatted = currency_utils.format_currency(amount, currency_code)
        return {"formatted": formatted, "currency": currency_code}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Currency formatting error: {str(e)}")

@app.get("/api/admin/analytics", dependencies=[Depends(verify_admin_token)])
async def get_analytics():
    """Get usage analytics (admin only)"""
    try:
        analytics_data = analytics_service.get_analytics_summary()
        return analytics_data
    except Exception as e:
        logger.error(f"Analytics error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to retrieve analytics")

@app.get("/api/admin/submissions", dependencies=[Depends(verify_admin_token)])
async def get_email_submissions():
    """Get email submissions (admin only)"""
    try:
        submissions = analytics_service.get_email_submissions()
        return {"submissions": submissions}
    except Exception as e:
        logger.error(f"Submissions error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to retrieve submissions")

@app.get("/api/admin/exports", dependencies=[Depends(verify_admin_token)])
async def get_pdf_exports():
    """Get PDF export statistics (admin only)"""
    try:
        exports = analytics_service.get_pdf_exports()
        return {"exports": exports}
    except Exception as e:
        logger.error(f"Exports error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to retrieve exports")

@app.post("/api/admin/clear-data", dependencies=[Depends(verify_admin_token)])
async def clear_analytics_data(data_type: str):
    """Clear analytics data (admin only)"""
    try:
        if data_type not in ["analytics", "submissions", "exports", "all"]:
            raise HTTPException(status_code=400, detail="Invalid data type")
        
        result = analytics_service.clear_data(data_type)
        return {"success": True, "message": f"Cleared {result} records"}
    except Exception as e:
        logger.error(f"Clear data error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to clear data")

@app.get("/api/scenarios/search")
async def search_scenarios(query: str, category: Optional[str] = None):
    """Search business scenarios"""
    try:
        data = load_business_scenarios()
        results = []
        
        for business_type in data["business_types"]:
            if category and business_type.get("category") != category:
                continue
                
            for scenario in business_type["scenarios"]:
                if (query.lower() in scenario["name"].lower() or 
                    query.lower() in scenario["description"].lower() or
                    query.lower() in business_type["name"].lower()):
                    results.append({
                        "business_type": business_type,
                        "scenario": scenario
                    })
        
        return {"results": results, "total": len(results)}
    except Exception as e:
        logger.error(f"Search error: {str(e)}")
        raise HTTPException(status_code=500, detail="Search failed")

@app.get("/api/what-if")
async def what_if_analysis(request: Request, base_calculation: dict, variations: List[dict]):
    """Perform what-if analysis with multiple scenarios"""
    try:
        results = []
        for variation in variations:
            # Merge base calculation with variation
            modified_calc = {**base_calculation, **variation}
            
            # Perform calculation
            calculation_request = ROICalculationRequest(**modified_calc)
            result = await calculate_roi(request, calculation_request)
            results.append({
                "variation": variation,
                "result": result
            })
        
        return {"what_if_results": results}
    except Exception as e:
        logger.error(f"What-if analysis error: {str(e)}")
        raise HTTPException(status_code=500, detail="What-if analysis failed")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)