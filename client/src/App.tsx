import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Compatibility from "@/pages/compatibility";
import MoonPhase from "@/pages/moon-phase";
import Numerology from "@/pages/numerology";
import Kundli from "@/pages/kundli";
import Chakra from "@/pages/chakra";
import Tarot from "@/pages/tarot";
import SpiritualTools from "@/pages/spiritual-tools";
import Contact from "@/pages/contact";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/compatibility" component={Compatibility} />
      <Route path="/moon-phase" component={MoonPhase} />
      <Route path="/numerology" component={Numerology} />
      <Route path="/kundli" component={Kundli} />
      <Route path="/chakra" component={Chakra} />
      <Route path="/tarot" component={Tarot} />
      <Route path="/spiritual-tools" component={SpiritualTools} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
