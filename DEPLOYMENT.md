# Deployment Guide

## Building for Production

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Build the project**:
   ```bash
   npm run build
   ```

   This will create a `dist` folder with all the production-ready files.

## Deploying

### Important: Deploy the `dist` folder, not the root folder!

The `dist` folder contains:
- `index.html` - The main HTML file (already has correct script references)
- `assets/` - All JavaScript and other assets

### Deployment Options

#### Option 1: Static Hosting (GitHub Pages, Netlify, Vercel, etc.)

1. Upload the **entire contents** of the `dist` folder to your hosting service
2. Make sure `index.html` is in the root of your deployment
3. The base path is set to `./` so it should work in subdirectories too

#### Option 2: Traditional Web Server

1. Copy all files from `dist` folder to your web server's public directory
2. Ensure your server serves `index.html` for all routes (for SPA routing)
3. Configure MIME types if needed:
   - `.js` files should be served as `application/javascript`
   - `.html` files should be served as `text/html`

#### Option 3: Local Testing

After building, you can test the production build locally:
```bash
npm run preview
```

This will start a local server with the built files.

## Troubleshooting

### If you see a blank/static page:

1. **Check the browser console** (F12) for any errors
2. **Verify you're deploying the `dist` folder**, not the source files
3. **Check that `index.html` references the correct asset paths** (should be `./assets/...`)
4. **Ensure all files in `dist` are uploaded**, including the `assets` folder
5. **Check server configuration** - some servers need special configuration for SPAs

### Common Issues:

- **404 errors on assets**: Make sure the `assets` folder is deployed alongside `index.html`
- **CORS errors**: Ensure your server allows loading of JavaScript modules
- **Blank screen**: Check browser console for JavaScript errors

## File Structure After Build

```
dist/
├── index.html          (Main HTML file - deploy this)
└── assets/
    └── index-*.js      (Bundled JavaScript - auto-generated name)
```

Make sure to deploy **both** the `index.html` and the `assets` folder!

