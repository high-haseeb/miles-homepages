declare module "@paystack/inline-js" {
  interface PaystackOptions {
    key?: string;
    email?: string;
    amount?: number;
    ref?: string;
    callback?: (response: any) => void;
    onClose?: () => void;
    onSuccess?: (response: any) => void;
  }

  interface PaystackInstance {
    openIframe(): void;
    resumeTransaction(accessCode: string): void;
  }

  // Declare PaystackPop as a class with a constructor
  class PaystackPop {
    constructor(options: PaystackOptions);
    openIframe(): void;
    resumeTransaction(accessCode: string): void;
  }

  export = PaystackPop;
}
