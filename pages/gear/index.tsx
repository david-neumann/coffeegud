import type { NextPage } from "next";
import type { FC } from "react";
import { useContext } from "react";
import { UserContext } from "@/lib/userContext";
import { collection } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import GrinderCard from "@/components/GrinderCard";
import BrewMethodCard from "@/components/BrewMethodCard";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

const Gear: NextPage = () => {
  const { loading } = useContext(UserContext);

  if (loading) {
    return <h1 className="flex justify-center pt-20 text-xl">Loading...</h1>;
  }

  return (
    <main className="px-3">
      <section className="mb-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-3xl font-bold lowercase text-rose-500 underline decoration-4 underline-offset-4">
            Grinders
          </h2>
          <Link href="/gear/new">
            <PlusCircle
              size={28}
              className="cursor-pointer stroke-rose-500 hover:fill-slate-700"
            />
          </Link>
        </div>
        <GrinderList />
      </section>
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-3xl font-bold lowercase text-rose-500 underline decoration-4 underline-offset-4">
            Brew Methods
          </h2>
          <Link href="/gear/new">
            <PlusCircle
              size={28}
              className="cursor-pointer stroke-rose-500 hover:fill-slate-700"
            />
          </Link>
        </div>
        <BrewMethodList />
      </section>
    </main>
  );
};

const GrinderList: FC = () => {
  const uid = auth.currentUser?.uid || "";
  const ref = collection(db, "users", uid, "grinders");
  const [grinders] = useCollectionData(ref);
  console.log(grinders);

  const grinderList = grinders?.map((grinder) => (
    <GrinderCard key={grinder.grinder} {...grinder} />
  ));

  return <div className="flex flex-col gap-4">{grinderList}</div>;
};

const BrewMethodList: FC = () => {
  const uid = auth.currentUser?.uid || "";
  const ref = collection(db, "users", uid, "brewMethods");
  const [brewMethods] = useCollectionData(ref);

  const brewMethodList = brewMethods?.map((brewMethod) => (
    <BrewMethodCard key={brewMethod.brewMethod} {...brewMethod} />
  ));

  console.log(brewMethods);

  return <div className="flex flex-col gap-4">{brewMethodList}</div>;
};

export default Gear;
