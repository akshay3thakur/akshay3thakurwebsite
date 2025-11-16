# Akshay Thakur - Portfolio Website

A clean, modern, interactive one-page portfolio built with Next.js, Tailwind CSS, and Framer Motion.

## Features

- **One-page portfolio** with smooth scroll navigation
- **Quote of the Day** integration with backend API
- **Smile counter** with confetti animation
- **Blog redirect** to WordPress
- **Responsive design** with mobile-first approach
- **Accessibility** features (WCAG AA compliant)
- **Smooth animations** with Framer Motion
- **Right-side progress bar** that changes color per section

## Tech Stack

- **Next.js 14** (Pages Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **canvas-confetti**

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Portfoliowebsite2026
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and set:
```
NEXT_PUBLIC_BACKEND_URL=https://your-backend-domain.com
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

- `NEXT_PUBLIC_BACKEND_URL` - Required. Backend API URL for quote and smile counter endpoints.

## Backend API Endpoints

The portfolio expects the following endpoints:

- `GET {BACKEND_URL}/api/quote` - Returns daily quote
- `GET {BACKEND_URL}/api/smile/count` - Returns current smile count
- `POST {BACKEND_URL}/api/smile/increment` - Increments smile count

## Deployment

### Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Set environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_BACKEND_URL`
4. Deploy

The site will be automatically deployed on every push to the main branch.

## Project Structure

```
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Timeline.tsx
│   ├── ProjectsGrid.tsx
│   ├── SkillsGrid.tsx
│   ├── QuoteCard.tsx
│   ├── SmileButton.tsx
│   ├── ContactCard.tsx
│   ├── Footer.tsx
│   └── ...
├── pages/
│   ├── index.tsx
│   ├── thoughts.tsx
│   └── _app.tsx
├── styles/
│   └── globals.css
└── ...
```

## Design Tokens

- **Neutral Colors**: `#C7C7C7` (light), `#1E1E1E` (dark), `#000000` (black)
- **Accent Colors**: Teal (`#14B8A6`) and Amber (`#F59E0B`)
- **Font**: Inter (Google Fonts)

## Accessibility

- All interactive elements have ARIA labels
- Keyboard navigation support
- WCAG AA color contrast
- Respects `prefers-reduced-motion`

## License

Private - All rights reserved.

