import type { NextPage } from "next";
import type { FC } from "react";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "@/lib/userContext";
import { collection } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import BeanCard from "@/components/BeanCard";
import { PlusCircle } from "lucide-react";

const Beans: NextPage = () => {
  const { loading } = useContext(UserContext);

  if (loading) {
    return <h1 className="flex justify-center pt-20 text-xl">Loading...</h1>;
  }

  return (
    <main className="px-3">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-3xl font-bold lowercase text-emerald-300 underline decoration-4 underline-offset-4">
          coffee beans
        </h2>
        <Link href="/beans/new">
          <PlusCircle
            size={28}
            className="cursor-pointer stroke-emerald-300 hover:fill-slate-700"
          />
        </Link>
      </div>
      <BeanList />
    </main>
  );
};

const BeanList: FC = () => {
  const uid = auth.currentUser?.uid || "";
  const ref = collection(db, "users", uid, "beans");
  const [beans] = useCollectionData(ref);

  const beanList = beans?.map((bean) => (
    <BeanCard key={bean.coffeeName} {...bean} />
  ));

  return <div className="flex flex-col gap-4">{beanList}</div>;
};

export default Beans;
