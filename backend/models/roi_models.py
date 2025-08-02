from pydantic import BaseModel, Field, validator, EmailStr
from typing import List, Dict, Optional, Any, Union
from datetime import datetime
from enum import Enum
import re

class BusinessCategory(str, Enum):
    STAGE = "stage"
    INDUSTRY = "industry"
    SIZE = "size"
    MODEL = "model"

class CurrencyData(BaseModel):
    code: str = Field(..., description="3-letter currency code")
    symbol: str = Field(..., description="Currency symbol")
    name: str = Field(..., description="Full currency name")
    decimal_places: int = Field(default=2, description="Number of decimal places")

class TaxRates(BaseModel):
    corporate_tax: float = Field(..., ge=0, le=1, description="Corporate tax rate")
    vat: Optional[float] = Field(None, ge=0, le=1, description="VAT/Sales tax rate")
    capital_gains: Optional[float] = Field(None, ge=0, le=1, description="Capital gains tax rate")
    payroll_tax: Optional[float] = Field(None, ge=0, le=1, description="Payroll tax rate")
    varies_by_state: bool = Field(default=False, description="Whether tax varies by state/region")

class FinancialYear(BaseModel):
    start: str = Field(..., regex=r"^\d{2}-\d{2}$", description="Start date in MM-DD format")
    end: str = Field(..., regex=r"^\d{2}-\d{2}$", description="End date in MM-DD format")

class BusinessRegistration(BaseModel):
    timeframe: str = Field(..., description="Time to register business")
    average_cost: float = Field(..., ge=0, description="Average registration cost")
    currency: str = Field(..., description="Currency for registration cost")

class EconomicIndicators(BaseModel):
    inflation_2025: float = Field(..., description="2025 inflation projection")
    gdp_growth_2025: float = Field(..., description="2025 GDP growth projection")
    business_ease_rank: int = Field(..., ge=1, description="World Bank ease of doing business rank")
    minimum_wage: float = Field(default=0, ge=0, description="Minimum wage in local currency")

class CountryResponse(BaseModel):
    code: str = Field(..., min_length=2, max_length=3)
    name: str = Field(..., min_length=1)
    flag: str = Field(..., description="Country flag emoji")
    currency: CurrencyData
    tax_rates: TaxRates
    financial_year: FinancialYear
    business_registration: BusinessRegistration
    economic_indicators: EconomicIndicators

class RevenueRange(BaseModel):
    min: float = Field(..., ge=0)
    max: float = Field(..., ge=0)
    default: float = Field(..., ge=0)
    currency: Optional[str] = Field(default="USD")

    @validator('max')
    def max_greater_than_min(cls, v, values):
        if 'min' in values and v < values['min']:
            raise ValueError('max must be greater than or equal to min')
        return v

    @validator('default')
    def default_in_range(cls, v, values):
        if 'min' in values and 'max' in values:
            if v < values['min'] or v > values['max']:
                raise ValueError('default must be between min and max')
        return v

class CACRange(BaseModel):
    min: float = Field(..., ge=0)
    max: float = Field(..., ge=0)
    default: float = Field(..., ge=0)

class MarketingBudget(BaseModel):
    percentage: float = Field(..., ge=0, le=1, description="Percentage of revenue")
    default: float = Field(..., ge=0, description="Default amount")

class AOVRange(BaseModel):
    min: float = Field(..., ge=0)
    max: float = Field(..., ge=0)
    default: float = Field(..., ge=0)

class ScenarioMetrics(BaseModel):
    revenue: RevenueRange
    gross_margin: float = Field(..., ge=0, le=1)
    cac: CACRange
    marketing_budget: MarketingBudget
    aov: AOVRange
    churn_rate: Optional[float] = Field(None, ge=0, le=1)
    fulfillment_cost: Optional[float] = Field(None, ge=0, le=1)
    payment_terms: int = Field(..., ge=0, description="Payment terms in days")
    operating_expenses: float = Field(..., ge=0, le=1)
    growth_rate: float = Field(..., ge=-1, le=5, description="Monthly growth rate")

class BusinessScenario(BaseModel):
    id: str = Field(..., min_length=1)
    name: str = Field(..., min_length=1)
    description: str = Field(..., min_length=1)
    metrics: ScenarioMetrics

class BusinessTypeResponse(BaseModel):
    id: str = Field(..., min_length=1)
    name: str = Field(..., min_length=1)
    description: str = Field(..., min_length=1)
    icon: str = Field(..., min_length=1)
    category: BusinessCategory
    scenarios: List[BusinessScenario]

class ROICalculationRequest(BaseModel):
    # Basic setup
    country: str = Field(..., min_length=2, max_length=3)
    business_type: str = Field(..., min_length=1)
    scenario: str = Field(..., min_length=1)
    
    # Financial inputs
    monthly_revenue: float = Field(..., ge=0, description="Monthly revenue")
    initial_investment: float = Field(default=0, ge=0, description="Initial investment")
    operating_expenses: float = Field(..., ge=0, description="Monthly operating expenses")
    marketing_spend: float = Field(default=0, ge=0, description="Monthly marketing spend")
    
    # Business metrics
    gross_margin: Optional[float] = Field(None, ge=0, le=1)
    customer_acquisition_cost: Optional[float] = Field(None, ge=0)
    average_order_value: Optional[float] = Field(None, ge=0)
    customer_lifetime_value: Optional[float] = Field(None, ge=0)
    churn_rate: Optional[float] = Field(None, ge=0, le=1)
    
    # Time parameters
    timeframe_months: int = Field(default=12, ge=1, le=120, description="Analysis timeframe in months")
    
    # Additional costs
    fulfillment_costs: Optional[float] = Field(None, ge=0)
    payment_processing_rate: Optional[float] = Field(None, ge=0, le=0.1)
    employee_costs: Optional[float] = Field(None, ge=0)
    
    @validator('monthly_revenue')
    def revenue_must_be_positive(cls, v):
        if v <= 0:
            raise ValueError('Monthly revenue must be positive')
        return v

class BreakdownItem(BaseModel):
    category: str
    amount: float
    percentage: float
    description: str

class MonthlyProjection(BaseModel):
    month: int
    revenue: float
    expenses: float
    profit: float
    cumulative_profit: float
    roi: float

class ROIMetrics(BaseModel):
    roi_percentage: float = Field(..., description="ROI as percentage")
    roi_ratio: float = Field(..., description="ROI as ratio")
    net_profit: float = Field(..., description="Total net profit")
    gross_profit: float = Field(..., description="Total gross profit")
    total_revenue: float = Field(..., description="Total revenue")
    total_expenses: float = Field(..., description="Total expenses")
    payback_period_months: Optional[float] = Field(None, description="Payback period in months")
    irr: Optional[float] = Field(None, description="Internal Rate of Return")
    npv: Optional[float] = Field(None, description="Net Present Value")

class TaxCalculation(BaseModel):
    corporate_tax: float
    vat_tax: float
    payroll_tax: float
    total_tax: float
    effective_tax_rate: float
    after_tax_profit: float

class ROIResponse(BaseModel):
    calculation_id: str = Field(..., description="Unique calculation ID")
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    
    # Input summary
    input_summary: Dict[str, Any]
    
    # Core metrics
    metrics: ROIMetrics
    
    # Tax calculations
    tax_calculation: TaxCalculation
    
    # Breakdowns
    revenue_breakdown: List[BreakdownItem]
    expense_breakdown: List[BreakdownItem]
    
    # Projections
    monthly_projections: List[MonthlyProjection]
    
    # Additional insights
    insights: List[str] = Field(default_factory=list)
    recommendations: List[str] = Field(default_factory=list)
    risk_factors: List[str] = Field(default_factory=list)
    
    # Benchmarks
    industry_benchmarks: Optional[Dict[str, float]] = None
    
    # Currency formatting
    currency_code: str
    formatted_values: Dict[str, str] = Field(default_factory=dict)

class PDFExportRequest(BaseModel):
    calculation_id: str = Field(..., description="Calculation ID to export")
    calculation_data: Dict[str, Any] = Field(..., description="Calculation results")
    country_data: Dict[str, Any] = Field(..., description="Country information")
    business_data: Dict[str, Any] = Field(..., description="Business type and scenario data")
    export_format: str = Field(default="standard", description="PDF export format")
    include_charts: bool = Field(default=True, description="Include charts in PDF")
    include_projections: bool = Field(default=True, description="Include monthly projections")

class EmailRequest(BaseModel):
    email: EmailStr = Field(..., description="Recipient email address")
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    company: Optional[str] = Field(None, min_length=1, max_length=100)
    calculation_id: str = Field(..., description="Calculation ID")
    calculation_data: Dict[str, Any] = Field(..., description="Calculation results")
    additional_data: Optional[Dict[str, Any]] = Field(None, description="Additional data")
    gdpr_consent: bool = Field(..., description="GDPR consent flag")
    
    @validator('gdpr_consent')
    def gdpr_must_be_true(cls, v):
        if not v:
            raise ValueError('GDPR consent is required')
        return v

class AnalyticsEntry(BaseModel):
    id: str
    timestamp: datetime
    country_code: str
    business_type: str
    scenario_id: str
    session_id: str
    ip_address: str
    user_agent: Optional[str] = None

class EmailSubmission(BaseModel):
    id: str
    timestamp: datetime
    email: str
    name: Optional[str] = None
    company: Optional[str] = None
    calculation_id: str
    country_code: str
    business_type: str
    roi_result: float
    gdpr_consent: bool
    ip_address: str

class PDFExport(BaseModel):
    id: str
    timestamp: datetime
    calculation_id: str
    export_type: str
    file_size: int
    session_id: str

class AnalyticsSummary(BaseModel):
    total_calculations: int
    unique_visitors: int
    popular_countries: List[Dict[str, Any]]
    popular_business_types: List[Dict[str, Any]]
    popular_scenarios: List[Dict[str, Any]]
    average_roi: float
    date_range: Dict[str, datetime]
    conversion_metrics: Dict[str, float]

class WhatIfVariation(BaseModel):
    name: str = Field(..., description="Variation name")
    changes: Dict[str, Any] = Field(..., description="Parameters to change")
    description: Optional[str] = Field(None, description="Variation description")

class WhatIfRequest(BaseModel):
    base_calculation: ROICalculationRequest
    variations: List[WhatIfVariation] = Field(..., min_items=1, max_items=10)

class WhatIfResult(BaseModel):
    variation: WhatIfVariation
    result: ROIResponse
    comparison: Dict[str, float] = Field(..., description="Comparison with base case")

class WhatIfResponse(BaseModel):
    base_result: ROIResponse
    variation_results: List[WhatIfResult]
    summary: Dict[str, Any] = Field(..., description="Summary of variations")

class SearchResult(BaseModel):
    business_type: BusinessTypeResponse
    scenario: BusinessScenario
    relevance_score: float = Field(..., ge=0, le=1)

class SearchResponse(BaseModel):
    results: List[SearchResult]
    total: int
    query: str
    filters_applied: Dict[str, Any] = Field(default_factory=dict)

class ValidationError(BaseModel):
    field: str
    message: str
    code: str

class APIError(BaseModel):
    error: str
    detail: str
    code: int
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    validation_errors: Optional[List[ValidationError]] = None

class HealthCheck(BaseModel):
    status: str
    timestamp: datetime
    version: str
    database_status: str = "unknown"
    dependencies: Dict[str, str] = Field(default_factory=dict)

# Response models for admin endpoints
class AdminAnalyticsResponse(BaseModel):
    summary: AnalyticsSummary
    recent_calculations: List[AnalyticsEntry]
    trends: Dict[str, List[Dict[str, Any]]]

class AdminSubmissionsResponse(BaseModel):
    submissions: List[EmailSubmission]
    total_count: int
    gdpr_compliant_count: int
    recent_submissions: List[EmailSubmission]

class AdminExportsResponse(BaseModel):
    exports: List[PDFExport]
    total_count: int
    total_file_size: int
    popular_export_types: List[Dict[str, Any]]

# Configuration models
class RateLimitConfig(BaseModel):
    requests_per_minute: int = Field(default=60, ge=1)
    requests_per_hour: int = Field(default=1000, ge=1)
    burst_size: int = Field(default=10, ge=1)

class EmailConfig(BaseModel):
    smtp_host: str
    smtp_port: int
    smtp_username: str
    smtp_password: str
    from_email: str
    from_name: str = "AmplifyROI Calculator"

class DatabaseConfig(BaseModel):
    database_url: str = "sqlite:///amplifyroi.db"
    pool_size: int = Field(default=5, ge=1)
    max_overflow: int = Field(default=10, ge=0)
    pool_timeout: int = Field(default=30, ge=1)

class AppConfig(BaseModel):
    debug: bool = Field(default=False)
    admin_password: str = Field(..., min_length=8)
    secret_key: str = Field(..., min_length=32)
    rate_limit: RateLimitConfig = Field(default_factory=RateLimitConfig)
    email: EmailConfig
    database: DatabaseConfig = Field(default_factory=DatabaseConfig)
    cors_origins: List[str] = Field(default_factory=lambda: ["http://localhost:3000"])
    timezone: str = Field(default="UTC")
    currency_api_key: Optional[str] = None
    analytics_enabled: bool = Field(default=True)
    pdf_export_enabled: bool = Field(default=True)
    email_enabled: bool = Field(default=True)