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

  // Refs for top buttons -> scroll targets
  const coreRef = useRef<HTMLDivElement | null>(null);
  const destinyRef = useRef<HTMLDivElement | null>(null);
  const soulRef = useRef<HTMLDivElement | null>(null);

  // ---------------- PAYMENT FLOW ----------------
  const startPayment = async () => {
    if (!name || !dob) {
      alert("Please enter name & date of birth");
      return;
    }

    try {
      setLoading(true);
      const orderRes = await api.post("/payment/create-order", {
        amountPaise: 100, // ₹1 for testing
      });

      const order = orderRes.data?.order;
      if (!order) throw new Error("Order creation failed or server unreachable");

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

            if (!verifyRes.data?.token) {
              throw new Error("No token returned by verify route");
            }

            localStorage.setItem("accessToken", verifyRes.data.token);
            // wait tiny moment for axios interceptor to pick up token
            setTimeout(async () => {
              await fetchNumerology();
              setPaidFetching(false);
            }, 300);
          } catch (err) {
            console.error("Verify error", err);
            alert("Payment verification failed — check console");
            setPaidFetching(false);
          }
        },
        prefill: { name },
        theme: { color: "#FFD700" },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      console.error("Payment init error", err);
      alert("Payment start error (see console)");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- FETCH REPORT ----------------
  const fetchNumerology = async () => {
    try {
      setLoading(true);
      const res = await api.post("/report/numerology", {
        name,
        dob,
        targetYear: new Date().getFullYear(),
      });

      // Debug: always log raw response so you can inspect in console
      console.log("Numerology raw response:", res?.data);

      // server returns res.data.report (per backend)
      const r = res.data?.report ?? res.data;
      if (!r) throw new Error("Empty report from server");

      setReport(r);
      setStep("report");

      // scroll top after rendering
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      console.error("Numerology fetch failed", err);
      if (err?.response?.status === 401 || err?.response?.status === 403) {
        alert("Unauthorized. Make sure payment verify returned a token and it's saved (localStorage).");
      } else {
        alert("Numerology fetch failed — check console for details.");
      }
    } finally {
      setLoading(false);
      setPaidFetching(false);
    }
  };

  // PDF download helper (if backend returned pdfBase64)
  const downloadPdf = () => {
    if (!report?.pdfBase64) return alert("No PDF available");
    const blob = b64toBlob(report.pdfBase64, "application/pdf");
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(report.meta?.name || "numerology")}_report.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  function b64toBlob(b64Data: string, contentType = "", sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
  }

  // safe getters + fallbacks
  const numbers = report?.numbers ?? {};
  const interp = report?.interpretations ?? {};
  const guidance = report?.guidance ?? {};
  const meta = report?.meta ?? {};

  // small convenience: clicking top buttons scrolls to sections
  const goTo = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // effect: if report loaded, highlight top area briefly
  useEffect(() => {
    if (report) {
      // optional small animation or focus
    }
  }, [report]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="pt-28 pb-20 container mx-auto px-6 text-center">
        <img src={crystalIcon} alt="Numerology" className="w-20 h-20 mx-auto mb-6 drop-shadow-[0_0_18px_rgba(0,255,255,0.35)]" />
        <h1 className="text-5xl font-heading font-bold mb-8 tracking-wide">Your Numerology Report</h1>

        {/* TOP SUMMARY / TABS */}
        <div className="max-w-5xl mx-auto mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => goTo(destinyRef)}
            className="py-6 rounded-xl border border-white/6 hover:border-primary transition text-muted-foreground"
          >
            <div className="text-sm tracking-widest">DESTINY</div>
            <div className="mt-2 text-lg font-semibold">{numbers.destiny ?? "—"}</div>
          </button>

          <button
            onClick={() => goTo(soulRef)}
            className="py-6 rounded-xl border border-white/6 hover:border-primary transition text-muted-foreground"
          >
            <div className="text-sm tracking-widest">SOUL URGE</div>
            <div className="mt-2 text-lg font-semibold">{numbers.soul ?? "—"}</div>
          </button>

          <button
            onClick={() => goTo(coreRef)}
            className="py-6 rounded-xl border border-white/6 hover:border-primary transition text-muted-foreground"
          >
            <div className="text-sm tracking-widest">PERSONALITY</div>
            <div className="mt-2 text-lg font-semibold">{numbers.personality ?? "—"}</div>
          </button>
        </div>

        {/* CORE ANALYSIS placeholder */}
        <div ref={coreRef as any} className="max-w-5xl mx-auto mb-8">
          <div className="text-left p-6 rounded-xl border border-white/8 bg-black/10">
            <h2 className="text-2xl font-bold mb-2">Core Analysis</h2>
            <p className="text-muted-foreground">
              {report?.narrative
                ?? interp?.lifePathEntry?.description
                ?? interp?.soulInterpretation
                ?? "Your personalized numerology analysis will appear here after unlocking the premium report."}
            </p>
          </div>
        </div>

        {/* 2025 Forecast */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="p-6 rounded-xl border border-primary/30 bg-gradient-to-br from-primary/10 to-secondary/10 shadow-sm text-left">
            <h3 className="text-xl font-bold mb-2">2025 Forecast</h3>
            <p className="text-muted-foreground">
              {interp?.personalYear
                ?? (numbers.personalYear ? `Personal Year ${numbers.personalYear}` : "Forecast not available.")
              }
            </p>
          </div>
        </div>

        {/* If still no report -> show CTA to pay */}
        {!report && step !== "report" && (
          <div className="max-w-md mx-auto">
            <div className="p-6 rounded-2xl bg-card/40 border border-white/10 mb-6">
              <p className="mb-4">Unlock full details, tactical tips, and downloadable PDF.</p>
              <div className="flex gap-3">
                <Button className="flex-1" onClick={() => setStep("payment")} disabled={paidFetching || loading}>
                  {paidFetching ? "Fetching..." : "Get Premium"}
                </Button>
                <Button variant="ghost" onClick={() => { setName(""); setDob(""); }}>
                  Clear
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* PAYMENT PANEL */}
        {step === "payment" && !report && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md mx-auto">
            <div className="p-8 rounded-xl bg-card/40 border border-white/10 shadow-lg">
              <h3 className="text-2xl font-bold mb-2">Premium Numerology Report</h3>
              <p className="text-muted-foreground mb-4">Unlock the full report and downloadable PDF.</p>
              <div className="text-4xl font-bold text-primary mb-6">₹1</div>

              <Button className="w-full mb-3" onClick={startPayment} disabled={loading || paidFetching}>
                {loading || paidFetching ? "Processing..." : "Pay & Reveal"}
              </Button>

              <Button variant="ghost" onClick={() => setStep("intro")}>Back</Button>
            </div>
          </motion.div>
        )}

        {/* REPORT FULL VIEW */}
        {report && (
          <div className="max-w-5xl mx-auto mt-6 space-y-6">
            {/* top action row */}
            <div className="flex justify-between items-center">
              <div className="text-left">
                <div className="text-sm text-muted-foreground">Report for</div>
                <div className="text-lg font-semibold">{meta?.name ?? name}</div>
                <div className="text-xs text-muted-foreground">{meta?.dob ?? dob}</div>
              </div>

              <div className="flex items-center gap-3">
                {report.pdfBase64 && (
                  <Button variant="outline" onClick={downloadPdf}>
                    Download PDF
                  </Button>
                )}
                <Button onClick={() => window.location.reload()}>New</Button>
              </div>
            </div>

            {/* pinnacles/challenges */}
            {(numbers.pinnacles || numbers.challenges) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 rounded-xl border bg-card/20">
                  <h4 className="font-bold mb-2">Pinnacles</h4>
                  <div className="flex gap-3">
                    {(numbers.pinnacles || []).map((p: any, i: number) => (
                      <div key={i} className="flex-1 p-3 bg-black/10 rounded-lg text-center">
                        <div className="text-muted-foreground text-sm">P{ i+1 }</div>
                        <div className="font-bold text-lg">{p ?? "—"}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl border bg-card/20">
                  <h4 className="font-bold mb-2">Challenges</h4>
                  <div className="flex gap-3">
                    {(numbers.challenges || []).map((c: any, i: number) => (
                      <div key={i} className="flex-1 p-3 bg-black/10 rounded-lg text-center">
                        <div className="text-muted-foreground text-sm">C{ i+1 }</div>
                        <div className="font-bold text-lg">{c ?? "—"}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* guidance cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-xl border bg-card/10 text-left">
                <h4 className="font-semibold mb-2">Career</h4>
                <ul className="text-sm text-muted-foreground list-inside">
                  {(guidance.career || []).length > 0 ? guidance.career.map((c: string, idx: number) => <li key={idx}>• {c}</li>) : <li>• Not available</li>}
                </ul>
              </div>

              <div ref={destinyRef as any} className="p-4 rounded-xl border bg-card/10 text-left">
                <h4 className="font-semibold mb-2">Love</h4>
                <p className="text-sm text-muted-foreground">{guidance.love ?? "Not available"}</p>
              </div>

              <div ref={soulRef as any} className="p-4 rounded-xl border bg-card/10 text-left">
                <h4 className="font-semibold mb-2">Money</h4>
                <p className="text-sm text-muted-foreground">{guidance.money ?? "Not available"}</p>
              </div>
            </div>

            {/* strengths/weaknesses & remedies */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-xl border bg-card/10">
                <h4 className="font-semibold mb-2">Strengths</h4>
                <ul className="text-sm">
                  {(guidance.strengths || []).length > 0 ? guidance.strengths.map((s: string, i: number) => <li key={i}>• {s}</li>) : <li>• Not available</li>}
                </ul>
              </div>

              <div className="p-4 rounded-xl border bg-card/10">
                <h4 className="font-semibold mb-2">Weaknesses</h4>
                <ul className="text-sm">
                  {(guidance.weaknesses || []).length > 0 ? guidance.weaknesses.map((w: string, i: number) => <li key={i}>• {w}</li>) : <li>• Not available</li>}
                </ul>
              </div>

              <div className="p-4 rounded-xl border bg-card/10">
                <h4 className="font-semibold mb-2">Remedies</h4>
                <ul className="text-sm">
                  {(guidance.remedies || []).length > 0 ? guidance.remedies.map((r: string, i: number) => <li key={i}>• {r}</li>) : <li>• Not available</li>}
                </ul>
              </div>
            </div>

            {/* narrative / tactical */}
            <div className="mt-6 p-6 rounded-xl border bg-white/5 text-left">
              <h4 className="font-bold mb-2">Narrative</h4>
              <p className="text-muted-foreground">{report.narrative ?? interp?.lifePathEntry?.description ?? "No narrative available."}</p>
            </div>
            
            {report.tactical && report.tactical.length > 0 && (
              <div className="p-6 rounded-xl border bg-card/10">
                <h4 className="font-bold mb-2">Quick Tactical Tips</h4>
                <ul className="text-sm text-muted-foreground">
                  {report.tactical.map((t: any, i: number) => <li key={i}>• {t}</li>)}
                </ul>
              </div>
            )}

            <p className="mt-8 text-xs text-gray-500">
              *Disclaimer: Numerology provides spiritual insights and is not a substitute for professional advice. For guidance & self-awareness only.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
