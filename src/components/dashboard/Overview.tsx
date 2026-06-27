import { BusinessDNA } from "../../types";
import { AlertCircle, TrendingUp, Lightbulb, Download, FileText } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface OverviewData {
  businessScore: number;
  riskLevel: number;
  opportunityScore: number;
  alerts: Array<{ title: string; description: string; type: string }>;
  recommendations: Array<{ id: number; title: string; description: string }>;
}

export default function Overview({ dna }: { dna: BusinessDNA }) {
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  
  useEffect(() => {
    const fetchOverview = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/dna/overview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ dna })
        });
        if (!res.ok) {
          throw new Error("API responded with " + res.status);
        }
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Failed to fetch overview", error);
        // Fallback data when API limit is reached
        setData({
          businessScore: 75,
          riskLevel: 45,
          opportunityScore: 8,
          alerts: [
            { title: "API Limit Reached", description: "Google Gemini API bepul limiti tugadi. Yoki yangi API kalit kiriting, yoki ertaga urining. Vaqtincha test ma'lumotlari ko'rsatilmoqda.", type: "warning" }
          ],
          recommendations: [
            { id: 1, title: "API Kalitni Yangilash", description: "Yangi Google Gemini API kalit oling va .env fayliga joylang." }
          ]
        });
      } finally {
        setLoading(false);
      }
    };
    fetchOverview();
  }, [dna]);

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      const element = document.getElementById("root");
      if (!element) return;
      
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("NEXUS_AI_Business_Report.pdf");
      
    } catch (error) {
      console.error("PDF generation failed", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-bold text-foreground tracking-tight">Dashboard Overview</h2>
          <p className="text-muted-foreground text-sm mt-1">NEXUS AI is monitoring your business metrics.</p>
        </div>
        <div className="text-right hidden sm:flex items-center gap-6">
          <div>
            <p className="text-[10px] text-muted-foreground uppercase font-mono mb-1">Target Budget</p>
            <p className="text-xl font-bold text-emerald-400 font-mono">{(dna.budget || 0).toLocaleString()} UZS</p>
          </div>
          <Button 
            variant="outline"
            onClick={handleExportPDF}
            disabled={isExporting}
            className="bg-card hover:bg-muted border-border text-zinc-200"
          >
            {isExporting ? <span className="animate-pulse flex items-center gap-2"><Download className="w-4 h-4" /> Generating...</span> : <><FileText className="w-4 h-4 mr-2" /> Export PDF</>}
          </Button>
        </div>
      </div>
      
      {loading || !data ? (
        <div className="flex items-center justify-center h-64 text-emerald-500">
          <span className="w-8 h-8 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></span>
        </div>
      ) : (
        <>
          {/* Top Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <Card className="bg-background border-border hover:border-emerald-500/50 transition-colors shadow-lg shadow-black/20">
              <CardContent className="p-5">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-mono text-emerald-500/80 uppercase">Business Score</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
                <p className="text-3xl font-bold text-foreground mb-1">{data.businessScore}<span className="text-base text-muted-foreground">/100</span></p>
                <p className="text-xs text-emerald-400 flex items-center gap-1"><TrendingUp className="w-3 h-3"/> AI Calculated</p>
              </CardContent>
            </Card>
            <Card className="bg-background border-border hover:border-amber-500/50 transition-colors shadow-lg shadow-black/20">
              <CardContent className="p-5">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-mono text-amber-500/80 uppercase">Risk Level</span>
                </div>
                <p className="text-3xl font-bold text-amber-400 mb-1">{data.riskLevel}<span className="text-base text-amber-400/50">%</span></p>
                <p className="text-xs text-amber-400/80 line-clamp-1">Analyzed for {dna.district}</p>
              </CardContent>
            </Card>
            <Card className="bg-background border-border hover:border-blue-500/50 transition-colors shadow-lg shadow-black/20">
              <CardContent className="p-5">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-mono text-blue-500/80 uppercase">Opportunity Score</span>
                </div>
                <p className="text-3xl font-bold text-blue-400 mb-1">{data.opportunityScore}<span className="text-base text-blue-400/50">/10</span></p>
                <p className="text-xs text-blue-400/80">Active insights generated</p>
              </CardContent>
            </Card>
          </div>

          {/* Middle Section: Alerts and Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Competitor Alerts */}
            <Card className="bg-background border-border p-6">
              <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500" /> Market Alerts
              </h3>
              <div className="space-y-4">
                {data.alerts.map((alert, idx) => (
                  <div key={idx} className={`p-3 border rounded-xl ${alert.type === 'warning' ? 'bg-amber-500/5 border-amber-500/10' : 'bg-blue-500/5 border-blue-500/10'}`}>
                    <p className={`text-xs font-bold mb-1 ${alert.type === 'warning' ? 'text-amber-400' : 'text-blue-400'}`}>{alert.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{alert.description}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* AI Quick Recommendations */}
            <Card className="bg-background border-border p-6">
              <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-emerald-500" /> AI Recommendations
              </h3>
              <div className="space-y-3">
                {data.recommendations.map((rec) => (
                  <div key={rec.id} className="flex items-start gap-3 p-3 hover:bg-foreground/5 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-border">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                      <span className="text-emerald-500 font-bold text-[10px]">{rec.id}</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-200 mb-0.5">{rec.title}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{rec.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
