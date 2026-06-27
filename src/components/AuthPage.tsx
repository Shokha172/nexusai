import { useState, FormEvent, useEffect } from "react";
import { ArrowLeft, ArrowRight, Lock, Mail, User, ShieldCheck, MessageCircle, Loader2 } from "lucide-react";
import { Language, translations } from "../translations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authProvider, setAuthProvider] = useState<string | null>(null);

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

    setIsAuthenticating(true);
    setAuthProvider("Email");
    
    // Simulate network delay for realistic feel
    setTimeout(() => {
      onSuccess({
        name: name || email.split("@")[0] || (lang === "uz" ? "Tadbirkor" : lang === "ru" ? "Предприниматель" : "Entrepreneur"),
        email: email
      });
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    setIsAuthenticating(true);
    setAuthProvider(provider);
    
    // Simulate realistic OAuth flow
    // First stage: "Connecting to provider..."
    setTimeout(() => {
      // Second stage: "Authenticating..."
      setTimeout(() => {
        onSuccess({
          name: `${provider} User`,
          email: `user@${provider.toLowerCase()}.com`
        });
      }, 1200);
    }, 1000);
  };

  return (
    <div id="auth-container" className="min-h-screen bg-background text-foreground font-sans flex flex-col justify-between py-12 px-6 selection:bg-emerald-500 selection:text-zinc-950">
      {/* Top Header Navigation */}
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        <Button 
          id="auth-back-btn"
          variant="ghost"
          size="sm"
          onClick={authMethod === "email" ? () => setAuthMethod("options") : onBack} 
          disabled={isAuthenticating}
          className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> {lang === "uz" ? "ORQAGA" : lang === "ru" ? "НАЗАД" : "BACK"}
        </Button>
        <span className="text-xs font-mono text-muted-foreground">NEXUS AI SECURE AUTH</span>
      </div>

      {/* Main Panel */}
      <Card className="max-w-md w-full mx-auto my-auto bg-background border-border shadow-2xl shadow-emerald-900/5 relative p-0 overflow-hidden">
        {/* Animated Loading Overlay */}
        {isAuthenticating && (
          <div className="absolute inset-0 z-50 bg-background/80 backdrop-blur-md flex flex-col items-center justify-center animate-in fade-in duration-300">
            <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mb-4" />
            <h3 className="text-lg font-medium tracking-tight text-foreground">
              {lang === "uz" ? "Avtorizatsiya..." : lang === "ru" ? "Авторизация..." : "Authenticating..."}
            </h3>
            <p className="text-sm text-muted-foreground mt-2 font-mono">
              {authProvider} {lang === "uz" ? "orqali bog'lanmoqda" : lang === "ru" ? "соединение" : "connecting"}
            </p>
          </div>
        )}

        <div className="absolute top-4 right-4 p-2 bg-card border border-border rounded-lg z-10">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
        </div>

        <CardHeader className="text-center pb-8 pt-10">
          <CardTitle className="text-2xl font-sans tracking-tight text-foreground">
            {lang === "uz" ? "Tizimga Kirish" : lang === "ru" ? "Вход в систему" : "Sign In"}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {lang === "uz" ? "AI Business Advisor'dan foydalanish uchun hisobingizga kiring" : lang === "ru" ? "Войдите в аккаунт, чтобы использовать AI Business Advisor" : "Sign in to your account to use AI Business Advisor"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <div id="auth-error-banner" className="mb-6 p-3.5 bg-red-950/30 border border-red-900/50 rounded-lg text-xs text-red-400">
              {error}
            </div>
          )}

          {authMethod === "options" ? (
            <div className="space-y-3">
              <Button 
                variant="outline"
                onClick={() => handleSocialLogin("Google")}
                className="w-full bg-foreground text-zinc-950 hover:bg-zinc-200 border-none font-medium h-12 flex items-center justify-center gap-3 transition-transform active:scale-[0.98]"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /><path fill="none" d="M1 1h22v22H1z" /></svg>
                Continue with Google
              </Button>
              <Button 
                onClick={() => handleSocialLogin("Telegram")}
                className="w-full bg-[#2AABEE] text-white hover:bg-[#2298D6] font-medium h-12 flex items-center justify-center gap-3 border-none transition-transform active:scale-[0.98]"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                Continue with Telegram
              </Button>
              <Button 
                variant="outline"
                onClick={() => handleSocialLogin("Apple")}
                className="w-full bg-background border-border text-foreground hover:bg-card font-medium h-12 flex items-center justify-center gap-3 transition-transform active:scale-[0.98]"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.05 2.53.68 3.14.68.61 0 1.94-.78 3.57-.68 1.48.04 2.82.68 3.65 1.77-3.08 1.83-2.62 5.92.35 7.15-.65 1.62-1.57 3.23-2.71 4.05zm-4.71-13.6c-.2-1.51.68-2.97 2.05-3.68.39 1.69-.73 3.09-2.05 3.68z"/></svg>
                Continue with Apple
              </Button>
              
              <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border"></span></div>
                <span className="relative bg-background px-3.5 text-xs text-muted-foreground">{lang === "uz" ? "Yoki" : lang === "ru" ? "Или" : "Or"}</span>
              </div>

              <Button 
                variant="outline"
                onClick={() => setAuthMethod("email")}
                className="w-full border-border bg-card text-foreground hover:bg-muted font-medium h-12 flex items-center justify-center gap-3 transition-transform active:scale-[0.98]"
              >
                <Mail className="w-5 h-5" />
                Continue with Email
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-wider">{lang === "uz" ? "Tadbirkor Ismi" : lang === "ru" ? "Имя предпринимателя" : "Entrepreneur Name"}</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <User className="w-4 h-4" />
                    </span>
                    <Input 
                      type="text" 
                      required
                      placeholder="e.g., Alisher"
                      value={name}
                      onChange={(e) => { setName(e.target.value); setError(""); }}
                      className="pl-11 h-12 bg-card/50 border-border focus-visible:ring-emerald-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-wider">{lang === "uz" ? "Email Manzili" : lang === "ru" ? "Email адрес" : "Email Address"}</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                  </span>
                  <Input 
                    type="email" 
                    required
                    placeholder="e.g., alisher@nexusai.uz"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    className="pl-11 h-12 bg-card/50 border-border focus-visible:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-wider">{lang === "uz" ? "Parol" : lang === "ru" ? "Пароль" : "Password"}</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Lock className="w-4 h-4" />
                  </span>
                  <Input 
                    type="password" 
                    placeholder="••••••••"
                    defaultValue="supersecret123"
                    className="pl-11 h-12 bg-card/50 border-border focus-visible:ring-emerald-500"
                  />
                </div>
              </div>

              <Button 
                type="submit"
                className="w-full bg-gradient-primary h-12 text-foreground font-semibold mt-2 shadow-md hover:opacity-90 border-none transition-transform active:scale-[0.98]"
              >
                {isSignUp ? (lang === "uz" ? "Profilni Yaratish" : lang === "ru" ? "Создать профиль" : "Create Profile") : (lang === "uz" ? "Kirish" : lang === "ru" ? "Войти" : "Sign In")} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              
              <div className="text-center mt-4 text-xs text-muted-foreground">
                {isSignUp ? (
                  <span>{lang === "uz" ? "Hisobingiz bormi?" : lang === "ru" ? "Уже есть аккаунт?" : "Already have an account?"} <button type="button" onClick={() => { setIsSignUp(false); setError(""); }} className="text-emerald-400 hover:underline">{lang === "uz" ? "Kirish" : lang === "ru" ? "Войти" : "Sign In"}</button></span>
                ) : (
                  <span>{lang === "uz" ? "Yangi foydalanuvchimisiz?" : lang === "ru" ? "Новый пользователь?" : "New user?"} <button type="button" onClick={() => { setIsSignUp(true); setError(""); }} className="text-emerald-400 hover:underline">{lang === "uz" ? "Ro'yxatdan o'tish" : lang === "ru" ? "Регистрация" : "Sign Up"}</button></span>
                )}
              </div>
            </form>
          )}
        </CardContent>
      </Card>

      {/* Footer Branding */}
      <div className="max-w-7xl mx-auto w-full text-center text-xs text-zinc-600 font-mono">
        NEXUS AI • SECURE CLOUD ENCLAVE
      </div>
    </div>
  );
}
