import type { NextPage } from "next";
import type { FC } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useContext } from "react";
import { UserContext } from "@/lib/userContext";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import FormSectionWrapper from "@/components/FormSectionWrapper";
import { XCircle } from "lucide-react";

const NewBrew: NextPage = () => {
  const { user, loading } = useContext(UserContext);

  if (loading || !user) {
    return <h1 className="flex justify-center pt-20 text-xl">Loading...</h1>;
  }

  return (
    <main className="px-3">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-3xl font-bold lowercase text-blue-400 underline decoration-4 underline-offset-4">
          Add a new brew
        </h2>
        <Link href="/brews">
          <XCircle
            size={28}
            className="cursor-pointer stroke-rose-500 hover:fill-slate-700"
          />
        </Link>
      </div>
      <NewBrewForm />
    </main>
  );
};

// New brew form
interface NewBrew {}

const NewBrewForm: FC = ({}) => {
  const router = useRouter();
  const uid = auth.currentUser?.uid || "";

  const [newBrewForm, setNewBrewForm] = useState<NewBrew>();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setNewBrewForm((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const addBrewDocument = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const docData = {};

    try {
      await addDoc(collection(db, "users", uid, "brews"), docData);
    } catch (error) {
      console.error(error);
    }

    router.push("/brews");
  };

  return (
    <form onSubmit={(e) => addBrewDocument(e)} className="flex flex-col gap-2">
      <FormSectionWrapper title="🔧 Equipment" expand={true}>
        <label className="mb-4 flex flex-col text-sm text-slate-200">
          Coffee Beans:
        </label>
        <label className="mb-4 flex flex-col text-sm text-slate-200">
          Brew Method:
        </label>
        <label className="mb-4 flex flex-col text-sm text-slate-200">
          Preparation Tools:
        </label>
        <label className="mb-4 flex flex-col text-sm text-slate-200">
          Grinder:
        </label>
        <label className="mb-4 flex flex-col text-sm text-slate-200">
          Grind Setting:
        </label>
        <label className="mb-4 flex flex-col text-sm text-slate-200">
          Water:
        </label>
      </FormSectionWrapper>
      <FormSectionWrapper title="☕️ Brew Recipe" expand={true}>
        <label className="mb-4 flex flex-col text-sm text-slate-200">
          Water Temperature:
          <input
            type="number"
            name="waterTemp"
            // value={newBrewForm.altitude}
            onChange={handleChange}
            className="border-b border-slate-500 bg-slate-700 pt-2 text-lg  text-slate-50 focus:outline-none"
          />
        </label>
        <label className="mb-4 flex flex-col text-sm text-slate-200">
          Dose (g):
          <input
            type="number"
            name="dose"
            // value={newBrewForm.altitude}
            onChange={handleChange}
            className="border-b border-slate-500 bg-slate-700 pt-2 text-lg  text-slate-50 focus:outline-none"
          />
        </label>
        <label className="mb-4 flex flex-col text-sm text-slate-200">
          Yield (ml):
          <input
            type="number"
            name="yield"
            // value={newBrewForm.altitude}
            onChange={handleChange}
            className="border-b border-slate-500 bg-slate-700 pt-2 text-lg  text-slate-50 focus:outline-none"
          />
        </label>
        <label className="mb-4 flex flex-col text-sm text-slate-200">
          Brew Time:
        </label>
      </FormSectionWrapper>
      <FormSectionWrapper title="📝 Notes" expand={true}></FormSectionWrapper>
    </form>
  );
};

export default NewBrew;
