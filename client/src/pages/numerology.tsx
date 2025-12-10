import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import crystalIcon from "@assets/generated_images/3d_glowing_crystal_icon.png";

export default function Numerology() {
  const [name, setName] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    if (!name) return;
    // Mock calculation
    setResult({
      destiny: 7,
      soul: 4,
      personality: 3,
      desc: "You are a seeker of truth. The number 7 indicates a deep inner life and a need for solitude and reflection."
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="pt-32 pb-20 container mx-auto px-6">
        <div className="text-center mb-16">
          <img src={crystalIcon} alt="Numerology" className="w-20 h-20 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]" />
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 text-white">Name Numerology</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your name holds a vibration that shapes your destiny. Decode it now.
          </p>
        </div>

        <div className="max-w-xl mx-auto bg-card/30 border border-white/10 p-8 rounded-2xl">
          <div className="space-y-4 mb-8">
            <Label>Enter Full Birth Name</Label>
            <div className="flex gap-4">
              <Input 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="bg-background/50 border-white/10"
                placeholder="e.g. John Alexander Smith"
              />
              <Button onClick={calculate} className="bg-primary text-background font-bold">Calculate</Button>
            </div>
          </div>

          {result && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="grid grid-cols-3 gap-4">
                <NumberCard label="Destiny" number={result.destiny} color="text-primary" />
                <NumberCard label="Soul Urge" number={result.soul} color="text-secondary" />
                <NumberCard label="Personality" number={result.personality} color="text-accent" />
              </div>
              
              <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                <h3 className="text-lg font-bold text-white mb-2">Analysis</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {result.desc}
                </p>
              </div>

              <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-6 rounded-xl border border-primary/20">
                <h3 className="text-lg font-bold text-white mb-2">2025 Forecast</h3>
                <p className="text-sm text-white/80">
                  This year will be a "Personal Year 5" for you—expect change, travel, and new opportunities. Embrace flexibility.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

function NumberCard({ label, number, color }: any) {
  return (
    <div className="text-center p-4 bg-background/50 rounded-xl border border-white/5">
      <div className={`text-4xl font-heading font-bold ${color} mb-1`}>{number}</div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  )
}
