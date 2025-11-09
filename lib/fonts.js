import localFont from "next/font/local";
import { Montserrat } from "next/font/google";

export const adorealternate = localFont({
  src: [
    {
      path: "../public/fonts/Adorealternate.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-adorealternate",
});

export const adore = localFont({
  src: [
    {
      path: "../public/fonts/Adore-bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Adore-regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-adore",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["200", "400", "500", "700"],
  display: "swap",
  variable: "--font-montserrat",
});
