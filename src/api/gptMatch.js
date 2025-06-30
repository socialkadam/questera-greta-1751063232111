import { wizardMatcher } from '../data/vettedWizards';

export async function getWizardRecommendation(userInput) {
  try {
    console.log("🔍 Starting enhanced wizard matching for:", userInput);

    // First, try to get actual wizard matches from our database
    const topWizards = wizardMatcher.findTopMatches(userInput, 3);
    console.log("🧙‍♂️ Found top wizard matches:", topWizards);

    if (topWizards.length > 0) {
      // Use the top wizard's type and specialization
      const primaryWizard = topWizards[0];
      console.log("🎯 Primary wizard match:", primaryWizard);

      // Determine match method for display
      let matchMethod = 'keyword_wizard_lookup';
      if (primaryWizard.matchType === 'name') {
        matchMethod = 'direct_name_lookup';
      } else if (primaryWizard.matchType === 'fallback') {
        matchMethod = 'rating_fallback';
      }

      // Try GPT analysis for enhanced explanation
      let gptResult = null;
      try {
        gptResult = await getGPTAnalysis(userInput, primaryWizard);
      } catch (gptError) {
        console.log("⚠️ GPT analysis failed, using fallback:", gptError);
      }

      // Combine wizard matching with GPT insights or fallback
      const result = {
        wizard_type: primaryWizard.wizard_type,
        goal_area: primaryWizard.specialization,
        urgency: gptResult?.urgency || determineUrgency(userInput),
        short_reason: primaryWizard.matchReason,
        personalized_explanation: gptResult?.personalized_explanation || 
          generatePersonalizedExplanation(userInput, primaryWizard, topWizards),
        confidence: calculateConfidence(primaryWizard.matchScore, topWizards, primaryWizard.matchType),
        matched_wizards: topWizards,
        fallback: !gptResult,
        match_method: matchMethod,
        search_type: primaryWizard.matchType || 'keyword'
      };

      console.log("✅ Enhanced wizard recommendation:", result);
      return result;
    }

    // Fallback to GPT-only analysis if no wizard matches found
    console.log("🔄 No wizard matches found, trying GPT-only analysis");
    return await getGPTOnlyAnalysis(userInput);

  } catch (error) {
    console.error("❌ Enhanced wizard matching error:", error);
    return getKeywordBasedRecommendation(userInput);
  }
}

// Enhanced GPT analysis with wizard context
async function getGPTAnalysis(userInput, primaryWizard) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("No OpenAI API key found");
  }

  // Create match type specific context
  let matchContext = "";
  if (primaryWizard.matchType === 'name') {
    matchContext = `This wizard was found through DIRECT NAME SEARCH. The user specifically searched for "${primaryWizard.name}" or part of their name.`;
  } else if (primaryWizard.matchType === 'keyword') {
    matchContext = `This wizard was found through KEYWORD MATCHING based on: ${primaryWizard.matchedKeywords.join(', ')}`;
  } else {
    matchContext = `This wizard was recommended based on their high rating and expertise.`;
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
          content: `You are Wizardoo's AI matching expert. A user has been matched with a specific wizard.

MATCHED WIZARD INFO:
- Name: ${primaryWizard.name}
- Type: ${primaryWizard.wizard_type}
- Specialization: ${primaryWizard.specialization}
- Bio: ${primaryWizard.bio}
- Match Context: ${matchContext}

Your task is to create a personalized explanation of why this specific wizard is perfect for the user's needs.

Return ONLY a JSON object with this format:
{
  "urgency": "low|medium|high",
  "personalized_explanation": "2-3 sentences explaining why this specific wizard is perfect for their situation, mentioning the wizard's expertise and how it aligns with their needs"
}

Make the explanation personal, specific, and compelling. Reference the wizard's actual specialization and how it addresses the user's specific challenge or search intent.`
        },
        {
          role: "user",
          content: userInput
        }
      ],
      temperature: 0.3,
      max_tokens: 200
    })
  });

  if (!response.ok) {
    throw new Error(`GPT API error: ${response.status}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  
  if (!content) {
    throw new Error("No content in GPT response");
  }

  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("No JSON found in GPT response");
  }

  return JSON.parse(jsonMatch[0]);
}

// Original GPT-only analysis as fallback
async function getGPTOnlyAnalysis(userInput) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (!apiKey) {
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
  Sub-niches: stress, relationships, mental_health, trauma, grief, anxiety
- mentor: For career guidance, wisdom, long-term development, life direction
  Sub-niches: career, leadership, entrepreneurship, personal_growth

Return ONLY a valid JSON object with this exact format:
{
  "wizard_type": "coach|consultant|counselor|mentor",
  "goal_area": "specific sub-niche",
  "urgency": "low|medium|high", 
  "short_reason": "Brief reason under 80 characters",
  "personalized_explanation": "2-3 sentences explaining WHY this match is perfect",
  "confidence": 75
}`
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

  if (!response.ok) {
    throw new Error(`GPT API error: ${response.status}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  
  if (!jsonMatch) {
    throw new Error("No JSON found in GPT response");
  }

  const result = JSON.parse(jsonMatch[0]);
  result.match_method = 'gpt_only';
  result.fallback = true;
  result.search_type = 'gpt';
  
  return result;
}

// Determine urgency based on keywords
function determineUrgency(userInput) {
  const highUrgencyWords = ['urgent', 'crisis', 'emergency', 'desperate', 'immediately', 'asap', 'help'];
  const mediumUrgencyWords = ['soon', 'quickly', 'struggling', 'difficult', 'problem', 'issue', 'challenge'];
  
  const input = userInput.toLowerCase();
  
  if (highUrgencyWords.some(word => input.includes(word))) {
    return 'high';
  } else if (mediumUrgencyWords.some(word => input.includes(word))) {
    return 'medium';
  }
  return 'low';
}

// Generate personalized explanation based on wizard matches
function generatePersonalizedExplanation(userInput, primaryWizard, allMatches) {
  const wizardType = primaryWizard.wizard_type;
  const specialization = primaryWizard.specialization;
  const matchedKeywords = primaryWizard.matchedKeywords?.slice(0, 3) || [];
  
  // Handle name-based searches differently
  if (primaryWizard.matchType === 'name') {
    return `You searched for ${primaryWizard.name}, an experienced ${specialization} ${wizardType} with ${primaryWizard.experience} of experience and a ${primaryWizard.rating} rating. They are perfectly positioned to help you with their proven expertise in ${specialization} and track record of helping clients achieve meaningful results.`;
  }
  
  const explanations = {
    coach: `${primaryWizard.name} is a ${specialization} specialist who excels at helping people like you achieve concrete results. With ${primaryWizard.experience} of experience and a ${primaryWizard.rating} rating, they have the proven track record to guide you through your ${matchedKeywords.join(' and ')} challenges with structured, actionable strategies.`,
    
    consultant: `${primaryWizard.name} brings ${primaryWizard.experience} of ${specialization} expertise to solve complex challenges like yours. Their analytical approach and proven methodology make them ideal for addressing your ${matchedKeywords.join(' and ')} needs with strategic, data-driven solutions.`,
    
    counselor: `${primaryWizard.name} specializes in ${specialization} and has helped hundreds of people navigate similar challenges. Their compassionate, evidence-based approach is perfectly suited to support you through your ${matchedKeywords.join(' and ')} concerns in a safe, judgment-free environment.`,
    
    mentor: `${primaryWizard.name} has ${primaryWizard.experience} of real-world experience in ${specialization} and understands exactly what you're going through. Their wisdom and guidance will help you navigate your ${matchedKeywords.join(' and ')} journey with the benefit of someone who has successfully walked this path before.`
  };

  return explanations[wizardType] || `${primaryWizard.name} is an experienced ${wizardType} who specializes in helping people with ${matchedKeywords.join(', ')} challenges.`;
}

// Calculate confidence score based on match quality and type
function calculateConfidence(matchScore, topWizards, matchType) {
  // Name matches get highest confidence
  if (matchType === 'name') {
    return 98;
  }
  
  // Keyword matches confidence based on score
  if (matchScore === 0) return 40;
  if (matchScore >= 20) return 95;
  if (matchScore >= 15) return 90;
  if (matchScore >= 10) return 85;
  if (matchScore >= 5) return 75;
  return 65;
}

// Enhanced fallback function
function getKeywordBasedRecommendation(userInput) {
  console.log("🔄 Using enhanced fallback matching for:", userInput);
  
  const input = userInput.toLowerCase();

  const patterns = {
    coach: {
      keywords: [
        'goal', 'achieve', 'performance', 'fitness', 'habit', 'productivity', 'motivation', 'training',
        'lose weight', 'get fit', 'exercise', 'diet', 'routine', 'discipline', 'focus', 'improve',
        'procrastination', 'accountability', 'burnout', 'overwhelmed', 'work out', 'healthy'
      ],
      goalAreas: {
        'fitness': ['fitness', 'weight', 'exercise', 'diet', 'health', 'workout', 'gym', 'muscle'],
        'career': ['work', 'job', 'career', 'professional', 'burnout', 'procrastination', 'workplace'],
        'productivity': ['productivity', 'focus', 'time', 'habits', 'routine', 'discipline', 'organization'],
        'life': ['life', 'personal', 'goals', 'improvement', 'development', 'balance', 'happiness']
      }
    },
    consultant: {
      keywords: [
        'business', 'strategy', 'problem', 'solution', 'analysis', 'planning', 'growth', 'optimization',
        'startup', 'company', 'revenue', 'marketing', 'sales', 'operations', 'management', 'efficiency',
        'finance', 'investment', 'funding', 'scaling', 'market', 'competitive'
      ],
      goalAreas: {
        'business': ['business', 'company', 'startup', 'entrepreneurship', 'venture'],
        'strategy': ['strategy', 'planning', 'growth', 'development', 'scaling'],
        'marketing': ['marketing', 'sales', 'revenue', 'customers', 'brand', 'advertising'],
        'finance': ['finance', 'money', 'investment', 'funding', 'financial', 'budget']
      }
    },
    counselor: {
      keywords: [
        'stress', 'anxiety', 'depression', 'relationship', 'trauma', 'grief', 'emotional', 'mental health',
        'therapy', 'counseling', 'sad', 'worried', 'overwhelmed', 'feelings', 'cope', 'healing',
        'support', 'marriage', 'family', 'couple', 'love', 'communication'
      ],
      goalAreas: {
        'anxiety': ['anxiety', 'worried', 'fear', 'panic', 'nervous', 'stress'],
        'relationships': ['relationship', 'marriage', 'family', 'social', 'couple', 'love', 'dating'],
        'mental_health': ['depression', 'mental', 'emotional', 'therapy', 'healing', 'psychological'],
        'trauma': ['trauma', 'grief', 'loss', 'abuse', 'PTSD', 'recovery']
      }
    },
    mentor: {
      keywords: [
        'guidance', 'wisdom', 'experience', 'advice', 'direction', 'learning', 'development',
        'career', 'path', 'future', 'growth', 'journey', 'transition', 'change', 'life',
        'purpose', 'meaning', 'leadership', 'success', 'achievement'
      ],
      goalAreas: {
        'career': ['career', 'professional', 'job', 'work', 'leadership', 'management'],
        'personal_growth': ['growth', 'development', 'learning', 'wisdom', 'potential'],
        'entrepreneurship': ['entrepreneurship', 'startup', 'business', 'venture', 'innovation'],
        'leadership': ['leadership', 'management', 'team', 'influence', 'authority']
      }
    }
  };

  let bestMatch = {
    type: 'coach',
    score: 0,
    goalArea: 'life'
  };

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

      bestMatch = {
        type,
        score,
        goalArea: bestGoalArea
      };
    }
  });

  // Try to find wizards of the recommended type
  const recommendedWizards = wizardMatcher.getWizardsByType(bestMatch.type, 3);

  const result = {
    wizard_type: bestMatch.type,
    goal_area: bestMatch.goalArea,
    urgency: 'medium',
    short_reason: `Based on your keywords, a ${bestMatch.type} seems like the best fit`,
    personalized_explanation: `Based on your input, a ${bestMatch.goalArea} ${bestMatch.type} can provide the guidance you need. They specialize in helping people with challenges like yours and have proven strategies to help you succeed.`,
    confidence: Math.min(bestMatch.score * 15 + 45, 75),
    matched_wizards: recommendedWizards,
    fallback: true,
    match_method: 'keyword_fallback',
    search_type: 'fallback'
  };

  console.log("🔄 Fallback result:", result);
  return result;
}

// Helper function to get wizard details by type (updated to work with new data)
export function getWizardDetailsByType(wizardType) {
  const wizardDetails = {
    coach: {
      name: 'Coach',
      icon: '🎯',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      path: '/wizards/coach',
      count: wizardMatcher.getWizardsByType('coach').length,
      description: 'Performance and goal achievement specialists',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    consultant: {
      name: 'Consultant',
      icon: '🧠',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      path: '/wizards/consultant',
      count: wizardMatcher.getWizardsByType('consultant').length,
      description: 'Strategic problem solving experts',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    counselor: {
      name: 'Counselor',
      icon: '❤️',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      path: '/wizards/counselor',
      count: wizardMatcher.getWizardsByType('counselor').length,
      description: 'Emotional support and healing professionals',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    },
    mentor: {
      name: 'Mentor',
      icon: '💡',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      path: '/wizards/mentor',
      count: wizardMatcher.getWizardsByType('mentor').length,
      description: 'Wisdom and guidance from experience',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    }
  };

  return wizardDetails[wizardType] || wizardDetails.coach;
}