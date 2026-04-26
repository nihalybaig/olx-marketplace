# Retrend — Full-featured Marketplace Platform

A mobile-first classifieds marketplace built with React, inspired by OLX. Users can buy, sell, and explore categories like vehicles, jobs, properties, electronics, services, and more.

## Project Overview

Full-featured marketplace with **User Panel** and **Admin Panel** (planned) with dynamic functionalities similar to OLX.

## Key Features

- **User Registration & Login** — JWT-based Authentication & Authorization
- **User Profile Management** — View/edit profile, posted ads, wishlist, settings
- **Product Listing (Sell Items)** — Multi-step form with category, brand, year, condition, photos, location
- **Category-Based Browsing** — Cars, Bikes, Properties, Jobs, Mobiles, Electronics, Commercial Vehicles, Furniture, Fashion, Pets, Books & Sports, Services
- **Wishlist** — Save favorite ads with persistent state
- **Add to Cart** — Optional cart feature with total calculation
- **Chat System** — Real-time buyer/seller messaging with chat history
- **Search & Filters** — Sort by price/recency, filter by price range
- **Image Upload** — Multiple images per listing (up to 12)
- **Location-Based Listings** — City + area-level location tagging

## User Panel Pages

| Page | Description |
|------|-------------|
| Home | Categories grid, featured carousel, search, recommendations |
| Login / Signup | Tabbed auth with email/password, JWT tokens |
| Profile | User details, stats, wishlist/cart links, settings |
| Category Listing | Filtered view per category with sort & price filters |
| Product Listing | 2-column grid with wishlist toggle, image count |
| Product Details | Full info, description, seller card, Chat/Cart/Call CTAs |
| Post Ad | 3-step wizard: Basic Info → Details & Photos → Review |
| Wishlist | Saved favorite ads grid |
| Cart | Items list with remove and total |
| Chat | Conversation list + real-time messaging UI |

## Technology Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18 / JavaScript |
| Backend | Node.js / Express (planned) |
| Database | MySQL (planned) |
| Authentication | JWT (planned) |
| Styling | Inline React styles, Google Fonts (Outfit + Nunito Sans) |

## Security Features

- Password Encryption (bcrypt, planned)
- Token-based Authentication (JWT, planned)
- Input Validation
- Secure APIs

## Categories

Cars, Bikes, Properties (Rent/Sale), Jobs, Mobiles, Electronics & Appliances, Commercial Vehicles, Furniture, Fashion, Pets, Books/Sports/Hobbies, Services

## Product Listing Workflow

1. User selects category
2. Fills details (brand, year, description)
3. Uploads images (up to 12 photos)
4. Sets price and condition
5. Confirms location
6. Reviews and submits listing

## Getting Started

```bash
# Clone the repo
git clone https://github.com/nihalybaig/olx-marketplace.git

# Drop src/App.jsx into any React 18 project
npx create-react-app retrend
cp src/App.jsx retrend/src/App.jsx
cd retrend && npm start
```

## License

MIT
