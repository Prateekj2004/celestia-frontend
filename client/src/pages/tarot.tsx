// src/pages/tarot.tsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import { api } from "@/utils/api";

import tarotIcon from "@assets/generated_images/3d_tarot_cards_icon.png";

declare global {
  interface Window {
    Razorpay?: any;
  }
}

export default function Tarot() {
  const [step, setStep] = useState<"intro" | "payment" | "reading">("intro");
  const [loading, setLoading] = useState(false);
  const [tarotData, setTarotData] = useState<any | null>(null);

  // ---------------- STEP 2 → PAYMENT ----------------
  const startPayment = async () => {
    if (!window.Razorpay) {
      alert("Payment script not loaded. Add Razorpay script to index.html (see instructions).");
      return;
    }

    try {
      setLoading(true);
      const orderRes = await api.post("/payment/create-order", { amountPaise: 100 }); // ₹1 for testing
      const order = orderRes.data.order;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: "INR",
        name: "Premium Tarot Reading",
        order_id: order.id,
        image: tarotIcon,
        handler: async (resp: any) => {
          try {
            // verify on backend -> backend returns JWT token
            const verifyRes = await api.post("/payment/verify", {
              razorpay_payment_id: resp.razorpay_payment_id,
              razorpay_order_id: resp.razorpay_order_id,
              razorpay_signature: resp.razorpay_signature,
            });

            localStorage.setItem("accessToken", verifyRes.data.token || "");
            // small delay so axios interceptor picks token
            setTimeout(fetchTarotReading, 300);
          } catch (err) {
            console.error("verify error", err);
            alert("Payment verification failed. Check console.");
            setLoading(false);
          }
        },
        prefill: { name: "Friend" },
        theme: { color: "#7c3aed" }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed to start. Check console.");
      setLoading(false);
    }
  };

  // ---------------- STEP 3 → FETCH TAROT READING ----------------
  const fetchTarotReading = async () => {
    try {
      setLoading(true);
      const res = await api.post("/report/tarot", {
        spread: "past-present-future",
        numCards: 3,
      });

      // fallback if backend returns nothing
      if (!res?.data?.report) {
        // graceful fallback: create a small mock reading so UI doesn't break
        setTarotData({
          cards: [
            { name: "The Fool", meaning: "New beginnings — leap with faith.", illustration: null },
            { name: "The High Priestess", meaning: "Trust intuition and inner voice.", illustration: null },
            { name: "The Magician", meaning: "You have the tools to manifest.", illustration: null },
          ],
        });
      } else {
        setTarotData(res.data.report);
      }
      setStep("reading");
    } catch (err) {
      console.error(err);
      alert("Failed to fetch tarot report. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  // small helper for UI while loading / disabled
  const payBtnLabel = loading ? "Working..." : "Pay Now & Reveal Cards 🔮";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="pt-32 pb-20 container mx-auto px-6 text-center">

        {/* ---------------- INTRO SCREEN ---------------- */}
        {step === "intro" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <img src={tarotIcon} alt="Tarot" className="w-24 h-24 mx-auto mb-6 drop-shadow-[0_0_20px_rgba(147,51,234,0.5)]" />

            <h1 className="text-5xl font-bold mb-6">Premium Tarot Reading</h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              Focus on a question. The universe offers answers through these cards.
            </p>

            {/* Interactive animated underline + short tagline */}
            <div className="mx-auto max-w-xl mb-8">
              <div className="interactive-line">
                <span className="line-text">Tap into your past, understand your present, and glimpse your near future.</span>
                <div className="line-animated" />
              </div>
            </div>

            <div className="flex items-center justify-center gap-4">
              <Button
                className="bg-primary text-background text-lg h-12 px-10 rounded-full shadow-lg hover:bg-primary/90"
                onClick={() => setStep("payment")}
              >
                Begin My Reading ✨
              </Button>
              <Button
                variant="ghost"
                className="h-12"
                onClick={() => {
                  // gentle demo: load a mock reading without paying (dev mode)
                  setTarotData({
                    cards: [
                      { name: "The Fool", meaning: "New beginnings — leap with faith.", illustration: null },
                      { name: "The High Priestess", meaning: "Trust intuition and inner voice.", illustration: null },
                      { name: "The Magician", meaning: "You have the tools to manifest.", illustration: null },
                    ],
                  });
                  setStep("reading");
                }}
              >
                Demo (Free)
              </Button>
            </div>
          </motion.div>
        )}

        {/* ---------------- PAYMENT STEP ---------------- */}
        {step === "payment" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md mx-auto bg-card/40 border border-white/10 p-10 rounded-xl shadow-xl mt-10">
            <h2 className="text-3xl font-bold mb-4">Unlock Tarot Reading</h2>

            <p className="text-muted-foreground mb-4">Get a personalized 3-card reading with detailed guidance.</p>

            <div className="text-5xl font-bold text-primary mb-6">₹1</div>

            <Button className="w-full bg-primary text-background h-12 text-lg" onClick={startPayment} disabled={loading}>
              {payBtnLabel}
            </Button>

            <Button variant="ghost" className="mt-4" onClick={() => setStep("intro")}>Go Back</Button>
          </motion.div>
        )}

        {/* ---------------- FINAL TAROT READING ---------------- */}
        {step === "reading" && tarotData && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-4xl font-bold mb-10">Your Tarot Reading</h2>

            {/* 3 Card Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
              {tarotData.cards.map((card: any, i: number) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} className="bg-card p-6 rounded-xl border border-white/10 shadow-lg">
                  <h3 className="text-xl font-bold text-primary mb-3">{["Past Influence", "Present Path", "Future Outcome"][i]}</h3>

                  <div className="w-full h-44 bg-black/20 border border-white/10 rounded-md mb-4 flex items-center justify-center text-white/40">
                    {card.illustration ? <img src={card.illustration} alt={card.name} className="max-h-full" /> : <div className="text-sm">[Card Art]</div>}
                  </div>

                  <h4 className="text-lg font-semibold mb-2">{card.name}</h4>

                  <p className="text-sm text-white/70 leading-relaxed">{card.meaning}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 flex justify-center gap-4">
              <Button className="bg-secondary text-background h-12 px-8 rounded-full text-lg" onClick={() => window.location.reload()}>
                Draw New Reading
              </Button>
              <Button variant="ghost" className="h-12" onClick={() => setStep("intro")}>Back to Home</Button>
            </div>

            <p className="mt-10 text-xs text-gray-400 max-w-xl mx-auto">
              *Disclaimer: Tarot readings are for guidance and reflection only. They are not deterministic or a substitute for professional advice.
            </p>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}
