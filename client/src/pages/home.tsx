import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Code, Palette, Rocket } from "lucide-react";
import heroBg from "@assets/generated_images/vibrant_3d_abstract_shapes_background.png";
import webIcon from "@assets/generated_images/3d_icon_for_web_development.png";
import brandIcon from "@assets/generated_images/3d_icon_for_brand_design.png";
import marketingIcon from "@assets/generated_images/3d_icon_for_digital_marketing.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" />
        </div>

        <div className="container relative z-10 px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-8xl font-bold font-sans tracking-tight mb-6 bg-gradient-to-br from-white via-white to-white/50 bg-clip-text text-transparent"
          >
            Digital Realities,<br />Reimagined.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            We blend avant-garde design with cutting-edge technology to build brands that defy expectations.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/services">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12 text-lg shadow-[0_0_20px_rgba(124,58,237,0.5)] cursor-pointer">
                Explore Services
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10 text-white rounded-full px-8 h-12 text-lg backdrop-blur-sm cursor-pointer">
                Get in Touch
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-32 bg-background relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Expertise</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard 
              title="Digital Experience"
              description="Websites and applications that feel alive. Smooth interactions, robust engineering."
              icon={webIcon}
              link="/services/digital-experience"
              delay={0}
            />
            <ServiceCard 
              title="Brand Evolution"
              description="Identity systems that tell your story. Logos, typography, and visual language."
              icon={brandIcon}
              link="/services/brand-evolution"
              delay={0.2}
            />
            <ServiceCard 
              title="Growth Dynamics"
              description="Data-driven marketing strategies to scale your reach and impact."
              icon={marketingIcon}
              link="/services/growth-dynamics"
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
        <div className="container relative z-10 px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to Ascend?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Let's build something extraordinary together. Your vision, our expertise.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-white text-background hover:bg-white/90 rounded-full px-10 h-14 text-xl font-bold cursor-pointer">
              Start Your Project <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ServiceCard({ title, description, icon, link, delay }: { title: string, description: string, icon: string, link: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="group relative bg-card/50 border border-white/5 p-8 rounded-2xl hover:border-primary/50 transition-colors duration-300"
    >
      <div className="mb-6 relative">
         <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
         <img src={icon} alt={title} className="w-20 h-20 object-contain relative z-10" />
      </div>
      <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-muted-foreground mb-6 leading-relaxed">
        {description}
      </p>
      <Link href={link} className="inline-flex items-center text-sm font-bold text-white group-hover:text-primary transition-colors">
        LEARN MORE <ArrowRight className="ml-2 w-4 h-4" />
      </Link>
    </motion.div>
  );
}
