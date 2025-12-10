import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import tarotIcon from "@assets/generated_images/3d_tarot_cards_icon.png";

export default function Tarot() {
  const [cardsRevealed, setCardsRevealed] = useState<boolean[]>([false, false, false]);

  const revealCard = (index: number) => {
    const newRevealed = [...cardsRevealed];
    newRevealed[index] = true;
    setCardsRevealed(newRevealed);
  };

  const tarotDeck = [
    { name: "The Fool", meaning: "New beginnings, optimism, trust in life." },
    { name: "The Magician", meaning: "Action, the power to manifest." },
    { name: "The High Priestess", meaning: "Intuition, higher powers, mystery." },
    { name: "The Empress", meaning: "Fertility, creativity, abundance." },
    { name: "The Emperor", meaning: "Authority, structure, control." },
    { name: "The Lovers", meaning: "Love, union, relationships." },
  ];

  // Mock random cards for the session
  const [sessionCards] = useState(() => {
    return [
      tarotDeck[Math.floor(Math.random() * tarotDeck.length)],
      tarotDeck[Math.floor(Math.random() * tarotDeck.length)],
      tarotDeck[Math.floor(Math.random() * tarotDeck.length)]
    ];
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="pt-32 pb-20 container mx-auto px-6">
        <div className="text-center mb-16">
          <img src={tarotIcon} alt="Tarot" className="w-20 h-20 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(147,51,234,0.5)]" />
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 text-white">Daily Tarot Reading</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Focus on a question and select your cards to reveal guidance from the universe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto perspective-1000">
          {["Past / Context", "Present / Challenge", "Future / Outcome"].map((label, index) => (
            <div key={index} className="flex flex-col items-center">
              <h3 className="text-lg font-bold text-primary mb-4 uppercase tracking-wider">{label}</h3>
              
              <div 
                className="relative w-64 h-96 cursor-pointer preserve-3d transition-transform duration-700"
                onClick={() => revealCard(index)}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {!cardsRevealed[index] ? (
                  <motion.div 
                    whileHover={{ scale: 1.05, y: -10 }}
                    className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl border-2 border-primary/30 flex items-center justify-center shadow-xl"
                  >
                    <div className="p-4 border border-white/10 rounded-lg w-[90%] h-[90%] flex items-center justify-center">
                      <div className="text-4xl opacity-20">🎴</div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ rotateY: 90 }}
                    animate={{ rotateY: 0 }}
                    className="absolute inset-0 bg-white text-black rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                  >
                    <div className="w-full h-40 bg-gray-200 mb-4 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                      [Card Illustration]
                    </div>
                    <h4 className="text-xl font-heading font-bold mb-2">{sessionCards[index].name}</h4>
                    <p className="text-sm text-gray-600">{sessionCards[index].meaning}</p>
                  </motion.div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Button 
            className="bg-secondary hover:bg-secondary/90 text-white rounded-full px-8"
            onClick={() => window.location.reload()}
          >
            Draw New Cards
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
