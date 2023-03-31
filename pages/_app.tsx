import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { UserContext } from "../lib/userContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import { Manrope } from "next/font/google";
import Navbar from "@/components/Navbar";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export default function App({ Component, pageProps }: AppProps) {
  const [user, loading, error] = useAuthState(auth);

  return (
    <UserContext.Provider value={{ user, loading, error }}>
      <div
        className={`${manrope.variable} h-full min-h-screen bg-slate-800 pb-20 font-sans text-slate-50`}
      >
        {user && <Navbar />}
        <Component {...pageProps} />
      </div>
    </UserContext.Provider>
  );
}
