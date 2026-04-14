This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Project Overview

This app is a product catalog demo with a shopping cart powered by Redux and client-side toast notifications. It fetches product data from DummyJSON and uses `next/image` for optimized remote images.

## Tech Stack

- **Next.js** with the App Router
- **React** for UI
- **Redux Toolkit** for state management
- **Tailwind CSS** for styling
- **TypeScript** for type safety
- **PostCSS** for CSS processing
- **`next/image`** for optimized image loading
- **DummyJSON API** for product data
- **Client-side toast notifications**

## Project Structure

- `app/layout.tsx`
  - Root layout for the app.
  - Applies global fonts and wraps the page with providers.

- `app/globals.css`
  - Global Tailwind and CSS styles.

- `app/providers.tsx`
  - Client providers for Redux store and toast notifications.

- `app/page.tsx`
  - Homepage that fetches the product list.
  - Displays product cards with `next/image`.

- `app/products/[productId]/page.tsx`
  - Dynamic product detail page.
  - Fetches product metadata and renders product details.

- `app/components/SiteHeader.tsx`
  - Header component showing navigation and cart quantity.

- `app/components/ToastProvider.tsx`
  - Client-side toast notification system with `lucide-react` icons.

- `app/components/AddToCartButton.tsx`
  - Button component that dispatches cart actions.

- `app/hooks/useCart.ts`
  - Custom hook for cart state and actions.

- `app/store/store.ts`
  - Redux store setup with localStorage persistence.

- `app/store/cartSlice.ts`
  - Cart reducer and add-item logic.

- `app/lib/api.ts`
  - API helper functions for fetching products.

- `next.config.ts`
  - Next.js configuration, including remote image hosts.

- `postcss.config.mjs`
  - PostCSS setup for Tailwind CSS.

- `tailwind.config.js`
  - Tailwind content configuration.

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- Browse the homepage to see the product catalog.
- Click a product card to view product details on `/products/[productId]`.
- Add products to the cart using the Add to Cart button.
- The cart item count is shown in the header and persists using `localStorage`.
- Toast notifications appear for success or error events.

## Build and Production

Build the app for production:

```bash
npm run build
```

Start the production server after building:

```bash
npm start
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Redux](https://react-redux.js.org/)

## Deploy on Vercel

The easiest way to deploy this app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
