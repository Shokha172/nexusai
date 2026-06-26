import { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker, Circle } from '@react-google-maps/api';
import { 
  MapPin, ScanLine, Crosshair, Star, AlertTriangle, TrendingUp, MessageSquare, 
  DollarSign, Activity, Bell, Calendar, FlaskConical, LinkIcon 
} from "lucide-react";
import { AIAnalysisResult, generateCompetitorAnalysis } from "../services/aiService";

interface Props {
  googleMapsKey: string;
  geminiKey: string;
}

const mapContainerStyle = { width: '100%', height: '400px' };
const defaultCenter = { lat: 41.2995, lng: 69.2401 }; // Tashkent fallback

export default function IntelligenceDashboard({ googleMapsKey, geminiKey }: Props) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: googleMapsKey,
    libraries: ['places']
  });

  const [businessType, setBusinessType] = useState("Coffee Shop");
  const [radius, setRadius] = useState<number>(1000);
  
  const [center, setCenter] = useState(defaultCenter);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  
  const [competitors, setCompetitors] = useState<any[]>([]);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysisResult | null>(null);
  
  const [scanning, setScanning] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    setMap(map);
    // Auto-get location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      }, () => {
        console.warn("Geolocation denied or failed. Using default center.");
      });
    }
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  const handleScan = () => {
    if (!map) return;
    setScanning(true);
    setCompetitors([]);
    setAiAnalysis(null);

    const service = new window.google.maps.places.PlacesService(map);
    const request = {
      location: center,
      radius: radius,
      keyword: businessType,
    };

    service.nearbySearch(request, async (results, status) => {
      setScanning(false);
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
        setCompetitors(results.slice(0, 5)); // Take top 5
        
        // Start AI Analysis
        setAnalyzing(true);
        const analysis = await generateCompetitorAnalysis(geminiKey, businessType, results);
        setAiAnalysis(analysis);
        setAnalyzing(false);
      } else {
        alert("Raqobatchilar topilmadi yoki xatolik yuz berdi. " + status);
      }
    });
  };

  if (!isLoaded) return <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">Google Maps yuklanmoqda...</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 font-sans p-6 md:p-10 selection:bg-emerald-500 selection:text-black">
      
      <header className="max-w-6xl mx-auto mb-10 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
          NEXUS <span className="text-emerald-500">AI</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Business Intelligence & Competitor Copilot
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-10">
        
        {/* Step 1: Scan & Map */}
        <section className="bg-[#0a0b10] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row items-center gap-4">
             <div className="flex-1 w-full">
               <label className="text-xs font-mono text-slate-500 uppercase block mb-1">Biznesingiz turi</label>
               <input 
                 type="text" 
                 value={businessType}
                 onChange={(e) => setBusinessType(e.target.value)}
                 className="w-full bg-[#111] border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none"
               />
             </div>
             <div className="w-full md:w-48">
               <label className="text-xs font-mono text-slate-500 uppercase block mb-1">Radius</label>
               <select 
                 value={radius} 
                 onChange={(e) => setRadius(Number(e.target.value))}
                 className="w-full bg-[#111] border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none"
               >
                 <option value={500}>500 metr</option>
                 <option value={1000}>1 km</option>
                 <option value={3000}>3 km</option>
               </select>
             </div>
             <div className="w-full md:w-auto mt-5">
                <button 
                  onClick={handleScan}
                  disabled={scanning || analyzing}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 px-8 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {scanning ? <span className="animate-pulse">Skannerlanmoqda...</span> : <><ScanLine className="w-5 h-5" /> AI Scan</>}
                </button>
             </div>
          </div>
          
          <div className="relative">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={14}
              onLoad={onLoad}
              onUnmount={onUnmount}
              options={{ styles: mapStyles, disableDefaultUI: true }}
            >
              <Marker position={center} icon={{ url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" }} />
              <Circle center={center} radius={radius} options={{ fillColor: '#10B981', fillOpacity: 0.1, strokeColor: '#10B981', strokeOpacity: 0.5, strokeWeight: 1 }} />
              
              {competitors.map((comp, i) => (
                <Marker 
                  key={i} 
                  position={comp.geometry.location} 
                  icon={{ url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png" }}
                />
              ))}
            </GoogleMap>
            
            {/* Overlay Notice */}
            <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-3 max-w-xs shadow-lg">
               <p className="text-xs text-white font-bold flex items-center gap-2">
                 <MapPin className="w-4 h-4 text-emerald-400" /> Sizning joylashuvingiz
               </p>
               <p className="text-[10px] text-slate-400 mt-1">Pitchdagi eng kuchli gap: Google Maps sizga qayerda ekaningizni ko'rsatadi. NEXUS AI esa qayerda va qanday qilib raqobatchilardan yaxshiroq bo'lishni ko'rsatadi.</p>
            </div>
          </div>
        </section>

        {/* Step 2: Competitor Discovery */}
        {competitors.length > 0 && (
          <section className="animate-fade-in">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Crosshair className="w-5 h-5 text-rose-500" /> Competitor Discovery ({competitors.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {competitors.map((comp, i) => (
                <div key={i} className="bg-[#0a0b10] border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-white mb-1 truncate">{comp.name}</h3>
                    <p className="text-xs text-slate-400 truncate">{comp.vicinity}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                     <span className="flex items-center gap-1 text-xs text-amber-400 font-bold"><Star className="w-3.5 h-3.5 fill-amber-400" /> {comp.rating || 'N/A'} ({comp.user_ratings_total || 0})</span>
                     <span className="text-[10px] font-mono bg-slate-800 text-emerald-400 px-2 py-0.5 rounded">
                       {comp.business_status === "OPERATIONAL" ? "Ochiq" : "Yopiq"}
                     </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Loading AI Insights */}
        {analyzing && (
           <div className="p-10 border border-emerald-500/20 bg-emerald-500/5 rounded-2xl flex flex-col items-center justify-center text-center animate-pulse">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4 relative">
                 <div className="absolute inset-0 border-2 border-emerald-500 rounded-full animate-ping opacity-20"></div>
                 <FlaskConical className="w-8 h-8 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold text-emerald-400 mb-2">AI Analysis is running...</h3>
              <p className="text-sm text-emerald-200/50">Gemini API raqobatchilarni tahlil qilmoqda va o'sish strategiyasini tuzmoqda.</p>
           </div>
        )}

        {/* Step 3: Full AI Intelligence Dashboard */}
        {aiAnalysis && !analyzing && (
          <div className="space-y-8 animate-fade-in">
             
             {/* Score & Notification Header */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="col-span-1 bg-gradient-to-br from-[#0a0b10] to-[#111827] border border-slate-700 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl"></div>
                  <p className="text-xs font-mono text-slate-400 uppercase mb-2">AI Growth Score</p>
                  <p className="text-6xl font-black text-white mb-4">{aiAnalysis.growthScore.overall}</p>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between"><span className="text-slate-400">Marketing</span><span className="text-emerald-400">{aiAnalysis.growthScore.marketing}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Finance</span><span className="text-emerald-400">{aiAnalysis.growthScore.finance}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Brand</span><span className="text-emerald-400">{aiAnalysis.growthScore.brand}</span></div>
                  </div>
               </div>

               <div className="col-span-2 bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 flex flex-col justify-center">
                 <h3 className="text-blue-400 font-bold flex items-center gap-2 mb-2"><Bell className="w-5 h-5" /> AI Notification</h3>
                 <p className="text-white text-lg mb-2">{aiAnalysis.notification.title}</p>
                 <div className="p-3 bg-black/20 rounded-lg border border-blue-500/10">
                   <p className="text-sm text-blue-200"><span className="font-bold text-blue-400">Recommendation:</span> {aiAnalysis.notification.advice}</p>
                 </div>
               </div>
             </div>

             {/* Multi-Intelligence Grid */}
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               
               {/* Recommendations & Compare */}
               <div className="bg-[#0a0b10] border border-slate-800 rounded-2xl p-6 shadow-xl">
                 <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                   <TrendingUp className="w-5 h-5 text-emerald-500" /> AI Compare & Recommendations
                 </h3>
                 <div className="space-y-4">
                   {aiAnalysis.recommendations.map((rec, i) => (
                     <div key={i} className="flex items-center justify-between p-4 bg-[#111] border border-slate-700 rounded-xl hover:border-emerald-500/50 transition-colors">
                       <p className="text-sm text-slate-200">{rec.title}</p>
                       <div className="text-right shrink-0">
                         <span className="text-[10px] font-mono text-slate-500 block">Expected Growth</span>
                         <span className="text-emerald-400 font-bold">{rec.growth}</span>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>

               {/* Social Media Intel */}
               <div className="bg-[#0a0b10] border border-slate-800 rounded-2xl p-6 shadow-xl">
                 <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                   <MessageSquare className="w-5 h-5 text-purple-500" /> AI Social Media Intelligence
                 </h3>
                 <div className="flex items-center gap-6 mb-6 p-4 bg-purple-500/5 border border-purple-500/10 rounded-xl">
                   <div className="flex-1 text-center border-r border-slate-700">
                     <p className="text-[10px] text-slate-500 uppercase font-mono mb-1">Competitor (Last 30D)</p>
                     <p className="text-2xl font-bold text-white">{aiAnalysis.socialMedia.competitorPosts} Posts</p>
                   </div>
                   <div className="flex-1 text-center">
                     <p className="text-[10px] text-slate-500 uppercase font-mono mb-1">You (Est.)</p>
                     <p className="text-2xl font-bold text-slate-400">{aiAnalysis.socialMedia.yourPosts} Posts</p>
                   </div>
                 </div>
                 <div className="bg-[#111] p-4 rounded-xl border border-slate-700">
                    <p className="text-xs text-rose-400 font-mono mb-1">Difference: {aiAnalysis.socialMedia.diff}</p>
                    <p className="text-sm text-white font-bold">{aiAnalysis.socialMedia.advice}</p>
                 </div>
               </div>

               {/* Review Intel */}
               <div className="bg-[#0a0b10] border border-slate-800 rounded-2xl p-6 shadow-xl">
                 <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                   <Star className="w-5 h-5 text-amber-500" /> AI Review Intelligence
                 </h3>
                 <div className="grid grid-cols-2 gap-4 mb-6">
                   <div className="p-4 bg-rose-500/5 border border-rose-500/10 rounded-xl">
                     <p className="text-xs font-bold text-rose-400 mb-2">Customers complain about:</p>
                     <ul className="text-xs text-slate-300 space-y-1">
                       {aiAnalysis.reviews.complaints.map((c, i) => <li key={i}>• {c}</li>)}
                     </ul>
                   </div>
                   <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                     <p className="text-xs font-bold text-emerald-400 mb-2">Customers love:</p>
                     <ul className="text-xs text-slate-300 space-y-1">
                       {aiAnalysis.reviews.loves.map((c, i) => <li key={i}>• {c}</li>)}
                     </ul>
                   </div>
                 </div>
                 <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-amber-500 uppercase">Open Opportunity</span>
                      <p className="text-amber-400 font-bold">{aiAnalysis.reviews.openOpportunity}</p>
                    </div>
                    <AlertTriangle className="w-6 h-6 text-amber-500 opacity-50" />
                 </div>
               </div>

               {/* Price Intel & SWOT */}
               <div className="bg-[#0a0b10] border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col">
                 <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                   <DollarSign className="w-5 h-5 text-green-500" /> AI Price & SWOT Intelligence
                 </h3>
                 
                 <div className="flex items-center justify-between p-4 bg-[#111] border border-slate-700 rounded-xl mb-6">
                   <div>
                     <p className="text-[10px] font-mono text-slate-500 uppercase">Market Average</p>
                     <p className="text-xl font-bold text-white">~ {aiAnalysis.price.competitorAverage.toLocaleString()} UZS</p>
                   </div>
                   <div className="text-right">
                     <p className="text-xs text-emerald-400 font-bold">{aiAnalysis.price.advice}</p>
                   </div>
                 </div>

                 <div className="grid grid-cols-2 gap-2 mt-auto">
                    <div className="bg-emerald-500/5 border border-emerald-500/10 p-3 rounded-lg">
                      <p className="text-[10px] text-emerald-500 font-bold mb-1">S - Strengths</p>
                      <p className="text-[10px] text-slate-300 line-clamp-2">{aiAnalysis.swot.strengths.join(', ')}</p>
                    </div>
                    <div className="bg-rose-500/5 border border-rose-500/10 p-3 rounded-lg">
                      <p className="text-[10px] text-rose-500 font-bold mb-1">W - Weakness</p>
                      <p className="text-[10px] text-slate-300 line-clamp-2">{aiAnalysis.swot.weaknesses.join(', ')}</p>
                    </div>
                    <div className="bg-blue-500/5 border border-blue-500/10 p-3 rounded-lg">
                      <p className="text-[10px] text-blue-500 font-bold mb-1">O - Opportunities</p>
                      <p className="text-[10px] text-slate-300 line-clamp-2">{aiAnalysis.swot.opportunities.join(', ')}</p>
                    </div>
                    <div className="bg-amber-500/5 border border-amber-500/10 p-3 rounded-lg">
                      <p className="text-[10px] text-amber-500 font-bold mb-1">T - Threats</p>
                      <p className="text-[10px] text-slate-300 line-clamp-2">{aiAnalysis.swot.threats.join(', ')}</p>
                    </div>
                 </div>
               </div>

             </div>

             {/* Bottom row: Missions & Trends */}
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                <div className="lg:col-span-1 bg-[#0a0b10] border border-slate-800 rounded-2xl p-6 shadow-xl">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                   <Calendar className="w-5 h-5 text-sky-500" /> AI Weekly Mission
                  </h3>
                  <div className="space-y-3">
                    {aiAnalysis.weeklyMissions.map((m, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-[#111] border border-slate-700 rounded-xl">
                        <div className="w-6 h-6 rounded border border-sky-500/30 bg-sky-500/10 flex items-center justify-center shrink-0">
                          <span className="text-[10px] font-bold text-sky-400">{i+1}</span>
                        </div>
                        <p className="text-xs text-slate-200">{m}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-2 bg-[#0a0b10] border border-slate-800 rounded-2xl p-6 shadow-xl">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                   <Activity className="w-5 h-5 text-blue-500" /> Google Trends (Simulated Widget)
                  </h3>
                  <div className="w-full h-48 bg-[#111] border border-slate-700 rounded-xl flex items-center justify-center relative overflow-hidden">
                    <p className="text-slate-500 font-mono text-xs z-10">Google Trends iframe for "{businessType}"</p>
                    <div className="absolute inset-0 opacity-20" style={{ background: "linear-gradient(90deg, transparent 0%, #3b82f6 50%, transparent 100%)", animation: "shimmer 2s infinite" }}></div>
                  </div>
                </div>
                
             </div>
          </div>
        )}
      </main>

      <style>{`
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
      `}</style>
    </div>
  );
}

// Dark map style for premium look
const mapStyles = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
  { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#263c3f" }] },
  { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#6b9a76" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#38414e" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#212a37" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9ca5b3" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#746855" }] },
  { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#1f2835" }] },
  { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#f3d19c" }] },
  { featureType: "transit", elementType: "geometry", stylers: [{ color: "#2f3948" }] },
  { featureType: "transit.station", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#17263c" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#515c6d" }] },
  { featureType: "water", elementType: "labels.text.stroke", stylers: [{ color: "#17263c" }] },
];
