import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { useState } from "react";
import { Heart, Flame, MessageCircle, RefreshCw } from "lucide-react";

export default function Compatibility() {
  const [analyzed, setAnalyzed] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="pt-32 pb-20 container mx-auto px-6">
        <div className="text-center mb-12">
          <Heart className="w-20 h-20 text-secondary mx-auto mb-6 drop-shadow-[0_0_15px_rgba(255,105,180,0.5)]" />
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 text-white">Cosmic Compatibility</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the alignment of your souls. Beyond just Sun signs, we analyze deep astrological connections.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {!analyzed ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="bg-card/30 border border-white/10 p-8 rounded-2xl backdrop-blur-sm"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-primary">Person A</h3>
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input className="bg-background/50 border-white/10" />
                  </div>
                  <div className="space-y-2">
                    <Label>Date of Birth</Label>
                    <Input type="date" className="bg-background/50 border-white/10" />
                  </div>
                </div>

                <div className="hidden md:flex justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-2xl font-heading text-primary">
                    &
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-secondary">Person B</h3>
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input className="bg-background/50 border-white/10" />
                  </div>
                  <div className="space-y-2">
                    <Label>Date of Birth</Label>
                    <Input type="date" className="bg-background/50 border-white/10" />
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Button 
                  onClick={() => setAnalyzed(true)}
                  className="bg-gradient-to-r from-primary to-secondary text-white font-bold px-10 py-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Analyze Match
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="space-y-8"
            >
              {/* Overall Score */}
              <div className="bg-gradient-to-r from-primary/20 to-secondary/20 border border-white/10 p-10 rounded-3xl text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
                <h3 className="text-2xl font-bold mb-2">Overall Cosmic Match</h3>
                <div className="text-8xl font-heading font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
                  87%
                </div>
                <p className="text-lg text-white max-w-xl mx-auto">
                  A powerful spiritual connection with intense chemistry. While communication may require effort, your emotional bond is unbreakable.
                </p>
                <Button variant="ghost" onClick={() => setAnalyzed(false)} className="mt-6 text-muted-foreground hover:text-white">
                  <RefreshCw className="w-4 h-4 mr-2" /> Check Another
                </Button>
              </div>

              {/* Detailed Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ScoreCard 
                  icon={<Heart className="text-red-400" />} 
                  title="Love & Emotion" 
                  score={92} 
                  desc="Deep emotional resonance and shared values." 
                />
                <ScoreCard 
                  icon={<MessageCircle className="text-blue-400" />} 
                  title="Communication" 
                  score={65} 
                  desc="Different styles may lead to misunderstandings." 
                />
                <ScoreCard 
                  icon={<Flame className="text-orange-400" />} 
                  title="Sexual Chemistry" 
                  score={95} 
                  desc="Electric and passionate physical connection." 
                />
              </div>

              {/* Detailed Report Teaser */}
              <div className="bg-card/40 border border-white/10 p-8 rounded-2xl text-center">
                <h3 className="text-xl font-bold mb-4">Get the Full 15-Page Relationship Report</h3>
                <p className="text-muted-foreground mb-6">
                  Includes conflict resolution strategies, future timeline, and past life connection analysis.
                </p>
                <Button className="bg-white text-background font-bold hover:bg-white/90">
                  Unlock Full Report ($19)
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

function ScoreCard({ icon, title, score, desc }: any) {
  return (
    <div className="bg-card/40 border border-white/10 p-6 rounded-2xl text-center hover:border-white/20 transition-colors">
      <div className="bg-white/5 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <h4 className="font-bold text-lg mb-2">{title}</h4>
      <div className="text-3xl font-heading font-bold text-white mb-2">{score}%</div>
      <p className="text-sm text-muted-foreground">{desc}</p>
      
      <div className="w-full bg-white/10 h-2 rounded-full mt-4 overflow-hidden">
        <div className="h-full bg-primary" style={{ width: `${score}%` }} />
      </div>
    </div>
  )
}
