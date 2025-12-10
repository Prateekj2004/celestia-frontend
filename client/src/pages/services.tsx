import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import webIcon from "@assets/generated_images/3d_icon_for_web_development.png";
import brandIcon from "@assets/generated_images/3d_icon_for_brand_design.png";
import marketingIcon from "@assets/generated_images/3d_icon_for_digital_marketing.png";

export default function Services() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="pt-32 pb-20 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive digital solutions designed to elevate your brand in the modern landscape.
          </p>
        </motion.div>

        <div className="grid gap-8">
          <ServiceRow 
            title="Digital Experience"
            description="We build immersive websites and robust applications using the latest technologies. From React to WebGL, we ensure your digital presence is cutting-edge."
            icon={webIcon}
            link="/services/digital-experience"
            color="from-primary to-blue-600"
          />
          <ServiceRow 
            title="Brand Evolution"
            description="Your brand is more than a logo. We create comprehensive identity systems, voice guidelines, and visual languages that resonate with your audience."
            icon={brandIcon}
            link="/services/brand-evolution"
            color="from-secondary to-orange-500"
          />
          <ServiceRow 
            title="Growth Dynamics"
            description="Data-driven marketing, SEO, and analytics. We don't just launch products; we ensure they reach the right people at the right time."
            icon={marketingIcon}
            link="/services/growth-dynamics"
            color="from-green-400 to-chart-4"
          />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

function ServiceRow({ title, description, icon, link, color }: { title: string, description: string, icon: string, link: string, color: string }) {
  return (
    <Link href={link} className="block group">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="cursor-pointer bg-card/30 border border-white/5 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 hover:bg-card/50 transition-colors"
      >
        <div className={`w-32 h-32 flex-shrink-0 rounded-2xl bg-gradient-to-br ${color} p-1`}>
           <div className="w-full h-full bg-black/40 backdrop-blur-sm rounded-xl flex items-center justify-center">
             <img src={icon} alt={title} className="w-20 h-20 object-contain" />
           </div>
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-bold mb-4 group-hover:text-white transition-colors">{title}</h2>
          <p className="text-muted-foreground text-lg mb-6 max-w-3xl">{description}</p>
          <span className="inline-flex items-center text-primary font-bold group-hover:translate-x-2 transition-transform">
            EXPLORE <ArrowRight className="ml-2" />
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
