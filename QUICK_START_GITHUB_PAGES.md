# Quick Start: Deploy to GitHub Pages

## 🚀 Fastest Way (3 Steps)

### Step 1: Push your code to GitHub
```bash
git add .
git commit -m "Ready for GitHub Pages"
git push
```

### Step 2: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Save

### Step 3: Deploy
The GitHub Actions workflow will automatically deploy when you push. Or deploy manually:
```bash
npm run deploy
```

## 📍 Your Site URL

Your game will be available at:
- **Repository page**: `https://[username].github.io/[repository-name]/`
- **User/Org page**: `https://[username].github.io/` (if repo name matches username)

## ⚡ Manual Deployment (Alternative)

If you prefer manual deployment without Actions:

```bash
npm run deploy
```

Then in GitHub Settings → Pages, select **Deploy from a branch** → **gh-pages** → **/ (root)**

## ✅ Verify Deployment

1. Wait 1-5 minutes for GitHub Pages to update
2. Visit your site URL
3. Clear browser cache if you see old content (Ctrl+Shift+R)

That's it! 🎉

