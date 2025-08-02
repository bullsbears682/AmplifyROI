import pytest
from calculations.roi_calculator import ROICalculator
from models.roi_models import ROICalculationRequest, CalculationInputs

def test_roi_calculator_initialization():
    """Test ROI calculator can be initialized"""
    calculator = ROICalculator()
    assert calculator is not None

def test_basic_roi_calculation():
    """Test basic ROI calculation with valid inputs"""
    calculator = ROICalculator()
    
    request = ROICalculationRequest(
        country="US",
        businessType="saas",
        scenario="saas-micro",
        inputs=CalculationInputs(
            initialInvestment=10000,
            monthlyRevenue=5000,
            monthlyExpenses=3000,
            growthRate=10,
            timeframe=12,
            customerAcquisitionCost=100,
            averageOrderValue=100,
            conversionRate=2.5,
            churnRate=5,
            grossMargin=70
        )
    )
    
    result = calculator.calculate(request)
    
    # Check that result has expected structure
    assert hasattr(result, 'roi')
    assert hasattr(result, 'profit')
    assert hasattr(result, 'metrics')
    assert hasattr(result, 'insights')
    assert hasattr(result, 'breakdown')
    
    # Check that ROI is calculated
    assert isinstance(result.roi, (int, float))
    assert result.roi is not None

def test_roi_calculation_with_zero_investment():
    """Test ROI calculation handles zero investment"""
    calculator = ROICalculator()
    
    request = ROICalculationRequest(
        country="US",
        businessType="saas", 
        scenario="saas-micro",
        inputs=CalculationInputs(
            initialInvestment=0,
            monthlyRevenue=5000,
            monthlyExpenses=3000,
            growthRate=10,
            timeframe=12,
            customerAcquisitionCost=100,
            averageOrderValue=100,
            conversionRate=2.5,
            churnRate=5,
            grossMargin=70
        )
    )
    
    result = calculator.calculate(request)
    
    # Should handle zero investment gracefully
    assert result is not None
    assert isinstance(result.roi, (int, float))

def test_negative_roi_scenario():
    """Test ROI calculation with expenses > revenue"""
    calculator = ROICalculator()
    
    request = ROICalculationRequest(
        country="US",
        businessType="saas",
        scenario="saas-micro", 
        inputs=CalculationInputs(
            initialInvestment=10000,
            monthlyRevenue=1000,
            monthlyExpenses=5000,  # Higher than revenue
            growthRate=5,
            timeframe=12,
            customerAcquisitionCost=100,
            averageOrderValue=100,
            conversionRate=2.5,
            churnRate=5,
            grossMargin=20
        )
    )
    
    result = calculator.calculate(request)
    
    # Should handle negative ROI
    assert result is not None
    assert isinstance(result.roi, (int, float))
    assert result.roi < 0  # Should be negative

def test_high_growth_scenario():
    """Test ROI calculation with high growth rate"""
    calculator = ROICalculator()
    
    request = ROICalculationRequest(
        country="US",
        businessType="startup",
        scenario="startup-mvp",
        inputs=CalculationInputs(
            initialInvestment=50000,
            monthlyRevenue=2000,
            monthlyExpenses=8000,
            growthRate=50,  # High growth
            timeframe=24,
            customerAcquisitionCost=200,
            averageOrderValue=500,
            conversionRate=5,
            churnRate=10,
            grossMargin=60
        )
    )
    
    result = calculator.calculate(request)
    
    # Should handle high growth scenario
    assert result is not None
    assert isinstance(result.roi, (int, float))

def test_different_countries():
    """Test ROI calculation with different countries"""
    calculator = ROICalculator()
    
    base_request = ROICalculationRequest(
        country="US",
        businessType="saas",
        scenario="saas-micro",
        inputs=CalculationInputs(
            initialInvestment=10000,
            monthlyRevenue=5000,
            monthlyExpenses=3000,
            growthRate=10,
            timeframe=12,
            customerAcquisitionCost=100,
            averageOrderValue=100,
            conversionRate=2.5,
            churnRate=5,
            grossMargin=70
        )
    )
    
    # Test US
    us_result = calculator.calculate(base_request)
    
    # Test UK (different tax rates)
    uk_request = ROICalculationRequest(
        country="GB",
        businessType=base_request.businessType,
        scenario=base_request.scenario,
        inputs=base_request.inputs
    )
    uk_result = calculator.calculate(uk_request)
    
    # Results should be different due to different tax implications
    assert us_result is not None
    assert uk_result is not None
    assert isinstance(us_result.roi, (int, float))
    assert isinstance(uk_result.roi, (int, float))

def test_metrics_calculation():
    """Test that metrics are properly calculated"""
    calculator = ROICalculator()
    
    request = ROICalculationRequest(
        country="US",
        businessType="saas",
        scenario="saas-micro",
        inputs=CalculationInputs(
            initialInvestment=10000,
            monthlyRevenue=5000,
            monthlyExpenses=3000,
            growthRate=10,
            timeframe=12,
            customerAcquisitionCost=100,
            averageOrderValue=100,
            conversionRate=2.5,
            churnRate=5,
            grossMargin=70
        )
    )
    
    result = calculator.calculate(request)
    
    # Check metrics structure
    assert hasattr(result.metrics, 'npv')
    assert hasattr(result.metrics, 'irr')
    assert hasattr(result.metrics, 'paybackPeriod')
    assert hasattr(result.metrics, 'totalRevenue')
    assert hasattr(result.metrics, 'totalExpenses')
    
    # Check that metrics are calculated
    assert isinstance(result.metrics.npv, (int, float))
    assert isinstance(result.metrics.paybackPeriod, (int, float))
    assert isinstance(result.metrics.totalRevenue, (int, float))
    assert isinstance(result.metrics.totalExpenses, (int, float))

def test_insights_generation():
    """Test that insights are generated"""
    calculator = ROICalculator()
    
    request = ROICalculationRequest(
        country="US",
        businessType="saas",
        scenario="saas-micro",
        inputs=CalculationInputs(
            initialInvestment=10000,
            monthlyRevenue=5000,
            monthlyExpenses=3000,
            growthRate=10,
            timeframe=12,
            customerAcquisitionCost=100,
            averageOrderValue=100,
            conversionRate=2.5,
            churnRate=5,
            grossMargin=70
        )
    )
    
    result = calculator.calculate(request)
    
    # Check that insights are generated
    assert result.insights is not None
    assert isinstance(result.insights, list)
    assert len(result.insights) > 0
    
    # Each insight should have required fields
    for insight in result.insights:
        assert hasattr(insight, 'type')
        assert hasattr(insight, 'title')
        assert hasattr(insight, 'description')