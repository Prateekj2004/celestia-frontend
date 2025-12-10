import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import chakraIcon from "@assets/generated_images/3d_chakra_icon.png";
import { useState } from "react";
import { cn } from "@/lib/utils";

const chakras = [
  { id: 'crown', name: 'Crown', color: 'bg-purple-500', desc: 'Spirituality, Enlightenment', affirmation: 'I am connected to the universe.' },
  { id: 'third-eye', name: 'Third Eye', color: 'bg-indigo-600', desc: 'Intuition, Wisdom', affirmation: 'I trust my inner guidance.' },
  { id: 'throat', name: 'Throat', color: 'bg-blue-400', desc: 'Communication, Truth', affirmation: 'I speak my truth with clarity.' },
  { id: 'heart', name: 'Heart', color: 'bg-green-500', desc: 'Love, Healing', affirmation: 'I give and receive love freely.' },
  { id: 'solar', name: 'Solar Plexus', color: 'bg-yellow-400', desc: 'Power, Will', affirmation: 'I am powerful and confident.' },
  { id: 'sacral', name: 'Sacral', color: 'bg-orange-500', desc: 'Creativity, Passion', affirmation: 'I embrace my creativity.' },
  { id: 'root', name: 'Root', color: 'bg-red-500', desc: 'Grounding, Stability', affirmation: 'I am safe and grounded.' },
];

export default function Chakra() {
  const [activeChakra, setActiveChakra] = useState(chakras[3]); // Default Heart

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="pt-32 pb-20 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Interactive Body (Simplified) */}
          <div className="relative h-[600px] flex items-center justify-center bg-card/20 border border-white/5 rounded-3xl">
             <img src={chakraIcon} className="absolute h-full opacity-20" alt="Silhouette" />
             <div className="relative z-10 flex flex-col gap-6 items-center">
                {chakras.map((c) => (
                  <button 
                    key={c.id}
                    onClick={() => setActiveChakra(c)}
                    className={cn(
                      "w-8 h-8 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 hover:scale-125",
                      c.color,
                      activeChakra.id === c.id ? "scale-150 ring-4 ring-white/20" : "opacity-70"
                    )}
                  />
                ))}
             </div>
          </div>

          <div className="space-y-8">
             <div className="inline-block px-4 py-1 rounded-full bg-white/10 text-xs font-bold tracking-widest uppercase">
               Selected Chakra
             </div>
             
             <h1 className={cn("text-5xl md:text-7xl font-heading font-bold transition-colors duration-500", activeChakra.color.replace('bg-', 'text-'))}>
               {activeChakra.name} Chakra
             </h1>
             
             <p className="text-2xl text-white/80 font-light">
               {activeChakra.desc}
             </p>

             <div className="bg-card/30 border border-white/10 p-8 rounded-2xl">
               <h3 className="text-lg font-bold text-muted-foreground mb-4 uppercase tracking-wider">Healing Affirmation</h3>
               <p className="text-3xl font-heading italic text-white leading-relaxed">
                 "{activeChakra.affirmation}"
               </p>
             </div>

             <div className="grid grid-cols-2 gap-4">
               <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                 <span className="block text-xs text-muted-foreground uppercase mb-1">Crystal</span>
                 <span className="text-lg font-bold text-white">Amethyst</span>
               </div>
               <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                 <span className="block text-xs text-muted-foreground uppercase mb-1">Frequency</span>
                 <span className="text-lg font-bold text-white">432 Hz</span>
               </div>
             </div>
          </div>

        </div>
      </div>
      
      <Footer />
    </div>
  );
}
