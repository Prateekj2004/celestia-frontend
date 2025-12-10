import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Mail, MapPin, Sparkles } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export default function Contact() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Message Sent to the Cosmos",
      description: "Our celestial guides will respond shortly.",
    });
    form.reset();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="pt-32 container mx-auto px-6 pb-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 text-white">Connect With Us</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about your reading? Seek guidance from our support team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-card/30 border border-white/10 p-8 rounded-2xl backdrop-blur-sm">
              <h3 className="text-2xl font-bold font-heading text-primary mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5" /> Divine Support
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white/5 p-3 rounded-full">
                    <Mail className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Email Us</h4>
                    <p className="text-muted-foreground">guidance@celestia.astrology</p>
                    <p className="text-xs text-white/50 mt-1">Response within 24 cosmic hours</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-white/5 p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Sanctuary</h4>
                    <p className="text-muted-foreground">108 Zenith Way, Sedona, AZ 86336</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-white/5 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-2">FAQ</h3>
              <p className="text-muted-foreground mb-4">
                Most questions about birth times and chart accuracy are answered in our help center.
              </p>
              <Button variant="outline" className="border-white/20 hover:bg-white/10 text-white">Visit Help Center</Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card/30 border border-white/10 p-8 rounded-2xl backdrop-blur-sm"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your spirit name" {...field} className="bg-background/50 border-white/10" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="starseed@universe.com" {...field} className="bg-background/50 border-white/10" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Share your inquiry..." {...field} className="bg-background/50 border-white/10 min-h-[150px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-bold rounded-lg h-12 shadow-lg">
                  Send to the Stars
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
