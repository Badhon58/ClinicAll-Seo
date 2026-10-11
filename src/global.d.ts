export {};

declare global {
  interface Window {
    tokenStatus?: (success: boolean, message: string) => void;
    webkit?: any;
    Android?: any;
  }
}
