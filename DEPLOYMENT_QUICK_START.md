# Quick Start: Fix Netlify Deployment Updates

## The Problem
Your site isn't updating when you push changes to Netlify with your custom domain.

## The Solution (3 Steps)

### Step 1: Add Environment Variables to Netlify
Your site needs API keys to work. These are currently only in your local `.env` file.

1. Go to: https://app.netlify.com
2. Select your site
3. Go to: **Site settings** → **Environment variables**
4. Add ALL variables from `NETLIFY_SETUP.md` (8 total variables)

**Critical**: All variables must start with `VITE_` (except RAPIDAPI_KEY_PRYCD_PRICING)

### Step 2: Commit and Push These Files
The new configuration files will fix your deployment:

```bash
git add netlify.toml .npmrc NETLIFY_SETUP.md DEPLOYMENT_QUICK_START.md
git commit -m "Add Netlify configuration for custom domain"
git push
```

### Step 3: Wait and Clear Cache
1. Watch the deploy in Netlify dashboard (takes 1-3 minutes)
2. Once complete, hard refresh your browser:
   - Windows/Linux: `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`

---

## What Was Fixed

### 1. **netlify.toml** - New File
- Tells Netlify how to build your site
- Sets proper cache headers (prevents stale content)
- Configures redirects for React Router

### 2. **.npmrc** - Fixed
- **Before**: Pointed to localhost registry (causes build failures)
- **After**: Uses npm's official registry

### 3. **Cache Control**
- HTML files: Never cached (updates appear immediately)
- JS/CSS/Images: Cached but with fingerprinting (automatic cache busting)

---

## Checking If It Worked

After pushing and the build completes:

1. ✅ Netlify shows "Published" with green checkmark
2. ✅ Visit your site in incognito mode - changes appear
3. ✅ Browser console has no errors
4. ✅ Future pushes update the site within 1-3 minutes

---

## Still Not Working?

### Check Deploy Logs
1. Netlify dashboard → Your site → Deploys
2. Click latest deploy
3. Look for error messages
4. Common issues:
   - Missing environment variables
   - Build command failed
   - Node version mismatch

### Clear Netlify CDN Cache
1. Site settings → Build & deploy → Post processing
2. Click "Clear cache and retry deploy"
3. Wait for rebuild to complete

### Verify Environment Variables
1. Site settings → Environment variables
2. Should see 8 variables total
3. All should be for "All scopes" (Production, Deploy Previews, Branch deploys)

---

## Making Future Changes

1. Edit your code locally
2. Test with `npm run dev`
3. Commit changes: `git commit -am "Your message"`
4. Push: `git push`
5. Netlify auto-deploys in 1-3 minutes
6. Hard refresh browser to see changes

**No manual steps needed after initial setup!**

---

## Understanding the Files

- **netlify.toml**: Netlify's configuration file (like package.json but for deployments)
- **.npmrc**: npm configuration (tells it where to get packages)
- **NETLIFY_SETUP.md**: Detailed setup instructions with all environment variables
- **DEPLOYMENT_QUICK_START.md**: This file - quick reference guide
