import { useState, useEffect } from "react";
import { Calendar as CalendarIcon, CheckSquare, Clock, Sparkles } from "lucide-react";
import { BusinessDNA } from "../../types";

interface Task {
  text: string;
  status: "todo" | "doing" | "done";
  time: string;
}

export default function WeeklyPlan({ dna }: { dna: BusinessDNA }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/dna/weekly-plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ dna })
        });
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, [dna]);

  const toggleTaskStatus = (index: number) => {
    setTasks(prev => {
      const newTasks = [...prev];
      const current = newTasks[index].status;
      if (current === "todo") newTasks[index].status = "doing";
      else if (current === "doing") newTasks[index].status = "done";
      else newTasks[index].status = "todo";
      return newTasks;
    });
  };

  return (
    <div className="animate-fade-in max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Weekly Action Plan</h2>
          <p className="text-slate-400 text-sm">Shu hafta uchun NEXUS AI tomonidan tuzilgan vazifalar</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Calendar Card */}
        <div className="bg-[#0a0b10] border border-slate-800 rounded-2xl p-6 md:col-span-1">
          <div className="flex items-center justify-between mb-6">
            <span className="text-white font-bold">Joriy Hafta</span>
            <CalendarIcon className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="flex justify-between text-center text-xs text-slate-400">
             <div className="flex flex-col gap-2"><span className="text-slate-600">Du</span><span className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-white">12</span></div>
             <div className="flex flex-col gap-2"><span className="text-emerald-500 font-bold">Se</span><span className="w-8 h-8 flex items-center justify-center rounded-full bg-emerald-500 text-black font-bold border-2 border-emerald-400">13</span></div>
             <div className="flex flex-col gap-2"><span className="text-slate-600">Ch</span><span className="w-8 h-8 flex items-center justify-center rounded-full">14</span></div>
             <div className="flex flex-col gap-2"><span className="text-slate-600">Pa</span><span className="w-8 h-8 flex items-center justify-center rounded-full">15</span></div>
             <div className="flex flex-col gap-2"><span className="text-slate-600">Ju</span><span className="w-8 h-8 flex items-center justify-center rounded-full">16</span></div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-800 text-center">
            <p className="text-sm font-mono text-slate-400 mb-2">Progress</p>
            <div className="text-3xl font-black text-emerald-500 mb-2">
              {tasks.length > 0 ? Math.round((tasks.filter(t => t.status === "done").length / tasks.length) * 100) : 0}%
            </div>
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
               <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${tasks.length > 0 ? (tasks.filter(t => t.status === "done").length / tasks.length) * 100 : 0}%` }}></div>
            </div>
          </div>
        </div>

        {/* Task List */}
        <div className="bg-[#0a0b10] border border-slate-800 rounded-2xl p-6 md:col-span-2 relative min-h-[300px]">
           <h3 className="text-white font-bold mb-4 flex items-center gap-2">
             <CheckSquare className="w-4 h-4 text-blue-500" /> Vazifalar Ro'yxati
           </h3>
           
           {isLoading ? (
             <div className="absolute inset-0 flex flex-col items-center justify-center text-emerald-500 animate-pulse">
                <Sparkles className="w-8 h-8 mb-3" />
                <p className="text-sm">AI siz uchun vazifalar yozmoqda...</p>
             </div>
           ) : (
             <div className="space-y-3">
               {tasks.map((task, i) => (
                 <div 
                   key={i} 
                   onClick={() => toggleTaskStatus(i)}
                   className={`p-4 rounded-xl border flex items-start gap-4 transition-all cursor-pointer hover:border-emerald-500/50 ${
                     task.status === 'done' ? 'bg-emerald-500/5 border-emerald-500/20 opacity-60' :
                     task.status === 'doing' ? 'bg-blue-500/10 border-blue-500/30 shadow-md' :
                     'bg-[#111] border-slate-800'
                   }`}
                 >
                   <div className={`w-5 h-5 rounded border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                     task.status === 'done' ? 'bg-emerald-500 border-emerald-500 text-black' : 
                     task.status === 'doing' ? 'border-blue-500 bg-blue-500/20 text-blue-400' : 'border-slate-600 text-transparent'
                   }`}>
                     {task.status === 'done' && <CheckSquare className="w-3 h-3" />}
                     {task.status === 'doing' && <div className="w-2 h-2 bg-blue-400 rounded-full"></div>}
                   </div>
                   <div className="flex-1">
                     <p className={`text-sm font-medium transition-colors ${task.status === 'done' ? 'text-slate-400 line-through' : 'text-slate-200'}`}>
                       {task.text}
                     </p>
                     <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                       <Clock className="w-3 h-3" /> {task.time} • <span className="uppercase text-[10px] ml-1">{task.status}</span>
                     </p>
                   </div>
                 </div>
               ))}
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
