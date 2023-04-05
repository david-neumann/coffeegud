import "@/styles/globals.css";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import { UserContext } from "../lib/userContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import { Manrope } from "next/font/google";
import Navbar from "@/components/Navbar";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const strawford = localFont({
  src: [
    {
      path: "./fonts/strawford-thin-webfont.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/strawford-extralight-webfont.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/strawford-light-webfont.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/strawford-regular-webfont.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/strawford-medium-webfont.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/strawford-bold-webfont.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/strawford-black-webfont.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-strawford",
});

export default function App({ Component, pageProps }: AppProps) {
  const [user, loading, error] = useAuthState(auth);

  return (
    <UserContext.Provider value={{ user, loading, error }}>
      <div
        className={`${strawford.variable} h-full min-h-screen bg-slate-800 pb-20 font-sans text-slate-50`}
      >
        {user && <Navbar />}
        <Component {...pageProps} />
      </div>
    </UserContext.Provider>
  );
}
