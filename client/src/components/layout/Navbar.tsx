import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, Star, Moon, Heart, Sparkles } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/kundli", label: "Kundli" },
    { href: "/compatibility", label: "Match" },
    { href: "/tarot", label: "Tarot" },
    { href: "/numerology", label: "Numerology" },
    { href: "/spiritual-tools", label: "Tools" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold font-heading tracking-widest bg-gradient-to-r from-primary via-yellow-200 to-primary bg-clip-text text-transparent flex items-center gap-2 cursor-pointer">
          <Sparkles className="text-primary w-6 h-6" /> CELESTIA
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary uppercase tracking-wider cursor-pointer",
                location === link.href ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact">
            <Button variant="default" className="bg-primary hover:bg-primary/90 text-background font-bold shadow-[0_0_15px_rgba(255,215,0,0.3)] rounded-full px-6 cursor-pointer">
              Get Premium
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-background border-b border-white/10 p-6 space-y-4 absolute w-full z-50">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className="block text-lg font-medium py-2 text-foreground hover:text-primary uppercase cursor-pointer" 
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact">
            <Button className="w-full bg-primary text-background font-bold cursor-pointer" onClick={() => setIsOpen(false)}>Get Premium</Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
