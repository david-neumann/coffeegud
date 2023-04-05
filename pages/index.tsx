import type { NextPage } from "next";
import Auth from "../components/Auth";
import { useContext } from "react";
import { UserContext } from "../lib/userContext";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

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
