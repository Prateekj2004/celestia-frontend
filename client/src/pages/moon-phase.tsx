import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import moonIcon from "@assets/generated_images/3d_moon_phases_icon.png";

export default function MoonPhase() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="pt-32 pb-20 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-blue-300 uppercase tracking-widest text-sm font-bold mb-2 block">Current Phase</span>
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 text-white">Waxing Crescent</h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              The moon is growing in light. It is a time for setting intentions, planting seeds, and starting new projects. The energy is building—focus on what you want to increase in your life.
            </p>
            
            <div className="space-y-6">
              <div className="bg-card/30 p-6 rounded-xl border border-blue-500/30">
                <h3 className="text-xl font-bold text-white mb-2">Today's Ritual</h3>
                <p className="text-muted-foreground">
                  Light a white candle and write down three goals for the month ahead. Place them under a clear quartz crystal.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background/50 p-4 rounded-lg border border-white/10">
                  <span className="block text-xs text-muted-foreground uppercase">Moon Sign</span>
                  <span className="text-lg font-bold text-white">Scorpio</span>
                </div>
                <div className="bg-background/50 p-4 rounded-lg border border-white/10">
                  <span className="block text-xs text-muted-foreground uppercase">Illumination</span>
                  <span className="text-lg font-bold text-white">12%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center">
             <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full"></div>
             <img src={moonIcon} alt="Moon" className="relative z-10 w-full max-w-md drop-shadow-2xl animate-pulse-slow" />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
