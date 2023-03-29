import type { NextPage } from "next";
import Auth from "../components/Auth";
import { useContext, useEffect } from "react";
import { UserContext } from "../lib/userContext";
import { auth, db } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const Home: NextPage = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <h1 className="mt-20 flex justify-center text-xl">Loading...</h1>;
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <>
      <main className="mx-3">
        <h1>This is the home page</h1>
        <button onClick={() => signOut(auth)} className="rounded border p-2">
          Sign out
        </button>
      </main>
    </>
  );
};

export default Home;
