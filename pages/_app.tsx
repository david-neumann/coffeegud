import "@/styles/globals.css";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import { UserContext } from "../lib/userContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import { Space_Grotesk } from "next/font/google";
import Navbar from "@/components/Navbar";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-spaceGrotesk",
});

const borna = localFont({
  src: [
    {
      path: "./fonts/borna-regular-webfont.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/borna-medium-webfont.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/borna-semibold-webfont.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/borna-bold-webfont.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-borna",
});

export default function App({ Component, pageProps }: AppProps) {
  const [user, loading, error] = useAuthState(auth);

  return (
    <UserContext.Provider value={{ user, loading, error }}>
      <div
        className={`${borna.variable} h-full min-h-screen bg-slate-800 pb-20 font-sans text-slate-50`}
      >
        {user && <Navbar />}
        <Component {...pageProps} />
      </div>
    </UserContext.Provider>
  );
}
