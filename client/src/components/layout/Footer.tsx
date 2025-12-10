import { Link } from "wouter";
import { Sparkles, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-white/10 pt-20 pb-10 relative overflow-hidden">
      {/* Background stars effect */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold font-heading bg-gradient-to-r from-primary to-yellow-200 bg-clip-text text-transparent flex items-center gap-2">
              <Sparkles className="text-primary w-5 h-5" /> CELESTIA
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Unlocking the secrets of the cosmos to guide your journey. Ancient wisdom meets modern technology.
            </p>
            <div className="flex gap-4 pt-4">
               <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Facebook size={20} /></a>
               <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter size={20} /></a>
               <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={20} /></a>
               <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Youtube size={20} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-foreground uppercase tracking-widest text-sm">Services</h4>
            <div className="flex flex-col space-y-3 text-sm text-muted-foreground">
              <Link href="/kundli" className="hover:text-primary transition-colors cursor-pointer">Kundli Reports</Link>
              <Link href="/compatibility" className="hover:text-primary transition-colors cursor-pointer">Love Compatibility</Link>
              <Link href="/tarot" className="hover:text-primary transition-colors cursor-pointer">Daily Tarot</Link>
              <Link href="/numerology" className="hover:text-primary transition-colors cursor-pointer">Numerology Forecast</Link>
              <Link href="/moon-phase" className="hover:text-primary transition-colors cursor-pointer">Moon Phases</Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-foreground uppercase tracking-widest text-sm">Resources</h4>
            <div className="flex flex-col space-y-3 text-sm text-muted-foreground">
              <Link href="/spiritual-tools" className="hover:text-primary transition-colors cursor-pointer">Spiritual Tools</Link>
              <Link href="/chakra" className="hover:text-primary transition-colors cursor-pointer">Chakra Healing</Link>
              <Link href="/contact" className="hover:text-primary transition-colors cursor-pointer">Blog</Link>
              <Link href="/contact" className="hover:text-primary transition-colors cursor-pointer">FAQs</Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-foreground uppercase tracking-widest text-sm">Daily Insight</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to get your daily horoscope and lucky numbers delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-muted/50 border border-white/10 rounded-md px-4 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary text-foreground placeholder:text-muted-foreground/50"
              />
              <button className="bg-primary px-4 py-2 rounded-md text-background text-sm font-bold hover:bg-primary/90 transition-all shadow-[0_0_10px_rgba(255,215,0,0.2)]">
                Join
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Celestia Astrology. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
