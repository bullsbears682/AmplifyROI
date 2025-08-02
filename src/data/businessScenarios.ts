export interface BusinessScenario {
  id: string;
  name: string;
  description: string;
  monthlyRevenue: { min: number; max: number; default: number };
  grossMargin: number; // percentage
  cac: number; // Customer Acquisition Cost
  marketingBudget: { percentage: number; amount?: number };
  averageOrderValue: number;
  churnRate?: number; // monthly percentage for subscription businesses
  fulfillmentCost?: number; // percentage of revenue
  paymentTerms: number; // days
  operatingExpenses: number; // percentage of revenue
  growthRate: number; // monthly percentage
}

export interface BusinessType {
  id: string;
  name: string;
  description: string;
  icon: string;
  scenarios: BusinessScenario[];
}

export const businessTypes: BusinessType[] = [
  {
    id: 'startup',
    name: 'Startup',
    description: 'Early-stage companies with high growth potential',
    icon: '🚀',
    scenarios: [
      {
        id: 'pre-seed',
        name: 'Pre-Seed Stage',
        description: 'MVP development and initial validation',
        monthlyRevenue: { min: 0, max: 5000, default: 1000 },
        grossMargin: 65,
        cac: 150,
        marketingBudget: { percentage: 25 },
        averageOrderValue: 250,
        operatingExpenses: 45,
        growthRate: 15,
        paymentTerms: 0
      },
      {
        id: 'seed',
        name: 'Seed Stage',
        description: 'Product-market fit achieved, scaling begins',
        monthlyRevenue: { min: 5000, max: 25000, default: 12000 },
        grossMargin: 70,
        cac: 200,
        marketingBudget: { percentage: 30 },
        averageOrderValue: 350,
        operatingExpenses: 50,
        growthRate: 20,
        paymentTerms: 15
      },
      {
        id: 'series-a',
        name: 'Series A',
        description: 'Proven business model, rapid expansion',
        monthlyRevenue: { min: 25000, max: 100000, default: 60000 },
        grossMargin: 75,
        cac: 180,
        marketingBudget: { percentage: 28 },
        averageOrderValue: 450,
        operatingExpenses: 40,
        growthRate: 18,
        paymentTerms: 30
      },
      {
        id: 'series-b',
        name: 'Series B',
        description: 'Market leader, geographic expansion',
        monthlyRevenue: { min: 100000, max: 500000, default: 250000 },
        grossMargin: 78,
        cac: 160,
        marketingBudget: { percentage: 25 },
        averageOrderValue: 600,
        operatingExpenses: 38,
        growthRate: 15,
        paymentTerms: 30
      },
      {
        id: 'growth-stage',
        name: 'Growth Stage',
        description: 'Mature product, optimizing for profitability',
        monthlyRevenue: { min: 500000, max: 2000000, default: 1000000 },
        grossMargin: 80,
        cac: 140,
        marketingBudget: { percentage: 22 },
        averageOrderValue: 750,
        operatingExpenses: 35,
        growthRate: 12,
        paymentTerms: 45
      },
      {
        id: 'late-stage',
        name: 'Late Stage',
        description: 'Pre-IPO, established market position',
        monthlyRevenue: { min: 2000000, max: 10000000, default: 5000000 },
        grossMargin: 82,
        cac: 120,
        marketingBudget: { percentage: 20 },
        averageOrderValue: 900,
        operatingExpenses: 32,
        growthRate: 10,
        paymentTerms: 60
      },
      {
        id: 'unicorn',
        name: 'Unicorn',
        description: 'Billion-dollar valuation, market dominance',
        monthlyRevenue: { min: 10000000, max: 50000000, default: 25000000 },
        grossMargin: 85,
        cac: 100,
        marketingBudget: { percentage: 18 },
        averageOrderValue: 1200,
        operatingExpenses: 30,
        growthRate: 8,
        paymentTerms: 60
      }
    ]
  },
  {
    id: 'smb',
    name: 'Small & Medium Business',
    description: 'Established businesses with 10-500 employees',
    icon: '🏢',
    scenarios: [
      {
        id: 'micro-business',
        name: 'Micro Business',
        description: '1-9 employees, local market focus',
        monthlyRevenue: { min: 5000, max: 50000, default: 25000 },
        grossMargin: 60,
        cac: 80,
        marketingBudget: { percentage: 15 },
        averageOrderValue: 150,
        operatingExpenses: 55,
        growthRate: 5,
        paymentTerms: 30
      },
      {
        id: 'small-business',
        name: 'Small Business',
        description: '10-49 employees, regional presence',
        monthlyRevenue: { min: 50000, max: 200000, default: 120000 },
        grossMargin: 65,
        cac: 100,
        marketingBudget: { percentage: 18 },
        averageOrderValue: 200,
        operatingExpenses: 50,
        growthRate: 7,
        paymentTerms: 45
      },
      {
        id: 'medium-business',
        name: 'Medium Business',
        description: '50-249 employees, multi-regional',
        monthlyRevenue: { min: 200000, max: 1000000, default: 500000 },
        grossMargin: 68,
        cac: 120,
        marketingBudget: { percentage: 20 },
        averageOrderValue: 300,
        operatingExpenses: 45,
        growthRate: 8,
        paymentTerms: 60
      },
      {
        id: 'large-smb',
        name: 'Large SMB',
        description: '250-500 employees, national reach',
        monthlyRevenue: { min: 1000000, max: 5000000, default: 2500000 },
        grossMargin: 70,
        cac: 140,
        marketingBudget: { percentage: 22 },
        averageOrderValue: 400,
        operatingExpenses: 42,
        growthRate: 6,
        paymentTerms: 75
      },
      {
        id: 'family-business',
        name: 'Family Business',
        description: 'Multi-generational, traditional operations',
        monthlyRevenue: { min: 100000, max: 800000, default: 350000 },
        grossMargin: 55,
        cac: 90,
        marketingBudget: { percentage: 12 },
        averageOrderValue: 180,
        operatingExpenses: 48,
        growthRate: 4,
        paymentTerms: 30
      },
      {
        id: 'franchise',
        name: 'Franchise',
        description: 'Established brand, proven business model',
        monthlyRevenue: { min: 80000, max: 400000, default: 200000 },
        grossMargin: 62,
        cac: 110,
        marketingBudget: { percentage: 16 },
        averageOrderValue: 160,
        operatingExpenses: 52,
        growthRate: 6,
        paymentTerms: 15
      },
      {
        id: 'professional-services',
        name: 'Professional Services',
        description: 'Consulting, legal, accounting firms',
        monthlyRevenue: { min: 150000, max: 1200000, default: 600000 },
        grossMargin: 75,
        cac: 200,
        marketingBudget: { percentage: 10 },
        averageOrderValue: 2500,
        operatingExpenses: 35,
        growthRate: 5,
        paymentTerms: 30
      }
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Large corporations with 500+ employees',
    icon: '🏛️',
    scenarios: [
      {
        id: 'mid-market-enterprise',
        name: 'Mid-Market Enterprise',
        description: '500-2,500 employees, multiple locations',
        monthlyRevenue: { min: 5000000, max: 25000000, default: 12000000 },
        grossMargin: 72,
        cac: 500,
        marketingBudget: { percentage: 15 },
        averageOrderValue: 5000,
        operatingExpenses: 38,
        growthRate: 4,
        paymentTerms: 90
      },
      {
        id: 'large-enterprise',
        name: 'Large Enterprise',
        description: '2,500-10,000 employees, national presence',
        monthlyRevenue: { min: 25000000, max: 100000000, default: 50000000 },
        grossMargin: 74,
        cac: 800,
        marketingBudget: { percentage: 12 },
        averageOrderValue: 10000,
        operatingExpenses: 35,
        growthRate: 3,
        paymentTerms: 120
      },
      {
        id: 'fortune-500',
        name: 'Fortune 500',
        description: '10,000+ employees, global operations',
        monthlyRevenue: { min: 100000000, max: 1000000000, default: 500000000 },
        grossMargin: 76,
        cac: 1200,
        marketingBudget: { percentage: 10 },
        averageOrderValue: 25000,
        operatingExpenses: 32,
        growthRate: 2,
        paymentTerms: 180
      },
      {
        id: 'conglomerate',
        name: 'Conglomerate',
        description: 'Diversified business units, multiple industries',
        monthlyRevenue: { min: 500000000, max: 5000000000, default: 2000000000 },
        grossMargin: 65,
        cac: 1500,
        marketingBudget: { percentage: 8 },
        averageOrderValue: 50000,
        operatingExpenses: 40,
        growthRate: 1.5,
        paymentTerms: 180
      },
      {
        id: 'multinational',
        name: 'Multinational Corporation',
        description: 'Global presence, multiple countries',
        monthlyRevenue: { min: 1000000000, max: 10000000000, default: 3000000000 },
        grossMargin: 70,
        cac: 2000,
        marketingBudget: { percentage: 9 },
        averageOrderValue: 75000,
        operatingExpenses: 38,
        growthRate: 2,
        paymentTerms: 240
      },
      {
        id: 'government-contractor',
        name: 'Government Contractor',
        description: 'B2G services, regulated industry',
        monthlyRevenue: { min: 10000000, max: 200000000, default: 80000000 },
        grossMargin: 68,
        cac: 5000,
        marketingBudget: { percentage: 5 },
        averageOrderValue: 100000,
        operatingExpenses: 42,
        growthRate: 1,
        paymentTerms: 120
      },
      {
        id: 'public-company',
        name: 'Public Company',
        description: 'Publicly traded, quarterly reporting',
        monthlyRevenue: { min: 50000000, max: 2000000000, default: 800000000 },
        grossMargin: 73,
        cac: 1000,
        marketingBudget: { percentage: 11 },
        averageOrderValue: 30000,
        operatingExpenses: 36,
        growthRate: 2.5,
        paymentTerms: 90
      }
    ]
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Online retail and digital commerce',
    icon: '🛒',
    scenarios: [
      {
        id: 'dropshipping',
        name: 'Dropshipping Startup',
        description: 'No inventory, supplier fulfillment',
        monthlyRevenue: { min: 10000, max: 100000, default: 40000 },
        grossMargin: 25,
        cac: 45,
        marketingBudget: { percentage: 35 },
        averageOrderValue: 65,
        fulfillmentCost: 15,
        operatingExpenses: 20,
        growthRate: 12,
        paymentTerms: 0
      },
      {
        id: 'private-label',
        name: 'Private Label Brand',
        description: 'Own branded products, inventory management',
        monthlyRevenue: { min: 50000, max: 500000, default: 200000 },
        grossMargin: 55,
        cac: 80,
        marketingBudget: { percentage: 25 },
        averageOrderValue: 85,
        fulfillmentCost: 12,
        operatingExpenses: 30,
        growthRate: 10,
        paymentTerms: 15
      },
      {
        id: 'subscription-box',
        name: 'Subscription Box',
        description: 'Recurring monthly deliveries',
        monthlyRevenue: { min: 25000, max: 300000, default: 120000 },
        grossMargin: 60,
        cac: 120,
        marketingBudget: { percentage: 30 },
        averageOrderValue: 45,
        churnRate: 8,
        fulfillmentCost: 18,
        operatingExpenses: 25,
        growthRate: 8,
        paymentTerms: 0
      },
      {
        id: 'marketplace-seller',
        name: 'Marketplace Seller',
        description: 'Amazon, eBay, Etsy seller',
        monthlyRevenue: { min: 15000, max: 200000, default: 75000 },
        grossMargin: 35,
        cac: 25,
        marketingBudget: { percentage: 20 },
        averageOrderValue: 50,
        fulfillmentCost: 20,
        operatingExpenses: 25,
        growthRate: 6,
        paymentTerms: 14
      },
      {
        id: 'dtc-brand',
        name: 'Direct-to-Consumer',
        description: 'Own website, direct customer relationships',
        monthlyRevenue: { min: 100000, max: 1000000, default: 400000 },
        grossMargin: 65,
        cac: 95,
        marketingBudget: { percentage: 28 },
        averageOrderValue: 120,
        fulfillmentCost: 10,
        operatingExpenses: 32,
        growthRate: 9,
        paymentTerms: 0
      },
      {
        id: 'wholesale',
        name: 'B2B Wholesale',
        description: 'Bulk sales to retailers',
        monthlyRevenue: { min: 200000, max: 2000000, default: 800000 },
        grossMargin: 45,
        cac: 400,
        marketingBudget: { percentage: 8 },
        averageOrderValue: 2500,
        fulfillmentCost: 8,
        operatingExpenses: 35,
        growthRate: 4,
        paymentTerms: 60
      },
      {
        id: 'print-on-demand',
        name: 'Print-on-Demand',
        description: 'Custom products, no inventory',
        monthlyRevenue: { min: 5000, max: 80000, default: 30000 },
        grossMargin: 40,
        cac: 35,
        marketingBudget: { percentage: 30 },
        averageOrderValue: 35,
        fulfillmentCost: 25,
        operatingExpenses: 15,
        growthRate: 7,
        paymentTerms: 0
      }
    ]
  },
  {
    id: 'saas',
    name: 'SaaS',
    description: 'Software as a Service companies',
    icon: '💻',
    scenarios: [
      {
        id: 'micro-saas',
        name: 'Micro SaaS',
        description: 'Solo founder, niche market',
        monthlyRevenue: { min: 1000, max: 10000, default: 5000 },
        grossMargin: 85,
        cac: 150,
        marketingBudget: { percentage: 20 },
        averageOrderValue: 50,
        churnRate: 5,
        operatingExpenses: 25,
        growthRate: 15,
        paymentTerms: 0
      },
      {
        id: 'b2c-saas',
        name: 'B2C SaaS',
        description: 'Consumer-focused software',
        monthlyRevenue: { min: 10000, max: 100000, default: 45000 },
        grossMargin: 88,
        cac: 45,
        marketingBudget: { percentage: 35 },
        averageOrderValue: 25,
        churnRate: 7,
        operatingExpenses: 30,
        growthRate: 12,
        paymentTerms: 0
      },
      {
        id: 'smb-saas',
        name: 'SMB SaaS',
        description: 'Small business solutions',
        monthlyRevenue: { min: 50000, max: 500000, default: 200000 },
        grossMargin: 82,
        cac: 300,
        marketingBudget: { percentage: 25 },
        averageOrderValue: 150,
        churnRate: 4,
        operatingExpenses: 45,
        growthRate: 10,
        paymentTerms: 30
      },
      {
        id: 'enterprise-saas',
        name: 'Enterprise SaaS',
        description: 'Large business solutions',
        monthlyRevenue: { min: 500000, max: 10000000, default: 3000000 },
        grossMargin: 85,
        cac: 5000,
        marketingBudget: { percentage: 15 },
        averageOrderValue: 5000,
        churnRate: 2,
        operatingExpenses: 55,
        growthRate: 8,
        paymentTerms: 60
      },
      {
        id: 'vertical-saas',
        name: 'Vertical SaaS',
        description: 'Industry-specific solutions',
        monthlyRevenue: { min: 100000, max: 2000000, default: 600000 },
        grossMargin: 80,
        cac: 800,
        marketingBudget: { percentage: 18 },
        averageOrderValue: 800,
        churnRate: 3,
        operatingExpenses: 50,
        growthRate: 7,
        paymentTerms: 45
      },
      {
        id: 'platform-saas',
        name: 'Platform SaaS',
        description: 'Developer tools and APIs',
        monthlyRevenue: { min: 200000, max: 5000000, default: 1500000 },
        grossMargin: 90,
        cac: 1200,
        marketingBudget: { percentage: 20 },
        averageOrderValue: 2000,
        churnRate: 2.5,
        operatingExpenses: 40,
        growthRate: 9,
        paymentTerms: 30
      },
      {
        id: 'freemium-saas',
        name: 'Freemium SaaS',
        description: 'Free tier with premium upgrades',
        monthlyRevenue: { min: 25000, max: 300000, default: 120000 },
        grossMargin: 92,
        cac: 25,
        marketingBudget: { percentage: 40 },
        averageOrderValue: 75,
        churnRate: 6,
        operatingExpenses: 35,
        growthRate: 18,
        paymentTerms: 0
      }
    ]
  }
];

// Continue with more business types...