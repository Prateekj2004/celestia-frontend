import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { useState } from "react";
import kundliIcon from "@assets/generated_images/3d_kundli_scroll_icon.png";
import { Lock, Check } from "lucide-react";

export default function Kundli() {
  const [reportGenerated, setReportGenerated] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportGenerated(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="pt-32 pb-20 container mx-auto px-6">
        <div className="text-center mb-12">
          <img src={kundliIcon} alt="Kundli" className="w-24 h-24 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 text-white">Vedic Kundli Report</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Generate your detailed birth chart including Lagna, Navamsa, Dasha periods, and planetary positions.
          </p>
        </div>

        {!reportGenerated ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto bg-card/30 border border-white/10 p-8 rounded-2xl backdrop-blur-sm"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input placeholder="Enter your name" className="bg-background/50 border-white/10" />
                </div>
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <Select>
                    <SelectTrigger className="bg-background/50 border-white/10">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Date of Birth</Label>
                  <Input type="date" className="bg-background/50 border-white/10" />
                </div>
                <div className="space-y-2">
                  <Label>Time of Birth</Label>
                  <Input type="time" className="bg-background/50 border-white/10" />
                </div>
                <div className="space-y-2">
                  <Label>Place of Birth</Label>
                  <Input placeholder="City, Country" className="bg-background/50 border-white/10" />
                </div>
              </div>

              <Button type="submit" className="w-full h-12 bg-primary text-background font-bold text-lg hover:bg-primary/90">
                Generate Free Report
              </Button>
            </form>
          </motion.div>
        ) : (
          <div className="space-y-12">
             {/* Basic Report (Free) */}
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
             >
                <div className="bg-card border border-white/10 p-6 rounded-2xl">
                  <h3 className="text-2xl font-heading font-bold mb-4 text-primary">Lagna Chart</h3>
                  <div className="aspect-square bg-black/40 rounded-xl border border-white/5 flex items-center justify-center relative">
                    {/* Abstract Chart Representation */}
                    <div className="w-full h-full p-4 grid grid-cols-3 grid-rows-3 gap-1">
                      {[...Array(9)].map((_, i) => (
                        <div key={i} className="border border-white/10 flex items-center justify-center text-xs text-muted-foreground hover:bg-white/5 transition-colors">
                           {["Sun", "Moon", "Jup", "Ven", "Sat", "Mar", "Mer", "Rah", "Ket"][i]}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-card border border-white/10 p-6 rounded-2xl">
                    <h3 className="text-xl font-heading font-bold mb-4 text-secondary">Planetary Positions</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-muted-foreground">Sun</span>
                        <span className="text-white">Leo (12° 30')</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-muted-foreground">Moon</span>
                        <span className="text-white">Taurus (5° 10')</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-muted-foreground">Ascendant</span>
                        <span className="text-white">Scorpio</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 p-6 rounded-2xl">
                    <h3 className="text-xl font-heading font-bold mb-2 text-white">Current Dasha</h3>
                    <p className="text-lg font-bold text-primary mb-1">Jupiter Mahadasha</p>
                    <p className="text-sm text-muted-foreground">Ends: Dec 2026</p>
                    <p className="mt-4 text-sm text-white/80">
                      A period of growth, learning, and spiritual expansion. Good for education and long-distance travel.
                    </p>
                  </div>
                </div>
             </motion.div>

             {/* Premium Upsell */}
             <div className="max-w-4xl mx-auto">
               <h2 className="text-3xl font-heading font-bold text-center mb-8">Unlock Deep Insights</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <PricingCard 
                   title="Detailed Life Report"
                   price="$29"
                   features={[
                     "50+ Page PDF Analysis",
                     "Career & Wealth Predictions",
                     "Marriage & Relationship Timing",
                     "Gemstone Recommendations",
                     "Health Analysis"
                   ]}
                 />
                 <PricingCard 
                   title="Ultimate Destiny Pack"
                   price="$49"
                   features={[
                     "Everything in Life Report",
                     "5-Year Detailed Forecast",
                     "Dasha-by-Dasha Breakdown",
                     "Remedies & Mantras",
                     "Ask 1 Question to Astrologer"
                   ]}
                   highlight
                 />
               </div>
             </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

function PricingCard({ title, price, features, highlight }: any) {
  return (
    <div className={`p-8 rounded-2xl border flex flex-col ${highlight ? 'bg-card border-primary shadow-[0_0_30px_rgba(255,215,0,0.15)]' : 'bg-card/50 border-white/10'}`}>
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <div className="text-4xl font-bold text-primary">{price}</div>
      </div>
      <ul className="space-y-4 mb-8 flex-1">
        {features.map((f: string, i: number) => (
          <li key={i} className="flex items-start gap-3 text-muted-foreground">
             <Check className="w-5 h-5 text-primary shrink-0" />
             <span className="text-sm">{f}</span>
          </li>
        ))}
      </ul>
      <Button className={`w-full ${highlight ? 'bg-primary text-background hover:bg-primary/90' : 'bg-white/10 hover:bg-white/20'}`}>
        {highlight ? 'Get Instant Access' : 'Purchase Now'}
      </Button>
    </div>
  )
}
