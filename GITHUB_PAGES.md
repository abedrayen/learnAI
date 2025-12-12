# GitHub Pages Deployment Guide

This guide explains how to deploy your AI Explorer game to GitHub Pages.

## Option 1: Using npm Scripts (Recommended for Quick Deployments)

### Prerequisites

1. Make sure you have a GitHub repository set up
2. Install dependencies:
   ```bash
   npm install
   ```

### Deploy Steps

1. **Build and deploy in one command:**
   ```bash
   npm run deploy
   ```

   This will:
   - Build your project
   - Deploy the `dist` folder to the `gh-pages` branch
   - Make your site available at `https://[username].github.io/[repository-name]`

2. **Or deploy with verification:**
   ```bash
   npm run deploy:verify
   ```

### First Time Setup

1. **Initialize git repository** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/[username]/[repository-name].git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under **Source**, select **Deploy from a branch**
   - Select **gh-pages** branch and **/ (root)** folder
   - Click **Save**

3. **Deploy:**
   ```bash
   npm run deploy
   ```

Your site will be available at: `https://[username].github.io/[repository-name]`

## Option 2: Using GitHub Actions (Recommended for Automatic Deployments)

GitHub Actions will automatically deploy your site whenever you push to the main branch.

### Setup

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Add GitHub Actions workflow"
   git push
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - The workflow file (`.github/workflows/deploy.yml`) is already configured

3. **That's it!** Every time you push to `main` or `master`, GitHub Actions will:
   - Build your project
   - Deploy to GitHub Pages automatically

### Manual Deployment via Actions

You can also trigger deployment manually:
- Go to **Actions** tab in your repository
- Select **Deploy to GitHub Pages** workflow
- Click **Run workflow**

## Troubleshooting

### Site shows old content

1. **Clear browser cache** (Ctrl+Shift+R / Cmd+Shift+R)
2. **Wait a few minutes** - GitHub Pages can take 1-5 minutes to update
3. **Check the Actions tab** to see if deployment completed successfully

### 404 errors

1. **Verify GitHub Pages is enabled:**
   - Settings → Pages
   - Should show "Your site is published at..."

2. **Check the branch:**
   - If using npm scripts: Make sure `gh-pages` branch exists
   - If using Actions: Check that workflow completed successfully

3. **Verify base path:**
   - If your repo is `username/repo-name`, the URL should be:
     `https://username.github.io/repo-name/`
   - If it's a user/organization page (`username.github.io`), the URL is:
     `https://username.github.io/`

### Build fails

1. **Check Actions logs:**
   - Go to **Actions** tab
   - Click on the failed workflow
   - Review error messages

2. **Test build locally:**
   ```bash
   npm run build
   ```

3. **Check for TypeScript errors:**
   ```bash
   npm run build:check
   ```

## Base Path Configuration

The current configuration uses `base: './'` which works for:
- User/organization pages (`username.github.io`)
- Repository pages at root

If your repository name doesn't match your username and you're deploying to `https://username.github.io/repo-name/`, you may need to update the base path:

1. Edit `vite.config.ts`
2. Change `base: './'` to `base: '/repo-name/'` (replace `repo-name` with your actual repository name)
3. Rebuild and redeploy

## Custom Domain (Optional)

If you want to use a custom domain:

1. Add a `CNAME` file to your `dist` folder with your domain
2. Configure DNS settings as per GitHub Pages documentation
3. Update the workflow to include the CNAME file

## Repository Structure

After deployment, your repository will have:
- `main` branch: Your source code
- `gh-pages` branch: Built files (if using npm scripts)
- `.github/workflows/`: GitHub Actions workflow (if using Actions)

## Notes

- **GitHub Pages is free** for public repositories
- **Builds are automatic** with GitHub Actions
- **Updates can take 1-5 minutes** to propagate
- **HTTPS is enabled by default**

