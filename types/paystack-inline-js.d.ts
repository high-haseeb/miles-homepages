declare module "@paystack/inline-js" {
  interface PaystackOptions {
    key: string;
    email: string;
    amount: number;
    ref?: string;
    callback: (response: any) => void;
    onClose?: () => void;
  }

  interface PaystackInstance {
    openIframe(): void;
  }

  function PaystackPop(options: PaystackOptions): PaystackInstance;

  export = PaystackPop;
}
