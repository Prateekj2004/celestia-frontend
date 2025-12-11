interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  order_id: string;
  handler: (response: any) => void;
  prefill?: { name?: string };
  theme?: { color?: string };
}

interface Window {
  Razorpay: new (options: RazorpayOptions) => any;
}

declare var Razorpay: any;
