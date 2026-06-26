import { GoogleGenerativeAI } from "@google/generative-ai";

export interface AIAnalysisResult {
  recommendations: { title: string; growth: string }[];
  socialMedia: { competitorPosts: number; yourPosts: number; diff: string; advice: string };
  reviews: { complaints: string[]; loves: string[]; openOpportunity: string };
  price: { competitorAverage: number; advice: string };
  swot: { strengths: string[]; weaknesses: string[]; opportunities: string[]; threats: string[] };
  growthScore: { marketing: number; finance: number; brand: number; customers: number; operations: number; overall: number };
  weeklyMissions: string[];
  notification: { title: string; advice: string };
}

export const generateCompetitorAnalysis = async (
  apiKey: string,
  businessType: string,
  competitors: any[]
): Promise<AIAnalysisResult | null> => {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Format competitor data for prompt
    const compData = competitors.slice(0, 5).map(c => 
      `Name: ${c.name}, Rating: ${c.rating}, Total Reviews: ${c.user_ratings_total}, Status: ${c.business_status}, Price Level: ${c.price_level || 'N/A'}`
    ).join('\n');

    const prompt = `
You are an expert AI Business Advisor for a new "${businessType}" business in Uzbekistan.
I will give you real competitor data from Google Maps.
Competitors:
${compData}

Analyze this market and generate a JSON response with the following exact structure. Do NOT include markdown blocks like \`\`\`json, return ONLY the raw JSON string.

{
  "recommendations": [
    { "title": "Instagram haftasiga kamida 5 ta Reel", "growth": "+11%" },
    { "title": "Google Maps rasmlarini yangilang", "growth": "+6%" }
  ],
  "socialMedia": {
    "competitorPosts": 42,
    "yourPosts": 6,
    "diff": "600%",
    "advice": "Increase Posting Frequency"
  },
  "reviews": {
    "complaints": ["Slow Service", "Parking"],
    "loves": ["Coffee", "Staff", "Interior"],
    "openOpportunity": "Parking"
  },
  "price": {
    "competitorAverage": 23400,
    "advice": "Do not reduce price. Increase value."
  },
  "swot": {
    "strengths": ["Yangi dizayn", "Motivation"],
    "weaknesses": ["Tajriba yo'q", "Baza yo'q"],
    "opportunities": ["Bozorda xizmat sifati past", "Yangi hudud"],
    "threats": ["Katta tarmoqlar (franchise)"]
  },
  "growthScore": {
    "marketing": 82, "finance": 71, "brand": 88, "customers": 79, "operations": 81, "overall": 80
  },
  "weeklyMissions": [
    "Upload 5 Reels", "Ask 30 customers for reviews", "Launch Combo"
  ],
  "notification": {
    "title": "Competitor launched New Breakfast Menu",
    "advice": "Launch your own menu."
  }
}

Use realistic estimations for social media and pricing if the API didn't provide them. 
Generate insights in English or Uzbek based on the prompt context, but keep keys exactly as specified.
Make the advice actionable and specifically tailored to the competitor data provided. For example, if competitors have high ratings but many complaints about parking, mention parking as an open opportunity.
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Clean up potential markdown formatting from Gemini
    const cleanedText = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();
    
    const parsedJSON = JSON.parse(cleanedText) as AIAnalysisResult;
    return parsedJSON;

  } catch (error) {
    console.error("AI Analysis Failed:", error);
    return null;
  }
};
