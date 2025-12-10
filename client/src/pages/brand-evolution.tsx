import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function BrandEvolution() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="pt-32 container mx-auto px-6 pb-20">
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           className="max-w-4xl"
        >
          <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block">Service</span>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white">Brand Evolution</h1>
          <p className="text-2xl text-muted-foreground leading-relaxed mb-12">
             A brand is more than a logo—it's a promise. We help you define your voice, your look, and your story in a crowded marketplace.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-20">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white">Our Approach</h3>
            <ul className="space-y-4">
              {["Brand Strategy & Positioning", "Visual Identity Systems", "Logo Design", "Typography & Color Theory", "Brand Guidelines"].map((item) => (
                <li key={item} className="flex items-center text-lg text-muted-foreground">
                  <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center mr-4 text-secondary">
                    <Check size={14} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-card/30 border border-white/5 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-white">Why It Matters</h3>
            <p className="text-muted-foreground mb-6">
              In the digital age, your brand is often the first interaction a customer has with your business. Make it count.
            </p>
          </div>
        </div>

        <div className="mt-20">
           <Link href="/contact">
             <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white rounded-full px-8 text-lg">
               Revamp Your Brand
             </Button>
           </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
