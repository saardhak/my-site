# Saardhak's Medical Device Innovation Portfolio

## Overview

This is a modern web application showcasing Saardhak's personal portfolio as a medical device entrepreneur with a background in Biomedical Engineering from Johns Hopkins University. The site features innovative healthcare solutions, particularly the Veina syringe project, with Apple-inspired design and sophisticated scroll animations. The application is built with a full-stack architecture using React for the frontend and Express.js for the backend.

## User Preferences

- Preferred communication style: Simple, everyday language
- Design inspiration: Apple.com and drgrahamwalker.com aesthetic  
- Focus on personal branding rather than generic content
- Emphasis on smooth scroll animations and visual transitions
- Name "Saardhak" should visibly transition from center to top-left navigation on scroll

## Recent Changes (2024)

- **Personal Branding Focus**: Updated entire site to center around Saardhak's name and personal brand
- **Advanced Animations**: Implemented Apple-inspired scroll animations with section transitions
- **Typing Animation**: Added cycling text animation with Designer, Ideator, Entrepreneur, Innovator, Engineer
- **Visible Name Transition**: Created smooth scaling animation for name moving from center to navigation
- **Enhanced User Experience**: Added sophisticated hover effects and button animations
- **Professional Experience Section**: Added detailed experience timeline with role descriptions

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side navigation
- **Styling**: Tailwind CSS with custom Apple-inspired design system
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Build Tool**: Vite for development and production builds
- **State Management**: TanStack Query for server state management

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for REST API
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: PostgreSQL-based sessions with connect-pg-simple

### Development Setup
- **Monorepo Structure**: Client, server, and shared code in separate directories
- **Hot Reloading**: Vite middleware integrated with Express in development
- **TypeScript Configuration**: Shared types between frontend and backend

## Key Components

### Frontend Components
1. **Navigation**: Fixed header with smooth scrolling navigation
2. **Hero Section**: Landing page with call-to-action
3. **About Section**: Professional background and philosophy
4. **Veina Project**: Featured medical device innovation showcase
5. **Past Projects**: Portfolio of previous medical device work
6. **Contact Section**: Professional contact information and links

### Backend Components
1. **Express Server**: RESTful API with middleware setup
2. **Route Handlers**: API endpoints (currently minimal setup)
3. **Storage Layer**: Interface for database operations with in-memory fallback
4. **Vite Integration**: Development server with HMR support

### Shared Components
1. **Database Schema**: User management schema using Drizzle ORM
2. **Type Definitions**: Shared TypeScript types between client and server

## Data Flow

1. **Frontend**: React components fetch data through TanStack Query
2. **API Layer**: Express.js handles HTTP requests and responses
3. **Storage**: Drizzle ORM manages database operations
4. **Database**: PostgreSQL stores application data
5. **Session Management**: PostgreSQL-backed sessions for user authentication

## External Dependencies

### Frontend Dependencies
- React ecosystem (React, React DOM, React Hook Form)
- UI/UX libraries (Radix UI, Tailwind CSS, Lucide icons)
- Animation and interaction (Embla Carousel, date-fns)
- State management (TanStack Query)

### Backend Dependencies
- Express.js with TypeScript support
- Database tools (Drizzle ORM, Neon Database driver)
- Session management (connect-pg-simple)
- Development tools (tsx for TypeScript execution)

### Development Dependencies
- Vite with React plugin and Replit-specific plugins
- TypeScript compiler and related tooling
- PostCSS and Autoprefixer for CSS processing

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React application to `dist/public`
2. **Backend Build**: esbuild bundles Node.js server to `dist/index.js`
3. **Database Migration**: Drizzle Kit handles schema migrations

### Production Setup
- Server serves static files from the build directory
- Environment variables manage database connections
- PostgreSQL database hosted on Neon (serverless)

### Development Workflow
- `npm run dev`: Runs development server with hot reloading
- `npm run build`: Creates production build
- `npm run start`: Runs production server
- `npm run db:push`: Pushes database schema changes

### Key Architectural Decisions

1. **Monorepo Structure**: Chosen to share types and utilities between client and server while maintaining clear separation of concerns
2. **Drizzle ORM**: Selected for type-safe database operations and excellent PostgreSQL integration
3. **Vite + Express Integration**: Provides seamless development experience with HMR while supporting SSR capabilities
4. **shadcn/ui Components**: Offers consistent, accessible UI components with Tailwind CSS integration
5. **TanStack Query**: Handles server state management, caching, and synchronization efficiently
6. **Neon Database**: Serverless PostgreSQL provides scalable, managed database solution