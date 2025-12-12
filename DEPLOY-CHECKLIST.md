# Quick Deployment Checklist

## Before Deploying

- [ ] All code changes are saved
- [ ] Run `npm run build` to create fresh build
- [ ] Run `npm run build:verify` to verify build (optional)
- [ ] Check that `dist/` folder contains:
  - [ ] `index.html`
  - [ ] `assets/` folder with JavaScript file(s)

## Deployment Steps

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Upload the ENTIRE `dist/` folder contents** to your hosting service:
   - Upload `index.html` to the root
   - Upload the entire `assets/` folder

3. **After deployment:**
   - Clear browser cache (Ctrl+Shift+R / Cmd+Shift+R)
   - Test in incognito/private window
   - Check browser console (F12) for errors

## Common Issues

### "I see a different game/platform"
- **Solution:** You're likely seeing cached files. Clear browser cache and rebuild:
  ```bash
  npm run clean
  npm run build
  ```
  Then re-upload the `dist/` folder.

### "Blank page"
- Check browser console for errors
- Verify `assets/` folder is uploaded
- Check that `index.html` is in the root directory
- Ensure server allows JavaScript module loading

### "404 errors"
- Make sure you uploaded the `assets/` folder
- Check that file paths in `index.html` match actual files
- Verify server configuration allows serving `.js` files

## File Structure to Deploy

```
Your Server Root/
├── index.html          ← Upload this
└── assets/             ← Upload this entire folder
    └── index-*.js      ← JavaScript bundle (auto-generated name)
```

**Important:** Upload the contents of `dist/`, not the `dist` folder itself!

