# Deployment Guide

## Pre-Deployment Checklist

- [ ] Set `NEXT_PUBLIC_BACKEND_URL` environment variable
- [ ] Verify backend API endpoints are accessible
- [ ] Test all interactive features locally
- [ ] Run `npm run build` successfully
- [ ] Check Lighthouse scores

## Vercel Deployment

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial portfolio setup"
git remote add origin <your-repo-url>
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

### Step 3: Set Environment Variables

In Vercel project settings → Environment Variables, add:

```
NEXT_PUBLIC_BACKEND_URL=https://your-backend-domain.com
```

**Important**: 
- Use the production backend URL
- No trailing slash
- Include `https://` protocol

### Step 4: Deploy

Click "Deploy" and wait for the build to complete.

## Backend Requirements

Ensure your FastAPI backend has these endpoints:

- `GET /api/quote` - Returns `{ "quote": "...", "author": "...", "category": "..." }`
- `GET /api/smile/count` - Returns `{ "count": N }`
- `POST /api/smile/increment` - Returns `{ "count": N, "message": "..." }`

Backend must have CORS configured to allow requests from your Vercel domain.

## Testing After Deployment

1. **Navigation**: Test all anchor links work
2. **Quote of the Day**: Verify quote loads or shows fallback
3. **Smile Counter**: 
   - Check initial count loads
   - Test increment functionality
   - Verify confetti shows (if motion not reduced)
   - Confirm session storage prevents duplicate increments
4. **Contact**: Test mailto link and toast notification
5. **Blog Redirect**: Verify "Thoughts" links open WordPress in new tab
6. **Responsive**: Test on mobile, tablet, desktop
7. **Accessibility**: Test keyboard navigation
8. **Progress Bar**: Verify color changes per section

## Troubleshooting

### Quote not loading
- Check `NEXT_PUBLIC_BACKEND_URL` is set correctly
- Verify backend `/api/quote` endpoint is accessible
- Check browser console for CORS errors
- Fallback quote should appear after 3s timeout

### Smile counter not working
- Verify backend endpoints are accessible
- Check CORS configuration on backend
- Verify `NEXT_PUBLIC_BACKEND_URL` is set
- Check browser console for errors

### Images not loading
- Verify Cloudinary URLs are correct
- Check Next.js image domain configuration in `next.config.js`

### Build errors
- Run `npm install` to ensure all dependencies are installed
- Check TypeScript errors: `npm run build`
- Verify all imports are correct

## Performance Optimization

After deployment, run Lighthouse audit:

```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit
lighthouse https://your-vercel-url.vercel.app
```

Target scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 90+

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_BACKEND_URL` | Yes | Backend API base URL (no trailing slash) |

## Support

For issues or questions, check:
- Next.js documentation: https://nextjs.org/docs
- Vercel documentation: https://vercel.com/docs

