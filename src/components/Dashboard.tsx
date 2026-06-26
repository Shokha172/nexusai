import { useState } from "react";
import { 
  LayoutDashboard, ListOrdered, MessageSquare, PieChart, 
  Map, Users, TrendingUp, Calendar, FlaskConical, Link as LinkIcon, LogOut
} from "lucide-react";
import { BusinessDNA } from "../types";
import { Language, translations } from "../translations";
import AdvisorResults from "./AdvisorResults";
import Overview from "./dashboard/Overview";
import ChatVoiceMock from "./dashboard/ChatVoice";
import SmartBudget from "./dashboard/SmartBudget";
import LocationIntel from "./dashboard/LocationIntel";
import CompetitorIntel from "./dashboard/CompetitorIntel";
import GoogleTrendsMock from "./dashboard/GoogleTrends";
import WeeklyPlan from "./dashboard/WeeklyPlan";
import ScenarioSimulator from "./dashboard/ScenarioSimulator";
import IntegrationsMock from "./dashboard/Integrations";

interface DashboardProps {
  dna: BusinessDNA;
  userProfile: { name: string; email: string };
  onStartOver: () => void;
  onLogout: () => void;
  lang: Language;
}

export default function Dashboard({ dna, userProfile, onStartOver, onLogout, lang }: DashboardProps) {
  const t = translations[lang];
  const [activeTab, setActiveTab] = useState("overview");

  const navItems = [
    { id: "overview", label: t.navOverview, icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: "advisor", label: t.navAdvisor, icon: <ListOrdered className="w-4 h-4" /> },
    { id: "chat", label: t.navChat, icon: <MessageSquare className="w-4 h-4" /> },
    { id: "budget", label: t.navBudget, icon: <PieChart className="w-4 h-4" /> },
    { id: "location", label: t.navLocation, icon: <Map className="w-4 h-4" /> },
    { id: "competitor", label: t.navCompetitor, icon: <Users className="w-4 h-4" /> },
    { id: "trends", label: t.navTrends, icon: <TrendingUp className="w-4 h-4" /> },
    { id: "calendar", label: t.navCalendar, icon: <Calendar className="w-4 h-4" /> },
    { id: "simulator", label: t.navSimulator, icon: <FlaskConical className="w-4 h-4" /> },
    { id: "integrations", label: t.navIntegrations, icon: <LinkIcon className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 font-sans flex overflow-hidden selection:bg-emerald-500 selection:text-black">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#1F1F1F] bg-[#0A0A0A] flex flex-col h-screen shrink-0 hidden md:flex">
        {/* Brand */}
        <div className="h-16 flex items-center px-6 border-b border-[#1F1F1F]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-emerald-500 rounded flex items-center justify-center shadow-md">
              <div className="w-2.5 h-2.5 bg-black rounded-sm rotate-45"></div>
            </div>
            <span className="font-sans font-bold text-sm tracking-tight text-white">
              NEXUS AI
            </span>
            <span className="text-[9px] font-mono border border-emerald-900 bg-emerald-950/30 text-emerald-500 px-1.5 py-0.5 rounded uppercase ml-1">
              PRO
            </span>
          </div>
        </div>

        {/* User Info */}
        <div className="p-6 pb-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold text-xs border border-emerald-500/20">
              {userProfile.name.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate">{userProfile.name}</p>
              <p className="text-xs text-slate-500 truncate">{dna.city}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                activeTab === item.id
                  ? "bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.05)]"
                  : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-[#1F1F1F]">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-mono font-bold text-slate-500 hover:text-white transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> {t.signOut}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto bg-[#050505] relative">
        {/* Mobile Header */}
        <div className="md:hidden h-16 border-b border-[#1F1F1F] flex items-center justify-between px-6 bg-[#0A0A0A] sticky top-0 z-20">
           <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-emerald-500 rounded flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-black rounded-sm rotate-45"></div>
            </div>
            <span className="font-sans font-bold text-sm tracking-tight text-white">NEXUS AI</span>
          </div>
          <select 
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="bg-[#111] border border-[#333] text-xs rounded px-2 py-1 outline-none text-white"
          >
            {navItems.map(item => (
              <option key={item.id} value={item.id}>{item.label}</option>
            ))}
          </select>
        </div>

        {/* Glassmorphic Background Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="p-6 md:p-8 relative z-10 min-h-full">
          {activeTab === "overview" && <Overview dna={dna} />}
          {activeTab === "advisor" && <AdvisorResults dna={dna} userProfile={userProfile} onStartOver={onStartOver} lang={lang} isEmbedded={true} />}
          {activeTab === "chat" && <ChatVoiceMock />}
          {activeTab === "budget" && <SmartBudget dna={dna} />}
          {activeTab === "location" && <LocationIntel dna={dna} />}
          {activeTab === "competitor" && <CompetitorIntel dna={dna} />}
          {activeTab === "trends" && <GoogleTrendsMock dna={dna} />}
          {activeTab === "calendar" && <WeeklyPlan dna={dna} />}
          {activeTab === "simulator" && <ScenarioSimulator dna={dna} />}
          {activeTab === "integrations" && <IntegrationsMock dna={dna} />}
        </div>
      </main>

    </div>
  );
}
