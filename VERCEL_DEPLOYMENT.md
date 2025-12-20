# Vercel Deployment Guide

## Custom Domain
**Production URL:** https://longevity.voon.fi

## Prerequisites
- Vercel account (https://vercel.com)
- GitHub repository connected
- Access to voon.fi DNS settings

## Step 1: Install Vercel CLI (Optional)
```bash
npm install -g vercel
```

## Step 2: Deploy via Vercel Dashboard

### Option A: Import from GitHub (Recommended)

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub repository: `cenk2025/longevity`
4. Configure project:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install --legacy-peer-deps`

5. Add Environment Variables:
   - `VITE_SUPABASE_URL` = `https://hqyzvyiqnsxhqzbihrxo.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxeXp2eWlxbnN4aHF6YmlocnhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxNTI2MDIsImV4cCI6MjA4MTcyODYwMn0.CBNeoo04APxQC0ZiJ7U3XX35nv2vGw7HkZNCVD0jLdU`
   - `VITE_DEEPSEEK_API_KEY` = `sk-5fba3c36074349d3a2715d6e5860cd89`

6. Click "Deploy"

### Option B: Deploy via CLI

```bash
# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? longevity-iq
# - Directory? ./
# - Override settings? No

# Add environment variables
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
vercel env add VITE_DEEPSEEK_API_KEY

# Deploy to production
vercel --prod
```

## Step 3: Configure Custom Domain

1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain (e.g., `longevity.voon.fi`)
4. Follow DNS configuration instructions:
   - **A Record:** Point to Vercel's IP
   - **CNAME:** Point to `cname.vercel-dns.com`

## Step 4: Update Supabase Settings

After deploying, update Supabase redirect URLs:

1. Go to Supabase Dashboard → Authentication → URL Configuration
2. Add your Vercel domain to:
   - **Site URL:** `https://your-domain.com`
   - **Redirect URLs:**
     - `https://your-domain.com/confirm-email.html`
     - `https://your-domain.vercel.app/confirm-email.html` (Vercel subdomain)

## Step 5: Test Deployment

Visit your deployed site and test:
- ✅ Homepage loads
- ✅ Authentication works
- ✅ Chatbot responds (DeepSeek API)
- ✅ Cookie consent appears
- ✅ Legal pages load
- ✅ Company pages load

## Automatic Deployments

Vercel automatically deploys:
- **Production:** Every push to `main` branch
- **Preview:** Every pull request

## Environment Variables

All environment variables are automatically injected during build:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_DEEPSEEK_API_KEY`

## Performance Optimizations

Vercel automatically provides:
- ✅ Global CDN
- ✅ Edge caching
- ✅ Automatic HTTPS
- ✅ Brotli compression
- ✅ Image optimization
- ✅ Serverless functions (if needed)

## Monitoring

View deployment logs and analytics:
- **Deployments:** https://vercel.com/dashboard
- **Analytics:** Enable in project settings
- **Logs:** Real-time function logs

## Troubleshooting

### Build fails
- Check environment variables are set
- Verify `npm install --legacy-peer-deps` works locally
- Check build logs in Vercel dashboard

### 404 errors
- Ensure `vercel.json` rewrites are configured
- Check base path in `vite.config.js` is `/`

### API not working
- Verify environment variables are set in Vercel
- Check browser console for errors
- Test API keys locally first

## Custom Domain SSL

Vercel automatically provides SSL certificates:
- Free SSL via Let's Encrypt
- Auto-renewal
- HTTPS redirect enabled by default

## Rollback

To rollback to a previous deployment:
1. Go to Deployments tab
2. Find the working deployment
3. Click "..." → "Promote to Production"

---

**Need help?** Contact Vercel support or check docs: https://vercel.com/docs
