import type { NextPage } from "next";
import type { FC } from "react";
import { useContext } from "react";
import { UserContext } from "@/lib/userContext";
import { collection } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import GrinderCard from "@/components/GrinderCard";
import BrewMethodCard from "@/components/BrewMethodCard";

const Gear: NextPage = () => {
  const { loading } = useContext(UserContext);

  if (loading) {
    return <h1 className="flex justify-center pt-20 text-xl">Loading...</h1>;
  }

  return (
    <main className="px-3">
      <section className="mb-4">
        <h2 className="mb-4 text-xl font-medium text-rose-500 underline decoration-4 underline-offset-4">
          Grinders
        </h2>
        <GrinderList />
      </section>
      <section>
        <h2 className="mb-4 text-xl font-medium text-rose-500 underline decoration-4 underline-offset-4">
          Brew Methods
        </h2>
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
