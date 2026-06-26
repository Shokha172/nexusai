export interface BusinessDNA {
  city: string;
  district: string;
  budget: number;
  interest: string;
  experience: string;
  existingBusiness: string; // "Yo'q" or business details
  monthlyIncome: number;    // optional, can be 0
  monthlyExpense: number;   // optional, can be 0
}

export interface CompetitorAnalysis {
  name: string;
  strengths: string[];
  weaknesses: string[];
}

export interface BusinessIdea {
  id: string;
  title: string;
  description: string;
  successScore: number;
  riskScore: number;
  estimatedInvestment: number;
  estimatedMonthlyProfit: number;
  roiMonths: number;
  strengths: string[];
  weaknesses: string[];
  bestLocation: string;
  competitors: CompetitorAnalysis[];
  differentiationStrategy: string;
  plan30Days: string[];
  plan60Days: string[];
  plan90Days: string[];
  confidenceScore: number;
  dataSources: string;
  assumptions: string;
}

// For Auth
export interface UserProfile {
  name: string;
  email: string;
}
