import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { motion } from "framer-motion";
import { useState } from "react";
import { api } from "@/utils/api";
import kundliIcon from "@assets/generated_images/3d_kundli_scroll_icon.png";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Kundli() {
  const [step, setStep] = useState<"form" | "payment" | "report">("form");
  const [finalReport, setFinalReport] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    tob: "",
    pob: "",
  });

  const updateField = (field: string, value: string) =>
    setFormData({ ...formData, [field]: value });

  // ---------------------------------------------------
  // STEP 1 — FORM SUBMIT
  // ---------------------------------------------------
  const submitForm = (e: any) => {
    e.preventDefault();
    setStep("payment");
  };

  // ---------------------------------------------------
  // STEP 2 — RAZORPAY PAYMENT
  // ---------------------------------------------------
  const startPayment = async () => {
    try {
      const orderRes = await api.post("/payment/create-order", {
        amountPaise: 100,
      });

      const order = orderRes.data.order;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: "INR",
        name: "Kundli Premium Report",
        order_id: order.id,

        handler: async (resp: any) => {
          const verifyRes = await api.post("/payment/verify", {
            razorpay_payment_id: resp.razorpay_payment_id,
            razorpay_order_id: resp.razorpay_order_id,
            razorpay_signature: resp.razorpay_signature,
          });

          localStorage.setItem("accessToken", verifyRes.data.token);

          setTimeout(() => fetchReport(), 300);
        },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      console.error(err);
      alert("Payment failed to initialize");
    }
  };

  // ---------------------------------------------------
  // STEP 3 — FETCH REPORT
  // ---------------------------------------------------
  const fetchReport = async () => {
    try {
      const res = await api.post("/report/kundli", {
        dob: formData.dob,
        time: formData.tob,
        name: formData.name,
        gender: formData.gender,
        latitude: 28.61,
        longitude: 77.20,
      });

      setFinalReport(res.data.report);
      setStep("report");
    } catch (err) {
      console.error("REPORT ERROR", err);
      alert("Token missing OR invalid. Payment may have failed.");
    }
  };

  const report = finalReport || {};

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="pt-32 pb-20 container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <img src={kundliIcon} className="w-24 h-24 mx-auto mb-6" />
          <h1 className="text-5xl font-bold">Vedic Kundli Report</h1>
          <p className="text-muted-foreground mt-2">
            Complete Lagna • Planets • Dasha • Interpretation
          </p>
        </div>

        {/* ---------------------------------------------------
            FORM STEP
        --------------------------------------------------- */}
        {step === "form" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-2xl mx-auto bg-card/30 p-8 rounded-xl border border-white/10"
          >
            <form onSubmit={submitForm} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label>Full Name</Label>
                  <Input value={formData.name} onChange={(e) => updateField("name", e.target.value)} />
                </div>

                <div>
                  <Label>Gender</Label>
                  <Select onValueChange={(val) => updateField("gender", val)}>
                    <SelectTrigger><SelectValue placeholder="Select Gender" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div>
                  <Label>Date of Birth</Label>
                  <Input type="date" value={formData.dob} onChange={(e) => updateField("dob", e.target.value)} />
                </div>

                <div>
                  <Label>Time of Birth</Label>
                  <Input type="time" value={formData.tob} onChange={(e) => updateField("tob", e.target.value)} />
                </div>

                <div>
                  <Label>Place of Birth</Label>
                  <Input value={formData.pob} onChange={(e) => updateField("pob", e.target.value)} />
                </div>
              </div>

              <Button className="w-full h-12 bg-primary" type="submit">Proceed to Payment</Button>
            </form>
          </motion.div>
        )}

        {/* ---------------------------------------------------
            PAYMENT STEP
        --------------------------------------------------- */}
        {step === "payment" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-md mx-auto bg-card/40 p-8 rounded-xl text-center border border-white/10"
          >
            <h2 className="text-3xl font-bold mb-4">Unlock Your Report</h2>
            <div className="text-5xl font-bold text-primary mb-6">₹1</div>

            <Button className="w-full h-12 bg-primary" onClick={startPayment}>
              Pay Now
            </Button>

            <Button variant="ghost" className="mt-4" onClick={() => setStep("form")}>
              Back
            </Button>
          </motion.div>
        )}

        {/* ---------------------------------------------------
            REPORT STEP (PREMIUM FORMAT)
        --------------------------------------------------- */}
        {step === "report" && finalReport && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
            <h2 className="text-4xl font-bold text-center mb-10">Your Kundli Report</h2>

            {/* ===================== LAGNA CHART + POSITIONS ===================== */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">

              {/* Lagna Chart */}
              <div className="bg-card p-6 rounded-xl border border-white/10">
                <h3 className="text-primary text-2xl font-bold mb-4">Lagna Chart</h3>
                <div className="aspect-square bg-black/30 rounded-lg border border-white/10 p-4 grid grid-cols-3 grid-rows-3 gap-2">

                  {Object.entries(report.positions).map(([planet, info]: any, i) => (
                    <div
                      key={i}
                      className="border border-white/10 rounded-lg flex flex-col justify-center items-center text-xs text-white/80"
                    >
                      <span className="text-primary font-semibold">{planet}</span>
                      <span>{info.sign}</span>
                      <span className="text-white/40 text-[10px]">{info.degree.toFixed(1)}°</span>
                    </div>
                  ))}

                </div>
              </div>

              {/* Planetary Positions */}
              <div className="bg-card p-6 rounded-xl border border-white/10">
                <h3 className="text-secondary text-xl font-bold mb-4">Planetary Positions</h3>

                <div className="space-y-3">
                  {Object.entries(report.positions).map(([planet, info]: any, i) => (
                    <div key={i} className="flex justify-between border-b border-white/5 pb-1">
                      <span className="text-muted-foreground">{planet}</span>
                      <span className="text-white">{info.sign} ({info.degree.toFixed(1)}°)</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* ===================== INTERPRETATION ===================== */}
            <div className="max-w-4xl mx-auto bg-card/40 p-8 rounded-xl border border-white/10">
              <h3 className="text-primary text-3xl font-bold mb-6">Interpretation</h3>

              <div className="space-y-4 text-white/80">
                <p><strong className="text-secondary">☀ Sun: </strong>{report.interpretation.sun}</p>
                <p><strong className="text-secondary">🌙 Moon: </strong>{report.interpretation.moon}</p>
                <p><strong className="text-secondary">↑ Ascendant: </strong>{report.interpretation.ascendant}</p>

                <p className="text-yellow-300/80 text-sm italic mt-2">
                  {report.interpretation.note}
                </p>
              </div>
            </div>

            {/* ===================== DISCLAIMER ===================== */}
            <p className="text-center text-xs opacity-60 max-w-xl mx-auto">
              Disclaimer: This report is auto-generated using generalized astrological rules.
              It is for educational & entertainment purposes only. Please do not make life-altering 
              decisions solely based on this analysis.
            </p>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}
