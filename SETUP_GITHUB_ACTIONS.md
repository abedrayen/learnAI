# Setup GitHub Actions for Automatic Deployment

Follow these steps to enable automatic deployment to GitHub Pages.

## Step-by-Step Setup

### Step 1: Ensure Your Code is Committed

Make sure all your files are committed to git:

```bash
git add .
git commit -m "Add GitHub Actions workflow for automatic deployment"
```

### Step 2: Push to GitHub

Push your code to GitHub (if you haven't already):

```bash
git push origin main
```

Or if your default branch is `master`:
```bash
git push origin master
```

### Step 3: Enable GitHub Pages

1. **Go to your repository on GitHub**
   - Navigate to: `https://github.com/[your-username]/[your-repo-name]`

2. **Open Settings**
   - Click on the **Settings** tab (top menu)

3. **Go to Pages**
   - In the left sidebar, click **Pages**

4. **Configure Source**
   - Under **Source**, you'll see a dropdown
   - **Select "GitHub Actions"** (not "Deploy from a branch")
   - This enables the workflow-based deployment

5. **Save**
   - The page will save automatically

### Step 4: Verify the Workflow

1. **Go to Actions tab**
   - Click on the **Actions** tab in your repository

2. **Check workflow status**
   - You should see "Deploy to GitHub Pages" workflow
   - It may already be running from your push, or you can trigger it manually

3. **Manual trigger (optional)**
   - Click on "Deploy to GitHub Pages"
   - Click "Run workflow" button
   - Select your branch (main or master)
   - Click "Run workflow"

### Step 5: Wait for Deployment

- The workflow will take 1-3 minutes to complete
- You can watch the progress in the Actions tab
- Once complete, you'll see a green checkmark

### Step 6: Access Your Site

Your game will be available at:
- `https://[your-username].github.io/[your-repo-name]/`

**Note:** It may take 1-5 minutes for the site to be accessible after the first deployment.

## How It Works

Once set up, every time you:

1. **Make changes to your code**
2. **Commit and push to GitHub:**
   ```bash
   git add .
   git commit -m "Your changes"
   git push
   ```

3. **GitHub Actions automatically:**
   - Builds your project
   - Deploys to GitHub Pages
   - Updates your live site

**No manual steps needed!** 🎉

## Troubleshooting

### Workflow not running?

1. **Check if GitHub Actions is enabled:**
   - Go to Settings → Actions → General
   - Ensure "Allow all actions and reusable workflows" is selected

2. **Check branch name:**
   - The workflow triggers on `main` or `master` branches
   - Make sure you're pushing to the correct branch

3. **Check workflow file:**
   - Ensure `.github/workflows/deploy.yml` exists in your repository
   - Verify it's committed and pushed

### Deployment fails?

1. **Check the Actions tab:**
   - Click on the failed workflow run
   - Review error messages
   - Common issues:
     - Missing dependencies (check `package.json`)
     - Build errors (test locally with `npm run build`)
     - Permission issues (check repository settings)

2. **Test build locally:**
   ```bash
   npm run build
   ```
   If this fails, fix the errors before pushing

### Site not updating?

1. **Wait a few minutes** - GitHub Pages can take 1-5 minutes to update
2. **Clear browser cache** - Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
3. **Check Actions tab** - Verify the workflow completed successfully
4. **Check Pages settings** - Ensure "GitHub Actions" is selected as source

## Verification Checklist

- [ ] `.github/workflows/deploy.yml` exists in your repository
- [ ] Code is pushed to GitHub
- [ ] GitHub Pages is set to "GitHub Actions" source
- [ ] Workflow appears in Actions tab
- [ ] Workflow completes successfully (green checkmark)
- [ ] Site is accessible at the GitHub Pages URL

## That's It!

Once set up, you'll never need to manually deploy again. Just push your code and GitHub Actions handles the rest! 🚀

