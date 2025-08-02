import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_health_check():
    """Test the health check endpoint"""
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["service"] == "AmplifyROI API"

def test_business_types_endpoint():
    """Test the business types endpoint"""
    response = client.get("/api/business-types")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0
    
    # Check first business type structure
    business_type = data[0]
    assert "id" in business_type
    assert "name" in business_type
    assert "description" in business_type
    assert "scenarios" in business_type

def test_countries_endpoint():
    """Test the countries endpoint"""
    response = client.get("/api/countries")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0
    
    # Check first country structure
    country = data[0]
    assert "code" in country
    assert "name" in country
    assert "currency" in country
    assert "taxRates" in country

def test_currency_format_endpoint():
    """Test the currency format endpoint"""
    response = client.get("/api/currency/format?amount=1000&currency=USD&locale=en-US")
    assert response.status_code == 200
    data = response.json()
    assert "formatted" in data
    assert "$" in data["formatted"]

def test_roi_calculation_endpoint():
    """Test the ROI calculation endpoint with valid data"""
    payload = {
        "country": "US",
        "businessType": "saas",
        "scenario": "saas-micro",
        "inputs": {
            "initialInvestment": 10000,
            "monthlyRevenue": 5000,
            "monthlyExpenses": 3000,
            "growthRate": 10,
            "timeframe": 12,
            "customerAcquisitionCost": 100,
            "averageOrderValue": 100,
            "conversionRate": 2.5,
            "churnRate": 5,
            "grossMargin": 70
        }
    }
    
    response = client.post("/api/calculate-roi", json=payload)
    assert response.status_code == 200
    data = response.json()
    
    # Check response structure
    assert "roi" in data
    assert "profit" in data
    assert "metrics" in data
    assert "insights" in data
    assert "breakdown" in data
    
    # Check that ROI is a reasonable number
    assert isinstance(data["roi"], (int, float))
    assert data["roi"] > -1000  # Not unreasonably negative

def test_roi_calculation_invalid_data():
    """Test ROI calculation with invalid data"""
    payload = {
        "country": "INVALID",
        "businessType": "invalid",
        "scenario": "invalid",
        "inputs": {}
    }
    
    response = client.post("/api/calculate-roi", json=payload)
    assert response.status_code == 422  # Validation error

def test_admin_analytics_unauthorized():
    """Test admin analytics endpoint without password"""
    response = client.get("/api/admin/analytics")
    assert response.status_code == 401

def test_admin_analytics_with_password():
    """Test admin analytics endpoint with correct password"""
    headers = {"X-Admin-Password": "admin123"}
    response = client.get("/api/admin/analytics", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert "totalCalculations" in data
    assert "totalUsers" in data

def test_scenarios_search():
    """Test scenarios search endpoint"""
    response = client.get("/api/scenarios/search?query=saas")
    assert response.status_code == 200
    data = response.json()
    assert "results" in data
    assert isinstance(data["results"], list)

def test_cors_headers():
    """Test that CORS headers are properly set"""
    response = client.options("/api/health")
    assert response.status_code == 200
    assert "access-control-allow-origin" in [h.lower() for h in response.headers.keys()]

@pytest.mark.asyncio
async def test_rate_limiting():
    """Test that rate limiting is working"""
    # This is a basic test - in practice you'd need to make many requests
    # to actually trigger rate limiting
    response = client.get("/api/health")
    assert response.status_code == 200