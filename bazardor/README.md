# 🛒 বাজার দর (BazarDor)

বাজার দর হলো একটি বাংলা ভাষার ওয়েব অ্যাপ, যেখানে চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ ও মসলার **আজকের বাজারদর** এক নজরে দেখা যায়। প্রতিটি পণ্যের দাম বাড়ল না কমল, কোন বাজারে সবচেয়ে কম বা বেশি — সব এক জায়গায়।

*BazarDor is a Bangla grocery price tracker built for Assignment 07. It shows today's prices, price changes, and market-by-market comparison for everyday items.*

## ✨ Key Features

1. **Live price ticker** – an infinite scrolling strip under the navbar showing every product's price and ▲/▼ change.
2. **Today's biggest movers** – top 6 products whose prices rose and top 6 whose prices fell.
3. **All products + category pages** – responsive card grid (1 → 2 → 3 columns), with a **numeric sort** (low → high / high → low) that works with Bangla digits.
4. **Protected product details** – min / max / average price and a table of 12 markets (login required).
5. **Authentication with BetterAuth** – email + password, Google and GitHub login, toast messages, skeleton loaders.
6. **Update profile** – change your name from the My Profile → আপডেট page.
7. **Friendly 404** – wrong category or product links show a Bangla 404 with a "হোম পেজে ফিরে যান" button.
8. **Fully responsive** – mobile, tablet and desktop.

## 🧰 Technologies Used

| Purpose | Tool |
| --- | --- |
| Framework | Next.js (App Router) + React |
| Styling | Tailwind CSS (colors & font from the Penpot design) |
| Language | JavaScript |
| Authentication | BetterAuth + MongoDB |
| Notifications | react-hot-toast |
| Font | Hind Siliguri |
| Data | BazarDor REST API (`/products`, `/categories`) |

## 🚀 Run it locally

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

Open http://localhost:3000

### Environment variables

| Name | What it is |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string (Atlas free tier works) |
| `MONGODB_DB` | Database name (default `bazardor`) |
| `BETTER_AUTH_SECRET` | Any long random string |
| `BETTER_AUTH_URL` | Your site URL (`http://localhost:3000` locally, your Vercel URL when deployed) |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | From Google Cloud Console |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | From GitHub → Settings → Developer settings → OAuth Apps |

**OAuth callback URLs** (add these in the Google / GitHub app settings):

- `http://localhost:3000/api/auth/callback/google`
- `http://localhost:3000/api/auth/callback/github`
- the same two paths on your deployed domain

## 📁 Folder structure

```
src/
  app/            pages (home, category/[slug], product/[slug], signin, signup, profile)
  components/     Navbar, Ticker, Hero, ProductCard, forms, skeletons ...
  lib/            auth.js (server), auth-client.js, bn.js (Bangla helpers), hooks.js
public/           bazar-hero.png, logo-icon.png
```

## ☁️ Deploy on Vercel

Import the GitHub repo, add the environment variables above, and deploy. Dynamic pages like `/product/[slug]` work on refresh because they are normal Next.js routes.

https://bazardor-phi-lovat.vercel.app/
