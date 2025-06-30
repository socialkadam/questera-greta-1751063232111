// Comprehensive database of vetted wizards with detailed profiles
export const vettedWizards = [
  // COACHES
  {
    id: 'coach_001',
    name: "Sarah Johnson",
    wizard_type: "coach",
    specialization: "career",
    title: "Senior Career Performance Coach",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    reviews: 127,
    experience: "8 years",
    location: "San Francisco, CA",
    price: "$150/session",
    bio: "Specialized in helping professionals overcome procrastination and workplace burnout.",
    availability: ["Video Call", "Phone", "Chat"],
    keywords: [
      "procrastination", "burnout", "workplace", "career", "productivity", 
      "performance", "goals", "motivation", "professional", "work", "job",
      "advancement", "leadership", "management", "corporate", "stress"
    ],
    lapsulaBookingUrl: "https://app.lapsula.com/shop/sarah-johnson-coach/embed-020617-facc15"
  },
  {
    id: 'coach_002',
    name: "Marcus Chen",
    wizard_type: "coach",
    specialization: "fitness",
    title: "Certified Fitness & Wellness Coach",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    reviews: 203,
    experience: "6 years",
    location: "Los Angeles, CA",
    price: "$120/session",
    bio: "Expert in sustainable fitness transformations and healthy lifestyle design.",
    availability: ["Video Call", "Phone"],
    keywords: [
      "fitness", "weight loss", "exercise", "workout", "nutrition", "health",
      "diet", "gym", "training", "muscle", "cardio", "strength", "wellness",
      "lifestyle", "habits", "energy", "body", "transform", "lose weight"
    ],
    lapsulaBookingUrl: "https://app.lapsula.com/shop/marcus-chen-fitness/embed-020617-facc15"
  },
  {
    id: 'coach_003',
    name: "Emma Rodriguez",
    wizard_type: "coach",
    specialization: "productivity",
    title: "Productivity & Time Management Coach",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    reviews: 89,
    experience: "5 years",
    location: "New York, NY",
    price: "$130/session",
    bio: "Helps busy professionals create efficient systems and overcome procrastination.",
    availability: ["Video Call", "Chat"],
    keywords: [
      "productivity", "time management", "efficiency", "organization", "systems",
      "focus", "concentration", "distraction", "procrastination", "planning",
      "scheduling", "priorities", "workflow", "habits", "routine", "discipline"
    ],
    lapsulaBookingUrl: "https://app.lapsula.com/shop/emma-rodriguez-productivity/embed-020617-facc15"
  },
  {
    id: 'coach_004',
    name: "David Park",
    wizard_type: "coach",
    specialization: "life",
    title: "Life Transformation Coach",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    reviews: 156,
    experience: "7 years",
    location: "Austin, TX",
    price: "$140/session",
    bio: "Helps individuals find their purpose and create meaningful life changes.",
    availability: ["Video Call", "Phone", "Chat"],
    keywords: [
      "life purpose", "meaning", "direction", "goals", "dreams", "vision",
      "personal growth", "self-improvement", "motivation", "inspiration",
      "confidence", "self-esteem", "happiness", "fulfillment", "balance"
    ],
    lapsulaBookingUrl: "https://app.lapsula.com/shop/david-park-life/embed-020617-facc15"
  },

  // CONSULTANTS
  {
    id: 'consultant_001',
    name: "Dr. Lisa Thompson",
    wizard_type: "consultant",
    specialization: "business",
    title: "Senior Business Strategy Consultant",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    reviews: 92,
    experience: "12 years",
    location: "Seattle, WA",
    price: "$300/session",
    bio: "Former McKinsey consultant specializing in startup growth and business optimization.",
    availability: ["Video Call", "Phone"],
    keywords: [
      "business strategy", "startup", "growth", "scaling", "revenue", "profit",
      "market analysis", "competition", "business plan", "venture capital",
      "funding", "investment", "entrepreneurship", "company", "operations"
    ],
    lapsulaBookingUrl: "https://app.lapsula.com/shop/lisa-thompson-business/embed-020617-facc15"
  },
  {
    id: 'consultant_002',
    name: "Robert Kim",
    wizard_type: "consultant",
    specialization: "marketing",
    title: "Digital Marketing Strategy Consultant",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    reviews: 134,
    experience: "9 years",
    location: "Miami, FL",
    price: "$250/session",
    bio: "Growth marketing expert who has scaled companies from startup to IPO.",
    availability: ["Video Call", "Chat"],
    keywords: [
      "marketing", "digital marketing", "growth hacking", "social media",
      "advertising", "campaigns", "brand", "content", "SEO", "analytics",
      "conversion", "leads", "sales", "customers", "acquisition", "retention"
    ],
    lapsulaBookingUrl: "https://app.lapsula.com/shop/robert-kim-marketing/embed-020617-facc15"
  },
  {
    id: 'consultant_003',
    name: "Jennifer Walsh",
    wizard_type: "consultant",
    specialization: "finance",
    title: "Financial Strategy Consultant",
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    reviews: 78,
    experience: "11 years",
    location: "Chicago, IL",
    price: "$280/session",
    bio: "Expert in financial planning, investment strategies, and wealth management.",
    availability: ["Video Call", "Phone"],
    keywords: [
      "finance", "money", "investment", "financial planning", "wealth",
      "budget", "saving", "debt", "retirement", "portfolio", "stocks",
      "bonds", "real estate", "financial freedom", "passive income"
    ],
    lapsulaBookingUrl: "https://app.lapsula.com/shop/jennifer-walsh-finance/embed-020617-facc15"
  },

  // COUNSELORS
  {
    id: 'counselor_001',
    name: "Dr. Maria Gonzalez",
    wizard_type: "counselor",
    specialization: "relationships",
    title: "Licensed Marriage & Relationship Counselor",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    reviews: 267,
    experience: "15 years",
    location: "Denver, CO",
    price: "$180/session",
    bio: "Specialized in helping couples build stronger, more connected relationships.",
    availability: ["Video Call", "Phone"],
    keywords: [
      "relationship", "marriage", "couple", "love", "communication", "conflict",
      "intimacy", "trust", "commitment", "dating", "romance", "partnership",
      "family", "divorce", "separation", "therapy", "counseling", "emotional"
    ],
    lapsulaBookingUrl: "https://app.lapsula.com/shop/maria-gonzalez-relationships/embed-020617-facc15"
  },
  {
    id: 'counselor_002',
    name: "Dr. James Wilson",
    wizard_type: "counselor",
    specialization: "anxiety",
    title: "Licensed Clinical Psychologist",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    reviews: 198,
    experience: "12 years",
    location: "Portland, OR",
    price: "$200/session",
    bio: "Expert in treating anxiety disorders, panic attacks, and stress-related conditions.",
    availability: ["Video Call", "Phone", "Chat"],
    keywords: [
      "anxiety", "stress", "panic", "worry", "fear", "overwhelmed", "nervous",
      "mental health", "therapy", "depression", "mood", "emotional", "psychology",
      "mindfulness", "meditation", "relaxation", "coping", "healing"
    ],
    lapsulaBookingUrl: "https://app.lapsula.com/book/wizard-service-grnsw3nz2z0uv3kkckf0cp3p"
  },
  {
    id: 'counselor_003',
    name: "Dr. Amanda Foster",
    wizard_type: "counselor",
    specialization: "trauma",
    title: "Trauma & PTSD Specialist",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    reviews: 145,
    experience: "10 years",
    location: "Boston, MA",
    price: "$220/session",
    bio: "Specialized in evidence-based treatments for trauma recovery and PTSD.",
    availability: ["Video Call", "Phone"],
    keywords: [
      "trauma", "PTSD", "abuse", "recovery", "healing", "therapy", "counseling",
      "grief", "loss", "emotional", "mental health", "support", "treatment",
      "psychological", "therapeutic", "rehabilitation", "wellness"
    ],
    lapsulaBookingUrl: "https://app.lapsula.com/shop/amanda-foster-trauma/embed-020617-facc15"
  },

  // MENTORS
  {
    id: 'mentor_001',
    name: "Michael Chang",
    wizard_type: "mentor",
    specialization: "entrepreneurship",
    title: "Serial Entrepreneur & Business Mentor",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    reviews: 89,
    experience: "20 years",
    location: "Silicon Valley, CA",
    price: "$400/session",
    bio: "Founded and sold 2 companies, now mentoring the next generation of entrepreneurs.",
    availability: ["Video Call", "Phone"],
    keywords: [
      "entrepreneurship", "startup", "business", "founder", "CEO", "venture",
      "innovation", "technology", "silicon valley", "investment", "funding",
      "scaling", "growth", "leadership", "vision", "strategy", "mentorship"
    ],
    lapsulaBookingUrl: "https://app.lapsula.com/shop/michael-chang-entrepreneurship/embed-020617-facc15"
  },
  {
    id: 'mentor_002',
    name: "Jennifer Park",
    wizard_type: "mentor",
    specialization: "leadership",
    title: "Executive Leadership Mentor",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    reviews: 156,
    experience: "18 years",
    location: "New York, NY",
    price: "$350/session",
    bio: "Former Fortune 500 CEO mentoring high-potential leaders.",
    availability: ["Video Call", "Phone"],
    keywords: [
      "leadership", "management", "executive", "CEO", "director", "team",
      "corporate", "strategy", "decision making", "influence", "authority",
      "development", "career", "advancement", "promotion", "success"
    ],
    lapsulaBookingUrl: "https://app.lapsula.com/shop/jennifer-park-leadership/embed-020617-facc15"
  },
  {
    id: 'mentor_003',
    name: "Thomas Anderson",
    wizard_type: "mentor",
    specialization: "personal_growth",
    title: "Life Purpose & Personal Growth Mentor",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    reviews: 112,
    experience: "14 years",
    location: "Denver, CO",
    price: "$220/session",
    bio: "Helps individuals discover their purpose and create meaningful life transformations.",
    availability: ["Video Call", "Phone", "Chat"],
    keywords: [
      "personal growth", "self development", "purpose", "meaning", "spirituality",
      "mindfulness", "consciousness", "wisdom", "enlightenment", "transformation",
      "journey", "path", "discovery", "authentic", "fulfillment", "potential"
    ],
    lapsulaBookingUrl: "https://app.lapsula.com/shop/thomas-anderson-growth/embed-020617-facc15"
  }
];

// Enhanced business logic for name-first, then keyword-based wizard matching
export class WizardMatchingEngine {
  constructor(wizards = vettedWizards) {
    this.wizards = wizards;
    this.setupKeywordIndex();
    this.setupNameIndex();
  }

  // Create an inverted index for faster keyword lookups
  setupKeywordIndex() {
    this.keywordIndex = new Map();
    
    this.wizards.forEach(wizard => {
      wizard.keywords.forEach(keyword => {
        const normalizedKeyword = keyword.toLowerCase().trim();
        if (!this.keywordIndex.has(normalizedKeyword)) {
          this.keywordIndex.set(normalizedKeyword, []);
        }
        this.keywordIndex.get(normalizedKeyword).push(wizard);
      });
    });
  }

  // Create name index for direct name lookups
  setupNameIndex() {
    this.nameIndex = new Map();
    
    this.wizards.forEach(wizard => {
      // Split full name into parts
      const nameParts = wizard.name.toLowerCase().split(' ');
      
      // Index each name part
      nameParts.forEach(namePart => {
        const cleanName = namePart.replace(/[^\w]/g, ''); // Remove Dr., etc.
        if (cleanName.length > 1) {
          if (!this.nameIndex.has(cleanName)) {
            this.nameIndex.set(cleanName, []);
          }
          this.nameIndex.get(cleanName).push(wizard);
        }
      });

      // Also index full name
      const fullName = wizard.name.toLowerCase().replace(/[^\w\s]/g, '');
      this.nameIndex.set(fullName, [wizard]);
    });
  }

  // Check if input is likely a name search
  isNameSearch(userInput) {
    const input = userInput.trim().toLowerCase();
    
    // Check for name patterns
    const namePatterns = [
      /^dr\.?\s+\w+/i,           // "Dr. James", "Dr James"
      /^\w+\s+\w+$/,             // "James Wilson" (two words)
      /^(find|search|show)\s+(dr\.?\s*)?\w+/i, // "find Dr James", "search Wilson"
    ];

    // Check if it matches name patterns
    if (namePatterns.some(pattern => pattern.test(input))) {
      return true;
    }

    // Check if any word in input matches known names
    const words = input.replace(/[^\w\s]/g, '').split(/\s+/);
    return words.some(word => 
      word.length > 2 && this.nameIndex.has(word)
    );
  }

  // Search by name first
  searchByName(userInput) {
    const input = userInput.toLowerCase().replace(/[^\w\s]/g, '');
    const words = input.split(/\s+/).filter(word => word.length > 1);
    
    console.log("🔍 Searching by name for words:", words);
    
    const nameMatches = [];
    const seenWizards = new Set();

    words.forEach(word => {
      if (this.nameIndex.has(word)) {
        this.nameIndex.get(word).forEach(wizard => {
          if (!seenWizards.has(wizard.id)) {
            seenWizards.add(wizard.id);
            
            // Calculate name match score
            let nameScore = 0;
            const wizardNameWords = wizard.name.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
            
            // Exact word match gets high score
            if (wizardNameWords.includes(word)) {
              nameScore += 50;
            }
            
            // Partial match gets medium score
            if (wizardNameWords.some(nameWord => nameWord.includes(word) || word.includes(nameWord))) {
              nameScore += 30;
            }

            nameMatches.push({
              ...wizard,
              matchScore: nameScore,
              matchedKeywords: [word],
              matchReason: `Direct name match for "${word}"`,
              matchType: 'name'
            });
          }
        });
      }
    });

    // Sort by name match score
    return nameMatches.sort((a, b) => b.matchScore - a.matchScore);
  }

  // Extract keywords from user input
  extractKeywords(userInput) {
    const stopWords = new Set([
      'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours',
      'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers',
      'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves',
      'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are',
      'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does',
      'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until',
      'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into',
      'through', 'during', 'before', 'after', 'above', 'below', 'up', 'down', 'in', 'out',
      'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'to', 'from',
      'find', 'search', 'show', 'get', 'want', 'need', 'looking', 'help'
    ]);

    // Clean and normalize the input
    const cleanInput = userInput
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ') // Replace punctuation with spaces
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim();

    // Extract meaningful keywords
    const words = cleanInput.split(' ');
    const keywords = words.filter(word => 
      word.length > 2 && !stopWords.has(word)
    );

    // Add multi-word phrases
    const phrases = this.extractPhrases(cleanInput);
    
    return [...new Set([...keywords, ...phrases])];
  }

  // Extract common phrases from user input
  extractPhrases(input) {
    const commonPhrases = [
      'weight loss', 'lose weight', 'get fit', 'build muscle',
      'time management', 'work life balance', 'stress management',
      'career change', 'job search', 'professional development',
      'relationship problems', 'mental health', 'anxiety disorder',
      'business strategy', 'startup idea', 'financial planning',
      'personal growth', 'life purpose', 'self improvement',
      'leadership skills', 'team management', 'conflict resolution',
      'social media', 'digital marketing', 'content creation'
    ];

    return commonPhrases.filter(phrase => 
      input.includes(phrase.toLowerCase())
    );
  }

  // Calculate match score for a wizard based on keywords
  calculateMatchScore(wizard, extractedKeywords) {
    let score = 0;
    let matchedKeywords = [];

    extractedKeywords.forEach(keyword => {
      const keywordLower = keyword.toLowerCase();
      
      // Direct keyword match (highest score)
      if (wizard.keywords.some(wk => wk.toLowerCase().includes(keywordLower))) {
        score += 10;
        matchedKeywords.push(keyword);
      }
      
      // Specialization match (high score)
      if (wizard.specialization.toLowerCase().includes(keywordLower)) {
        score += 8;
        matchedKeywords.push(keyword);
      }
      
      // Title match (medium score)
      if (wizard.title.toLowerCase().includes(keywordLower)) {
        score += 6;
        matchedKeywords.push(keyword);
      }
      
      // Bio match (lower score)
      if (wizard.bio.toLowerCase().includes(keywordLower)) {
        score += 3;
        matchedKeywords.push(keyword);
      }
    });

    // Boost score based on wizard rating and reviews
    const ratingBoost = (wizard.rating - 4.0) * 5; // 0-5 points bonus
    const reviewsBoost = Math.min(wizard.reviews / 50, 3); // 0-3 points bonus
    
    score += ratingBoost + reviewsBoost;

    return {
      score,
      matchedKeywords: [...new Set(matchedKeywords)]
    };
  }

  // MAIN SEARCH METHOD - Enhanced with name-first logic
  findTopMatches(userInput, limit = 3) {
    console.log("🔍 Starting enhanced wizard search for:", userInput);
    
    // STEP 1: Check if this is a name search
    if (this.isNameSearch(userInput)) {
      console.log("👤 Detected name search, prioritizing name matches");
      
      const nameMatches = this.searchByName(userInput);
      if (nameMatches.length > 0) {
        console.log("✅ Found name matches:", nameMatches.map(w => w.name));
        return nameMatches.slice(0, limit);
      }
    }

    // STEP 2: Fall back to keyword matching
    console.log("🔤 Performing keyword-based search");
    
    const extractedKeywords = this.extractKeywords(userInput);
    console.log("📝 Extracted keywords:", extractedKeywords);

    if (extractedKeywords.length === 0) {
      console.log("⚠️ No keywords extracted, returning top rated wizards");
      return this.wizards
        .sort((a, b) => b.rating - a.rating)
        .slice(0, limit)
        .map(wizard => ({
          ...wizard,
          matchScore: 0,
          matchedKeywords: [],
          matchReason: "Top rated wizard",
          matchType: 'fallback'
        }));
    }

    // Calculate keyword match scores for all wizards
    const scoredWizards = this.wizards.map(wizard => {
      const matchResult = this.calculateMatchScore(wizard, extractedKeywords);
      return {
        ...wizard,
        matchScore: matchResult.score,
        matchedKeywords: matchResult.matchedKeywords,
        matchReason: this.generateMatchReason(wizard, matchResult.matchedKeywords),
        matchType: 'keyword'
      };
    });

    // Sort by match score and return top matches
    const topMatches = scoredWizards
      .filter(wizard => wizard.matchScore > 0)
      .sort((a, b) => {
        if (b.matchScore !== a.matchScore) {
          return b.matchScore - a.matchScore;
        }
        // If scores are equal, prefer higher rated wizards
        return b.rating - a.rating;
      })
      .slice(0, limit);

    console.log("🎯 Top keyword matches found:", topMatches.map(w => ({
      name: w.name,
      type: w.wizard_type,
      score: w.matchScore,
      keywords: w.matchedKeywords
    })));

    // If no good matches found, return top rated from recommended type
    if (topMatches.length === 0) {
      console.log("📊 No keyword matches, falling back to type-based matching");
      const recommendedType = this.detectWizardType(extractedKeywords);
      return this.wizards
        .filter(wizard => wizard.wizard_type === recommendedType)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, limit)
        .map(wizard => ({
          ...wizard,
          matchScore: 5,
          matchedKeywords: [],
          matchReason: `Recommended ${wizard.wizard_type} based on your input`,
          matchType: 'type_fallback'
        }));
    }

    return topMatches;
  }

  // Generate human-readable match reason
  generateMatchReason(wizard, matchedKeywords) {
    if (matchedKeywords.length === 0) {
      return `Highly rated ${wizard.wizard_type} specialist`;
    }

    const keywordText = matchedKeywords.slice(0, 3).join(', ');
    return `Perfect match for: ${keywordText}`;
  }

  // Detect wizard type based on keywords
  detectWizardType(keywords) {
    const typeKeywords = {
      coach: ['goal', 'performance', 'fitness', 'productivity', 'habit', 'motivation', 'training', 'achieve'],
      consultant: ['business', 'strategy', 'marketing', 'finance', 'startup', 'growth', 'analysis', 'plan'],
      counselor: ['stress', 'anxiety', 'relationship', 'therapy', 'mental', 'emotional', 'support', 'healing'],
      mentor: ['guidance', 'wisdom', 'career', 'leadership', 'development', 'experience', 'advice', 'direction']
    };

    let typeScores = { coach: 0, consultant: 0, counselor: 0, mentor: 0 };

    keywords.forEach(keyword => {
      Object.entries(typeKeywords).forEach(([type, typeWords]) => {
        if (typeWords.some(tw => keyword.includes(tw) || tw.includes(keyword))) {
          typeScores[type]++;
        }
      });
    });

    const recommendedType = Object.entries(typeScores)
      .sort(([,a], [,b]) => b - a)[0][0];

    return recommendedType;
  }

  // Get wizard by ID
  getWizardById(wizardId) {
    return this.wizards.find(wizard => wizard.id === wizardId);
  }

  // Get wizards by type
  getWizardsByType(wizardType, limit = 10) {
    return this.wizards
      .filter(wizard => wizard.wizard_type === wizardType)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }

  // Get wizards by specialization
  getWizardsBySpecialization(specialization, limit = 10) {
    return this.wizards
      .filter(wizard => wizard.specialization === specialization)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }
}

// Export singleton instance
export const wizardMatcher = new WizardMatchingEngine();