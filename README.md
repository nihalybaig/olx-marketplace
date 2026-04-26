# OLX-Style Marketplace

A mobile-first classifieds marketplace app built with React, inspired by OLX.

## Features

- 🏠 **Home Feed** — Browse listings with category filters and search
- ✨ **Featured Listings** — Highlighted premium ads in a horizontal scroll
- 📋 **Listing Details** — Full item view with seller info, Chat/Call CTAs
- ➕ **Post Ad** — Sell form with category, condition, pricing, and photo upload
- 💬 **Chats** — Messaging placeholder
- 👤 **Account** — Profile and settings
- 📱 **Mobile-First** — Optimized for 480px viewport with bottom tab navigation

## Tech Stack

- React 18 + Hooks
- Inline styles (zero dependencies)
- Google Fonts (DM Sans + Playfair Display)

## Design

- Light theme with OLX-inspired `#002f34` dark teal brand color
- `#ffce32` gold for featured badges
- `#23e5db` mint accent
- Mobile-optimized bottom navigation with floating Sell button

## Getting Started

This is a single-file React component (`src/App.jsx`). Drop it into any React project:

```bash
npx create-react-app marketplace
cp src/App.jsx marketplace/src/App.jsx
cd marketplace && npm start
```

## License

MIT
