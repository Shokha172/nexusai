import { useState } from "react";
import { ArrowRight, ArrowLeft, Building2, UserCircle, Wallet, Sparkles } from "lucide-react";
import { BusinessDNA } from "../types";
import { Language, translations } from "../translations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface WizardProps {
  onComplete: (dna: BusinessDNA) => void;
  lang: Language;
}

export default function BusinessDNAWizard({ onComplete, lang }: WizardProps) {
  const t = translations[lang];
  const [step, setStep] = useState(1);
  const [dna, setDna] = useState<BusinessDNA>({
    city: "",
    district: "",
    budget: 0,
    interest: "",
    experience: "",
    existingBusiness: "",
    monthlyIncome: 0,
    monthlyExpense: 0,
  });

  const updateDna = (field: keyof BusinessDNA, value: any) => {
    setDna((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
    else onComplete(dna);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const progress = (step / 3) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-foreground font-sans selection:bg-emerald-500 selection:text-zinc-950 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-xl relative z-10">
        <div className="text-center mb-10">
          <div className="w-12 h-12 bg-foreground rounded-xl flex items-center justify-center shadow-lg mx-auto mb-6">
            <div className="w-6 h-6 bg-background rounded-sm rotate-45"></div>
          </div>
          <h1 className="text-3xl md:text-4xl font-sans font-medium text-foreground tracking-tight mb-3">
            {t.wizardTitle}
          </h1>
          <p className="text-muted-foreground">
            {t.wizardSub}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
            <span className={step >= 1 ? "text-emerald-400 font-bold" : ""}>Lokatsiya</span>
            <span className={step >= 2 ? "text-emerald-400 font-bold" : ""}>Tajriba</span>
            <span className={step >= 3 ? "text-emerald-400 font-bold" : ""}>Moliya</span>
          </div>
          <div className="h-1.5 w-full bg-card rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <Card className="bg-background border-border shadow-2xl p-6 md:p-8">
          {/* STEP 1: Location */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-3 border-b border-border pb-4 mb-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-medium text-foreground">Joylashuv</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-muted-foreground mb-1.5">{t.cityLabel}</label>
                  <Input
                    type="text"
                    value={dna.city}
                    onChange={(e) => updateDna("city", e.target.value)}
                    placeholder={t.cityPlaceholder}
                    className="h-12 bg-card/50 border-border focus-visible:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-muted-foreground mb-1.5">{t.districtLabel}</label>
                  <Input
                    type="text"
                    value={dna.district}
                    onChange={(e) => updateDna("district", e.target.value)}
                    placeholder={t.districtPlaceholder}
                    className="h-12 bg-card/50 border-border focus-visible:ring-emerald-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Experience & Interest */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-3 border-b border-border pb-4 mb-2">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <UserCircle className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-medium text-foreground">Qiziqish va Tajriba</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-muted-foreground mb-1.5">{t.interestLabel}</label>
                  <Input
                    type="text"
                    value={dna.interest}
                    onChange={(e) => updateDna("interest", e.target.value)}
                    placeholder={t.interestPlaceholder}
                    className="h-12 bg-card/50 border-border focus-visible:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-muted-foreground mb-1.5">{t.experienceLabel}</label>
                  <Input
                    type="text"
                    value={dna.experience}
                    onChange={(e) => updateDna("experience", e.target.value)}
                    placeholder={t.experiencePlaceholder}
                    className="h-12 bg-card/50 border-border focus-visible:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-muted-foreground mb-1.5">{t.existingBusinessLabel}</label>
                  <Input
                    type="text"
                    value={dna.existingBusiness}
                    onChange={(e) => updateDna("existingBusiness", e.target.value)}
                    placeholder={t.existingBusinessPlaceholder}
                    className="h-12 bg-card/50 border-border focus-visible:ring-emerald-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Financials */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-3 border-b border-border pb-4 mb-2">
                <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Wallet className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-medium text-foreground">Moliya</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-muted-foreground mb-1.5">{t.budgetLabel}</label>
                  <div className="relative">
                    <Input
                      type="number"
                      value={dna.budget || ""}
                      onChange={(e) => updateDna("budget", Number(e.target.value))}
                      placeholder="50000000"
                      className="h-12 pl-10 font-mono bg-card/50 border-border focus-visible:ring-emerald-500"
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-muted-foreground mb-1.5">{t.monthlyIncomeLabel}</label>
                    <Input
                      type="number"
                      value={dna.monthlyIncome || ""}
                      onChange={(e) => updateDna("monthlyIncome", Number(e.target.value))}
                      placeholder={t.monthlyIncomePlaceholder}
                      className="h-12 font-mono bg-card/50 border-border focus-visible:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-muted-foreground mb-1.5">{t.monthlyExpenseLabel}</label>
                    <Input
                      type="number"
                      value={dna.monthlyExpense || ""}
                      onChange={(e) => updateDna("monthlyExpense", Number(e.target.value))}
                      placeholder={t.monthlyExpensePlaceholder}
                      className="h-12 font-mono bg-card/50 border-border focus-visible:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
            <Button
              variant="ghost"
              onClick={prevStep}
              className={`flex items-center gap-2 text-sm font-bold transition-all ${
                step === 1 ? "opacity-0 pointer-events-none" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> {t.prev}
            </Button>
            <Button
              onClick={nextStep}
              className={`rounded-full px-6 shadow-md ${
                step === 3 
                  ? "bg-gradient-primary text-white border-none hover:opacity-90" 
                  : "bg-foreground text-zinc-950 hover:bg-zinc-200"
              }`}
            >
              {step === 3 ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2" /> {t.finish}
                </>
              ) : (
                <>
                  {t.next} <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
