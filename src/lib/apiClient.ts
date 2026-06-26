// Client-side API fallback handler
// If the full-stack server is not available (e.g. deployed on static hosting like Netlify),
// this client-side fallback mimics the same high-fidelity response structure.

interface DnaContext {
  industry: string;
  location: string;
  budget: number;
  budgetCurrency: string;
  targetAudience: string;
  riskLevel: string;
  growthGoal: string;
  marketingChannels: string[];
  businessModel: string;
  competition: string;
  brandStyle: string;
  pricingStrategy: string;
  vision: string;
  mission: string;
  personality: string;
}

export async function apiRequest(endpoint: string, payload: any): Promise<any> {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        // Ensure we got a valid JSON object and not a generic index.html fallback from a static router
        if (data && typeof data === "object" && !("html" in data)) {
          return data;
        }
      }
    }
    
    // If we reach here, response was not OK, or not JSON (e.g., Netlify 404 HTML fallback)
    console.warn(`[TAYANCH API Client] Endpoint ${endpoint} returned non-OK or non-JSON response. Activating high-fidelity client-side intelligence.`);
    return handleFallback(endpoint, payload);
  } catch (error) {
    console.warn(`[TAYANCH API Client] Failed to connect to backend server at ${endpoint}. Activating high-fidelity client-side intelligence.`, error);
    return handleFallback(endpoint, payload);
  }
}

function handleFallback(endpoint: string, payload: any): any {
  const { dna, keyword, messages, agent } = payload;
  const context = dna || {};

  if (endpoint.endsWith("/analyze")) {
    return getMockPassport(context);
  } else if (endpoint.endsWith("/chat")) {
    return { text: getMockChatResponse(agent, messages || [], context), fallback: true };
  } else if (endpoint.endsWith("/plan")) {
    return { ...getMockBusinessPlan(context), fallback: true };
  } else if (endpoint.endsWith("/brand")) {
    return { ...getMockBranding(context), fallback: true };
  } else if (endpoint.endsWith("/finance")) {
    return { ...getMockFinancials(context), fallback: true };
  } else if (endpoint.endsWith("/market-trends")) {
    return { ...getMockMarketTrends(context), fallback: true };
  } else if (endpoint.endsWith("/google-trends")) {
    return { ...getMockGoogleTrendsKeyword(context, keyword || ""), fallback: true };
  }

  throw new Error(`Unknown endpoint fallback request: ${endpoint}`);
}

// ============================================================================
// HIGH-FIDELITY MOCK DATA GENERATION (MATCHES SERVER-SIDE LOGIC EXACTLY)
// ============================================================================

function getMockPassport(dna: any) {
  const launchScore = Math.floor(65 + Math.random() * 25);
  const marketingScore = Math.floor(55 + Math.random() * 35);
  const financialScore = Math.floor(60 + Math.random() * 30);
  const riskScore = dna.riskLevel === 'Low' ? 85 : dna.riskLevel === 'Medium' ? 65 : 45;
  const growthScore = Math.floor(70 + Math.random() * 25);
  const brandScore = Math.floor(60 + Math.random() * 35);
  const overall = Math.round((launchScore + marketingScore + financialScore + riskScore + growthScore + brandScore) / 6);

  const budgetNum = Number(dna.budget || 50000000);
  const budgetStr = budgetNum.toLocaleString();
  const currency = dna.budgetCurrency || "UZS";

  return {
    scores: {
      launch: launchScore,
      marketing: marketingScore,
      financial: financialScore,
      risk: riskScore,
      growth: growthScore,
      brand: brandScore,
      overall: overall
    },
    recommendation: `Tayanch AI launch evaluation for your proposed **${dna.industry || "Business"}** in **${dna.location || "Tashkent"}** indicates highly promising potential. Your estimated budget of **${budgetStr} ${currency}** is sufficient to launch a polished MVP, provided you minimize early capital expenditures. Your high-level objective should focus heavily on customer validation and leveraging local digital channels like Telegram, Instagram, and local community loops. Establish immediate pricing that secures positive cash flow within 45 days.`,
    swot: {
      strengths: [
        `Tailored solution specifically solving immediate customer friction in the ${dna.industry || "target"} sector.`,
        `Low operating overhead aligned with a lean ${dna.businessModel || "direct-to-consumer"} model.`,
        `Strong local target audience focus: ${dna.targetAudience || "local customers"}.`,
        `Distinct company personality (${dna.personality || "Friendly"}) resonates with modern consumers.`
      ],
      weaknesses: [
        `Relatively limited initial capital budget (${budgetStr} ${currency}) for aggressive market penetration.`,
        `High reliance on dynamic pricing and direct digital sales channels which require steep customer trust.`,
        `Direct and indirect local competition: ${dna.competition || "traditional players"}.`
      ],
      opportunities: [
        `Rapid regional expansion in Tashkent and other fast-growing Central Asian business hubs.`,
        `Integrating seamless mobile-payments (Click, Payme, Uzcard, Humo) for zero-friction buying.`,
        `Building an automated Telegram Bot channel to capture high-density Uzbek and regional chat audiences.`
      ],
      threats: [
        `Sudden shifts in consumer preferences or regulatory compliance issues.`,
        `Rapid replica releases by larger capital-backed regional competitors.`,
        `High cost-of-acquisition spikes on traditional paid social media networks.`
      ]
    },
    marketOverview: `The **${dna.industry || "selected"}** sector in **${dna.location || "Uzbekistan"}** is currently experiencing double-digit annual growth, fueled by digitalization and a rising demographic of energetic entrepreneurs and digital-native customers. Local competitor analysis of "**${dna.competition || "existing solutions"}**" reveals that traditional players suffer from slow customer onboarding and high service prices. By positioning your company with a **${dna.personality || "Sophisticated"}** personality, and focusing on a highly agile **${dna.businessModel || "lean"}** model, you can rapidly siphon off early-stage demand.`,
    marketingStrategy: `To capture **${dna.targetAudience || "your ideal segment"}**, implement a highly targeted regional launch. Leverage ${dna.marketingChannels?.join(", ") || "social media"} with custom visual campaigns. Standardized pricing via a "${dna.pricingStrategy || "value-based"}" model will establish rapid trust. Capitalize heavily on peer-to-peer viral mechanics by introducing custom referral discounts and regional Telegram community partnerships.`
  };
}

function getMockChatResponse(agent: any, messages: any[], dna: any): string {
  const userMsg = messages[messages.length - 1]?.text?.toLowerCase() || "";
  const companyInfo = `our **${dna?.industry || "venture"}** based in **${dna?.location || "Tashkent"}**`;

  if (agent.id === "ceo") {
    if (userMsg.includes("uzbekistan") || userMsg.includes("tashkent") || userMsg.includes("market")) {
      return `As your AI CEO, I must highlight that the Uzbek market is experiencing an unprecedented digital boom. To win in ${dna?.location || "Tashkent"}, we need to prioritize three things:\n\n1. **Telegram Ecosystem First**: In Uzbekistan, Telegram is not just a chat app; it is the entire internet. We must launch a high-converting Telegram webapp/bot.\n2. **Mobile Integration**: Integrate Click and Payme APIs on day one. Our customers expect instant payments without leaving their smartphones.\n3. **Localization**: Ensure all copywriting has perfect Uzbek and Russian variants. This doubles our reach instantly.\n\nWhat is your perspective on starting with a soft-launch in the capital city?`;
    }
    return `That is a tactical milestone we need to secure. To establish ${companyInfo} as a dominant force, my immediate recommendation is to validate our value proposition with a closed beta group of 50 active users from our target segment (**${dna?.targetAudience || "our audience"}**).\n\nThis keeps our burn rate incredibly low while we refine the product-market fit. Let's outline the core operational checklist. What specific department are you most concerned about right now?`;
  }

  if (agent.id === "cfo") {
    const budgetVal = Number(dna?.budget || 50000000);
    const currency = dna?.budgetCurrency || "UZS";
    if (userMsg.includes("budget") || userMsg.includes("cost") || userMsg.includes("price") || userMsg.includes("money")) {
      return `Let's talk unit economics. With our budget of **${budgetVal.toLocaleString()} ${currency}**, we must be extremely surgical:\n\n- **60% CAPEX**: Product Development & Licensing. Keep this lean. Use no-code or robust templates first.\n- **30% Working Capital**: Customer Acquisition and onboarding tests.\n- **10% Buffer**: Reserve this for compliance, local taxes, or payment gateway setup fees.\n\nBased on our **${dna?.pricingStrategy || "value-based"}** pricing strategy, we can target a break-even point in month 4 if we secure at least 150 high-paying monthly active clients. Let's look at adjusting the operational expenses to see where we can trim fat.`;
    }
    return `From a financial perspective, cash flow is our lifeblood. We must avoid locking up capital in long-term office leases or complex inventory models early on. Let's focus on building a lean subscription or digital transactional flow. Shall we calculate our detailed burn-rate or review the monthly cash-flow forecast?`;
  }

  if (agent.id === "cmo") {
    return `Our branding voice as a **${dna?.personality || "Professional"}** brand must be clear and direct. For ${companyInfo}, we should activate the following marketing channels: **${dna?.marketingChannels?.join(" and ") || "Social Media"}**.\n\nHere is our 3-step acquisition flywheel:\n1. **High-Value Education**: Share insider tips on how our product solves their specific pain points.\n2. **Micro-Influencer Amplification**: Partner with niche local creators who already have the trust of **${dna?.targetAudience || "our audience"}**.\n3. **Launch Day Incentives**: Offer exclusive, limited-edition lifetime pricing to the first 100 subscribers to create high FOMO.\n\nShould we draft our launch campaign or brainstorm key slogans?`;
  }

  if (agent.id === "growth") {
    return `To execute our growth goal of "**${dna?.growthGoal || "Rapid market entry"}**", we need to think like growth hackers. Let's implement a referral program where existing clients get immediate platform credits or cash back via Click/Payme when they refer a new paying customer. This creates an organic viral coefficient. Let's look at the analytics funnel: we want a conversion rate of at least 3.5% from landing page visitor to active lead. What are your thoughts on implementing this referral loop?`;
  }

  return `That makes perfect sense. Under our Business DNA, we are building a highly innovative business. Let's map out exactly how we can execute this step to maximize our launching score. What other questions can I answer for you?`;
}

function getMockBusinessPlan(dna: any) {
  const budgetNum = Number(dna.budget || 50000000);
  const currency = dna.budgetCurrency || "UZS";

  return {
    executiveSummary: `Tayanch AI has architected this Business Plan to outline the strategic deployment of a premier **${dna.industry || "Startup"}** startup in **${dna.location || "Uzbekistan"}**. Operating under a high-efficiency **${dna.businessModel || "scalable"}** model, our company targets the critical pain points faced by **${dna.targetAudience || "our audience"}**. Backed by an optimized initial budget of **${budgetNum.toLocaleString()} ${currency}**, this business is designed for exponential cash flow generation, targeting regional market dominance.`,
    problemSolution: `Traditional solutions in the ${dna.industry || "target"} segment are plagued by slow delivery speeds, outdated client interfaces, and high pricing structures. Our startup directly solves this by delivering an ultra-personalized, digital-first experience that fits seamlessly into the user's daily workflow. Our customized value proposition is powered by an agile operations stack, providing premium results at an affordable entry cost.`,
    marketAnalysis: `The target market for our services in **${dna.location || "Tashkent"}** represents a massive underserved segment. Main competitors like "**${dna.competition || "existing services"}**" are sluggish and fail to capture digital-savvy cohorts. By leveraging a cohesive **${dna.personality || "Sophisticated"}** brand style, we project capturing a 3.5% market share within the first 12 months, fueled by rapid regional urbanization and high smartphone penetration.`,
    marketingSales: `Our marketing blueprint relies on high-impact channels including **${dna.marketingChannels?.join(", ") || "organic and digital campaigns"}**. We will implement a "${dna.pricingStrategy || "value-based"}" pricing strategy to maximize customer acquisition speed. Customer onboarding will be facilitated by self-serve digital onboarding and localized community partnerships.`,
    financialForecast: `With an initial capital of **${budgetNum.toLocaleString()} ${currency}**, our forecast expects to achieve positive monthly cash flow by Month 3. High margin services combined with automated transactional loops ensure a 68% gross margin. We project hitting our critical break-even threshold within 120 days.`,
    riskMitigation: `Key identified risks include dynamic competitor pricing moves and customer retention fluctuations. We mitigate these risks by locking in long-term subscriber commitments via customized branding perks, executing continuous product feedback loops, and keeping our operational burn-rate extremely lean.`,
    timeline: [
      "Month 1: Brand identity design, corporate registration, and merchant account setup (Click, Payme).",
      "Month 2: Soft launch of the minimum viable product (MVP) to a closed pool of 100 beta participants.",
      "Month 3: Full public launch across the main target regions in Tashkent accompanied by aggressive viral referral programs.",
      "Month 4: Introduce advanced automation, expand marketing channels, and evaluate early unit profitability.",
      "Month 5: Initiate partnership negotiations with major commercial networks and key localized influencers.",
      "Month 6: Scale operations, expand the remote customer success team, and prepare a Series-A pitch."
    ]
  };
}

function getMockBranding(dna: any) {
  return {
    slogans: [
      `Elevating the Future of ${dna.industry || "Business"}.`,
      `The Intelligent Choice for ${dna.targetAudience || "Modern Creators"}.`,
      `Smarter Decisions. Faster Growth. Perfect Execution.`,
      `Redefining ${dna.industry || "Your Sector"} with Pure Elegance.`,
      `Unleash Your Business DNA.`
    ],
    colors: [
      { name: "Cosmic Charcoal", hex: "#0D0E12" },
      { name: "Sleek Platinum", hex: "#E2E8F0" },
      { name: "Neon Emerald", hex: "#10B981" },
      { name: "Deep Cobalt", hex: "#1E3A8A" },
      { name: "Warm Amber", hex: "#F59E0B" }
    ],
    brandVoice: `The brand voice for our company is **${dna.personality || "Sophisticated and Modern"}**. Communication should be highly professional, authoritative, yet encouraging and accessible. Avoid unnecessary corporate jargon; favor clean, data-driven typography, and speak directly to the entrepreneur or customer's aspirations. In regional Uzbek copywriting, use a refined and highly polite tone that inspires ultimate consumer trust.`,
    visualDirection: `The visual aesthetic embraces premium Apple-style luxury minimalism. Focus on high-contrast layouts utilizing deep black backgrounds paired with crisp silver typography. Accent elements should be highlights in Neon Emerald to indicate growth and dynamic action. Use generous negative space and avoid messy border styles. Typography should pair modern Sans-serif titles (e.g., Space Grotesk) with Mono font accents for technical accuracy.`
  };
}

function getMockFinancials(dna: any) {
  const budgetVal = Number(dna.budget || 50000000);
  const isUSD = dna.budgetCurrency === 'USD';

  const startupCosts = [
    { category: "Product Development & Tech Stack", cost: Math.round(budgetVal * 0.45) },
    { category: "Brand Design & Marketing Launch", cost: Math.round(budgetVal * 0.25) },
    { category: "Legal, Registration & Licensing", cost: Math.round(budgetVal * 0.15) },
    { category: "Working Capital Buffer", cost: Math.round(budgetVal * 0.15) }
  ];

  const monthlyExpenses = [
    { category: "Server, AI API & SaaS Licenses", cost: isUSD ? 250 : 2500000 },
    { category: "Targeted Marketing & Ad Spend", cost: isUSD ? 400 : 4500000 },
    { category: "Operations, Support & Freelancers", cost: isUSD ? 500 : 5000000 },
    { category: "Miscellaneous/Buffer", cost: isUSD ? 100 : 1000000 }
  ];

  const baseMonthlyExp = monthlyExpenses.reduce((acc: number, curr: any) => acc + curr.cost, 0);

  const projectedRevenue = [
    { month: "Month 1", revenue: Math.round(baseMonthlyExp * 0.4), profit: Math.round(baseMonthlyExp * 0.4) - baseMonthlyExp },
    { month: "Month 2", revenue: Math.round(baseMonthlyExp * 0.8), profit: Math.round(baseMonthlyExp * 0.8) - baseMonthlyExp },
    { month: "Month 3", revenue: Math.round(baseMonthlyExp * 1.3), profit: Math.round(baseMonthlyExp * 1.3) - baseMonthlyExp },
    { month: "Month 4", revenue: Math.round(baseMonthlyExp * 1.8), profit: Math.round(baseMonthlyExp * 1.8) - baseMonthlyExp },
    { month: "Month 5", revenue: Math.round(baseMonthlyExp * 2.4), profit: Math.round(baseMonthlyExp * 2.4) - baseMonthlyExp },
    { month: "Month 6", revenue: Math.round(baseMonthlyExp * 3.1), profit: Math.round(baseMonthlyExp * 3.1) - baseMonthlyExp }
  ];

  return {
    startupCosts,
    monthlyExpenses,
    projectedRevenue
  };
}

function getMockMarketTrends(dna: any) {
  return {
    trends: [
      {
        name: `Raqamlashtirish & Shoshilinch Buyurtmalar ko'payishi`,
        category: "news",
        index: 185,
        impact: "High",
        recommendation: `Mijozlar buyurtmalarni Telegram WebApp va qisqa vaqtda yetkazishni talab qilmoqda. Telegram-Bot va mobil xizmatlarni yo'lga qo'ying.`,
        source: "Spot.uz"
      },
      {
        name: `Click va Payme orqali bir martalik va to'g'ridan-to'g'ri to'lovlar`,
        category: "social",
        index: 240,
        impact: "High",
        recommendation: `Uzbekistondagi premium mijozlar uchun barcha to'lovlar Click/Payme API orqali amalga oshishini taminlash.`,
        source: "Telegram Community"
      },
      {
        name: `Ekologik toza va milliy brending trendi`,
        category: "industry",
        index: 120,
        impact: "Medium",
        recommendation: `Qadoqlash va mahsulotda o'zbek an'analari va ekologik tozalikni aks ettiring.`,
        source: "Gazeta.uz"
      },
      {
        name: `Soliq hisobotlarini avtomatlashtirish (Didox integratsiyasi)`,
        category: "news",
        index: 95,
        impact: "Medium",
        recommendation: `Tadbirkorlarning soliq yukini kamaytirish va hisobotlarni to'g'ridan-to'g'ri MySoliq tizimiga integratsiya qilish kerak.`,
        source: "Soliq Qo'mitasi"
      }
    ],
    chartData: [
      { month: "Yan", current: 35, baseline: 25 },
      { month: "Fev", current: 48, baseline: 30 },
      { month: "Mar", current: 65, baseline: 32 },
      { month: "Apr", current: 85, baseline: 40 },
      { month: "May", current: 98, baseline: 42 },
      { month: "Iyun", current: 120, baseline: 45 }
    ]
  };
}

function getMockGoogleTrendsKeyword(dna: any, keyword: string) {
  const indexVal = Math.floor(40 + Math.random() * 55);
  return {
    keyword,
    sentiment: indexVal > 70 ? "High" : "Increasing",
    analysis: `O'zbekiston miqyosida "${keyword}" qidiruvi so'nggi 3 oy ichida sezilarli darajada oshgan. Mirobod va Yakkasaroy hududlarida eng yuqori qiziqish kuzatiladi.`,
    volume: Math.floor(12000 + Math.random() * 38000),
    competition: indexVal > 60 ? "High" : "Medium"
  };
}
