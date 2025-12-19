# Longevity IQ

A premium, science-informed platform for longevity assessments, lifestyle insights, and long-term health tracking.

## 🌟 Features

- **Longevity Assessments**: 6 comprehensive tests covering biological age, sleep quality, stress balance, metabolic health, and more
- **Personal Dashboard**: Track your progress over time with beautiful visualizations
- **AI Chatbot**: Get answers to longevity questions powered by DeepSeek AI
- **Supplements Guide**: Evidence-based information on longevity supplements
- **Science & Guides**: Educational content on NAD+, autophagy, VO₂ max, and more
- **Bilingual Support**: Full English and Finnish translations
- **Secure Authentication**: User accounts with Supabase
- **Data Privacy**: Bank-level encryption and complete data ownership

## 🚀 Tech Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Build Tool**: Vite
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **AI**: DeepSeek API
- **Hosting**: GitHub Pages / Vercel

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/cenk2025/longevity.git
cd longevity
```

2. Install dependencies:
```bash
npm install
```

3. Set up Supabase:
   - Go to your Supabase project dashboard
   - Navigate to SQL Editor
   - Run the SQL from `supabase-schema.sql`

4. Run development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

## 🗄️ Database Setup

The database schema is provided in `supabase-schema.sql`. It includes:

- **user_profiles**: Store user demographic information
- **test_results**: Store all longevity test results
- Row Level Security (RLS) policies for data privacy
- Automatic timestamp updates

To set up:
1. Open your Supabase project
2. Go to SQL Editor
3. Copy and paste the contents of `supabase-schema.sql`
4. Run the query

## 🔐 Environment Variables

The application uses the following Supabase configuration:
- **URL**: https://hqyzvyiqnsxhqzbihrxo.supabase.co
- **Anon Key**: (included in code for demo purposes)

For production, move these to environment variables.

## 🎨 Design Philosophy

Longevity IQ features a dark, elegant aesthetic with:
- Deep black and graphite backgrounds
- Aurora-like gradients (teal, cyan, violet)
- Modern Inter font family
- Smooth animations and transitions
- Premium, trustworthy feel

## 📱 Responsive Design

Fully responsive across all devices:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🧪 Available Tests

1. **Longevity Score** - Overall lifestyle balance
2. **Biological Age Estimate** - Non-clinical age assessment
3. **Sleep Quality & Recovery** - Sleep pattern analysis
4. **Stress & Recovery Balance** - Stress management evaluation
5. **Metabolic & Activity Habits** - Physical activity assessment
6. **Strength & Mobility Habits** - Strength and flexibility evaluation

## 🤖 AI Chatbot

The integrated chatbot uses DeepSeek AI to:
- Answer longevity-related questions
- Explain test results
- Provide evidence-based guidance
- Never give medical diagnoses (ethical AI)

## 📄 License

MIT License - feel free to use for your own projects

## ⚠️ Disclaimer

This platform provides educational information only and does not offer medical advice. Always consult healthcare professionals for medical decisions.

## 🌐 Deployment

### GitHub Pages

1. Build the project:
```bash
npm run build
```

2. Deploy to GitHub Pages:
```bash
git add dist -f
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix dist origin gh-pages
```

### Vercel

1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy!

## 👨‍💻 Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

Built with ❤️ for longevity and healthspan optimization
