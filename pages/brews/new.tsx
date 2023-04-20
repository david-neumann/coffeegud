import type { NextPage } from "next";
import type { FC } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useContext } from "react";
import { UserContext } from "@/lib/userContext";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
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
            className="cursor-pointer stroke-rose-500 hover:fill-slate-200 dark:hover:fill-slate-700"
          />
        </Link>
      </div>
      <NewBrewForm />
    </main>
  );
};

// New brew form
interface NewBrew {
  coffeeBeans: string;
  brewMethod: string;
  prepTools?: string[];
  grinder?: string;
  grindSetting?: string;
  water?: string;
  waterTemp?: string;
  dose: string;
  yield: string;
  minutes?: string;
  seconds?: string;
  notes?: string;
}

const NewBrewForm: FC = ({}) => {
  const router = useRouter();
  const uid = auth.currentUser?.uid || "";

  const initInputs = {
    coffeeBeans: "",
    brewMethod: "",
    prepTools: [],
    grinder: "",
    grindSetting: "",
    water: "",
    waterTemp: "",
    dose: "",
    yield: "",
    minutes: "",
    seconds: "",
    notes: "",
  };

  const [newBrewForm, setNewBrewForm] = useState<NewBrew>(initInputs);

  // Retrieve user added data to display as options for brew
  const beansRef = collection(db, "users", uid, "beans");
  const methodsRef = collection(db, "users", uid, "brewMethods");
  const grindersRef = collection(db, "users", uid, "grinders");

  const [beans] = useCollectionData(beansRef);
  const [methods] = useCollectionData(methodsRef);
  const [grinders] = useCollectionData(grindersRef);

  const beanOptions = beans?.map((bean, index) => (
    <option key={index} value={bean.coffeeName}>
      {bean.coffeeName}
    </option>
  ));

  const methodOptions = methods?.map((method, index) => (
    <option key={index} value={method.brewMethod}>
      {method.brewMethod}
    </option>
  ));

  const prepToolOptions =
    newBrewForm.brewMethod !== ""
      ? methods
          ?.filter((method) => method.brewMethod === newBrewForm.brewMethod)[0]
          .preparationTools.map((tool: string, index: number) => (
            <option key={index} value={tool}>
              {tool}
            </option>
          ))
      : "";

  const grinderOptions = grinders?.map((grinder, index) => (
    <option key={index} value={grinder.grinder}>
      {grinder.grinder}
    </option>
  ));

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
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
        <label className="mb-4 flex flex-col text-sm text-slate-500 dark:text-slate-200">
          Coffee Beans:
          <select
            name="coffeeBeans"
            onChange={handleChange}
            value={newBrewForm.coffeeBeans}
            className="border-b border-slate-500 bg-slate-100 pt-2 text-lg text-slate-800 focus:outline-none  dark:bg-slate-700 dark:text-slate-50"
          >
            <option value="">-- Choose one --</option>
            {beanOptions}
          </select>
        </label>
        <label className="mb-4 flex flex-col text-sm text-slate-500 dark:text-slate-200">
          Brew Method:
          <select
            name="brewMethod"
            onChange={handleChange}
            value={newBrewForm.brewMethod}
            className="border-b border-slate-500 bg-slate-100 pt-2 text-lg text-slate-800 focus:outline-none  dark:bg-slate-700 dark:text-slate-50"
          >
            <option value="">-- Choose one --</option>
            {methodOptions}
          </select>
        </label>
        <label className="mb-4 flex flex-col text-sm text-slate-500 dark:text-slate-200">
          Preparation Tools:
          <select
            name="brewMethod"
            onChange={handleChange}
            value={newBrewForm.prepTools}
            className="border-b border-slate-500 bg-slate-100 pt-2 text-lg text-slate-800 focus:outline-none  dark:bg-slate-700 dark:text-slate-50"
          >
            <option value="">-- Choose one --</option>
            {prepToolOptions}
          </select>
        </label>
        <label className="mb-4 flex flex-col text-sm text-slate-500 dark:text-slate-200">
          Grinder:
          <select
            name="grinder"
            onChange={handleChange}
            value={newBrewForm.grinder}
            className="border-b border-slate-500 bg-slate-100 pt-2 text-lg text-slate-800 focus:outline-none  dark:bg-slate-700 dark:text-slate-50"
          >
            <option value="">-- Choose one --</option>
            {grinderOptions}
          </select>
        </label>
        <label className="mb-4 flex flex-col text-sm text-slate-500 dark:text-slate-200">
          Grind Setting:
          <input
            type="number"
            name="grindSetting"
            value={newBrewForm.grindSetting}
            onChange={handleChange}
            className="border-b border-slate-500 bg-slate-100 pt-2 text-lg text-slate-800 focus:outline-none  dark:bg-slate-700 dark:text-slate-50"
          />
        </label>
        <label className="mb-4 flex flex-col text-sm text-slate-500 dark:text-slate-200">
          Water:
          <input
            type="text"
            name="water"
            value={newBrewForm.water}
            onChange={handleChange}
            className="border-b border-slate-500 bg-slate-100 pt-2 text-lg text-slate-800 focus:outline-none  dark:bg-slate-700 dark:text-slate-50"
          />
        </label>
      </FormSectionWrapper>
      <FormSectionWrapper title="☕️ Brew Recipe" expand={true}>
        <label className="mb-4 flex flex-col text-sm text-slate-500 dark:text-slate-200">
          Water Temperature:
          <input
            type="number"
            name="waterTemp"
            value={newBrewForm.waterTemp}
            onChange={handleChange}
            className="border-b border-slate-500 bg-slate-100 pt-2 text-lg text-slate-800 focus:outline-none  dark:bg-slate-700 dark:text-slate-50"
          />
        </label>
        <label className="mb-4 flex flex-col text-sm text-slate-500 dark:text-slate-200">
          Dose (g):
          <input
            type="number"
            name="dose"
            value={newBrewForm.dose}
            onChange={handleChange}
            className="border-b border-slate-500 bg-slate-100 pt-2 text-lg text-slate-800 focus:outline-none  dark:bg-slate-700 dark:text-slate-50"
          />
        </label>
        <label className="mb-4 flex flex-col text-sm text-slate-500 dark:text-slate-200">
          Yield (ml):
          <input
            type="number"
            name="yield"
            value={newBrewForm.yield}
            onChange={handleChange}
            className="border-b border-slate-500 bg-slate-100 pt-2 text-lg text-slate-800 focus:outline-none  dark:bg-slate-700 dark:text-slate-50"
          />
        </label>
        <label className="mb-4 flex flex-col text-sm text-slate-500 dark:text-slate-200">
          Brew Time:
          <div className="flex items-baseline gap-1">
            <input
              type="number"
              name="minutes"
              placeholder="min"
              value={newBrewForm.minutes}
              onChange={handleChange}
              className="w-10 border-b border-slate-500 bg-slate-100 pt-2 text-right text-lg  text-slate-800 focus:outline-none dark:bg-slate-700 dark:text-slate-50"
            />
            {" : "}
            <input
              type="number"
              name="seconds"
              placeholder="sec"
              value={newBrewForm.seconds}
              onChange={handleChange}
              className="w-10 border-b border-slate-500 bg-slate-100 pt-2 text-right text-lg  text-slate-800 focus:outline-none dark:bg-slate-700 dark:text-slate-50"
            />
          </div>
        </label>
      </FormSectionWrapper>
      <FormSectionWrapper title="📝 Notes" expand={true}>
        <textarea
          name="notes"
          value={newBrewForm.notes}
          onChange={handleChange}
          rows={3}
          className="mt-2 w-full rounded border border-slate-500 bg-slate-100 p-1 text-lg text-slate-800 focus:outline-none dark:bg-slate-700 dark:text-slate-50"
        />
      </FormSectionWrapper>
      <button
        type="submit"
        className="-mx-1 my-2 rounded-xl bg-blue-400 py-3 text-xl font-semibold lowercase text-slate-50 hover:bg-blue-500"
      >
        Save brew
      </button>
    </form>
  );
};

export default NewBrew;
