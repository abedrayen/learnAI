# Fix: Deployed Game Shows Different Content

If your deployed game shows different content than your local dev environment, follow these steps:

## Quick Fix Steps

### Step 1: Force a Fresh Build and Deploy

1. **Clean everything locally:**
   ```bash
   npm run clean
   rm -rf node_modules/.vite
   ```

2. **Rebuild:**
   ```bash
   npm run build
   ```

3. **Verify the build locally:**
   ```bash
   npm run preview
   ```
   - Open `http://localhost:4173`
   - Verify you see the correct game (AI Explorer menu, not just jungle)

4. **If preview shows correct game, force GitHub Actions to rebuild:**
   - Go to GitHub → Actions tab
   - Click "Deploy to GitHub Pages"
   - Click "Run workflow" → "Run workflow" button
   - This forces a fresh build

### Step 2: Clear Browser Cache

**Important:** The browser might be caching old JavaScript files!

1. **Hard refresh:**
   - Windows/Linux: `Ctrl + Shift + R` or `Ctrl + F5`
   - Mac: `Cmd + Shift + R`

2. **Or test in incognito/private window:**
   - This bypasses all cache
   - If it works in incognito, it's a cache issue

3. **Clear browser cache completely:**
   - Chrome: Settings → Privacy → Clear browsing data → Cached images and files
   - Firefox: Settings → Privacy → Clear Data → Cached Web Content

### Step 3: Verify GitHub Actions Build

1. **Check Actions tab:**
   - Go to your repository → Actions
   - Click on the latest workflow run
   - Check the "Build" step logs
   - Verify it says "✓ built in X.XXs"

2. **Check deployment:**
   - Look for "Deploy to GitHub Pages" step
   - Should show "Success" with green checkmark

### Step 4: Verify What's Actually Deployed

1. **Check the built JavaScript file:**
   - In Actions, click on the workflow run
   - Click "build-and-deploy" job
   - Expand "Upload artifact" step
   - You can download the artifact to verify

2. **Or check the deployed files:**
   - Your GitHub Pages URL should show the game
   - Open browser DevTools (F12)
   - Go to Network tab
   - Refresh the page
   - Check the JavaScript file being loaded
   - Look at the file size - should be ~1.5MB

## Common Causes

### 1. Browser Cache
**Most common issue!** Browsers aggressively cache JavaScript files.

**Solution:** Hard refresh or incognito mode

### 2. Old GitHub Pages Deployment
GitHub Pages might be serving an old build.

**Solution:** 
- Trigger a new workflow run manually
- Wait 2-5 minutes for it to complete
- Clear browser cache

### 3. Build Not Including Latest Code
The build might not include your latest changes.

**Solution:**
- Verify all changes are committed and pushed
- Check that GitHub Actions is building from the latest commit
- Look at the "Checkout" step in Actions to see which commit it's using

### 4. Different Entry Point
Something might be pointing to a different game file.

**Solution:**
- Verify `src/main.ts` is correct
- Check that all scenes are imported
- Ensure `index.html` references the correct script

## Verification Checklist

- [ ] Local `npm run preview` shows correct game
- [ ] All code changes are committed and pushed
- [ ] GitHub Actions workflow completed successfully
- [ ] Browser cache cleared (tested in incognito)
- [ ] Waited 2-5 minutes after deployment
- [ ] Checked browser console for errors (F12)

## Still Not Working?

1. **Check browser console:**
   - Press F12
   - Look for JavaScript errors
   - Check Network tab for failed requests

2. **Verify the JavaScript file:**
   - In browser DevTools → Network tab
   - Find the `index-*.js` file
   - Check its size (should be ~1.5MB)
   - Check the response - does it contain your game code?

3. **Compare local vs deployed:**
   - Run `npm run preview` locally
   - Compare with deployed version
   - Are they different?

4. **Check GitHub Pages settings:**
   - Settings → Pages
   - Verify source is "GitHub Actions"
   - Check the URL shown

## Force Complete Rebuild

If nothing works, force a complete rebuild:

```bash
# Clean everything
npm run clean
rm -rf node_modules
rm -rf dist

# Reinstall
npm install

# Rebuild
npm run build

# Verify locally
npm run preview

# Commit and push
git add .
git commit -m "Force fresh build"
git push
```

Then trigger GitHub Actions manually to rebuild and redeploy.

