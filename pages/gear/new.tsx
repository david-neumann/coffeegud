import type { NextPage } from "next";
import type { FC } from "react";
import { useRouter } from "next/router";
import { useState, useContext } from "react";
import { UserContext } from "@/lib/userContext";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { PlusCircle } from "lucide-react";

const NewGear: NextPage = () => {
  const { user, loading } = useContext(UserContext);

  // Determines whether Grinder or Brew Method section is active
  const [sectionIsActive, setSectionIsActive] = useState(true);

  if (loading || !user) {
    return <h1 className="flex justify-center pt-20 text-xl">Loading...</h1>;
  }

  return (
    <main className="px-3">
      <h2 className="mb-8 text-xl font-medium text-rose-500 underline decoration-4 underline-offset-4">
        Add new gear
      </h2>
      <div className="mb-4 flex items-center justify-center gap-2">
        <h3
          onClick={() => setSectionIsActive((prev) => !prev)}
          className={`w-32 cursor-pointer rounded-lg py-1 text-center ${
            sectionIsActive && "bg-rose-500"
          }`}
        >
          Grinder
        </h3>
        <h3
          onClick={() => setSectionIsActive((prev) => !prev)}
          className={`w-32 cursor-pointer rounded-lg py-1 text-center ${
            !sectionIsActive && "bg-rose-500"
          }`}
        >
          Brew Method
        </h3>
      </div>
      <div className="flex flex-col gap-2">
        {sectionIsActive ? <NewGrinderForm /> : <NewBrewMethodForm />}
      </div>
    </main>
  );
};

// New grinder form
interface NewGrinder {
  grinder: string;
  burrs?: string;
  burrSize?: string;
}

const NewGrinderForm: FC = ({}) => {
  const router = useRouter();
  const uid = auth.currentUser?.uid || "";

  const [newGrinderForm, setNewGrinderForm] = useState<NewGrinder>({
    grinder: "",
    burrs: "",
    burrSize: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    let { name, value } = e.target;
    setNewGrinderForm((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const addGrinderDocument = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const docData = {
      ...newGrinderForm,
      burrSize: parseInt(newGrinderForm.burrSize as string),
    };

    try {
      await addDoc(collection(db, "users", uid, "grinders"), docData);
    } catch (error) {
      console.error(error);
    }

    router.push("/gear");
  };

  return (
    <form onSubmit={(e) => addGrinderDocument(e)} className="flex flex-col">
      <div className="-mx-1 flex flex-col rounded-xl bg-slate-700 p-2">
        <label className="mb-4 flex flex-col text-xs text-slate-400">
          Grinder Name:
          <input
            type="text"
            name="grinder"
            value={newGrinderForm.grinder}
            onChange={handleChange}
            className="border-b border-slate-500 bg-slate-700 pt-2 text-base  text-slate-50 focus:outline-none"
          />
        </label>
        <label className="mb-4 flex flex-col text-xs text-slate-400">
          Burrs:
          <input
            type="text"
            name="burrs"
            value={newGrinderForm.burrs}
            onChange={handleChange}
            className="border-b border-slate-500 bg-slate-700 pt-2 text-base  text-slate-50 focus:outline-none"
          />
        </label>
        <label className="mb-4 flex flex-col text-xs text-slate-400">
          Burr Size:
          <input
            type="number"
            name="burrSize"
            value={newGrinderForm.burrSize}
            onChange={handleChange}
            className="border-b border-slate-500 bg-slate-700 pt-2 text-base  text-slate-50 focus:outline-none"
          />
        </label>
      </div>
      <button
        type="submit"
        className="-mx-1 my-2 rounded-xl bg-rose-500 py-3 font-semibold uppercase"
      >
        Save grinder
      </button>
    </form>
  );
};

// New brew method form
interface NewBrewMethod {
  brewMethod: string;
  brewStyle?: "espresso" | "filter" | "immersion" | undefined;
  preparationTools?: string[];
}

const NewBrewMethodForm: FC = ({}) => {
  const router = useRouter();
  const uid = auth.currentUser?.uid || "";

  const [newBrewMethodForm, setNewBrewMethodForm] = useState<NewBrewMethod>({
    brewMethod: "",
    brewStyle: undefined,
    preparationTools: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setNewBrewMethodForm((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const [prepToolsTemp, setPrepToolsTemp] = useState<string>("");

  const handleChangePrepTools = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = e.target;
    setPrepToolsTemp(value);
  };

  const addPrepToolToList = (prepTool: string): void => {
    setNewBrewMethodForm((prev) => ({
      ...prev,
      preparationTools: [...prev.preparationTools, prepTool],
    }));
    setPrepToolsTemp("");
  };

  const addBrewMethodDocument = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addDoc(
        collection(db, "users", uid, "brewMethods"),
        newBrewMethodForm
      );
    } catch (error) {
      console.error(error);
    }

    router.push("/gear");
  };

  const prepToolsAdded = newBrewMethodForm.preparationTools?.map((tool) => (
    <p
      key={crypto.randomUUID()}
      className="rounded bg-slate-500 py-1 px-2 text-xs"
    >
      {tool}
    </p>
  ));

  console.log(newBrewMethodForm);

  return (
    <form onSubmit={(e) => addBrewMethodDocument(e)} className="flex flex-col">
      <div className="-mx-1 flex flex-col rounded-xl bg-slate-700 p-2">
        <label className="mb-4 flex flex-col text-xs text-slate-400">
          Brew Method:
          <input
            type="text"
            name="brewMethod"
            value={newBrewMethodForm.brewMethod}
            onChange={handleChange}
            className="border-b border-slate-500 bg-slate-700 pt-2 text-base  text-slate-50 focus:outline-none"
          />
        </label>
        <label className="mb-4 flex flex-col text-xs text-slate-400">
          Brew Style:
          <select
            name="brewStyle"
            value={newBrewMethodForm.brewStyle}
            onChange={handleChange}
            className="border-b border-slate-500 bg-slate-700 pt-2 text-base  text-slate-50 focus:outline-none"
          >
            <option>-- Choose one --</option>
            <option value="espresso">espresso</option>
            <option value="filter">filter</option>
            <option value="immersion">immersion</option>
          </select>
        </label>
        <label className="relative mb-4 flex flex-col text-xs text-slate-400">
          Preparation Tools:
          <input
            type="text"
            name="prepToolsTemp"
            value={prepToolsTemp}
            onChange={handleChangePrepTools}
            className="border-b border-slate-500 bg-slate-700 pt-2 pr-8 text-base  text-slate-50 focus:outline-none"
          />
          <PlusCircle
            size={20}
            onClick={() => addPrepToolToList(prepToolsTemp)}
            className="absolute right-0 bottom-2"
          />
        </label>
        <div className="flex items-center gap-2">
          {newBrewMethodForm.preparationTools.length > 0 && prepToolsAdded}
        </div>
      </div>
      <button
        type="submit"
        className="-mx-1 my-2 rounded-xl bg-rose-500 py-3 font-semibold uppercase"
      >
        Save brew method
      </button>
    </form>
  );
};

export default NewGear;
