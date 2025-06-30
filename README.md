# SeoDiagnose - SEO Tag Analyzer (Built with Replit AI Agent)

## Overview

This is a modern, mobile-responsive full-stack web application that analyzes SEO tags of websites. Users can input a URL and receive a comprehensive analysis with visual feedback displayed in an interactive card-based interface. The app provides detailed SEO scoring, social media previews, and actionable recommendations organized by category.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library and full dark mode support
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Radix UI primitives with custom styling
- **Responsive Design**: Mobile-first approach with grid-based layout

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Build Tool**: Vite for frontend bundling, esbuild for server bundling
- **Development**: tsx for TypeScript execution in development

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM
- **Connection**: Neon Database serverless connection
- **Migrations**: Drizzle Kit for schema management
- **In-Memory Storage**: MemStorage class for temporary user data (fallback)

## Key Components

### Frontend Components
- **UrlInput**: Simplified form component for URL submission with clean mobile design
- **AnalysisResults**: Redesigned with category-based card layout and total score display
- **CategorySummaryCard**: Interactive expandable cards showing category scores (x/10)
- **SeoTagItem**: Individual SEO tag analysis with status indicators
- **PreviewPanels**: Compact Google Search, Facebook, and Twitter preview components

### Backend Components
- **Route Handler**: `/api/analyze` endpoint for comprehensive SEO analysis
- **Web Scraping**: Cheerio for HTML parsing and meta tag extraction
- **Scoring System**: New 10-point scoring system per category with 100-point total

### SEO Analysis Engine
- **Categories**: Content SEO, Technical SEO, Social Media, Performance
- **Scoring**: Each tag scored 0-10, categories averaged, total out of 100
- **12 Analysis Points**: Title, meta description, Open Graph tags, Twitter cards, page size, response time
- **Performance Metrics**: Page size analysis and server response time evaluation
- **Recommendations**: Priority-based suggestions for improvement

## Design Language

### Visual Design
- **Color Coding**: Red (1-3/10), Orange (4-5/10), Blue (6-7/10), Green (8-10/10)
- **Card Layout**: Summary cards with expandable detailed views
- **Mobile Responsive**: Adaptive grid layout (1 col mobile, 2 col tablet, 4 col desktop)
- **Interactive Elements**: Expandable cards with smooth animations
- **Clean Typography**: Focus on readability and hierarchy

### User Experience
- **Simplified Flow**: Single input → category cards → detailed analysis
- **Progressive Disclosure**: Summary view with drill-down capability
- **Visual Feedback**: Color-coded scores and status indicators
- **Export Functionality**: JSON report download with category scores

## Data Flow

1. **User Input**: User enters URL in the centered, clean input form
2. **Validation**: Client-side validation using Zod schema
3. **API Request**: Form submission triggers POST to `/api/analyze`
4. **Web Scraping**: Server fetches and parses the target website
5. **Analysis**: Server extracts and analyzes 12 SEO data points
6. **Categorization**: Tags grouped into 4 categories with individual scoring
7. **Response**: Structured analysis data with category scores returned
8. **Visualization**: Frontend displays results in card-based interface

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Type-safe database ORM
- **cheerio**: Server-side HTML parsing
- **@tanstack/react-query**: Async state management
- **@radix-ui/***: Accessible UI component primitives

### Development Dependencies
- **Vite**: Frontend build tool and dev server
- **tsx**: TypeScript execution for development
- **esbuild**: Production server bundling
- **Tailwind CSS**: Utility-first CSS framework

## Deployment Strategy

### Build Process
1. Frontend builds to `dist/public` using Vite
2. Server bundles to `dist/index.js` using esbuild
3. Database migrations managed via Drizzle Kit

### Environment Configuration
- **Development**: `npm run dev` - Uses tsx for hot reloading
- **Production**: `npm run build && npm start` - Serves bundled assets
- **Database**: Requires `DATABASE_URL` environment variable

### Hosting Considerations
- Static frontend assets served from `dist/public`
- Express server handles API routes and serves frontend
- PostgreSQL database hosted on Neon (serverless)

## Recent Changes
- **June 30, 2025**: Complete UI/UX redesign with mobile-responsive card-based interface
- **June 30, 2025**: Implemented new 10-point scoring system with 4 categories (100 total)
- **June 30, 2025**: Added performance analysis (page size, response time)
- **June 30, 2025**: Enhanced social media previews with compact design
- **June 30, 2025**: Full dark mode support throughout the application
- **June 30, 2025**: Streamlined user flow with progressive disclosure

## User Preferences

Preferred communication style: Simple, everyday language.
