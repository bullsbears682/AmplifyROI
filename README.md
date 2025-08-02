# 🚀 AmplifyROI - Professional ROI Calculator

[![CI/CD Pipeline](https://github.com/yourusername/amplifyroi/workflows/CI/CD%20Pipeline/badge.svg)](https://github.com/yourusername/amplifyroi/actions)
[![codecov](https://codecov.io/gh/yourusername/amplifyroi/branch/main/graph/badge.svg)](https://codecov.io/gh/yourusername/amplifyroi)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3.11-green.svg)](https://www.python.org/)

A modern, professional ROI calculator supporting **35+ business types** across **25+ countries** with real-time 2025 tax data. Built with React/Next.js frontend and Python/FastAPI backend, featuring glassmorphic UI, comprehensive analytics, and GDPR compliance.

## ✨ Features

### 🎯 Core Functionality
- **35+ Business Types**: Startup, SaaS, E-commerce, Manufacturing, and more
- **245 Scenarios**: 7 realistic mini-scenarios per business type
- **25+ Countries**: Real-time 2025 tax rates and economic data
- **Advanced Analytics**: NPV, IRR, payback period, growth projections
- **What-If Analysis**: Compare multiple scenarios and variations
- **Export Options**: Professional PDF reports, Excel, CSV
- **Email Delivery**: GDPR-compliant email reports with analytics

### 🎨 Modern UI/UX
- **Glassmorphic Design**: 2025 design trends with neumorphism
- **Micro-animations**: Smooth transitions and interactive elements
- **Dark Mode**: System-aware theme switching
- **Mobile Responsive**: Touch-optimized for all devices
- **Accessibility**: WCAG 2.2 AA compliant
- **Internationalization**: Multi-language support with RTL

### 🔧 Technical Excellence
- **No Authentication**: Frictionless experience
- **LocalStorage Persistence**: Session recovery
- **Real-time Validation**: Instant feedback
- **Performance Optimized**: <2s page loads, 60fps animations
- **Security First**: GDPR compliance, data privacy
- **Production Ready**: Docker, CI/CD, monitoring

## 🏗️ Architecture

```
AmplifyROI/
├── Frontend (Next.js/React)
│   ├── Modern glassmorphic UI
│   ├── TypeScript + Tailwind CSS
│   ├── Framer Motion animations
│   └── Comprehensive state management
├── Backend (FastAPI/Python)
│   ├── Advanced ROI calculations
│   ├── Country-specific tax logic
│   ├── PDF generation & email
│   └── Analytics & admin dashboard
├── Data Layer
│   ├── 35 business types JSON
│   ├── 25+ countries with 2025 data
│   ├── SQLite for analytics
│   └── Redis caching (optional)
└── Infrastructure
    ├── Docker containerization
    ├── GitHub Actions CI/CD
    ├── Security scanning
    └── Performance monitoring
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+
- Docker (optional)

### Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/amplifyroi.git
cd amplifyroi

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
pip install -r requirements.txt
cd ..

# Start development servers
npm run dev        # Frontend (localhost:3000)
cd backend && uvicorn main:app --reload --port 8000  # Backend (localhost:8000)
```

### Docker Development

```bash
# Build and run with Docker Compose
docker-compose up --build

# Or use the development Dockerfile
docker build -t amplifyroi:dev --target development .
docker run -p 3000:3000 -p 8000:8000 amplifyroi:dev
```

## 📚 Documentation

### Business Types & Scenarios

#### Startup (7 scenarios)
- Pre-Seed Stage: MVP development, initial validation
- Seed Stage: Product-market fit, initial funding
- Series A: Proven business model, rapid expansion
- Series B: Market leader position, geographic expansion
- Growth Stage: Mature product, profitability optimization
- Late Stage: Pre-IPO, established market position
- Unicorn: Billion-dollar valuation, market dominance

#### E-commerce (7 scenarios)
- Dropshipping Startup: No inventory model
- Private Label Brand: Own branded products
- Subscription Box: Recurring monthly deliveries
- Marketplace Seller: Amazon, eBay, Etsy platforms
- Direct-to-Consumer: Own website, direct relationships
- B2B Wholesale: Bulk sales to retailers
- Print-on-Demand: Custom products on order

#### SaaS (7 scenarios)
- Micro SaaS: Solo founder, niche market
- B2C SaaS: Consumer-focused applications
- SMB SaaS: Small and medium business solutions
- Enterprise SaaS: Large business solutions
- Vertical SaaS: Industry-specific software
- Platform SaaS: Developer tools and APIs
- Freemium SaaS: Free tier with premium upgrades

*[Full documentation for all 35 business types available in `/docs/business-types.md`]*

### Countries & Tax Data (2025)

#### Major Markets
| Country | Corporate Tax | VAT/Sales Tax | Currency | Financial Year |
|---------|---------------|---------------|----------|----------------|
| United States | 21% | 0-7% (varies) | USD | Jan-Dec |
| United Kingdom | 25% | 20% | GBP | Apr-Apr |
| Germany | 29.8% | 19% | EUR | Jan-Dec |
| Canada | 26.5% | 13% (avg) | CAD | Jan-Dec |
| Australia | 30% | 10% | AUD | Jul-Jun |

*[Complete country data in `/docs/countries.md`]*

## 🔧 API Reference

### Core Endpoints

#### Business Data
```http
GET /api/business-types
GET /api/business-types/{type_id}
GET /api/countries
GET /api/countries/{country_code}
```

#### ROI Calculation
```http
POST /api/calculate-roi
Content-Type: application/json

{
  "country": "US",
  "business_type": "startup",
  "scenario": "seed_stage",
  "monthly_revenue": 50000,
  "initial_investment": 100000,
  "operating_expenses": 30000,
  "marketing_spend": 15000,
  "timeframe_months": 12
}
```

#### Export & Email
```http
POST /api/export-pdf
POST /api/send-email
```

#### Admin (Password Protected)
```http
GET /api/admin/analytics
GET /api/admin/submissions
GET /api/admin/exports
```

*[Complete API documentation in `/docs/api.md`]*

## 📊 Features Deep Dive

### ROI Calculation Engine

Our advanced calculation engine provides:

- **Comprehensive Metrics**: ROI percentage, net profit, payback period, IRR, NPV
- **Tax Calculations**: Country-specific corporate, VAT, and payroll taxes
- **Growth Modeling**: Month-by-month projections with compound growth
- **Industry Benchmarks**: Compare against industry averages
- **Risk Analysis**: Identify potential risks and recommendations

### Example Calculation

```python
# Dropshipping Startup in Germany
monthly_revenue = €40,000
gross_margin = 25%
marketing_spend = €14,000 (35%)
german_corporate_tax = 29.8%
german_vat = 19%

# Results
roi_percentage = 127.3%
payback_period = 8.2 months
after_tax_profit = €156,840
effective_tax_rate = 23.4%
```

### What-If Analysis

Test multiple scenarios:
- **Revenue Variations**: +/- 20% revenue scenarios
- **Cost Optimization**: Reduce operating expenses by 15%
- **Market Expansion**: Add new geographic markets
- **Pricing Strategy**: Premium vs. competitive pricing

### Export & Sharing

Professional reports include:
- Executive summary with key metrics
- Detailed financial projections
- Interactive charts and visualizations
- Tax breakdown by country
- Industry benchmark comparisons
- Recommendations and risk factors

## 🎨 UI/UX Guidelines

### Design System

#### Colors
```css
/* Primary Palette */
--primary-50: #f0f9ff;
--primary-500: #0ea5e9;
--primary-900: #0c4a6e;

/* Glassmorphism */
--glass: rgba(255, 255, 255, 0.1);
--glass-border: rgba(255, 255, 255, 0.2);
```

#### Typography
- **Display**: Cal Sans (headings)
- **Body**: Inter (body text)
- **Mono**: JetBrains Mono (code)

#### Components
- **Buttons**: 8 variants (default, glass, gradient, neumorphism)
- **Cards**: Glass, neumorphism, elevated styles
- **Forms**: Real-time validation, accessibility focused
- **Charts**: Interactive with smooth animations

### Accessibility Features

- **WCAG 2.2 AA Compliance**: All components tested
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: ARIA labels and descriptions
- **Color Contrast**: 4.5:1 minimum ratio
- **Voice Input**: Speech recognition for form inputs
- **Focus Management**: Clear focus indicators

## 🧪 Testing Strategy

### Test Coverage

- **Unit Tests**: 95%+ coverage (Jest, React Testing Library)
- **Integration Tests**: API endpoints (Pytest)
- **E2E Tests**: Complete user flows (Cypress)
- **Accessibility Tests**: Automated a11y testing (axe-core)
- **Performance Tests**: Lighthouse CI, load testing
- **Security Tests**: Vulnerability scanning (Trivy, Safety)

### Running Tests

```bash
# Frontend tests
npm test                 # Unit tests
npm run test:coverage    # Coverage report
npm run test:e2e        # Cypress E2E tests
npm run accessibility   # a11y tests

# Backend tests
cd backend
pytest                  # Unit tests
pytest --cov=.         # Coverage report
flake8 .               # Linting
mypy .                 # Type checking

# All tests
npm run test:all       # Complete test suite
```

## 🚀 Deployment

### Environment Setup

```bash
# Frontend environment variables
NEXT_PUBLIC_API_URL=https://api.amplifyroi.com
NEXT_PUBLIC_APP_URL=https://amplifyroi.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Backend environment variables
ADMIN_PASSWORD=your-secure-password
SECRET_KEY=your-secret-key-here
SMTP_HOST=smtp.sendgrid.net
SMTP_USERNAME=apikey
SMTP_PASSWORD=your-sendgrid-api-key
REDIS_URL=redis://localhost:6379
DATABASE_URL=sqlite:///amplifyroi.db
```

### Production Deployment

#### Option 1: Vercel + Railway (Recommended)

```bash
# Deploy frontend to Vercel
npm install -g vercel
vercel --prod

# Deploy backend to Railway
git push railway main
```

#### Option 2: Docker Container

```bash
# Build production image
docker build -t amplifyroi:latest --target production .

# Run container
docker run -p 80:80 \
  -e ADMIN_PASSWORD=your-password \
  -e SECRET_KEY=your-secret-key \
  amplifyroi:latest
```

#### Option 3: AWS ECS/Fargate

```bash
# Build and push to ECR
aws ecr get-login-password | docker login --username AWS --password-stdin
docker build -t amplifyroi .
docker tag amplifyroi:latest your-account.dkr.ecr.region.amazonaws.com/amplifyroi:latest
docker push your-account.dkr.ecr.region.amazonaws.com/amplifyroi:latest

# Deploy with ECS
aws ecs update-service --service amplifyroi --force-new-deployment
```

### Performance Optimization

- **Frontend**: Next.js SSG, code splitting, image optimization
- **Backend**: FastAPI async, Redis caching, database optimization
- **CDN**: CloudFlare for global distribution
- **Monitoring**: Sentry error tracking, Vercel analytics

## 📈 Analytics & Monitoring

### Built-in Analytics

Track user interactions:
- Calculation completions
- Country/business type selections
- Export usage
- Session duration
- Popular scenarios

### Admin Dashboard

Password-protected admin panel provides:
- Usage analytics and trends
- Email submission management
- Export statistics
- System health monitoring
- User feedback collection

### External Monitoring

- **Performance**: Vercel Analytics, Web Vitals
- **Errors**: Sentry error tracking
- **Uptime**: StatusPage monitoring
- **Security**: GitHub security advisories

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- **TypeScript**: Strict mode enabled
- **ESLint**: Airbnb configuration
- **Prettier**: Code formatting
- **Husky**: Pre-commit hooks
- **Conventional Commits**: Commit message format

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Stripe, Notion, Framer
- **UI Components**: Radix UI, Headless UI
- **Charts**: Recharts, Chart.js
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 📞 Support

- **Documentation**: [docs.amplifyroi.com](https://docs.amplifyroi.com)
- **Issues**: [GitHub Issues](https://github.com/yourusername/amplifyroi/issues)
- **Email**: support@amplifyroi.com
- **Discord**: [Join our community](https://discord.gg/amplifyroi)

---

<div align="center">
  <p>Built with ❤️ by the AmplifyROI Team</p>
  <p>
    <a href="https://amplifyroi.com">Website</a> •
    <a href="https://docs.amplifyroi.com">Documentation</a> •
    <a href="https://github.com/yourusername/amplifyroi">GitHub</a>
  </p>
</div>