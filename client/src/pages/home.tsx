import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState } from "react";
import { Sparkles, Sun, Moon, Star, Heart, Zap, ArrowRight, Activity } from "lucide-react";
import heroBg from "@assets/generated_images/mystical_astrology_background_with_zodiac_wheel.png";
import crystalIcon from "@assets/generated_images/3d_glowing_crystal_icon.png";
import moonIcon from "@assets/generated_images/3d_moon_phases_icon.png";
import tarotIcon from "@assets/generated_images/3d_tarot_cards_icon.png";
import kundliIcon from "@assets/generated_images/3d_kundli_scroll_icon.png";
import chakraIcon from "@assets/generated_images/3d_chakra_icon.png";
import { Link } from "wouter";

export default function Home() {
  const [dob, setDob] = useState("");
  const [showDashboard, setShowDashboard] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (dob) setShowDashboard(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        </div>

        <div className="container relative z-10 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-8xl font-heading font-bold mb-6 text-white drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]">
              Decode Your Destiny
            </h1>
            <p className="text-xl md:text-2xl text-yellow-100/80 max-w-2xl mx-auto mb-10 font-light tracking-wide">
              Ancient wisdom meets modern insight. Enter your birthdate to unlock your cosmic blueprint.
            </p>

            {/* Life Dashboard Input */}
            <div className="max-w-md mx-auto bg-card/40 backdrop-blur-md border border-primary/30 p-2 rounded-full flex gap-2 shadow-[0_0_30px_rgba(45,10,60,0.5)]">
              <Input 
                type="date" 
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="bg-transparent border-none text-white placeholder:text-white/50 h-12 px-6 focus-visible:ring-0"
              />
              <Button 
                onClick={handleCalculate}
                className="rounded-full h-12 px-8 bg-primary hover:bg-primary/90 text-background font-bold uppercase tracking-widest"
              >
                Reveal
              </Button>
            </div>
          </motion.div>

          {/* Life Dashboard Result */}
          {showDashboard && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left"
            >
              <DashboardCard icon={<Star className="text-primary" />} title="Numerology" value="Life Path 7" desc="The Seeker. Today is a day for introspection." />
              <DashboardCard icon={<Zap className="text-accent" />} title="Energy" value="High Vibration" desc="Great day for starting new projects." />
              <DashboardCard icon={<Heart className="text-secondary" />} title="Love" value="Harmonious" desc="Venus is favoring your connections today." />
              <DashboardCard icon={<Activity className="text-green-400" />} title="Lucky Color" value="Emerald Green" desc="Wear green to attract abundance." />
              <DashboardCard icon={<Moon className="text-blue-300" />} title="Moon Phase" value="Waxing Crescent" desc="Set your intentions for the month." />
              <DashboardCard icon={<Sun className="text-yellow-400" />} title="Crystal" value="Citrine" desc="Carries the power of the sun." />
            </motion.div>
          )}
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary uppercase tracking-[0.3em] text-sm font-bold">Cosmic Services</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mt-2 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Explore the Mystical Arts
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard 
              title="Kundli Reports" 
              desc="Comprehensive Vedic birth charts and life predictions." 
              icon={kundliIcon} 
              link="/kundli" 
              color="border-primary/50"
            />
            <ServiceCard 
              title="Love Compatibility" 
              desc="Analyze the chemistry between you and your partner." 
              icon={heartIconPlaceholder} 
              link="/compatibility" 
              color="border-secondary/50"
              customIcon={<Heart className="w-16 h-16 text-secondary mb-4" />}
            />
            <ServiceCard 
              title="Tarot Readings" 
              desc="Daily guidance from the cards for clarity and insight." 
              icon={tarotIcon} 
              link="/tarot" 
              color="border-purple-500/50"
            />
            <ServiceCard 
              title="Moon Phases" 
              desc="Rituals and meanings for the current lunar cycle." 
              icon={moonIcon} 
              link="/moon-phase" 
              color="border-blue-400/50"
            />
            <ServiceCard 
              title="Numerology" 
              desc="Unlock the hidden meaning behind your name and birthdate." 
              icon={crystalIcon} 
              link="/numerology" 
              color="border-accent/50"
            />
            <ServiceCard 
              title="Chakra Healing" 
              desc="Balance your energy centers for holistic well-being." 
              icon={chakraIcon} 
              link="/chakra" 
              color="border-green-400/50"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function DashboardCard({ icon, title, value, desc }: any) {
  return (
    <Card className="bg-card/60 backdrop-blur border-white/10 hover:border-primary/50 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold font-heading text-white mb-1">{value}</div>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </CardContent>
    </Card>
  )
}

function ServiceCard({ title, desc, icon, link, color, customIcon }: any) {
  return (
    <Link href={link} className={`group bg-card/30 border ${color} p-8 rounded-2xl cursor-pointer hover:bg-card/50 transition-all relative overflow-hidden block`}>
      <motion.div whileHover={{ y: -5 }}>
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all" />
        
        <div className="mb-6">
          {customIcon ? customIcon : <img src={icon} alt={title} className="w-16 h-16 object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />}
        </div>
        
        <h3 className="text-2xl font-heading font-bold mb-3 text-white group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-muted-foreground mb-6 line-clamp-2">{desc}</p>
        
        <span className="flex items-center text-primary text-sm font-bold tracking-wider group-hover:translate-x-2 transition-transform">
          BEGIN JOURNEY <ArrowRight className="ml-2 w-4 h-4" />
        </span>
      </motion.div>
    </Link>
  )
}

const heartIconPlaceholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ff69b4' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'/%3E%3C/svg%3E";
