# 🧙‍♂️ Wizardoo - Your Personal Transformation Engine

> Connect with expert coaches, consultants, counselors, and mentors — matched by AI, guided by wisdom.

## ✨ Features

### 🎯 **AI-Powered Matching**
- Smart wizard recommendations based on your specific needs
- GPT-4 powered analysis for personalized matches
- Fallback keyword matching for reliable results

### 🧙‍♂️ **Expert Wizards**
- **Coaches** - Performance and goal achievement specialists
- **Consultants** - Strategic problem solving experts  
- **Counselors** - Emotional support and healing professionals
- **Mentors** - Wisdom and guidance from experience

### 🎨 **Premium UI/UX**
- Modern, responsive design with smooth animations
- Scroll-to-top functionality on all pages
- Google-style search interface
- Framer Motion animations throughout

### 📱 **Mobile-First Design**
- Fully responsive across all devices
- Touch-friendly interactions
- Optimized mobile navigation

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Routing**: React Router DOM
- **AI Integration**: OpenAI GPT-4
- **Deployment**: GitHub Pages

## 🎨 Design System

### Colors
- **Deep Green**: `#013d39` - Primary brand color
- **Gold**: `#fab100` - Accent and highlights
- **Off White**: `#fafaf8` - Background
- **Light Green**: `#f0fffe` - Secondary backgrounds

### Typography
- **Display**: Poppins (headings)
- **Body**: Inter (content)
- **Responsive**: Fluid typography scaling

## 📁 Project Structure

```
src/
├── api/                 # API integrations
│   └── gptMatch.js     # OpenAI GPT matching
├── components/         # Reusable components
│   ├── ScrollToTop.jsx # Scroll to top functionality
│   ├── WizardRecommendation.jsx
│   └── ...
├── pages/              # Main pages
│   ├── Home.jsx        # Landing page
│   ├── WizardListing.jsx
│   └── ...
├── context/            # React context
└── common/             # Utilities
```

## 🌟 Key Components

### ScrollToTop Component
- Appears after 300px scroll
- Smooth animations with Framer Motion
- Accessible with proper ARIA labels
- Premium hover effects

### AI Wizard Matching
- GPT-4 powered recommendation engine
- Personalized explanations
- Confidence scoring
- Fallback keyword matching

### Responsive Navigation
- Mobile-first hamburger menu
- Smooth transitions
- Active state indicators

## 🚀 Deployment

This project is automatically deployed to GitHub Pages via GitHub Actions.

### Environment Variables
```bash
VITE_OPENAI_API_KEY=your_openai_api_key
```

### Manual Deployment
```bash
npm run build
# Deploy dist/ folder to your hosting provider
```

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Built with ❤️ using React, Tailwind CSS, and Framer Motion**