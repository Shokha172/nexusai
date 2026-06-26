import { motion } from "motion/react";
import { ArrowRight, Bot, Shield, LineChart, Globe } from "lucide-react";
import { Language, translations } from "../translations";

interface LandingPageProps {
  onStart: () => void;
  onLogin: () => void;
  lang: Language;
  onSetLang: (l: Language) => void;
}

export default function LandingPage({ onStart, onLogin, lang, onSetLang }: LandingPageProps) {
  const t = translations[lang];

  const features = [
    {
      icon: <LineChart className="w-6 h-6 text-emerald-400" />,
      title: lang === "uz" ? "Moliyaviy Tahlil" : lang === "ru" ? "Финансовый Анализ" : "Financial Analysis",
      description: lang === "uz" 
        ? "Kirim-chiqim, foyda, zaif nuqtalar va byudjetni taqsimlash bo'yicha aqlli tavsiyalar."
        : lang === "ru"
        ? "Умные рекомендации по доходам, расходам, слабым местам и распределению бюджета."
        : "Smart recommendations for cash flow, profit, weak points, and budget allocation."
    },
    {
      icon: <Shield className="w-6 h-6 text-emerald-400" />,
      title: lang === "uz" ? "Raqobatchilar Tahlili" : lang === "ru" ? "Анализ Конкурентов" : "Competitor Intelligence",
      description: lang === "uz"
        ? "Raqobatchilarning reytingi, narxlari va kuchli tomonlarini AI orqali taqqoslash."
        : lang === "ru"
        ? "Сравнение рейтингов, цен и сильных сторон конкурентов с помощью ИИ."
        : "Compare competitor ratings, pricing, and strengths using AI."
    },
    {
      icon: <Globe className="w-6 h-6 text-emerald-400" />,
      title: lang === "uz" ? "Joylashuv Tahlili" : lang === "ru" ? "Анализ Локации" : "Location Intelligence",
      description: lang === "uz"
        ? "Raqobat zichligi va aholi talabi asosida biznesingiz uchun eng yaxshi joyni tanlang."
        : lang === "ru"
        ? "Выберите лучшее место для вашего бизнеса на основе плотности конкуренции и спроса."
        : "Choose the best location for your business based on competition density and demand."
    },
    {
      icon: <Bot className="w-6 h-6 text-emerald-400" />,
      title: lang === "uz" ? "Haftalik AI Mentor" : lang === "ru" ? "Еженедельный ИИ-ментор" : "Weekly AI Mentor",
      description: lang === "uz"
        ? "Har hafta biznes holatingiz bo'yicha aniq vazifalar, ogohlantirishlar va o'sish bo'yicha tavsiyalar."
        : lang === "ru"
        ? "Еженедельные задачи, предупреждения и рекомендации по росту для вашего бизнеса."
        : "Weekly actionable tasks, warnings, and growth recommendations for your business."
    }
  ];

  const pricingPlans = [
    {
      name: t.freePlan,
      price: "0 UZS",
      period: t.forever,
      features: lang === "uz" ? [
        "Bitta Biznes DNK",
        "Asosiy moliyaviy tahlil",
        "3 ta raqobatchini qidirish",
        "Asosiy AI tavsiyalari"
      ] : lang === "ru" ? [
        "Одна ДНК бизнеса",
        "Базовый финансовый анализ",
        "Поиск 3 конкурентов",
        "Базовые рекомендации ИИ"
      ] : [
        "One Business DNA",
        "Basic Financial Analysis",
        "Search 3 Competitors",
        "Basic AI Recommendations"
      ],
      cta: t.launchFree,
      popular: false
    },
    {
      name: t.proPlan,
      price: "199,000 UZS",
      period: t.perMonth,
      features: lang === "uz" ? [
        "Cheksiz Biznes DNK",
        "Chuqur moliyaviy prognoz",
        "Cheksiz raqobatchilar tahlili",
        "Joylashuv xaritasi va tahlili",
        "Haftalik AI Mentor hisobotlari",
        "Integratsiyalar (my.gov, Soliq)"
      ] : lang === "ru" ? [
        "Безлимитная ДНК бизнеса",
        "Глубокий финансовый прогноз",
        "Анализ конкурентов без ограничений",
        "Карта локаций и анализ",
        "Еженедельные отчеты ИИ-ментора",
        "Интеграции (my.gov, Soliq)"
      ] : [
        "Unlimited Business DNA",
        "Deep Financial Projections",
        "Unlimited Competitor Analysis",
        "Location Map & Intelligence",
        "Weekly AI Mentor Reports",
        "Integrations (my.gov, Soliq)"
      ],
      cta: t.goPro,
      popular: true
    },
    {
      name: t.businessPlan,
      price: "499,000 UZS",
      period: t.perMonth,
      features: lang === "uz" ? [
        "PRO tarifidagi barcha imkoniyatlar",
        "Jamoaviy hamkorlik",
        "API orqali ulanish",
        "PDF biznes xulosa hisobotlari",
        "Shaxsiy menejer"
      ] : lang === "ru" ? [
        "Все возможности тарифа PRO",
        "Командная работа",
        "Доступ к API",
        "PDF-отчеты бизнес-сводок",
        "Личный менеджер"
      ] : [
        "Everything in PRO tier",
        "Team Collaboration",
        "API Access",
        "PDF Business Summary Reports",
        "Personal Manager"
      ],
      cta: t.contactSales,
      popular: false
    }
  ];

  return (
    <div id="landing-container" className="min-h-screen bg-[#090A0F] text-slate-100 font-sans selection:bg-emerald-500 selection:text-black overflow-x-hidden">
      {/* Header */}
      <header className="border-b border-slate-900 bg-[#090A0F]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-md">
              <div className="w-4.5 h-4.5 bg-black rounded-sm rotate-45"></div>
            </div>
            <span className="font-sans font-bold text-lg tracking-tight text-white">
              NEXUS AI
            </span>
            <span className="text-[10px] font-mono border border-slate-800 text-slate-500 px-1.5 py-0.5 rounded uppercase">
              BETA
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">{t.features}</a>
            <a href="#pricing" className="hover:text-white transition-colors">{t.pricing}</a>
            <div className="flex bg-[#111] border border-slate-800 rounded-full p-0.5">
              <button 
                id="lang-uz-btn"
                onClick={() => onSetLang("uz")}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono transition-all ${
                  lang === "uz" ? "bg-white text-black" : "text-slate-400 hover:text-white"
                }`}
              >
                UZB
              </button>
              <button 
                id="lang-ru-btn"
                onClick={() => onSetLang("ru")}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono transition-all ${
                  lang === "ru" ? "bg-white text-black" : "text-slate-400 hover:text-white"
                }`}
              >
                РУС
              </button>
              <button 
                id="lang-en-btn"
                onClick={() => onSetLang("en")}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono transition-all ${
                  lang === "en" ? "bg-white text-black" : "text-slate-400 hover:text-white"
                }`}
              >
                ENG
              </button>
            </div>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              id="header-login-btn"
              onClick={onLogin}
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              {t.signIn}
            </button>
            <button 
              id="header-start-btn"
              onClick={onStart}
              className="bg-white text-black text-xs md:text-sm font-bold px-4 py-2 rounded-full hover:bg-neutral-200 transition-all shadow-md flex items-center gap-1.5"
            >
              {t.launchDna} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.04)_0,transparent_60%)] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 border border-[#1F1F1F] bg-[#0A0A0A] text-slate-400 px-3.5 py-1.5 rounded-full text-xs font-mono mb-8"
          >
            <Bot className="w-3.5 h-3.5 text-white" />
            <span>{lang === "uz" ? "AI Business Advisor for Uzbekistan" : lang === "ru" ? "ИИ Бизнес-Советник для Узбекистана" : "AI Business Advisor for Uzbekistan"}</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl font-sans font-medium tracking-tight text-white leading-[1.1] mb-6"
          >
            {lang === "uz" ? (
              <>Biz AI chatbot qurmadik. Biz <span className="text-white font-semibold underline decoration-neutral-750 decoration-wavy underline-offset-8">AI Business Advisor</span> qurdik.</>
            ) : lang === "ru" ? (
              <>Мы не создали ИИ-чатбота. Мы создали <span className="text-white font-semibold underline decoration-neutral-750 decoration-wavy underline-offset-8">ИИ Бизнес-Советника.</span></>
            ) : (
              <>We didn't build an AI chatbot. We built an <span className="text-white font-semibold underline decoration-neutral-750 decoration-wavy underline-offset-8">AI Business Advisor.</span></>
            )}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10"
          >
            {t.heroSub}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              id="hero-primary-btn"
              onClick={onStart}
              className="w-full sm:w-auto bg-white hover:bg-neutral-200 text-black font-bold text-base px-8 py-4 rounded-full transition-all shadow-lg flex items-center justify-center gap-2"
            >
              {lang === "uz" ? "Platformaga Kirish" : lang === "ru" ? "Войти в платформу" : "Enter Platform"} <ArrowRight className="w-5 h-5" />
            </button>
            <a 
              href="#features"
              className="w-full sm:w-auto border border-[#333] bg-[#050505] text-slate-300 hover:text-white hover:bg-[#111] transition-all font-semibold text-base px-8 py-4 rounded-full flex items-center justify-center"
            >
              {lang === "uz" ? "Imkoniyatlarni O'rganish" : lang === "ru" ? "Изучить возможности" : "Explore Capabilities"}
            </a>
          </motion.div>
        </div>
      </section>

      {/* Grid Dashboard Preview Mock */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto border border-slate-800 bg-[#0d0e12] rounded-2xl overflow-hidden shadow-2xl shadow-emerald-950/10">
          <div className="h-10 border-b border-slate-900 bg-[#0b0c0f] flex items-center px-4 gap-2">
            <span className="w-3 h-3 rounded-full bg-slate-800"></span>
            <span className="w-3 h-3 rounded-full bg-slate-800"></span>
            <span className="w-3 h-3 rounded-full bg-slate-800"></span>
            <span className="text-xs text-slate-600 font-mono ml-4">https://nexusai.uz/dashboard</span>
          </div>
          <div className="p-4 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 opacity-85">
            {/* Financials card mock */}
            <div className="md:col-span-4 bg-slate-950/50 border border-slate-900 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono text-emerald-400 tracking-wider">{lang === "uz" ? "MOLIYAVIY SOG'LOM" : lang === "ru" ? "ФИНАНСОВОЕ ЗДОРОВЬЕ" : "FINANCIAL HEALTH"}</span>
                <h3 className="text-lg font-medium text-white mt-1">{lang === "uz" ? "Byudjet Taqsimoti" : lang === "ru" ? "Распределение Бюджета" : "Budget Allocation"}</h3>
              </div>
              <div className="my-6 space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1"><span className="text-slate-400">Marketing</span> <span className="text-white">25%</span></div>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full"><div className="bg-emerald-400 h-1.5 rounded-full w-[25%]"></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1"><span className="text-slate-400">Inventory</span> <span className="text-white">35%</span></div>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full"><div className="bg-indigo-400 h-1.5 rounded-full w-[35%]"></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1"><span className="text-slate-400">Emergency</span> <span className="text-white">10%</span></div>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full"><div className="bg-orange-400 h-1.5 rounded-full w-[10%]"></div></div>
                </div>
              </div>
              <p className="text-xs text-slate-400">"{lang === "uz" ? "Siz reklamaga 32% sarflayapsiz, raqobatchilar esa 18%. Reklama xarajatlarini kamaytiring." : lang === "ru" ? "Вы тратите 32% на рекламу, а конкуренты - 18%. Сократите рекламные расходы." : "You spend 32% on ads while competitors spend 18%. Reduce ad spending."}"</p>
            </div>

            {/* AI Mentor card mock */}
            <div className="md:col-span-5 bg-slate-950/50 border border-slate-900 rounded-xl p-5">
              <span className="text-[11px] font-mono text-emerald-400 tracking-wider">{lang === "uz" ? "HAFTALIK AI MENTOR" : lang === "ru" ? "ЕЖЕНЕДЕЛЬНЫЙ ИИ-МЕНТОР" : "WEEKLY AI MENTOR"}</span>
              <h3 className="text-lg font-medium text-white mt-1">{lang === "uz" ? "Joriy haftalik vazifalar" : lang === "ru" ? "Задачи на текущую неделю" : "Current Weekly Tasks"}</h3>
              <div className="mt-4 space-y-3">
                <div className="flex gap-2.5 items-start">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400"><Bot className="w-3.5 h-3.5"/></div>
                  <div className="bg-slate-900/80 px-3 py-2 rounded-lg text-xs text-slate-300 w-full">
                    <span className="font-semibold text-white mb-1 block">{lang === "uz" ? "Tavsiya: Narxlarni qayta ko'rib chiqing" : lang === "ru" ? "Рекомендация: Пересмотрите цены" : "Recommendation: Review Pricing"}</span>
                    {lang === "uz" ? "Aylanma mablag'ingiz past. Premium xizmatlar narxini 10% ga oshirib ko'ring." : lang === "ru" ? "У вас низкий оборот. Попробуйте увеличить цены на премиум-услуги на 10%." : "Your cash flow is low. Try increasing premium service pricing by 10%."}
                  </div>
                </div>
                <div className="flex gap-2.5 items-start">
                  <div className="w-6 h-6 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400"><Bot className="w-3.5 h-3.5"/></div>
                  <div className="bg-slate-900/80 px-3 py-2 rounded-lg text-xs text-slate-300 w-full border border-orange-900/30">
                    <span className="font-semibold text-orange-400 mb-1 block">{lang === "uz" ? "Ogohlantirish: Mijozlar yo'qotilmoqda" : lang === "ru" ? "Предупреждение: Потеря клиентов" : "Warning: Customer Churn"}</span>
                    {lang === "uz" ? "Yangi raqobatchi bozorda paydo bo'ldi. Sodiqlik dasturini joriy qiling." : lang === "ru" ? "На рынке появился новый конкурент. Внедрите программу лояльности." : "A new competitor appeared. Implement a loyalty program."}
                  </div>
                </div>
              </div>
            </div>

            {/* Location & Competitors mock */}
            <div className="md:col-span-3 bg-slate-950/50 border border-slate-900 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono text-emerald-400 tracking-wider">{lang === "uz" ? "LOKATSIYA VA RAQOBAT" : lang === "ru" ? "ЛОКАЦИЯ И КОНКУРЕНТЫ" : "LOCATION & COMPETITION"}</span>
                <h3 className="text-lg font-medium text-white mt-1">{lang === "uz" ? "Bozor tahlili" : lang === "ru" ? "Анализ рынка" : "Market Analysis"}</h3>
              </div>
              <div className="space-y-2 font-mono text-xs my-4 text-slate-400">
                <div className="flex justify-between border-b border-slate-900 pb-1"><span>{lang === "uz" ? "Hudud" : lang === "ru" ? "Район" : "District"}</span> <span className="text-white">Mirobod</span></div>
                <div className="flex justify-between border-b border-slate-900 pb-1"><span>{lang === "uz" ? "Raqobat" : lang === "ru" ? "Конкуренция" : "Competition"}</span> <span className="text-orange-400">Yuqori</span></div>
                <div className="flex justify-between pb-1"><span>{lang === "uz" ? "Potensial" : lang === "ru" ? "Потенциал" : "Potential"}</span> <span className="text-emerald-400">92/100</span></div>
              </div>
              <span className="text-[11px] text-slate-500 italic">"{lang === "uz" ? "Ushbu hududda kafelar ko'p, lekin sifatli dizayn studiyalar yetishmaydi." : lang === "ru" ? "В этом районе много кафе, но не хватает качественных дизайн-студий." : "Many cafes in this area, but lacks quality design studios."}"</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-24 border-t border-slate-900 bg-slate-950/10 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">{lang === "uz" ? "Platforma Imkoniyatlari" : lang === "ru" ? "Возможности Платформы" : "Platform Capabilities"}</span>
            <h2 className="text-3xl md:text-4xl font-sans font-medium text-white tracking-tight mt-2">
              {lang === "uz" ? "Tadbirkorlar Uchun Yagona Markaz" : lang === "ru" ? "Единый Центр Для Предпринимателей" : "The Single Hub for Entrepreneurs"}
            </h2>
            <p className="text-slate-400 mt-4">
              {lang === "uz" ? "NEXUS AI - sizning biznesingiz haqida qayg'uradigan va kunlik maslahatlar beradigan aqlli yordamchi." : lang === "ru" ? "NEXUS AI - умный помощник, который заботится о вашем бизнесе и дает ежедневные советы." : "NEXUS AI - a smart assistant that cares about your business and gives daily advice."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {features.map((feat, idx) => (
              <div 
                key={idx} 
                className="border border-slate-900 bg-[#0b0c10]/60 p-8 rounded-xl hover:border-slate-800 transition-all group duration-300"
              >
                <div className="mb-5 p-2 bg-slate-950 w-fit rounded-lg border border-slate-900 group-hover:border-emerald-500/20 transition-all">
                  {feat.icon}
                </div>
                <h3 className="text-xl font-medium text-white mb-3">{feat.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Grid */}
      <section id="pricing" className="py-24 border-t border-slate-900 bg-[#090A0F]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">{lang === "uz" ? "SaaS Narxlari" : lang === "ru" ? "Цены SaaS" : "SaaS Pricing"}</span>
            <h2 className="text-3xl md:text-4xl font-sans font-medium text-white tracking-tight mt-2">
              {lang === "uz" ? "Shaffof, Qiymatga Asoslangan Tariflar" : lang === "ru" ? "Прозрачные тарифы" : "Transparent, Value-Driven Plans"}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            {pricingPlans.map((plan, idx) => (
              <div 
                key={idx} 
                className={`border rounded-2xl p-8 flex flex-col justify-between transition-all relative ${
                  plan.popular 
                    ? "border-white bg-[#0A0A0A] shadow-xl lg:-translate-y-2 z-10" 
                    : "border-[#1F1F1F] bg-[#0A0A0A]"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-mono font-bold px-3 py-0.5 rounded-full tracking-wider uppercase">
                    {lang === "uz" ? "Eng Ommabop" : lang === "ru" ? "Самый Популярный" : "Most Popular"}
                  </span>
                )}
                <div>
                  <h3 className="text-sm font-mono text-[#888] tracking-wider uppercase mb-1">{plan.name}</h3>
                  <div className="flex items-baseline gap-1.5 mb-6">
                    <span className="text-3xl md:text-4xl font-sans font-bold text-white tracking-tight">{plan.price}</span>
                    <span className="text-xs text-[#666]">{plan.period}</span>
                  </div>
                  <ul className="space-y-3 border-t border-[#1F1F1F] pt-6">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="text-xs text-slate-300 flex items-start gap-2.5 leading-relaxed">
                        <span className="text-white shrink-0 text-sm">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button 
                  id={`pricing-${plan.name.split(' ')[0].toLowerCase()}-btn`}
                  onClick={onStart}
                  className={`w-full mt-8 font-bold py-3 px-4 rounded-full text-sm transition-all text-center ${
                    plan.popular
                      ? "bg-white hover:bg-neutral-200 text-black shadow-md"
                      : "border border-[#333] hover:border-neutral-500 bg-[#050505] text-white"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-[#07080b] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center">
              <div className="w-3 h-3 bg-black rounded-[2px] rotate-45"></div>
            </div>
            <span className="font-sans font-bold text-sm tracking-tight text-white">NEXUS AI</span>
            <span className="text-xs text-slate-600">© 2026. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-8 text-xs text-slate-500">
            <span>{lang === "uz" ? "Sizning shaxsiy AI Biznes Maslahatchingiz" : lang === "ru" ? "Ваш личный ИИ Бизнес-Советник" : "Your Personal AI Business Advisor"}</span>
            <a href="#landing-container" className="hover:text-white transition-colors">{lang === "uz" ? "Tepaga qaytish" : lang === "ru" ? "Наверх" : "Back to top"}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

