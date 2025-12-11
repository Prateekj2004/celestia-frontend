import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { api } from "@/utils/api";

import crystalIcon from "@assets/generated_images/3d_glowing_crystal_icon.png";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Numerology() {
  const [step, setStep] = useState<"intro" | "payment" | "report">("intro");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [paidFetching, setPaidFetching] = useState(false);

  // Scroll refs
  const coreRef = useRef<HTMLDivElement | null>(null);
  const destinyRef = useRef<HTMLDivElement | null>(null);
  const soulRef = useRef<HTMLDivElement | null>(null);

  // ---------------------------------------------------------
  // PAYMENT FLOW
  // ---------------------------------------------------------
  const startPayment = async () => {
    if (!name || !dob) {
      alert("Please enter name & date of birth");
      return;
    }

    try {
      setLoading(true);
      const orderRes = await api.post("/payment/create-order", {
        amountPaise: 100,
      });

      const order = orderRes.data?.order;
      if (!order) throw new Error("Order creation failed");

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: "INR",
        name: "Premium Numerology Report",
        order_id: order.id,

        handler: async (resp: any) => {
          try {
            setPaidFetching(true);

            const verifyRes = await api.post("/payment/verify", {
              razorpay_payment_id: resp.razorpay_payment_id,
              razorpay_order_id: resp.razorpay_order_id,
              razorpay_signature: resp.razorpay_signature,
            });

            localStorage.setItem("accessToken", verifyRes.data.token);

            setTimeout(fetchNumerology, 300);
          } catch (err) {
            console.error(err);
            alert("Verification failed");
            setPaidFetching(false);
          }
        },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      console.error(err);
      alert("Payment error");
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------------------------
  // FETCH NUMEROLOGY REPORT
  // ---------------------------------------------------------
  const fetchNumerology = async () => {
    try {
      setLoading(true);

      const res = await api.post("/report/numerology", {
        name,
        dob,
        targetYear: new Date().getFullYear(),
      });

      console.log("REPORT:", res.data);

      const r = res.data?.report ?? res.data;
      setReport(r);
      setStep("report");

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      console.error(err);
      alert("Failed to fetch numerology report");
    } finally {
      setLoading(false);
      setPaidFetching(false);
    }
  };

  // ---------------------------------------------------------
  // Download PDF
  // ---------------------------------------------------------
  const downloadPdf = () => {
    if (!report?.pdfBase64) return alert("PDF not found");

    const blob = b64toBlob(report.pdfBase64, "application/pdf");
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${report?.meta?.name || "numerology"}_report.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const b64toBlob = (b64: string, contentType = "", sliceSize = 512) => {
    const byteCharacters = atob(b64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNums = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNums[i] = slice.charCodeAt(i);
      }

      byteArrays.push(new Uint8Array(byteNums));
    }

    return new Blob(byteArrays, { type: contentType });
  };

  // Helpers
  const numbers = report?.numbers ?? {};
  const interp = report?.interpretations ?? {};
  const guidance = report?.guidance ?? {};
  const meta = report?.meta ?? {};

  const goTo = (ref: any) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // ===================================================================
  // UI START
  // ===================================================================
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="pt-28 pb-20 container mx-auto px-6 text-center">
        <img src={crystalIcon} className="w-20 h-20 mx-auto mb-6" />

        <h1 className="text-5xl font-heading font-bold mb-8">
          Your Numerology Report
        </h1>

        {/* ---------------------------------------------------------
            TOP SUMMARY BOXES
        ---------------------------------------------------------- */}
        <div className="max-w-5xl mx-auto mb-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => goTo(destinyRef)}
            className="py-6 rounded-xl border border-white/10 hover:border-primary transition"
          >
            <div className="text-sm tracking-widest">DESTINY</div>
            <div className="text-lg font-semibold mt-2">
              {numbers.destiny ?? "—"}
            </div>
          </button>

          <button
            onClick={() => goTo(soulRef)}
            className="py-6 rounded-xl border border-white/10 hover:border-primary transition"
          >
            <div className="text-sm tracking-widest">SOUL URGE</div>
            <div className="text-lg font-semibold mt-2">
              {numbers.soul ?? "—"}
            </div>
          </button>

          <button
            onClick={() => goTo(coreRef)}
            className="py-6 rounded-xl border border-white/10 hover:border-primary transition"
          >
            <div className="text-sm tracking-widest">PERSONALITY</div>
            <div className="text-lg font-semibold mt-2">
              {numbers.personality ?? "—"}
            </div>
          </button>
        </div>

        {/* ---------------------------------------------------------
            CORE ANALYSIS
        ---------------------------------------------------------- */}
        <div ref={coreRef} className="max-w-5xl mx-auto mb-10">
          <div className="p-6 text-left rounded-xl border border-white/10 bg-black/10">
            <h2 className="text-2xl font-bold mb-2">Core Analysis</h2>
            <p className="text-muted-foreground">
              {report?.narrative ??
                interp?.lifePathEntry?.description ??
                interp?.soulInterpretation ??
                "Your personalized numerology analysis will appear here."}
            </p>
          </div>
        </div>

        {/* ---------------------------------------------------------
            YEAR FORECAST
        ---------------------------------------------------------- */}
        <div className="max-w-5xl mx-auto mb-10">
          <div className="p-6 rounded-xl text-left border border-primary/30 bg-gradient-to-br from-primary/10 to-secondary/10">
            <h3 className="text-xl font-bold mb-2">2025 Forecast</h3>
            <p className="text-muted-foreground">
              {interp?.personalYear ||
                (numbers.personalYear
                  ? `Personal Year ${numbers.personalYear}`
                  : "Forecast not available.")}
            </p>
          </div>
        </div>

        {/* ---------------------------------------------------------
            PINNACLES & CHALLENGES
        ---------------------------------------------------------- */}
        {report && (
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="p-4 rounded-xl border bg-card/20">
              <h4 className="font-bold mb-2">Pinnacles</h4>
              <div className="flex gap-3">
                {(numbers.pinnacles || []).map((p: any, i: number) => (
                  <div key={i} className="flex-1 text-center p-3 rounded-lg bg-black/20">
                    <div className="text-sm text-muted-foreground">P{i + 1}</div>
                    <div className="font-bold text-xl">{p}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl border bg-card/20">
              <h4 className="font-bold mb-2">Challenges</h4>
              <div className="flex gap-3">
                {(numbers.challenges || []).map((c: any, i: number) => (
                  <div key={i} className="flex-1 text-center p-3 rounded-lg bg-black/20">
                    <div className="text-sm text-muted-foreground">C{i + 1}</div>
                    <div className="font-bold text-xl">{c}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------------
            CAREER / LOVE / MONEY
        ---------------------------------------------------------- */}
        {report && (
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="p-4 rounded-xl border bg-card/10 text-left">
              <h4 className="font-semibold mb-2">Career</h4>
              <ul className="text-sm text-muted-foreground">
                {(guidance.career || []).map((c: string, i: number) => (
                  <li key={i}>• {c}</li>
                ))}
              </ul>
            </div>

            <div ref={destinyRef} className="p-4 rounded-xl border bg-card/10 text-left">
              <h4 className="font-semibold mb-2">Love</h4>
              <p className="text-sm text-muted-foreground">
                {guidance.love || "Not available"}
              </p>
            </div>

            <div ref={soulRef} className="p-4 rounded-xl border bg-card/10 text-left">
              <h4 className="font-semibold mb-2">Money</h4>
              <p className="text-sm text-muted-foreground">
                {guidance.money || "Not available"}
              </p>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------------
            STRENGTHS / WEAKNESSES / REMEDIES
        ---------------------------------------------------------- */}
        {report && (
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="p-4 rounded-xl border bg-card/10">
              <h4 className="font-semibold mb-2">Strengths</h4>
              <ul className="text-sm">
                {(guidance.strengths && guidance.strengths.length > 0)
                  ? guidance.strengths.map((s: string, i: number) => (
                      <li key={i}>• {s}</li>
                    ))
                  : <li>• Not available</li>}
              </ul>
            </div>

            <div className="p-4 rounded-xl border bg-card/10">
              <h4 className="font-semibold mb-2">Weaknesses</h4>
              <ul className="text-sm">
                {(guidance.weaknesses && guidance.weaknesses.length > 0)
                  ? guidance.weaknesses.map((w: string, i: number) => (
                      <li key={i}>• {w}</li>
                    ))
                  : <li>• Not available</li>}
              </ul>
            </div>

            <div className="p-4 rounded-xl border bg-card/10">
              <h4 className="font-semibold mb-2">Remedies</h4>
              <ul className="text-sm">
                {(guidance.remedies && guidance.remedies.length > 0)
                  ? guidance.remedies.map((r: string, i: number) => (
                      <li key={i}>• {r}</li>
                    ))
                  : <li>• Not available</li>}
              </ul>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------------
            NARRATIVE + TIPS
        ---------------------------------------------------------- */}
        {report && (
          <>
            <div className="max-w-5xl mx-auto p-6 rounded-xl border bg-card/10 text-left">
              <h4 className="font-bold mb-2">Narrative</h4>
              <p className="text-muted-foreground">
                {report.narrative ||
                  interp?.lifePathEntry?.description ||
                  "No narrative available."}
              </p>
            </div>

            {report.tactical && report.tactical.length > 0 && (
              <div className="max-w-5xl mx-auto p-6 rounded-xl border bg-card/10 text-left">
                <h4 className="font-bold mb-2">Quick Tactical Tips</h4>
                <ul className="text-sm text-muted-foreground">
                  {report.tactical.map((t: string, i: number) => (
                    <li key={i}>• {t}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        {/* ---------------------------------------------------------
            FOOTER + NEW REPORT BUTTON
        ---------------------------------------------------------- */}
        {report && (
          <div className="mt-10">
            {report.pdfBase64 && (
              <Button onClick={downloadPdf} variant="outline" className="mr-3">
                Download PDF
              </Button>
            )}

            <Button onClick={() => window.location.reload()} className="bg-primary">
              New Report
            </Button>

            <p className="text-xs mt-6 text-gray-500">
              *Disclaimer: Numerology provides spiritual insights and is not a
              substitute for professional advice.
            </p>
          </div>
        )}

        {/* ---------------------------------------------------------
            INTRO + PAYMENT CTA
        ---------------------------------------------------------- */}
        {!report && (
          <div className="mt-10 max-w-md mx-auto">
            <div className="p-6 rounded-xl bg-card/40 border border-white/10">
              <Label>Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-background/50 my-2"
                placeholder="Full Name"
              />

              <Label>Date of Birth</Label>
              <Input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="bg-background/50 my-2"
              />

              <Button
                className="w-full mt-4"
                disabled={loading}
                onClick={() => setStep("payment")}
              >
                Get Premium Report
              </Button>
            </div>
          </div>
        )}

        {/* Payment screen */}
        {step === "payment" && !report && (
          <div className="max-w-md mx-auto mt-6">
            <div className="p-6 rounded-xl bg-card/40 border border-white/10">
              <h3 className="text-2xl font-bold mb-2">Premium Numerology Report</h3>

              <p className="text-muted-foreground mb-4">
                Unlock complete numerology insights & PDF.
              </p>

              <div className="text-4xl font-bold text-primary mb-6">₹1</div>

              <Button className="w-full" disabled={loading} onClick={startPayment}>
                {loading ? "Processing..." : "Pay & Unlock"}
              </Button>

              <Button variant="ghost" className="mt-4" onClick={() => setStep("intro")}>
                Back
              </Button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
