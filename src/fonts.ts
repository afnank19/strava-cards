import {
  DM_Mono,
  DM_Sans,
  JetBrains_Mono,
  Manrope,
  Public_Sans,
} from "next/font/google";

// export const instrument = Instrument_Serif({
//   subsets: ["latin"],
//   weight: "400"
// })

// export const dmSans = DM_Sans({
//   subsets: ["latin"],
// })

export const JBMono = JetBrains_Mono({
  subsets: ["latin"],
});

export const DMSans = DM_Sans({
  subsets: ["latin"],
});

export const MR = Manrope({
  subsets: ["latin"],
});

export const PublicSans = Public_Sans({
  subsets: ["latin"],
});

export const DMmono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});
