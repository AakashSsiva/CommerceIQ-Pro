# CommerceIQ Pro — Executive Sales Intelligence Platform

> **Production-grade, FAANG-style analytics dashboard** built with React, Vite, Tailwind CSS, and Recharts.  
> Designed to operate like a real SaaS BI product — not just a chart page.

---

## 📸 Dashboard Preview

### Header · Filters · KPI Cards
![Header, Filters and KPI Cards](./docs/screenshots/01_header_kpi.png)

### Analytics Charts — Sales Trend · Channel · Category · Region
![Analytics Charts](./docs/screenshots/02_charts.png)

### Live Product Intelligence Table
![Product Intelligence Table](./docs/screenshots/03_product_table.png)

### Executive Reports · System Settings
![Executive Reports and Settings](./docs/screenshots/04_reports_settings.png)

### 🔔 Notification Center
![Notification Center](./docs/screenshots/05_notifications.png)

### 👤 Profile Module
![Profile Module](./docs/screenshots/06_profile.png)

---

## 🚀 Live Features

### 🏠 Executive Header
| Element | Description |
|---------|-------------|
| Logo + Brand | CommerceIQ Pro branding |
| Import CSV | Upload raw order data, auto-parsed and validated |
| Export Panel | Excel · CSV · PDF · Screenshot — 4 export modes |
| Theme Toggle | Light / Dark mode switch |
| 🔔 Notification Bell | Live alert center with unread badge |
| 👤 Profile Menu | Identity, role, preferences, saved reports |

---

### 🎛️ FAANG Executive Filters
All filters update KPI cards, charts, tables, and insights **in real-time**:

| Filter | Options |
|--------|---------|
| Date Range | Today · Last 7 Days · Last 30 Days · Quarterly · Yearly · All Time |
| Region | North · South · East · West |
| Channel | Website · Mobile App · Marketplace · Retail Partner |
| Category | Electronics · Fashion · Home · Beauty · Accessories |
| Gender | Male · Female · Other |
| Rating | 1★ – 5★ |
| Search Product | Live text search |

---

### 📈 KPI Intelligence Cards (6 Cards with Sparklines)
| Card | Metric |
|------|--------|
| Total Orders | Transaction count |
| Gross Revenue | Full sales in selected currency |
| Quantity Sold | Total units |
| Avg Rating | Customer satisfaction |
| Avg Delivery | Logistics performance (days) |
| Growth % | Month-over-month trend |

Each card includes an **inline SVG sparkline** and trend badge.

---

### 📊 Live Recharts Analytics Suite
| Chart | Type | Description |
|-------|------|-------------|
| Sales Trend | Area Chart | Live 3-second ticker · NOW reference line · dual revenue + orders series |
| Channel Performance | Horizontal Bar | Revenue by acquisition source |
| Category Distribution | Donut Chart | Order share with % labels |
| Region Comparison | Horizontal Bar | Geographic revenue breakdown |
| AI Forecast | Line Chart | Projected 2-month sales outlook |

---

### ⚠️ Duplicate Detection Engine
- Automatically scans all uploaded data for duplicate `Invoice_ID` records
- Strips duplicates before they reach the KPI engine
- Shows alert banner with exact duplicate IDs and "Cleaned" badge
- Fires a notification to the Notification Center on every detection

---

### 📋 Live Product Intelligence Table
- Sortable by **Revenue · Quantity · Rating** (click column headers)
- Live product search within table
- **TOP badge** for highest revenue product
- **Trend icon** — rising (green) or falling (red) based on rating
- Fully filtered from the global Executive Filter Bar

---

### 📄 Executive Reports (Functional Downloads)
| Report | Format | Content |
|--------|--------|---------|
| Weekly Report | Excel `.xlsx` | Last 50 filtered orders |
| Monthly Summary | CSV | Month-by-month revenue & order counts |
| Risk Report | Excel `.xlsx` | Orders with Rating < 3 or Delivery > 5 days |
| Forecast Report | PDF | Full dashboard snapshot |

Each button shows **Generating… → Downloaded ✓** state feedback.

---

### 👤 Profile Module
| Section | Features |
|---------|----------|
| Identity | Editable name · Role · Email · Access level badge |
| Access Level | Admin · Analyst · Executive · Viewer (switchable) |
| Profile Analytics | Last Login · Files Uploaded · Reports Exported (live counters) |
| Quick Preferences | Dark Mode toggle · Currency · Language (visible inline) |
| Saved Reports | Bookmarked reports accessible from profile |
| Sign Out | Logout button |

---

### 🔔 Notification Center
- **4 notification types**: Info · Success · Warning · Error
- **Auto-fired events**: CSV import, export complete, duplicate detected, low rating alert
- Unread badge count on bell icon
- Mark single / mark all as read
- Accessible via header bell icon — dismisses on outside click

---

### ⚙️ System Settings Panel
| Setting | Options |
|---------|---------|
| Appearance | Executive White (Light) / Slate Premium (Dark) |
| Currency | 🇺🇸 USD · 🇮🇳 INR · 🇪🇺 EUR · 🇬🇧 GBP · 🇯🇵 JPY · 🇨🇦 CAD · 🇦🇺 AUD · 🇸🇬 SGD · 🇦🇪 AED |
| Language | English (US/UK) · Tamil · Hindi · French · German · Japanese · Arabic · Chinese |
| Number Format | International (1,234,567) · Indian (12,34,567) |

---

### 📤 Export Engine (4 Modes)
- **CSV** — raw filtered dataset
- **Excel** — structured `.xlsx` workbook
- **PDF** — full dashboard executive report snapshot
- **Screenshot** — standalone PDF capture for portfolio

Every export increments the **Reports Exported** counter in the Profile module.

---

## 🛠️ Technology Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite 8 |
| Styling | Tailwind CSS v3 (custom token system) |
| Animations | Framer Motion |
| Icons | Lucide React |
| Charts | Recharts (Area · Bar · Donut · Line) |
| Data Parsing | PapaParse (CSV) |
| Excel Export | XLSX + file-saver |
| PDF Export | jsPDF + html2canvas |
| State | React Context API (`DataContext`) |

---

## 📁 Project Structure

```
commerceiq/
├── public/
│
├── src/
│   ├── charts/
│   │   ├── SalesTrendChart.jsx       ← Live 3s ticker, NOW reference line
│   │   ├── ChannelChart.jsx
│   │   ├── CategoryDonutChart.jsx    ← New donut chart
│   │   ├── RegionChart.jsx           ← New region comparison
│   │   └── ForecastChart.jsx
│   │
│   ├── components/
│   │   ├── Header.jsx                ← FAANG enterprise header
│   │   ├── KPIcards.jsx              ← 6 cards + inline sparklines
│   │   ├── DuplicateAlert.jsx
│   │   ├── ProductTable.jsx          ← Sortable + searchable
│   │   ├── SettingsPanel.jsx         ← Currency, Language, Theme
│   │   ├── NotificationBell.jsx      ← Notification center
│   │   └── ProfileMenu.jsx           ← Full profile module
│   │
│   ├── context/
│   │   └── DataContext.jsx           ← Global analytics engine + state
│   │
│   ├── data/
│   │   └── mockData.js               ← 250 realistic orders + duplicates
│   │
│   ├── exports/
│   │   ├── ExportPanel.jsx
│   │   ├── exportExcel.js
│   │   └── exportPDF.js
│   │
│   ├── filters/
│   │   └── FilterBar.jsx             ← 7 executive filters
│   │
│   ├── insights/
│   │   ├── ExecutiveReports.jsx      ← Functional real downloads
│   │   └── AIInsights.jsx
│   │
│   ├── utils/
│   │   ├── csvParser.js
│   │   └── duplicateDetector.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css                     ← Professional CSS token system
│
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## ⚙️ Local Development

### Install dependencies
```bash
npm install
```

### Start the development server
```bash
npm run dev
```
→ Opens at **http://localhost:5173/**

### Build for production
```bash
npm run build
```
→ Outputs optimized bundle to `dist/` — ready for Vercel or Netlify.

---

## 🚀 Deployment

Deploy the `dist/` folder to:

| Platform | Command |
|----------|---------|
| **Vercel** | `vercel --prod` |
| **Netlify** | Drag `dist/` to Netlify dashboard |

---

## 🎨 Design System

| Token | Light | Dark |
|-------|-------|------|
| Background | `#F7F9FC` | `#020617` |
| Card | `#FFFFFF` | `#0F172A` |
| Primary | `#003A70` | — |
| Accent | — | `#3B82F6` |
| Positive | `#00A676` | `#00A676` |
| Alert | `#E4572E` | `#E4572E` |
| Text | `#5F6B7A` | `#94a3b8` |

---

## 💡 How to Use Import / Export

### Importing Data
1. Click **"Import CSV"** in the header
2. Select any `.csv` file with columns: `Order_ID`, `Date`, `Region`, `Channel`, `Category`, `Product`, `Price`, `Quantity`, `Rating`
3. The engine auto-parses, deduplicates, and hot-loads the data into all charts and KPIs

### Exporting Data
1. Click **"Export"** dropdown in the header
2. Choose: **Excel · CSV · PDF · Screenshot**
3. The download triggers instantly — the export counter in your Profile updates live

---

*Built with ❤️ as a production-grade portfolio analytics platform.*
