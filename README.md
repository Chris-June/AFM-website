# A Frame of Mind

A curated digital sanctuary where artists and writers share their mental health journey through creative expression.

## Overview

A Frame of Mind is a non-profit platform dedicated to transforming mental health awareness through the power of human expression and creative community. Users can:

- **Explore** featured artworks and writings from the community
- **Submit** their own creative work for publication
- **Read** stories in a distraction-free Zen Reading Mode
- **Access** mental health resources and self-care toolkits

## Tech Stack

- **Framework:** Next.js 16.2.1 (Turbopack)
- **Backend:** Convex (serverless backend)
- **Styling:** Tailwind CSS
- **UI Library:** shadcn/ui
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Language:** TypeScript (strict mode)
- **Fonts:** Geist Sans, Geist Mono, Playfair Display

## Pages

### `/` (Home)
- Cinematic hero with SoftAurora WebGL background
- Featured artworks carousel
- Featured stories horizontal scroll
- Partner organization banner
- Footer with navigation

### `/gallery`
- Curated exhibitions carousel
- Masonry grid of all artworks
- Lightbox modal for detailed viewing
- Infinite scroll pagination

### `/stories`
- Editorial "Fable Folio" header
- Masonry layout of writings (poems, blogs, creative writing)
- Zen Reading Mode for distraction-free reading
- Infinite scroll pagination

### `/resources`
- Self-care toolkit with interactive tools
- Mental health resources and guides

### `/submit`
- Tabbed interface for artwork vs writing submissions
- Form validation with Zod
- Submission stored in Convex `submissions` table

### `/admin/seed`
- Seed artworks and writings with sample data
- Clear data utilities for development

## Development Setup

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- Convex account (free tier works)

### Installation

```bash
# Clone the repository
git clone https://github.com/Chris-June/AFM-website.git
cd afm-web

# Install dependencies
npm install
# or
pnpm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Convex deployment
CONVEX_DEPLOYMENT=dev:your-deployment-name
CONVEX_URL=https://your-deployment.convex.cloud
CONVEX_SITE_URL=https://your-deployment.convex.site
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
```

### Convex Setup

```bash
# Initialize Convex (if needed)
npx convex dev

# Seed sample data
npx convex run seed:seedArtworks
npx convex run seed:seedWritings
```

### Running the Development Server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
afm-web/
├── app/[locale]/          # Locale-based routing (en)
│   ├── gallery/          # Gallery page
│   ├── stories/          # Stories page
│   ├── resources/        # Resources page
│   ├── submit/           # Submission page
│   ├── admin/seed/       # Admin seed utilities
│   ├── layout.tsx        # Root layout with providers
│   └── page.tsx          # Home page
├── components/
│   ├── background/       # SoftAurora WebGL background
│   ├── gallery/          # Gallery components
│   ├── stories/          # Stories components
│   ├── home/             # Home page components
│   ├── layout/           # Navbar, section layouts
│   ├── providers/        # Theme, Convex providers
│   └── ui/               # shadcn/ui components
├── convex/
│   ├── arts.ts           # Artwork queries/mutations
│   ├── writings.ts       # Writing queries/mutations
│   ├── seed.ts           # Seed data utilities
│   └── schema.ts         # Database schema
├── lib/                  # Utility functions
└── public/               # Static assets
```

## Convex Database Schema

### `artworks`
```typescript
{
  title: string,
  artist: string,
  description: string,
  imageUrl: string,
  type: "illustration" | "drawing" | "animation",
  attribution: string,
  featured?: boolean
}
```

### `writings`
```typescript
{
  title: string,
  author: string,
  content: string,
  type: "poem" | "blog" | "creative_writing",
  attribution: string,
  featured?: boolean
}
```

### `submissions`
```typescript
{
  name: string,
  email: string,
  type: "artwork" | "writing",
  title: string,
  contentOrUrl: string,
  status: "pending"
}
```

## Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format with Prettier
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode

# Dependencies
npm run deps:add     # Add a dependency
npm run deps:remove  # Remove a dependency
npm run deps:update  # Update dependencies
npm run deps:clean   # Clean and reinstall dependencies
```

## Design System

### Theme
- **Dark-only mode** enforced globally
- **SoftAurora WebGL background** for ambient visuals
- **Primary accent:** Gold (`#d4af37`)
- **Background:** Pure black with dark overlays
- **Foreground:** Ivory/cream for readability

### Components
- Use shadcn/ui primitives as base
- Extend with custom components in `components/`
- Keep files under 500 lines
- Co-locate components with their routes

### Styling
- Tailwind utility-first approach
- Extract long class strings into `cn()` helpers
- Use class variance authority (cva) for component states
- Prefer design tokens and CSS variables

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- TypeScript strict mode enabled
- No `any` types — use `unknown` with type guards
- Explicit return types for exported functions
- Validate external inputs with Zod at boundaries
- Keep functions focused and files modular

### Testing
- Add tests for critical business logic
- Prefer deterministic, testable modules
- Ensure tests pass before submitting PRs

## Recommended Contributions

### TODO (Partially Implemented)

These features exist in the codebase but are not fully operational:

- **AI Chat Feature (AFM Companion)**
  - Location: `components/ai/afm-companion.tsx`, `app/api/chat/route.ts`
  - Status: Component and API route exist, but requires `OPENAI_API_KEY` in `.env.local`
  - Needed: Add OpenAI API key to environment variables and update README environment variables section

- **Content Submission Review Workflow**
  - Location: `app/[locale]/submit/page.tsx`, `convex/writings.ts`, `convex/schema.ts`
  - Status: Submission form works and stores to Convex `submissions` table with status "pending"
  - Needed: Admin interface to review, approve, or reject submissions; workflow to move approved submissions to `artworks`/`writings` tables

- **Resources Page Database Integration**
  - Location: `app/[locale]/resources/page.tsx`, `convex/schema.ts`
  - Status: Articles table exists in schema but not populated; page uses hardcoded article array
  - Needed: Connect articles to database, implement article detail pages, replace "coming soon" toasts with actual links

- **Self-Care Toolkit Article Links**
  - Location: `components/resources/self-care-toolkit.tsx`
  - Status: Toolkit exists but article recommendation buttons show "coming soon" toast
  - Needed: Implement article detail pages and link toolkit recommendations to actual articles

### Aspirational (Not Yet Implemented)

These features do not exist in the codebase but would be valuable additions:

- **User Authentication System**
  - Login/signup functionality
  - User profiles and session management
  - Protected routes for admin features

- **Social Features**
  - Persistent likes/favorites for artworks and stories
  - Comments system
  - User profiles with submission history

- **Admin Dashboard**
  - Centralized interface for managing submissions
  - Content moderation tools
  - Analytics and reporting

- **Advanced Search & Filtering**
  - Full-text search across artworks and writings
  - Category/type filters
  - Advanced filtering options

- **Email Notifications**
  - Submission status updates
  - New featured content alerts
  - Newsletter functionality

- **Internationalization (i18n)**
  - English/French support (mentioned in project rules but not implemented)
  - Locale-aware routing
  - Translated content and UI

## License

This project is open-source and available under the MIT License.

## Support

For questions or support, please open an issue on GitHub.
