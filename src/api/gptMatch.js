export async function getWizardRecommendation(userInput) {
  try {
    console.log("🔍 Starting GPT analysis for:", userInput);
    
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
      console.error("❌ No OpenAI API key found");
      return getKeywordBasedRecommendation(userInput);
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are Wizardoo Pathfinder, an expert at matching people with the right type of guidance.

WIZARD TYPES & SUB-NICHES:
- coach: For goals, performance, habits, fitness, productivity, motivation, accountability
  Sub-niches: career, fitness, life, productivity, wellness, leadership
- consultant: For business strategy, problem-solving, analysis, professional advice
  Sub-niches: business, strategy, marketing, operations, finance, startup
- counselor: For emotional support, stress, anxiety, relationships, mental health
  Sub-niches: stress, relationships, mental health, trauma, grief, anxiety
- mentor: For career guidance, wisdom, long-term development, life direction
  Sub-niches: career, leadership, entrepreneurship, life direction, personal growth

Analyze the user's input and return ONLY a valid JSON object with this exact format:
{
  "wizard_type": "coach",
  "goal_area": "career",
  "urgency": "medium",
  "short_reason": "You need performance support and accountability to overcome procrastination and burnout.",
  "personalized_explanation": "Based on your struggles with procrastination and workplace burnout, a Career Coach can help you develop better time management systems, set clear boundaries, and create sustainable productivity habits. They'll provide the accountability and structure you need to break the procrastination cycle while addressing the root causes of your burnout.",
  "confidence": 85
}

Rules:
- wizard_type must be exactly one of: coach, consultant, counselor, mentor
- goal_area should be specific sub-niche based on user's needs
- urgency must be exactly one of: low, medium, high
- confidence should be 0-100
- short_reason should be under 80 characters
- personalized_explanation should be 2-3 sentences explaining WHY this match is perfect for their specific situation
- Return ONLY the JSON, no other text`
          },
          {
            role: "user",
            content: userInput
          }
        ],
        temperature: 0.3,
        max_tokens: 300
      })
    });

    console.log("📡 OpenAI Response Status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ OpenAI API Error:", response.status, errorText);
      return getKeywordBasedRecommendation(userInput);
    }

    const data = await response.json();
    console.log("📦 OpenAI Response:", data);

    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      console.error("❌ No content in OpenAI response");
      return getKeywordBasedRecommendation(userInput);
    }

    console.log("🔤 Raw GPT Content:", content);

    // Clean the content to extract just the JSON
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("❌ No JSON found in GPT response");
      return getKeywordBasedRecommendation(userInput);
    }

    const jsonStr = jsonMatch[0];
    console.log("🧹 Cleaned JSON:", jsonStr);

    try {
      const result = JSON.parse(jsonStr);
      console.log("✅ Parsed GPT Result:", result);

      // Validate required fields
      if (!result.wizard_type || !result.goal_area || !result.short_reason) {
        console.error("❌ Missing required fields in GPT response:", result);
        return getKeywordBasedRecommendation(userInput);
      }

      // Validate wizard_type
      const validTypes = ['coach', 'consultant', 'counselor', 'mentor'];
      if (!validTypes.includes(result.wizard_type)) {
        console.error("❌ Invalid wizard_type:", result.wizard_type);
        return getKeywordBasedRecommendation(userInput);
      }

      console.log("🎉 GPT match successful!");
      return result;

    } catch (parseError) {
      console.error("❌ JSON parse error:", parseError);
      console.error("❌ Failed to parse:", jsonStr);
      return getKeywordBasedRecommendation(userInput);
    }

  } catch (error) {
    console.error("❌ GPT API Error:", error);
    return getKeywordBasedRecommendation(userInput);
  }
}

// Enhanced fallback function with personalization
function getKeywordBasedRecommendation(userInput) {
  console.log("🔄 Using fallback keyword matching for:", userInput);
  
  const input = userInput.toLowerCase();
  
  const patterns = {
    coach: {
      keywords: [
        'goal', 'achieve', 'performance', 'fitness', 'habit', 'productivity', 
        'motivation', 'training', 'lose weight', 'get fit', 'exercise',
        'diet', 'routine', 'discipline', 'focus', 'improve', 'procrastination',
        'accountability', 'burnout', 'overwhelmed'
      ],
      goalAreas: {
        'fitness': ['fitness', 'weight', 'exercise', 'diet', 'health', 'workout'],
        'career': ['work', 'job', 'career', 'professional', 'burnout', 'procrastination'],
        'productivity': ['productivity', 'focus', 'time', 'habits', 'routine', 'discipline'],
        'life': ['life', 'personal', 'goals', 'improvement', 'development']
      }
    },
    consultant: {
      keywords: [
        'business', 'strategy', 'problem', 'solution', 'analysis', 'planning', 
        'growth', 'optimization', 'startup', 'company', 'revenue', 'marketing',
        'sales', 'operations', 'management', 'efficiency'
      ],
      goalAreas: {
        'business': ['business', 'company', 'startup', 'entrepreneurship'],
        'strategy': ['strategy', 'planning', 'growth', 'development'],
        'marketing': ['marketing', 'sales', 'revenue', 'customers'],
        'operations': ['operations', 'efficiency', 'optimization', 'management']
      }
    },
    counselor: {
      keywords: [
        'stress', 'anxiety', 'depression', 'relationship', 'trauma', 'grief', 
        'emotional', 'mental health', 'therapy', 'counseling', 'sad', 'worried',
        'overwhelmed', 'burnout', 'feelings', 'cope', 'healing', 'support'
      ],
      goalAreas: {
        'stress': ['stress', 'overwhelmed', 'pressure', 'burnout'],
        'anxiety': ['anxiety', 'worried', 'fear', 'panic'],
        'relationships': ['relationship', 'marriage', 'family', 'social'],
        'mental health': ['depression', 'mental', 'emotional', 'therapy', 'healing']
      }
    },
    mentor: {
      keywords: [
        'guidance', 'wisdom', 'experience', 'advice', 'direction', 'learning', 
        'development', 'career', 'path', 'future', 'growth', 'journey',
        'transition', 'change', 'life', 'purpose', 'meaning'
      ],
      goalAreas: {
        'career': ['career', 'professional', 'job', 'work', 'leadership'],
        'life direction': ['life', 'purpose', 'meaning', 'direction', 'path'],
        'personal growth': ['growth', 'development', 'learning', 'wisdom'],
        'entrepreneurship': ['entrepreneurship', 'startup', 'business', 'venture']
      }
    }
  };

  let bestMatch = { type: 'coach', score: 0, goalArea: 'performance' };
  
  Object.entries(patterns).forEach(([type, data]) => {
    const score = data.keywords.reduce((acc, keyword) => {
      return acc + (input.includes(keyword) ? 1 : 0);
    }, 0);
    
    if (score > bestMatch.score) {
      // Find best goal area
      let bestGoalArea = Object.keys(data.goalAreas)[0];
      let bestGoalScore = 0;
      
      Object.entries(data.goalAreas).forEach(([goalArea, keywords]) => {
        const goalScore = keywords.reduce((acc, keyword) => {
          return acc + (input.includes(keyword) ? 1 : 0);
        }, 0);
        
        if (goalScore > bestGoalScore) {
          bestGoalArea = goalArea;
          bestGoalScore = goalScore;
        }
      });
      
      bestMatch = { type, score, goalArea: bestGoalArea };
    }
  });

  // Generate personalized explanation
  const personalizedExplanations = {
    coach: `A ${bestMatch.goalArea} coach can provide you with structured guidance, accountability, and proven strategies to overcome your challenges. They'll help you build sustainable habits and systems for long-term success.`,
    consultant: `A ${bestMatch.goalArea} consultant brings expert analysis and strategic thinking to help solve your specific challenges. They'll provide actionable solutions and frameworks tailored to your situation.`,
    counselor: `A ${bestMatch.goalArea} counselor offers professional emotional support and evidence-based techniques to help you process your experiences and develop healthy coping strategies.`,
    mentor: `A ${bestMatch.goalArea} mentor shares valuable experience and wisdom to guide your journey. They'll provide insights, perspective, and direction based on their own successful path.`
  };

  const result = {
    wizard_type: bestMatch.type,
    goal_area: bestMatch.goalArea,
    urgency: 'medium',
    short_reason: `Based on your keywords, a ${bestMatch.type} seems like the best fit`,
    personalized_explanation: personalizedExplanations[bestMatch.type],
    confidence: Math.min(bestMatch.score * 20 + 40, 75), // 40-75% confidence
    fallback: true
  };

  console.log("🔄 Fallback result:", result);
  return result;
}

// Helper function to get wizard details by type
export function getWizardDetailsByType(wizardType) {
  const wizardDetails = {
    coach: {
      name: 'Coach',
      icon: 'FaUserTie',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      path: '/wizards/coach',
      count: 45,
      description: 'Performance and goal achievement specialists',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    consultant: {
      name: 'Consultant',
      icon: 'FaBrain',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      path: '/wizards/consultant',
      count: 58,
      description: 'Strategic problem solving experts',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    counselor: {
      name: 'Counselor',
      icon: 'FaHeart',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      path: '/wizards/counselor',
      count: 72,
      description: 'Emotional support and healing professionals',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    },
    mentor: {
      name: 'Mentor',
      icon: 'FaLightbulb',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      path: '/wizards/mentor',
      count: 36,
      description: 'Wisdom and guidance from experience',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    }
  };

  return wizardDetails[wizardType] || wizardDetails.coach;
}