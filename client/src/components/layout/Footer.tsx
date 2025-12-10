import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ASTRAVIA
            </h3>
            <p className="text-muted-foreground">
              Crafting digital experiences that transcend the ordinary.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-foreground">Services</h4>
            <div className="flex flex-col space-y-4 text-sm text-muted-foreground">
              <Link href="/services/digital-experience" className="hover:text-primary transition-colors">Digital Experience</Link>
              <Link href="/services/brand-evolution" className="hover:text-primary transition-colors">Brand Evolution</Link>
              <Link href="/services/growth-dynamics" className="hover:text-primary transition-colors">Growth Dynamics</Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-foreground">Company</h4>
            <div className="flex flex-col space-y-4 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary transition-colors">About</Link>
              <Link href="/contact" className="hover:text-primary transition-colors">Careers</Link>
              <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-foreground">Connect</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to our newsletter for the latest updates.
            </p>
            {/* Simple form placeholder */}
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-muted/50 border border-white/10 rounded-md px-4 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
              />
              <button className="bg-primary px-4 py-2 rounded-md text-white text-sm font-medium hover:bg-primary/90">
                Go
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Astravia. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
