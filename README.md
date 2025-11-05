# 📰 TONews - Your Daily News on Telegram

A clean, minimal news reader built as a Telegram Mini App. Get curated news once per day, no endless scrolling.

## ✨ Features

- 📅 Daily news updates (12:00 UTC)
- 🎯 Curated categories (World, Tech, Business, etc.)
- 🌍 Multi-language support
- 🎨 Dark mode (follows Telegram theme)
- 📱 Mobile-optimized
- 🔒 No tracking, no ads
- 💾 Offline reading with IndexedDB

---

## 🚀 Quick Start (for developers)

### Prerequisites

- **Node.js** (version 18+ LTS) - [Download here](https://nodejs.org)
- **npm** (comes with Node.js)
- **Telegram account** for testing

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production

```bash
npm run build
```

This creates a `build/` folder with static files ready to deploy.

---

## 📲 Deploy as Telegram Mini App

### Step 1: Create a Telegram Bot

1. Open Telegram and search for **@BotFather**
2. Send `/newbot` and follow the instructions
3. Save your **BOT_TOKEN** (looks like `1234567890:ABCdefGHIjklMNO`)

### Step 2: Deploy to Vercel (Recommended)

**Option A: Via Web (No code required)**

1. Create account on [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository (or drag & drop the `TONews` folder)
4. Deploy!
5. Copy the URL (e.g., `https://tonews.vercel.app`)

**Option B: Via CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

**Alternative platforms:**
- **Netlify:** [netlify.com](https://netlify.com) - Similar to Vercel
- **Cloudflare Pages:** [pages.cloudflare.com](https://pages.cloudflare.com) - Fast CDN

### Step 3: Connect to Telegram

1. Go back to **@BotFather** on Telegram
2. Send `/mybots` → Select your bot
3. Click **Menu Button** → **Edit Menu Button**
4. Enter your deploy URL: `https://tonews.vercel.app`
5. Done! Click the button in your bot to test

**Optional: Create a Mini App entry**

For a better experience, create a dedicated Mini App:

1. Send `/newapp` to @BotFather
2. Select your bot
3. Fill in:
   - **Title:** TONews
   - **Description:** Your daily news digest
   - **Photo:** 640x360px image (optional)
   - **Web App URL:** `https://tonews.vercel.app`
   - **Short name:** `tonews` (unique, like a username)

Your Mini App will be available at: `https://t.me/your_bot/tonews`

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file (already exists, just update values):

```bash
# Data source (default: Kagi News public API)
VITE_BASE_PATH=https://kite.kagi.com
VITE_STATIC_PATH=https://kite.kagi.com/static

# Telegram mode
VITE_TELEGRAM_MODE=production

# Bot token (optional, only if you add backend features)
# BOT_TOKEN=your_bot_token_here
```

### Alternative Data Sources

The app currently uses `kite.kagi.com/kite.json` for news data. To use your own source:

**Option 1: NewsAPI**
- Sign up at [newsapi.org](https://newsapi.org)
- Get free API key (100 requests/day)
- Modify `src/lib/services/dataService.ts` to fetch from NewsAPI

**Option 2: RSS Aggregator**
- Use feeds from `kite_feeds.json`
- Build a simple aggregator service (Node.js/Python)
- Host on Fly.io or Render

**Option 3: GNews API**
- Similar to NewsAPI: [gnews.io](https://gnews.io)

---

## 📁 Project Structure

```
TONews/
├── src/
│   ├── routes/              # SvelteKit pages
│   │   ├── +page.svelte     # Main app page
│   │   └── +layout.svelte   # App layout (Telegram SDK init)
│   ├── lib/
│   │   ├── components/      # UI components (Header, StoryList, etc.)
│   │   ├── services/        # Business logic
│   │   │   ├── telegramService.ts  # Telegram WebApp SDK wrapper
│   │   │   └── dataService.ts      # News data fetcher
│   │   ├── stores/          # Svelte stores (state management)
│   │   └── utils/           # Helper functions
│   └── app.html             # HTML template (Telegram SDK loaded here)
├── static/                  # Static assets (images, icons)
├── build/                   # Production build output (after npm run build)
├── package.json             # Dependencies
├── svelte.config.js         # SvelteKit config (static adapter)
├── vite.config.ts           # Vite bundler config
└── .env                     # Environment variables
```

---

## 🛠️ Development

### Available Scripts

```bash
npm run dev       # Start dev server (localhost:5173)
npm run build     # Build for production
npm run preview   # Preview production build locally
npm run check     # Type-check TypeScript
npm run lint      # Lint code with Biome
npm run format    # Format code
```

### Testing Telegram SDK Locally

**Method 1: ngrok (exposes localhost)**

```bash
# Install ngrok
npm install -g ngrok

# Run dev server
npm run dev

# In another terminal, expose port 5173
ngrok http 5173
```

Copy the `https://` URL from ngrok and paste it in @BotFather's Menu Button.

**Method 2: Deploy to staging**

Use Vercel preview deployments:
```bash
vercel  # Creates a preview URL
```

---

## 🔍 Troubleshooting

### Issue: "Telegram WebApp SDK not available"

**Solution:** You're testing in a regular browser. The SDK only works inside Telegram. Deploy first, then test via your bot.

### Issue: CORS errors in console

**Solution:** Normal in development. The production build won't have CORS issues.

### Issue: White screen on load

**Solution:**
1. Open browser DevTools (F12) and check Console for errors
2. Verify `.env` file exists and has correct values
3. Run `npm install` again

### Issue: Build fails

**Solution:**
```bash
# Clean and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 📊 Tech Stack

| Component | Technology |
|-----------|-----------|
| Framework | Svelte 5 + SvelteKit 2 |
| Build Tool | Vite |
| Styling | TailwindCSS 4 |
| Database | IndexedDB (Dexie.js) |
| Icons | Tabler Icons |
| Deployment | Static (Vercel/Netlify/Cloudflare) |
| Telegram | WebApp SDK |

---

## 📝 License

MIT License - Feel free to modify and use for your own projects.

---

## 🆘 Need Help?

### Common Questions

**Q: Can I customize the UI?**
A: Yes! All components are in `src/lib/components/`. Modify colors in `src/styles/index.css`.

**Q: How do I change the data source?**
A: Edit `src/lib/services/dataService.ts` to fetch from your API instead of `kite.kagi.com`.

**Q: Can I add user authentication?**
A: Yes! Use `telegramService.getUserInfo()` to get Telegram user data. No passwords needed.

**Q: How do I update the app icon?**
A: Replace `static/kite-icon.png` with your own (192x192px and 512x512px).

**Q: Is this free to run?**
A: Yes! Vercel/Netlify offer generous free tiers. No backend needed for MVP.

---

## 🚀 Next Steps

After deploying:

1. **Share your bot:** Send friends the link `https://t.me/your_bot`
2. **Monitor usage:** Check Vercel/Netlify analytics
3. **Customize UI:** Tweak colors, fonts, layout in `src/`
4. **Add features:** User preferences, bookmarks, notifications
5. **Switch data source:** Integrate NewsAPI or build your own aggregator

---

Built with ❤️ for Telegram Mini Apps
