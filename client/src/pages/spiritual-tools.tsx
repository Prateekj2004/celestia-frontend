import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Compass, Clock, Hash, Gem } from "lucide-react";

export default function SpiritualTools() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="pt-32 pb-20 container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 text-white">Spiritual Toolbox</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Quick utilities for your daily spiritual practice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           <ToolCard 
             icon={<Hash className="text-primary w-8 h-8" />}
             title="Angel Numbers"
             desc="See 11:11 everywhere? Decode the message."
           />
           <ToolCard 
             icon={<Compass className="text-secondary w-8 h-8" />}
             title="Lucky Direction"
             desc="Find your power direction for the day."
           />
           <ToolCard 
             icon={<Gem className="text-accent w-8 h-8" />}
             title="Crystal Finder"
             desc="Identify the stone you need right now."
           />
           <ToolCard 
             icon={<Clock className="text-orange-400 w-8 h-8" />}
             title="Destiny Clock"
             desc="Your current active numerology cycle."
           />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

function ToolCard({ icon, title, desc }: any) {
  return (
    <div className="bg-card/30 border border-white/10 p-6 rounded-2xl hover:bg-card/50 transition-colors cursor-pointer group">
      <div className="bg-white/5 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  )
}
