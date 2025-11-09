import { CartProvider } from "../lib/context/CartContext";
import { AuthProvider } from "../lib/context/AuthContext";
import { Toaster } from "@/components/ui/toaster";

import { adorealternate, montserrat, adore } from "../lib/fonts";

import Header from "@/components/Header";
// import Footer from "@/components/Footer";
import Footer from "@/components/footer/Footer";

// import Transition from "@/components/transition/Transition";
import Transition from "@/components/Transition";

import "./globals.css";

export const metadata = {
  title: "Sara Coffee",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${adorealternate.variable} ${adore.variable} antialiased`}
      >
        <AuthProvider>
          <CartProvider>
            <Transition>
              <Header />
              {children}
              <Toaster />
              <Footer />
            </Transition>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
