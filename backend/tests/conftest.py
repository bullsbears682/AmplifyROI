import pytest
import os
import sys
from fastapi.testclient import TestClient

# Add the backend directory to the Python path
backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, backend_dir)

@pytest.fixture
def client():
    """Create a test client for the FastAPI app"""
    from main import app
    return TestClient(app)

@pytest.fixture
def mock_data():
    """Provide mock data for tests"""
    return {
        "sample_calculation": {
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
    }

@pytest.fixture(scope="session", autouse=True)
def set_test_env():
    """Set test environment variables"""
    os.environ["ENVIRONMENT"] = "test"
    os.environ["ADMIN_PASSWORD"] = "admin123"
    yield
    # Cleanup if needed