# SEO Tag Analyzer

## Overview

This is a full-stack web application that analyzes SEO tags of websites. Users can input a URL and receive a comprehensive analysis of the website's SEO performance, including meta tags, Open Graph data, Twitter cards, and actionable recommendations.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Radix UI primitives with custom styling

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
- **UrlInput**: Form component for URL submission with validation
- **AnalysisResults**: Main results display with score visualization
- **SeoTagItem**: Individual SEO tag analysis with status indicators
- **PreviewPanels**: Google Search and social media preview components

### Backend Components
- **Route Handler**: `/api/analyze` endpoint for SEO analysis
- **Web Scraping**: Cheerio for HTML parsing and meta tag extraction
- **Storage Layer**: Abstract storage interface with memory-based implementation

### SEO Analysis Engine
- Extracts title, meta description, Open Graph, and Twitter card data
- Analyzes tag presence, length, and quality
- Calculates overall SEO score based on best practices
- Provides specific recommendations for improvement

## Data Flow

1. **User Input**: User enters URL in the frontend form
2. **Validation**: Client-side validation using Zod schema
3. **API Request**: Form submission triggers POST to `/api/analyze`
4. **Web Scraping**: Server fetches and parses the target website
5. **Analysis**: Server extracts and analyzes SEO tags
6. **Response**: Structured analysis data returned to client
7. **Visualization**: Frontend displays results with interactive components

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

## Changelog
- June 30, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.