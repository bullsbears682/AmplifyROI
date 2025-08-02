import math
import uuid
from datetime import datetime, timedelta
from typing import Dict, List, Any, Optional, Tuple
import numpy as np
from models.roi_models import (
    ROICalculationRequest, ROIResponse, ROIMetrics, TaxCalculation,
    BreakdownItem, MonthlyProjection
)

class ROICalculator:
    """
    Advanced ROI Calculator with comprehensive financial modeling
    Supports 35 business types across 25+ countries with 2025 tax rates
    """
    
    def __init__(self):
        self.DISCOUNT_RATE = 0.10  # 10% annual discount rate for NPV
        self.RISK_FREE_RATE = 0.03  # 3% risk-free rate
        
    def calculate_comprehensive_roi(
        self, 
        request: ROICalculationRequest, 
        country_data: Dict[str, Any], 
        scenario_data: Dict[str, Any]
    ) -> ROIResponse:
        """
        Main calculation method that computes comprehensive ROI analysis
        """
        calculation_id = str(uuid.uuid4())
        
        # Extract base metrics from scenario
        scenario_metrics = scenario_data["metrics"]
        
        # Prepare input data with defaults from scenario
        processed_input = self._prepare_input_data(request, scenario_metrics)
        
        # Calculate monthly projections
        monthly_projections = self._calculate_monthly_projections(
            processed_input, country_data, request.timeframe_months
        )
        
        # Calculate core ROI metrics
        roi_metrics = self._calculate_roi_metrics(
            monthly_projections, processed_input["initial_investment"]
        )
        
        # Calculate tax implications
        tax_calculation = self._calculate_taxes(
            monthly_projections, country_data, processed_input
        )
        
        # Generate breakdowns
        revenue_breakdown = self._generate_revenue_breakdown(monthly_projections, processed_input)
        expense_breakdown = self._generate_expense_breakdown(monthly_projections, processed_input)
        
        # Generate insights and recommendations
        insights = self._generate_insights(roi_metrics, processed_input, country_data)
        recommendations = self._generate_recommendations(roi_metrics, processed_input, scenario_data)
        risk_factors = self._identify_risk_factors(processed_input, country_data)
        
        # Get industry benchmarks
        industry_benchmarks = self._get_industry_benchmarks(request.business_type, request.scenario)
        
        # Format currency values
        currency_code = country_data["currency"]["code"]
        formatted_values = self._format_currency_values(roi_metrics, tax_calculation, currency_code)
        
        return ROIResponse(
            calculation_id=calculation_id,
            timestamp=datetime.utcnow(),
            input_summary=self._create_input_summary(processed_input, country_data, scenario_data),
            metrics=roi_metrics,
            tax_calculation=tax_calculation,
            revenue_breakdown=revenue_breakdown,
            expense_breakdown=expense_breakdown,
            monthly_projections=monthly_projections,
            insights=insights,
            recommendations=recommendations,
            risk_factors=risk_factors,
            industry_benchmarks=industry_benchmarks,
            currency_code=currency_code,
            formatted_values=formatted_values
        )
    
    def _prepare_input_data(self, request: ROICalculationRequest, scenario_metrics: Dict) -> Dict[str, Any]:
        """
        Prepare and validate input data with scenario defaults
        """
        # Use scenario defaults where user input is not provided
        revenue_default = scenario_metrics["revenue"]["default"]
        gross_margin = request.gross_margin or scenario_metrics["gross_margin"]
        cac = request.customer_acquisition_cost or scenario_metrics["cac"]["default"]
        aov = request.average_order_value or scenario_metrics["aov"]["default"]
        
        # Calculate derived metrics
        monthly_revenue = request.monthly_revenue or revenue_default
        cogs = monthly_revenue * (1 - gross_margin)
        gross_profit = monthly_revenue * gross_margin
        
        # Marketing and operational expenses
        marketing_spend = request.marketing_spend or (monthly_revenue * scenario_metrics["marketing_budget"]["percentage"])
        operating_expenses = request.operating_expenses or (monthly_revenue * scenario_metrics["operating_expenses"])
        
        # Customer metrics
        churn_rate = request.churn_rate or scenario_metrics.get("churn_rate", 0)
        if churn_rate and churn_rate > 0:
            clv = self._calculate_clv(aov, gross_margin, churn_rate)
        else:
            clv = request.customer_lifetime_value or (aov * 12)  # Annual estimate
        
        # Growth parameters
        growth_rate = scenario_metrics["growth_rate"]
        
        # Additional costs
        fulfillment_costs = request.fulfillment_costs or (
            monthly_revenue * scenario_metrics.get("fulfillment_cost", 0) if scenario_metrics.get("fulfillment_cost") else 0
        )
        payment_processing = request.payment_processing_rate or 0.029  # Default 2.9%
        payment_processing_cost = monthly_revenue * payment_processing
        
        return {
            "monthly_revenue": monthly_revenue,
            "initial_investment": request.initial_investment,
            "gross_margin": gross_margin,
            "cogs": cogs,
            "gross_profit": gross_profit,
            "marketing_spend": marketing_spend,
            "operating_expenses": operating_expenses,
            "cac": cac,
            "aov": aov,
            "clv": clv,
            "churn_rate": churn_rate,
            "growth_rate": growth_rate,
            "fulfillment_costs": fulfillment_costs,
            "payment_processing_cost": payment_processing_cost,
            "employee_costs": request.employee_costs or 0,
            "payment_terms": scenario_metrics["payment_terms"]
        }
    
    def _calculate_clv(self, aov: float, gross_margin: float, churn_rate: float) -> float:
        """
        Calculate Customer Lifetime Value using the standard formula
        CLV = (AOV × Gross Margin × Purchase Frequency) / Churn Rate
        """
        if churn_rate <= 0:
            return aov * gross_margin * 12  # Annual estimate
        
        # Assuming monthly purchase frequency of 1 for simplicity
        monthly_profit = aov * gross_margin
        return monthly_profit / churn_rate
    
    def _calculate_monthly_projections(
        self, 
        input_data: Dict[str, Any], 
        country_data: Dict[str, Any], 
        timeframe_months: int
    ) -> List[MonthlyProjection]:
        """
        Calculate month-by-month financial projections with growth
        """
        projections = []
        cumulative_profit = -input_data["initial_investment"]  # Start with negative investment
        
        for month in range(1, timeframe_months + 1):
            # Apply growth rate
            growth_factor = (1 + input_data["growth_rate"]) ** (month - 1)
            
            # Calculate monthly metrics
            monthly_revenue = input_data["monthly_revenue"] * growth_factor
            monthly_cogs = monthly_revenue * (1 - input_data["gross_margin"])
            monthly_gross_profit = monthly_revenue - monthly_cogs
            
            # Variable expenses that scale with revenue
            monthly_marketing = input_data["marketing_spend"] * growth_factor
            monthly_fulfillment = input_data["fulfillment_costs"] * growth_factor
            monthly_payment_processing = input_data["payment_processing_cost"] * growth_factor
            
            # Fixed expenses
            monthly_operating = input_data["operating_expenses"]
            monthly_employee = input_data["employee_costs"]
            
            # Total expenses
            total_expenses = (
                monthly_cogs + monthly_marketing + monthly_fulfillment + 
                monthly_payment_processing + monthly_operating + monthly_employee
            )
            
            # Net profit before taxes
            monthly_profit = monthly_revenue - total_expenses
            
            # Update cumulative profit
            cumulative_profit += monthly_profit
            
            # Calculate ROI for this month
            if input_data["initial_investment"] > 0:
                roi = (cumulative_profit / input_data["initial_investment"]) * 100
            else:
                roi = (cumulative_profit / max(monthly_revenue, 1)) * 100
            
            projections.append(MonthlyProjection(
                month=month,
                revenue=monthly_revenue,
                expenses=total_expenses,
                profit=monthly_profit,
                cumulative_profit=cumulative_profit,
                roi=roi
            ))
        
        return projections
    
    def _calculate_roi_metrics(
        self, 
        monthly_projections: List[MonthlyProjection], 
        initial_investment: float
    ) -> ROIMetrics:
        """
        Calculate comprehensive ROI metrics
        """
        total_revenue = sum(p.revenue for p in monthly_projections)
        total_expenses = sum(p.expenses for p in monthly_projections)
        net_profit = sum(p.profit for p in monthly_projections)
        gross_profit = total_revenue - sum(p.expenses - (p.revenue - p.profit) for p in monthly_projections if p.revenue > 0)
        
        # ROI calculations
        total_investment = initial_investment + total_expenses
        if total_investment > 0:
            roi_percentage = (net_profit / total_investment) * 100
            roi_ratio = net_profit / total_investment
        else:
            roi_percentage = 0
            roi_ratio = 0
        
        # Payback period calculation
        payback_period = self._calculate_payback_period(monthly_projections, initial_investment)
        
        # IRR calculation
        irr = self._calculate_irr(monthly_projections, initial_investment)
        
        # NPV calculation
        npv = self._calculate_npv(monthly_projections, initial_investment)
        
        return ROIMetrics(
            roi_percentage=roi_percentage,
            roi_ratio=roi_ratio,
            net_profit=net_profit,
            gross_profit=gross_profit,
            total_revenue=total_revenue,
            total_expenses=total_expenses,
            payback_period_months=payback_period,
            irr=irr,
            npv=npv
        )
    
    def _calculate_payback_period(
        self, 
        monthly_projections: List[MonthlyProjection], 
        initial_investment: float
    ) -> Optional[float]:
        """
        Calculate payback period in months
        """
        if initial_investment <= 0:
            return None
        
        cumulative_cash_flow = -initial_investment
        
        for i, projection in enumerate(monthly_projections):
            cumulative_cash_flow += projection.profit
            if cumulative_cash_flow >= 0:
                # Interpolate to get exact payback period
                if i == 0:
                    return 1.0
                
                prev_cumulative = cumulative_cash_flow - projection.profit
                fraction = -prev_cumulative / projection.profit
                return i + fraction
        
        return None  # Payback not achieved within timeframe
    
    def _calculate_irr(
        self, 
        monthly_projections: List[MonthlyProjection], 
        initial_investment: float
    ) -> Optional[float]:
        """
        Calculate Internal Rate of Return using Newton-Raphson method
        """
        if initial_investment <= 0:
            return None
        
        # Create cash flow array
        cash_flows = [-initial_investment] + [p.profit for p in monthly_projections]
        
        # Use numpy to calculate IRR
        try:
            return float(np.irr(cash_flows)) * 12 * 100  # Convert to annual percentage
        except:
            # Fallback calculation using bisection method
            return self._irr_bisection(cash_flows)
    
    def _irr_bisection(self, cash_flows: List[float], precision: float = 1e-6) -> Optional[float]:
        """
        Calculate IRR using bisection method as fallback
        """
        def npv_func(rate):
            return sum(cf / (1 + rate) ** i for i, cf in enumerate(cash_flows))
        
        # Initial bounds
        low, high = -0.99, 10.0
        
        # Bisection method
        for _ in range(100):  # Max iterations
            mid = (low + high) / 2
            npv_mid = npv_func(mid)
            
            if abs(npv_mid) < precision:
                return mid * 12 * 100  # Convert to annual percentage
            
            if npv_mid > 0:
                low = mid
            else:
                high = mid
        
        return None
    
    def _calculate_npv(
        self, 
        monthly_projections: List[MonthlyProjection], 
        initial_investment: float
    ) -> float:
        """
        Calculate Net Present Value
        """
        monthly_discount_rate = self.DISCOUNT_RATE / 12
        npv = -initial_investment
        
        for i, projection in enumerate(monthly_projections):
            npv += projection.profit / (1 + monthly_discount_rate) ** (i + 1)
        
        return npv
    
    def _calculate_taxes(
        self, 
        monthly_projections: List[MonthlyProjection], 
        country_data: Dict[str, Any], 
        input_data: Dict[str, Any]
    ) -> TaxCalculation:
        """
        Calculate comprehensive tax implications
        """
        total_profit = sum(p.profit for p in monthly_projections if p.profit > 0)
        total_revenue = sum(p.revenue for p in monthly_projections)
        
        tax_rates = country_data["tax_rates"]
        
        # Corporate tax
        corporate_tax_rate = tax_rates["corporate_tax"]
        corporate_tax = max(0, total_profit * corporate_tax_rate)
        
        # VAT/Sales tax
        vat_rate = tax_rates.get("vat", 0)
        vat_tax = total_revenue * vat_rate
        
        # Payroll tax (estimated on employee costs)
        payroll_tax_rate = tax_rates.get("payroll_tax", 0)
        payroll_tax = input_data["employee_costs"] * len(monthly_projections) * payroll_tax_rate
        
        # Total tax
        total_tax = corporate_tax + vat_tax + payroll_tax
        
        # Effective tax rate
        if total_profit > 0:
            effective_tax_rate = (corporate_tax / total_profit) * 100
        else:
            effective_tax_rate = 0
        
        # After-tax profit
        after_tax_profit = total_profit - corporate_tax
        
        return TaxCalculation(
            corporate_tax=corporate_tax,
            vat_tax=vat_tax,
            payroll_tax=payroll_tax,
            total_tax=total_tax,
            effective_tax_rate=effective_tax_rate,
            after_tax_profit=after_tax_profit
        )
    
    def _generate_revenue_breakdown(
        self, 
        monthly_projections: List[MonthlyProjection], 
        input_data: Dict[str, Any]
    ) -> List[BreakdownItem]:
        """
        Generate detailed revenue breakdown
        """
        total_revenue = sum(p.revenue for p in monthly_projections)
        
        # For simplicity, assume all revenue comes from primary source
        # In a real scenario, this could include multiple revenue streams
        
        breakdown = [
            BreakdownItem(
                category="Primary Revenue",
                amount=total_revenue,
                percentage=100.0,
                description="Main business revenue stream"
            )
        ]
        
        return breakdown
    
    def _generate_expense_breakdown(
        self, 
        monthly_projections: List[MonthlyProjection], 
        input_data: Dict[str, Any]
    ) -> List[BreakdownItem]:
        """
        Generate detailed expense breakdown
        """
        total_expenses = sum(p.expenses for p in monthly_projections)
        
        if total_expenses == 0:
            return []
        
        # Estimate expense categories based on input data
        total_marketing = input_data["marketing_spend"] * len(monthly_projections)
        total_operating = input_data["operating_expenses"] * len(monthly_projections)
        total_fulfillment = input_data["fulfillment_costs"] * len(monthly_projections)
        total_processing = input_data["payment_processing_cost"] * len(monthly_projections)
        total_employee = input_data["employee_costs"] * len(monthly_projections)
        
        # COGS estimation
        total_cogs = sum(p.revenue * (1 - input_data["gross_margin"]) for p in monthly_projections)
        
        breakdown = []
        
        if total_cogs > 0:
            breakdown.append(BreakdownItem(
                category="Cost of Goods Sold",
                amount=total_cogs,
                percentage=(total_cogs / total_expenses) * 100,
                description="Direct costs of producing goods/services"
            ))
        
        if total_marketing > 0:
            breakdown.append(BreakdownItem(
                category="Marketing & Advertising",
                amount=total_marketing,
                percentage=(total_marketing / total_expenses) * 100,
                description="Customer acquisition and marketing costs"
            ))
        
        if total_operating > 0:
            breakdown.append(BreakdownItem(
                category="Operating Expenses",
                amount=total_operating,
                percentage=(total_operating / total_expenses) * 100,
                description="General business operating costs"
            ))
        
        if total_fulfillment > 0:
            breakdown.append(BreakdownItem(
                category="Fulfillment & Shipping",
                amount=total_fulfillment,
                percentage=(total_fulfillment / total_expenses) * 100,
                description="Order fulfillment and shipping costs"
            ))
        
        if total_processing > 0:
            breakdown.append(BreakdownItem(
                category="Payment Processing",
                amount=total_processing,
                percentage=(total_processing / total_expenses) * 100,
                description="Credit card and payment processing fees"
            ))
        
        if total_employee > 0:
            breakdown.append(BreakdownItem(
                category="Employee Costs",
                amount=total_employee,
                percentage=(total_employee / total_expenses) * 100,
                description="Salary, benefits, and payroll taxes"
            ))
        
        return breakdown
    
    def _generate_insights(
        self, 
        roi_metrics: ROIMetrics, 
        input_data: Dict[str, Any], 
        country_data: Dict[str, Any]
    ) -> List[str]:
        """
        Generate AI-powered insights based on calculation results
        """
        insights = []
        
        # ROI insights
        if roi_metrics.roi_percentage > 100:
            insights.append(f"Excellent ROI of {roi_metrics.roi_percentage:.1f}% indicates a highly profitable investment.")
        elif roi_metrics.roi_percentage > 50:
            insights.append(f"Strong ROI of {roi_metrics.roi_percentage:.1f}% shows good investment potential.")
        elif roi_metrics.roi_percentage > 20:
            insights.append(f"Moderate ROI of {roi_metrics.roi_percentage:.1f}% suggests acceptable returns.")
        else:
            insights.append(f"Low ROI of {roi_metrics.roi_percentage:.1f}% may indicate room for optimization.")
        
        # Payback period insights
        if roi_metrics.payback_period_months:
            if roi_metrics.payback_period_months < 6:
                insights.append(f"Fast payback period of {roi_metrics.payback_period_months:.1f} months indicates quick capital recovery.")
            elif roi_metrics.payback_period_months < 12:
                insights.append(f"Reasonable payback period of {roi_metrics.payback_period_months:.1f} months.")
            else:
                insights.append(f"Extended payback period of {roi_metrics.payback_period_months:.1f} months requires patience.")
        
        # Margin insights
        if input_data["gross_margin"] > 0.7:
            insights.append("High gross margin suggests strong pricing power and efficient operations.")
        elif input_data["gross_margin"] < 0.3:
            insights.append("Low gross margin indicates potential for cost optimization or pricing adjustments.")
        
        # Growth insights
        if input_data["growth_rate"] > 0.1:
            insights.append("High growth rate projections amplify long-term returns significantly.")
        elif input_data["growth_rate"] < 0:
            insights.append("Negative growth projections pose risks to long-term profitability.")
        
        # Country-specific insights
        country_name = country_data["name"]
        corporate_tax_rate = country_data["tax_rates"]["corporate_tax"] * 100
        insights.append(f"Operating in {country_name} with {corporate_tax_rate:.1f}% corporate tax rate affects after-tax returns.")
        
        return insights
    
    def _generate_recommendations(
        self, 
        roi_metrics: ROIMetrics, 
        input_data: Dict[str, Any], 
        scenario_data: Dict[str, Any]
    ) -> List[str]:
        """
        Generate actionable recommendations
        """
        recommendations = []
        
        # ROI-based recommendations
        if roi_metrics.roi_percentage < 20:
            recommendations.append("Consider reducing operating expenses or increasing revenue to improve ROI.")
            recommendations.append("Evaluate pricing strategy to maximize profit margins.")
        
        # Margin recommendations
        if input_data["gross_margin"] < 0.5:
            recommendations.append("Focus on improving gross margins through cost reduction or premium pricing.")
        
        # Growth recommendations
        if input_data["growth_rate"] < 0.05:
            recommendations.append("Invest in marketing and product development to accelerate growth.")
        
        # CAC/CLV recommendations
        if input_data["clv"] > 0 and input_data["cac"] > 0:
            clv_cac_ratio = input_data["clv"] / input_data["cac"]
            if clv_cac_ratio < 3:
                recommendations.append("Improve customer lifetime value or reduce acquisition costs to achieve 3:1 CLV:CAC ratio.")
            elif clv_cac_ratio > 5:
                recommendations.append("Consider increasing marketing spend to accelerate growth with strong unit economics.")
        
        # Cash flow recommendations
        if roi_metrics.payback_period_months and roi_metrics.payback_period_months > 18:
            recommendations.append("Focus on faster customer acquisition and revenue recognition to improve cash flow.")
        
        # Business model recommendations
        business_type = scenario_data.get("id", "")
        if "subscription" in business_type.lower():
            recommendations.append("Focus on reducing churn rate to maximize subscription value.")
        elif "ecommerce" in business_type.lower():
            recommendations.append("Optimize conversion rates and average order value for better unit economics.")
        
        return recommendations
    
    def _identify_risk_factors(
        self, 
        input_data: Dict[str, Any], 
        country_data: Dict[str, Any]
    ) -> List[str]:
        """
        Identify potential risk factors
        """
        risk_factors = []
        
        # Financial risks
        if input_data["initial_investment"] > input_data["monthly_revenue"] * 24:
            risk_factors.append("High initial investment relative to revenue creates capital intensity risk.")
        
        if input_data["gross_margin"] < 0.3:
            risk_factors.append("Low gross margins provide little buffer for cost increases.")
        
        # Market risks
        if input_data["growth_rate"] > 0.2:
            risk_factors.append("Aggressive growth assumptions may not materialize in competitive markets.")
        
        # Customer risks
        if input_data["churn_rate"] > 0.1:
            risk_factors.append("High churn rate poses risk to customer retention and CLV calculations.")
        
        # Economic risks
        inflation_rate = country_data["economic_indicators"]["inflation_2025"]
        if inflation_rate > 0.05:
            risk_factors.append(f"High inflation rate of {inflation_rate*100:.1f}% may increase operational costs.")
        
        # Currency risks
        currency_code = country_data["currency"]["code"]
        if currency_code not in ["USD", "EUR", "GBP"]:
            risk_factors.append("Currency volatility may affect international business operations.")
        
        return risk_factors
    
    def _get_industry_benchmarks(self, business_type: str, scenario: str) -> Optional[Dict[str, float]]:
        """
        Get industry benchmarks for comparison
        """
        # Static benchmarks - in production, this would come from a database
        benchmarks = {
            "saas": {
                "average_roi": 150.0,
                "average_gross_margin": 0.80,
                "average_churn_rate": 0.05,
                "average_cac_payback": 12.0
            },
            "ecommerce": {
                "average_roi": 80.0,
                "average_gross_margin": 0.45,
                "average_conversion_rate": 0.025,
                "average_aov": 75.0
            },
            "startup": {
                "average_roi": 200.0,
                "average_gross_margin": 0.70,
                "average_burn_rate": 50000.0,
                "average_growth_rate": 0.15
            }
        }
        
        return benchmarks.get(business_type)
    
    def _format_currency_values(
        self, 
        roi_metrics: ROIMetrics, 
        tax_calculation: TaxCalculation, 
        currency_code: str
    ) -> Dict[str, str]:
        """
        Format currency values for display
        """
        from utils.currency_utils import CurrencyUtils
        
        currency_utils = CurrencyUtils()
        
        return {
            "net_profit": currency_utils.format_currency(roi_metrics.net_profit, currency_code),
            "total_revenue": currency_utils.format_currency(roi_metrics.total_revenue, currency_code),
            "total_expenses": currency_utils.format_currency(roi_metrics.total_expenses, currency_code),
            "corporate_tax": currency_utils.format_currency(tax_calculation.corporate_tax, currency_code),
            "after_tax_profit": currency_utils.format_currency(tax_calculation.after_tax_profit, currency_code),
            "npv": currency_utils.format_currency(roi_metrics.npv or 0, currency_code),
        }
    
    def _create_input_summary(
        self, 
        input_data: Dict[str, Any], 
        country_data: Dict[str, Any], 
        scenario_data: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Create summary of input parameters
        """
        return {
            "country": country_data["name"],
            "currency": country_data["currency"]["code"],
            "business_type": scenario_data.get("name", "Unknown"),
            "monthly_revenue": input_data["monthly_revenue"],
            "initial_investment": input_data["initial_investment"],
            "gross_margin": input_data["gross_margin"],
            "growth_rate": input_data["growth_rate"],
            "timeframe_months": len([])  # Will be filled by caller
        }