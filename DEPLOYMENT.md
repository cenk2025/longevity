# Deployment Guide for Longevity IQ

## Prerequisites

1. ✅ GitHub repository: https://github.com/cenk2025/longevity.git
2. ✅ Supabase project configured
3. ✅ DeepSeek API key configured

## Step 1: Set Up Supabase Database

1. Go to your Supabase project: https://hqyzvyiqnsxhqzbihrxo.supabase.co
2. Navigate to **SQL Editor**
3. Copy the contents of `supabase-schema.sql`
4. Paste and run the SQL query
5. Verify tables are created:
   - `user_profiles`
   - `test_results`

## Step 2: Enable GitHub Pages

1. Go to your GitHub repository: https://github.com/cenk2025/longevity
2. Click on **Settings**
3. Navigate to **Pages** (left sidebar)
4. Under **Build and deployment**:
   - Source: **GitHub Actions**
5. The workflow will automatically deploy on push to main

## Step 3: Verify Deployment

After pushing to main, GitHub Actions will:
1. Build the project
2. Deploy to GitHub Pages
3. Your site will be available at: **https://cenk2025.github.io/longevity/**

## Step 4: Test the Application

1. Visit the deployed URL
2. Test user registration
3. Complete a longevity test
4. Check dashboard functionality
5. Test the AI chatbot

## Optional: Custom Domain

To use a custom domain:

1. Go to GitHub repository **Settings** → **Pages**
2. Under **Custom domain**, enter your domain
3. Add DNS records at your domain provider:
   ```
   Type: CNAME
   Name: www (or @)
   Value: cenk2025.github.io
   ```
4. Wait for DNS propagation (up to 24 hours)
5. Enable **Enforce HTTPS**

## Alternative: Deploy to Vercel

For better performance and features:

1. Go to [Vercel](https://vercel.com)
2. Click **Import Project**
3. Connect your GitHub repository
4. Configure:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Click **Deploy**

Your site will be live at: `https://longevity-iq.vercel.app`

## Environment Variables (Production)

For better security, move API keys to environment variables:

### In Vercel:
1. Go to Project Settings → Environment Variables
2. Add:
   ```
   VITE_SUPABASE_URL=https://hqyzvyiqnsxhqzbihrxo.supabase.co
   VITE_SUPABASE_ANON_KEY=your_key_here
   VITE_DEEPSEEK_API_KEY=sk-5fba3c36074349d3a2715d6e5860cd89
   ```

### Update Code:
Replace hardcoded values in `src/utils/supabase.js` and `src/js/chatbot.js`:
```javascript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;
```

## Monitoring & Analytics

### Add Google Analytics (Optional):

1. Get your GA4 Measurement ID
2. Add to `index.html` before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## Troubleshooting

### Build Fails
- Check Node.js version (should be 18+)
- Run `npm install` to ensure all dependencies are installed
- Check for syntax errors in JavaScript files

### Database Connection Issues
- Verify Supabase URL and anon key
- Check RLS policies are enabled
- Ensure tables are created correctly

### Chatbot Not Working
- Verify DeepSeek API key is valid
- Check browser console for errors
- Ensure CORS is properly configured

## Maintenance

### Regular Updates:
1. Update dependencies: `npm update`
2. Check for security vulnerabilities: `npm audit`
3. Monitor Supabase usage and quotas
4. Review DeepSeek API usage

### Backup:
- Supabase automatically backs up your database
- Export user data regularly from Supabase dashboard
- Keep a local copy of the codebase

## Support

For issues or questions:
- Check GitHub Issues
- Review Supabase documentation
- Contact support

---

🎉 **Congratulations!** Your Longevity IQ platform is now live!
