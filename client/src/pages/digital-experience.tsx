import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function DigitalExperience() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="pt-32 container mx-auto px-6 pb-20">
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           className="max-w-4xl"
        >
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Service</span>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white">Digital Experience</h1>
          <p className="text-2xl text-muted-foreground leading-relaxed mb-12">
             We engineer websites and web applications that are as beautiful as they are functional. Performance, accessibility, and interaction design are at the core of our process.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-20">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white">What We Do</h3>
            <ul className="space-y-4">
              {["Custom Web Development", "React & Next.js Applications", "3D WebGL Experiences", "Mobile-First Design", "Performance Optimization"].map((item) => (
                <li key={item} className="flex items-center text-lg text-muted-foreground">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-4 text-primary">
                    <Check size={14} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-card/30 border border-white/5 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-white">Our Stack</h3>
            <p className="text-muted-foreground mb-6">
              We use the most modern, reliable tools available to ensure your project scales and performs.
            </p>
            <div className="flex flex-wrap gap-2">
               {["React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Framer Motion", "Three.js"].map(tag => (
                 <span key={tag} className="px-4 py-2 rounded-full bg-white/5 text-sm border border-white/10">{tag}</span>
               ))}
            </div>
          </div>
        </div>
        
        <div className="mt-20">
           <Link href="/contact">
             <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 text-lg">
               Start Your Project
             </Button>
           </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
