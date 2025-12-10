import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const links = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold font-sans tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          ASTRAVIA
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact">
            <Button variant="default" className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 rounded-full px-6 cursor-pointer">
              Start Project
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-white/10 p-6 space-y-4 absolute w-full">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className="block text-lg font-medium py-2 text-foreground hover:text-primary" 
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
