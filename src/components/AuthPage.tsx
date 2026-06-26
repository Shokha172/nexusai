import { useState, FormEvent } from "react";
import { ArrowLeft, ArrowRight, Lock, Mail, User, ShieldCheck, MessageCircle } from "lucide-react";
import { Language, translations } from "../translations";

interface AuthPageProps {
  onBack: () => void;
  onSuccess: (profile: { name: string; email: string }) => void;
  lang: Language;
}

export default function AuthPage({ onBack, onSuccess, lang }: AuthPageProps) {
  const t = translations[lang];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [authMethod, setAuthMethod] = useState<"options" | "email">("options");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError(lang === "uz" ? "Iltimos, haqiqiy elektron pochta manzilini kiriting." : lang === "ru" ? "Пожалуйста, введите корректный email." : "Please enter a valid email address.");
      return;
    }
    if (isSignUp && !name) {
      setError(lang === "uz" ? "Iltimos, ismingizni kiriting." : lang === "ru" ? "Пожалуйста, введите ваше имя." : "Please enter your name.");
      return;
    }

    onSuccess({
      name: name || email.split("@")[0] || (lang === "uz" ? "Tadbirkor" : lang === "ru" ? "Предприниматель" : "Entrepreneur"),
      email: email
    });
  };

  const handleSocialLogin = (provider: string) => {
    onSuccess({
      name: `${provider} User`,
      email: `user@${provider.toLowerCase()}.com`
    });
  };

  return (
    <div id="auth-container" className="min-h-screen bg-[#090A0F] text-slate-100 font-sans flex flex-col justify-between py-12 px-6 selection:bg-emerald-500 selection:text-black">
      {/* Top Header Navigation */}
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        <button 
          id="auth-back-btn"
          onClick={authMethod === "email" ? () => setAuthMethod("options") : onBack} 
          className="flex items-center gap-2 text-xs font-mono text-slate-500 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> {lang === "uz" ? "ORQAGA" : lang === "ru" ? "НАЗАД" : "BACK"}
        </button>
        <span className="text-xs font-mono text-slate-600">NEXUS AI SECURE AUTH</span>
      </div>

      {/* Main Panel */}
      <div className="max-w-md w-full mx-auto my-auto bg-[#0d0e14] border border-slate-900 rounded-2xl p-8 shadow-2xl shadow-emerald-950/5 relative">
        <div className="absolute top-0 right-10 -translate-y-1/2 p-2 bg-[#090A0F] border border-slate-800 rounded-lg">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-sans font-semibold text-white tracking-tight">
            {lang === "uz" ? "Tizimga Kirish" : lang === "ru" ? "Вход в систему" : "Sign In"}
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            {lang === "uz" ? "AI Business Advisor'dan foydalanish uchun hisobingizga kiring" : lang === "ru" ? "Войдите в аккаунт, чтобы использовать AI Business Advisor" : "Sign in to your account to use AI Business Advisor"}
          </p>
        </div>

        {error && (
          <div id="auth-error-banner" className="mb-6 p-3.5 bg-red-950/30 border border-red-900/50 rounded-lg text-xs text-red-400">
            {error}
          </div>
        )}

        {authMethod === "options" ? (
          <div className="space-y-3">
            <button 
              onClick={() => handleSocialLogin("Google")}
              className="w-full bg-white text-black hover:bg-neutral-200 font-medium text-sm py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /><path fill="none" d="M1 1h22v22H1z" /></svg>
              Continue with Google
            </button>
            <button 
              onClick={() => handleSocialLogin("Telegram")}
              className="w-full bg-[#2AABEE] text-white hover:bg-[#2298D6] font-medium text-sm py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-3"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              Continue with Telegram
            </button>
            <button 
              onClick={() => handleSocialLogin("Apple")}
              className="w-full bg-black border border-slate-800 text-white hover:bg-neutral-900 font-medium text-sm py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.05 2.53.68 3.14.68.61 0 1.94-.78 3.57-.68 1.48.04 2.82.68 3.65 1.77-3.08 1.83-2.62 5.92.35 7.15-.65 1.62-1.57 3.23-2.71 4.05zm-4.71-13.6c-.2-1.51.68-2.97 2.05-3.68.39 1.69-.73 3.09-2.05 3.68z"/></svg>
              Continue with Apple
            </button>
            
            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-900"></span></div>
              <span className="relative bg-[#0d0e14] px-3.5 text-xs text-slate-500">{lang === "uz" ? "Yoki" : lang === "ru" ? "Или" : "Or"}</span>
            </div>

            <button 
              onClick={() => setAuthMethod("email")}
              className="w-full border border-slate-800 bg-[#0A0B10] text-white hover:bg-[#111218] font-medium text-sm py-3 rounded-xl transition-all flex items-center justify-center gap-3"
            >
              <Mail className="w-5 h-5" />
              Continue with Email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-xs font-mono text-slate-500 mb-1.5 uppercase tracking-wider">{lang === "uz" ? "Tadbirkor Ismi" : lang === "ru" ? "Имя предпринимателя" : "Entrepreneur Name"}</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600">
                    <User className="w-4 h-4" />
                  </span>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g., Alisher"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setError(""); }}
                    className="w-full bg-[#07080b] border border-slate-900 focus:border-emerald-500 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-100 placeholder-slate-600 focus:outline-none transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-mono text-slate-500 mb-1.5 uppercase tracking-wider">{lang === "uz" ? "Email Manzili" : lang === "ru" ? "Email адрес" : "Email Address"}</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600">
                  <Mail className="w-4 h-4" />
                </span>
                <input 
                  type="email" 
                  required
                  placeholder="e.g., alisher@nexusai.uz"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  className="w-full bg-[#07080b] border border-slate-900 focus:border-emerald-500 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-100 placeholder-slate-600 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-500 mb-1.5 uppercase tracking-wider">{lang === "uz" ? "Parol" : lang === "ru" ? "Пароль" : "Password"}</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600">
                  <Lock className="w-4 h-4" />
                </span>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  defaultValue="supersecret123"
                  className="w-full bg-[#07080b] border border-slate-900 focus:border-emerald-500 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-100 placeholder-slate-600 focus:outline-none transition-all"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 mt-2"
            >
              {isSignUp ? (lang === "uz" ? "Profilni Yaratish" : lang === "ru" ? "Создать профиль" : "Create Profile") : (lang === "uz" ? "Kirish" : lang === "ru" ? "Войти" : "Sign In")} <ArrowRight className="w-4 h-4" />
            </button>
            
            <div className="text-center mt-4 text-xs text-slate-500">
              {isSignUp ? (
                <span>{lang === "uz" ? "Hisobingiz bormi?" : lang === "ru" ? "Уже есть аккаунт?" : "Already have an account?"} <button type="button" onClick={() => { setIsSignUp(false); setError(""); }} className="text-emerald-400 hover:underline">{lang === "uz" ? "Kirish" : lang === "ru" ? "Войти" : "Sign In"}</button></span>
              ) : (
                <span>{lang === "uz" ? "Yangi foydalanuvchimisiz?" : lang === "ru" ? "Новый пользователь?" : "New user?"} <button type="button" onClick={() => { setIsSignUp(true); setError(""); }} className="text-emerald-400 hover:underline">{lang === "uz" ? "Ro'yxatdan o'tish" : lang === "ru" ? "Регистрация" : "Sign Up"}</button></span>
              )}
            </div>
          </form>
        )}
      </div>

      {/* Footer Branding */}
      <div className="max-w-7xl mx-auto w-full text-center text-xs text-slate-600 font-mono">
        NEXUS AI • SECURE CLOUD ENCLAVE
      </div>
    </div>
  );
}
