import { useState, useEffect } from "react";
import { Crosshair, Star, Clock, Search, Sparkles } from "lucide-react";
import { BusinessDNA } from "../../types";

export default function CompetitorIntel({ dna }: { dna: BusinessDNA }) {
  const [competitors, setCompetitors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");

  const fetchCompetitors = async (searchQuery: string = "") => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/dna/competitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dna, query: searchQuery })
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setCompetitors(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCompetitors();
  }, [dna]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCompetitors(query);
  };

  return (
    <div className="animate-fade-in max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Competitor Intelligence</h2>
          <p className="text-slate-400 text-sm">Yaqin atrofdagi 3 ta asosiy raqobatchi tahlili</p>
        </div>
        
        <form onSubmit={handleSearch} className="relative w-full md:w-auto">
           <input 
             type="text" 
             value={query}
             onChange={(e) => setQuery(e.target.value)}
             placeholder="Kompaniya qidirish..."
             className="w-full md:w-64 bg-[#0a0b10] border border-slate-800 rounded-full py-2 pl-4 pr-10 text-sm text-white focus:border-emerald-500 outline-none transition-colors"
           />
           <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-emerald-500">
              <Search className="w-4 h-4" />
           </button>
        </form>
      </div>

      <div className="grid gap-4 relative min-h-[300px]">
        {isLoading && (
          <div className="absolute inset-0 bg-[#0a0b10]/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-emerald-500 rounded-2xl">
            <Sparkles className="w-8 h-8 mb-2 animate-spin" />
            <p className="text-sm font-bold">Raqobatchilar AI orqali tahlil qilinmoqda...</p>
          </div>
        )}

        {!isLoading && competitors.length === 0 && (
          <div className="text-center text-slate-500 py-10">Raqobatchilar topilmadi.</div>
        )}

        {competitors.map((comp, i) => (
          <div key={i} className="bg-[#0a0b10] border border-slate-800 rounded-xl p-6 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center hover:border-slate-700 transition-colors">
            
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                {comp.name} 
                <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded font-mono text-slate-400">{comp.distance}</span>
              </h3>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1 text-amber-400 font-bold"><Star className="w-3.5 h-3.5 fill-amber-400" /> {comp.rating} ({comp.reviews})</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {comp.hours}</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto shrink-0">
               <div className="bg-[#111] border border-slate-800 rounded-lg p-3 md:w-40">
                  <span className="text-[10px] font-mono text-emerald-500 uppercase block mb-1">Kuchli tomoni</span>
                  <ul className="text-xs text-slate-300 space-y-1">
                    {comp.pros?.map((p: string, idx: number) => <li key={idx}>+ {p}</li>)}
                  </ul>
               </div>
               <div className="bg-[#111] border border-slate-800 rounded-lg p-3 md:w-40">
                  <span className="text-[10px] font-mono text-rose-500 uppercase block mb-1">Zaif tomoni</span>
                  <ul className="text-xs text-slate-300 space-y-1">
                    {comp.cons?.map((c: string, idx: number) => <li key={idx}>- {c}</li>)}
                  </ul>
               </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
