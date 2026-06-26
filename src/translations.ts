export type Language = "uz" | "ru" | "en";

export interface Translations {
  appName: string;
  appSubtitle: string;

  // Landing Page
  heroTitle: string;
  heroSub: string;
  launchDna: string;
  signIn: string;
  pricing: string;
  features: string;
  freePlan: string;
  proPlan: string;
  businessPlan: string;
  pricingSub: string;
  popular: string;
  goPro: string;
  contactSales: string;
  launchFree: string;
  forever: string;
  perMonth: string;

  // Wizard
  wizardTitle: string;
  wizardSub: string;
  cityLabel: string;
  cityPlaceholder: string;
  districtLabel: string;
  districtPlaceholder: string;
  budgetLabel: string;
  interestLabel: string;
  interestPlaceholder: string;
  experienceLabel: string;
  experiencePlaceholder: string;
  existingBusinessLabel: string;
  existingBusinessPlaceholder: string;
  monthlyIncomeLabel: string;
  monthlyIncomePlaceholder: string;
  monthlyExpenseLabel: string;
  monthlyExpensePlaceholder: string;
  prev: string;
  next: string;
  finish: string;

  // Advisor Results
  advisorTitle: string;
  advisorSubtitle: string;
  successScore: string;
  riskScore: string;
  estimatedInvestment: string;
  estimatedMonthlyProfit: string;
  roiMonths: string;
  strengths: string;
  weaknesses: string;
  bestLocation: string;
  competitors: string;
  differentiationStrategy: string;
  plan30Days: string;
  plan60Days: string;
  plan90Days: string;
  confidenceScore: string;
  dataSources: string;
  assumptions: string;
  disclaimerTitle: string;
  disclaimerText: string;
  advisorGenerating: string;
  startOver: string;

  // Sidebar Navigation
  navOverview: string;
  navAdvisor: string;
  navChat: string;
  navBudget: string;
  navLocation: string;
  navCompetitor: string;
  navTrends: string;
  navCalendar: string;
  navSimulator: string;
  navIntegrations: string;

  // Shared
  signOut: string;
  selectLanguage: string;
}

export const translations: Record<Language, Translations> = {
  uz: {
    appName: "NEXUS AI",
    appSubtitle: "AI BUSINESS ADVISOR • ",
    
    // Landing Page
    heroTitle: "Biz AI chatbot qurmadik. Biz AI Business Advisor qurdik.",
    heroSub: "Tadbirkorga har hafta aniq qaror qabul qilishga yordam beradigan tizim. AI moliyaviy holatingiz, joylashuvingiz va raqobatchilaringizni tahlil qilib, keyingi eng yaxshi qadamni tavsiya qiladi.",
    launchDna: "DNKni Ishga Tushirish",
    signIn: "Kirish",
    pricing: "Tariflar",
    features: "Imkoniyatlar",
    freePlan: "BEPUL TARIF",
    proPlan: "PRO STRATEGIYA TARIFI",
    businessPlan: "KORPORATIV TARIF",
    pricingSub: "O'z biznesingiz hajmi va ehtiyojlariga mos keladigan tarifni tanlang.",
    popular: "ENG OMMABOP",
    goPro: "PROga o'tish",
    contactSales: "Sotuv bo'limi bilan bog'lanish",
    launchFree: "Bepul boshlash",
    forever: "umrbod bepul",
    perMonth: "/ oyiga",

    // Wizard
    wizardTitle: "Ma'lumotlarni kiritish",
    wizardSub: "NEXUS AI sizga eng mos 5 ta biznes g'oyani shakllantirib berishi uchun quyidagi ma'lumotlarni kiriting.",
    cityLabel: "Qaysi shaharda biznes ochmoqchisiz?",
    cityPlaceholder: "Masalan: Toshkent",
    districtLabel: "Qaysi tumanda?",
    districtPlaceholder: "Masalan: Mirobod tumani",
    budgetLabel: "Rejalashtirilgan byudjet miqdori (UZS/USD)",
    interestLabel: "Qanday sohalarga qiziqasiz?",
    interestPlaceholder: "Masalan: IT, savdo, xizmat ko'rsatish, umumiy ovqatlanish...",
    experienceLabel: "Sohada tajribangiz bormi?",
    experiencePlaceholder: "Masalan: Ha, 3 yillik tajriba yoki Yo'q",
    existingBusinessLabel: "Mavjud biznesingiz bormi?",
    existingBusinessPlaceholder: "Agar bo'lsa qanday biznes? Agar yo'q bo'lsa 'Yo'q' deb yozing",
    monthlyIncomeLabel: "Mavjud oylik daromadingiz (ixtiyoriy)",
    monthlyIncomePlaceholder: "0",
    monthlyExpenseLabel: "Mavjud oylik xarajatlaringiz (ixtiyoriy)",
    monthlyExpensePlaceholder: "0",
    prev: "Orqaga",
    next: "Keyingisi",
    finish: "Tavsiyalarni olish",

    // Advisor Results
    advisorTitle: "NEXUS AI Tavsiyalari",
    advisorSubtitle: "Kiritilgan ma'lumotlar tahlili asosida tayyorlangan Top-5 biznes g'oyalar",
    successScore: "Muvaffaqiyat ehtimoli (Success Score)",
    riskScore: "Xavf darajasi (Risk Score)",
    estimatedInvestment: "Taxminiy boshlang'ich sarmoya",
    estimatedMonthlyProfit: "Taxminiy oylik sof foyda",
    roiMonths: "Qoplash muddati (ROI, oylarda)",
    strengths: "Kuchli tomonlari",
    weaknesses: "Zaif tomonlari",
    bestLocation: "Qaysi hududga mos",
    competitors: "Raqobatchilar haqida tahlil",
    differentiationStrategy: "Qanday farqlanishingiz mumkin",
    plan30Days: "30 kunlik reja",
    plan60Days: "60 kunlik reja",
    plan90Days: "90 kunlik reja",
    confidenceScore: "Confidence Score (Tahlil ishonchliligi):",
    dataSources: "Data Sources Used:",
    assumptions: "Assumptions:",
    disclaimerTitle: "Muhim Ogohlantirish (Disclaimer)",
    disclaimerText: "Kiritilgan ma'lumotlar asosida ushbu variantlar eng istiqbolli ko'rinadi. Lekin bu faqat maslahat hisoblanadi va moliyaviy kafolat bermaydi. Yakuniy qaror sizning zimmangizda.",
    advisorGenerating: "Ma'lumotlar tahlil qilinmoqda... 5 ta biznes g'oya generatsiya qilinmoqda.",
    startOver: "Yangi tahlil",

    // Sidebar
    navOverview: "Dashboard",
    navAdvisor: "Top-5 G'oyalar",
    navChat: "AI Chat & Voice",
    navBudget: "Smart Budget",
    navLocation: "Lokatsiya Tahlili",
    navCompetitor: "Raqobatchilar",
    navTrends: "Google Trends",
    navCalendar: "Haftalik Reja",
    navSimulator: "Ssenariy Simulyatori",
    navIntegrations: "Integratsiyalar",

    // Shared
    signOut: "Chiqish",
    selectLanguage: "Tilni tanlash",
  },
  ru: {
    appName: "NEXUS AI",
    appSubtitle: "ИИ БИЗНЕС-СОВЕТНИК • ",
    
    // Landing Page
    heroTitle: "Мы не создали ИИ-чатбота. Мы создали ИИ Бизнес-Советника.",
    heroSub: "Система, которая еженедельно помогает предпринимателям принимать точные решения. ИИ анализирует ваши финансы, локацию и конкурентов, чтобы рекомендовать следующий лучший шаг.",
    launchDna: "Запустить ДНК",
    signIn: "Войти",
    pricing: "Тарифы",
    features: "Возможности",
    freePlan: "БЕСПЛАТНЫЙ ТАРИФ",
    proPlan: "PRO СТРАТЕГИЧЕСКИЙ ТАРИФ",
    businessPlan: "КОРПОРАТИВНЫЙ ТАРИФ",
    pricingSub: "Выберите тарифный план, соответствующий масштабам вашего бизнеса.",
    popular: "САМЫЙ ПОПУЛЯРНЫЙ",
    goPro: "Перейти на PRO",
    contactSales: "Связаться с продажами",
    launchFree: "Начать бесплатно",
    forever: "бесплатно навсегда",
    perMonth: "/ в месяц",

    // Wizard
    wizardTitle: "Ввод данных",
    wizardSub: "Заполните данные ниже, чтобы NEXUS AI смог подобрать для вас 5 лучших бизнес-идей.",
    cityLabel: "В каком городе хотите открыть бизнес?",
    cityPlaceholder: "Например: Ташкент",
    districtLabel: "В каком районе?",
    districtPlaceholder: "Например: Мирабадский район",
    budgetLabel: "Планируемый бюджет (UZS/USD)",
    interestLabel: "В каких сферах вы заинтересованы?",
    interestPlaceholder: "Например: ИТ, торговля, услуги, общепит...",
    experienceLabel: "Есть ли опыт в этой сфере?",
    experiencePlaceholder: "Например: Да, 3 года опыта, или Нет",
    existingBusinessLabel: "Есть ли у вас действующий бизнес?",
    existingBusinessPlaceholder: "Какой бизнес? Если нет, напишите 'Нет'",
    monthlyIncomeLabel: "Текущий ежемесячный доход (необязательно)",
    monthlyIncomePlaceholder: "0",
    monthlyExpenseLabel: "Текущие ежемесячные расходы (необязательно)",
    monthlyExpensePlaceholder: "0",
    prev: "Назад",
    next: "Далее",
    finish: "Получить рекомендации",

    // Advisor Results
    advisorTitle: "Рекомендации NEXUS AI",
    advisorSubtitle: "Топ-5 бизнес-идей на основе анализа введенных данных",
    successScore: "Вероятность успеха (Success Score)",
    riskScore: "Уровень риска (Risk Score)",
    estimatedInvestment: "Ожидаемые стартовые инвестиции",
    estimatedMonthlyProfit: "Ожидаемая чистая прибыль (в месяц)",
    roiMonths: "Окупаемость (ROI, в месяцах)",
    strengths: "Сильные стороны",
    weaknesses: "Слабые стороны",
    bestLocation: "Рекомендуемая локация",
    competitors: "Анализ конкурентов",
    differentiationStrategy: "Стратегия отличия",
    plan30Days: "План на 30 дней",
    plan60Days: "План на 60 дней",
    plan90Days: "План на 90 дней",
    confidenceScore: "Confidence Score (Достоверность анализа):",
    dataSources: "Data Sources Used:",
    assumptions: "Assumptions:",
    disclaimerTitle: "Важное предупреждение (Disclaimer)",
    disclaimerText: "На основе введенных данных эти варианты выглядят наиболее перспективными. Однако это только советы, а не финансовая гарантия. Окончательное решение принимаете вы.",
    advisorGenerating: "Идет анализ данных... Генерируем 5 бизнес-идей.",
    startOver: "Новый анализ",

    // Sidebar
    navOverview: "Дашборд",
    navAdvisor: "Топ-5 Идей",
    navChat: "ИИ Чат и Голос",
    navBudget: "Смарт Бюджет",
    navLocation: "Анализ Локации",
    navCompetitor: "Конкуренты",
    navTrends: "Google Trends",
    navCalendar: "План на неделю",
    navSimulator: "Симулятор Сценариев",
    navIntegrations: "Интеграции",

    // Shared
    signOut: "Выйти",
    selectLanguage: "Выбор языка",
  },
  en: {
    appName: "NEXUS AI",
    appSubtitle: "AI BUSINESS ADVISOR • ",
    
    // Landing Page
    heroTitle: "We didn't build an AI chatbot. We built an AI Business Advisor.",
    heroSub: "A system that helps entrepreneurs make actionable decisions every week. The AI analyzes your financials, location, and competitors to recommend the best next step.",
    launchDna: "Launch DNA",
    signIn: "Sign In",
    pricing: "Pricing",
    features: "Features",
    freePlan: "FREE PLAN",
    proPlan: "PRO STRATEGY PLAN",
    businessPlan: "BUSINESS PLAN",
    pricingSub: "Choose a plan that fits your business scale and ambitions perfectly.",
    popular: "MOST POPULAR",
    goPro: "Go Pro",
    contactSales: "Contact Sales",
    launchFree: "Launch Free",
    forever: "forever free",
    perMonth: "/ month",

    // Wizard
    wizardTitle: "Enter your data",
    wizardSub: "Fill in the details below so NEXUS AI can generate the top 5 business ideas for you.",
    cityLabel: "Which city do you want to start your business in?",
    cityPlaceholder: "e.g. Tashkent",
    districtLabel: "Which district?",
    districtPlaceholder: "e.g. Mirabad district",
    budgetLabel: "Planned budget (UZS/USD)",
    interestLabel: "What areas are you interested in?",
    interestPlaceholder: "e.g. IT, retail, services, food & beverage...",
    experienceLabel: "Do you have experience in this field?",
    experiencePlaceholder: "e.g. Yes, 3 years, or No",
    existingBusinessLabel: "Do you have an existing business?",
    existingBusinessPlaceholder: "What kind? If not, write 'No'",
    monthlyIncomeLabel: "Current monthly income (optional)",
    monthlyIncomePlaceholder: "0",
    monthlyExpenseLabel: "Current monthly expenses (optional)",
    monthlyExpensePlaceholder: "0",
    prev: "Back",
    next: "Next",
    finish: "Get Recommendations",

    // Advisor Results
    advisorTitle: "NEXUS AI Recommendations",
    advisorSubtitle: "Top 5 business ideas based on your input analysis",
    successScore: "Success Score",
    riskScore: "Risk Score",
    estimatedInvestment: "Estimated Investment",
    estimatedMonthlyProfit: "Estimated Monthly Profit",
    roiMonths: "Payback Period (ROI in months)",
    strengths: "Strengths",
    weaknesses: "Weaknesses",
    bestLocation: "Best Location",
    competitors: "Competitor Analysis",
    differentiationStrategy: "How to Differentiate",
    plan30Days: "30-Day Plan",
    plan60Days: "60-Day Plan",
    plan90Days: "90-Day Plan",
    confidenceScore: "Confidence Score:",
    dataSources: "Data Sources Used:",
    assumptions: "Assumptions:",
    disclaimerTitle: "Disclaimer",
    disclaimerText: "Based on the input data, these options look the most promising. However, this is advice, not a financial guarantee. The final decision is yours.",
    advisorGenerating: "Analyzing data... Generating top 5 business ideas.",
    startOver: "Start Over",

    // Sidebar
    navOverview: "Dashboard",
    navAdvisor: "Top-5 Ideas",
    navChat: "AI Chat & Voice",
    navBudget: "Smart Budget",
    navLocation: "Location Analysis",
    navCompetitor: "Competitors",
    navTrends: "Google Trends",
    navCalendar: "Weekly Plan",
    navSimulator: "Scenario Simulator",
    navIntegrations: "Integrations",

    // Shared
    signOut: "Sign Out",
    selectLanguage: "Select Language",
  }
};
