import type { NextPage } from "next";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "@/lib/userContext";
import { collection } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { PlusCircle } from "lucide-react";

const Brews: NextPage = () => {
  return (
    <main className="px-3">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-3xl font-bold lowercase text-blue-400 underline decoration-4 underline-offset-4">
          coffee brews
        </h2>
        <Link href="/brews/new">
          <PlusCircle
            size={28}
            className="cursor-pointer stroke-blue-400 hover:fill-slate-700"
          />
        </Link>
      </div>
    </main>
  );
};

export default Brews;
