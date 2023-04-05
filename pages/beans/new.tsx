import type { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useContext } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UserContext } from "@/lib/userContext";
import FormSectionWrapper from "@/components/FormSectionWrapper";
import { XCircle } from "lucide-react";

interface NewBeanForm {
  altitude?: string;
  coffeeAmount?: string;
  coffeeName: string;
  country?: string;
  frozen?: boolean;
  freezeDate?: string;
  price?: string;
  processing?: string;
  producer?: string;
  region?: string;
  roastDate?: string;
  roastLevel?:
    | "light"
    | "medium-light"
    | "medium"
    | "medium-dark"
    | "dark"
    | undefined;
  roastType?: "filter" | "espresso" | "omni" | "unknown" | undefined;
  roaster: string;
  tastingNotes?: string;
  variety?: string;
}

const NewBean: NextPage = () => {
  const { user } = useContext(UserContext);
  const router = useRouter();

  const initInputs = {
    altitude: "",
    coffeeAmount: "",
    coffeeName: "",
    country: "",
    frozen: false,
    freezeDate: "",
    price: "",
    processing: "",
    producer: "",
    region: "",
    roastDate: "",
    roastLevel: undefined,
    roastType: undefined,
    roaster: "",
    tastingNotes: "",
    variety: "",
  };
  const [newBeanForm, setNewBeanForm] = useState<NewBeanForm>(initInputs);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    let { name, value, type } = e.target;
    if (type === "checkbox") {
      setNewBeanForm((prevInputs) => ({
        ...prevInputs,
        [name]: !prevInputs.frozen,
      }));
    } else {
      setNewBeanForm((prevInputs) => ({
        ...prevInputs,
        [name]: value,
      }));
    }
  };

  const addBeanDocument = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const docData = {
      ...newBeanForm,
      altitude: parseInt(newBeanForm.altitude as string),
      coffeeAmount: parseInt(newBeanForm.coffeeAmount as string),
      price: parseInt(newBeanForm.price as string),
    };

    try {
      await addDoc(collection(db, "users", user.uid, "beans"), docData);
    } catch (error) {
      console.error(error);
    }

    router.push("/beans");
  };

  return (
    <main className="px-3">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-medium text-emerald-300 underline decoration-4 underline-offset-4">
          Add new coffee beans
        </h2>
        <Link href="/beans">
          <XCircle
            size={28}
            className="cursor-pointer stroke-rose-500 hover:fill-slate-700"
          />
        </Link>
      </div>
      <form
        onSubmit={(e) => addBeanDocument(e)}
        className="flex flex-col gap-2"
      >
        <FormSectionWrapper title="🔥 Roast" expand={true}>
          <label className="mb-4 flex flex-col text-sm text-slate-200">
            Coffee Name:{" "}
            <input
              type="text"
              name="coffeeName"
              value={newBeanForm.coffeeName}
              onChange={handleChange}
              className="border-b border-slate-500 bg-slate-700 pt-2 text-lg  text-slate-50 focus:outline-none"
            />
          </label>
          <label className="mb-4 flex flex-col text-sm text-slate-200">
            Roaster:{" "}
            <input
              type="text"
              name="roaster"
              value={newBeanForm.roaster}
              onChange={handleChange}
              className="border-b border-slate-500 bg-slate-700 pt-2 text-lg  text-slate-50 focus:outline-none"
            />
          </label>
          <label className="mb-4 flex flex-col text-sm text-slate-200">
            Roast Date:{" "}
            <input
              type="date"
              name="roastDate"
              value={newBeanForm.roastDate}
              onChange={handleChange}
              className="max-w-fit border-b border-slate-500 bg-slate-700 pt-2 text-lg  text-slate-50 focus:outline-none"
            />
          </label>
          <label className="mb-4 flex flex-col text-sm text-slate-200">
            Roast Type:{" "}
            <select
              name="roastType"
              value={newBeanForm.roastType}
              onChange={handleChange}
              className="border-b border-slate-500 bg-slate-700 pt-2 text-lg  text-slate-50 focus:outline-none"
            >
              <option>-- Choose one --</option>
              <option value="filter">filter</option>
              <option value="espresso">espresso</option>
              <option value="omni">omni</option>
              <option value="unknown">unknown</option>
            </select>
          </label>
          <label className="mb-4 flex flex-col text-sm text-slate-200">
            Roast Level:{" "}
            <select
              name="roastLevel"
              value={newBeanForm.roastLevel}
              onChange={handleChange}
              className="border-b border-slate-500 bg-slate-700 pt-2 text-lg  text-slate-50 focus:outline-none"
            >
              <option>-- Choose one --</option>
              <option value="light">light</option>
              <option value="medium-light">medium-light</option>
              <option value="medium">medium</option>
              <option value="medium-dark">medium-dark</option>
              <option value="dark">dark</option>
            </select>
          </label>
          <label className="mb-4 flex flex-col text-sm text-slate-200">
            Tasting notes (from the bag):{" "}
            <input
              type="text"
              name="tastingNotes"
              value={newBeanForm.tastingNotes}
              onChange={handleChange}
              className="border-b border-slate-500 bg-slate-700 pt-2 text-lg  text-slate-50 focus:outline-none"
            />
          </label>
        </FormSectionWrapper>
        <FormSectionWrapper title="🌎 Variety">
          <label className="mb-4 flex flex-col text-sm text-slate-200">
            Processing:{" "}
            <input
              type="text"
              name="processing"
              value={newBeanForm.processing}
              onChange={handleChange}
              className="border-b border-slate-500 bg-slate-700 pt-2 text-lg  text-slate-50 focus:outline-none"
            />
          </label>
          <label className="mb-4 flex flex-col text-sm text-slate-200">
            Country of origin:{" "}
            <input
              type="text"
              name="country"
              value={newBeanForm.country}
              onChange={handleChange}
              className="border-b border-slate-500 bg-slate-700 pt-2 text-lg  text-slate-50 focus:outline-none"
            />
          </label>
          <label className="mb-4 flex flex-col text-sm text-slate-200">
            Variety:{" "}
            <input
              type="text"
              name="variety"
              value={newBeanForm.variety}
              onChange={handleChange}
              className="border-b border-slate-500 bg-slate-700 pt-2 text-lg  text-slate-50 focus:outline-none"
            />
          </label>
          <label className="mb-4 flex flex-col text-sm text-slate-200">
            Region:{" "}
            <input
              type="text"
              name="region"
              value={newBeanForm.region}
              onChange={handleChange}
              className="border-b border-slate-500 bg-slate-700 pt-2 text-lg  text-slate-50 focus:outline-none"
            />
          </label>
          <label className="mb-4 flex flex-col text-sm text-slate-200">
            Producer:{" "}
            <input
              type="text"
              name="producer"
              value={newBeanForm.producer}
              onChange={handleChange}
              className="border-b border-slate-500 bg-slate-700 pt-2 text-lg  text-slate-50 focus:outline-none"
            />
          </label>
          <label className="mb-4 flex flex-col text-sm text-slate-200">
            Altitude:{" "}
            <input
              type="number"
              name="altitude"
              value={newBeanForm.altitude}
              onChange={handleChange}
              className="border-b border-slate-500 bg-slate-700 pt-2 text-lg  text-slate-50 focus:outline-none"
            />
          </label>
        </FormSectionWrapper>
        <FormSectionWrapper title="💸 Purchase">
          <label className="mb-4 flex flex-col text-sm text-slate-200">
            Price:{" "}
            <input
              type="number"
              name="price"
              value={newBeanForm.price}
              onChange={handleChange}
              className="border-b border-slate-500 bg-slate-700 pt-2 text-lg  text-slate-50 focus:outline-none"
            />
          </label>
          <label className="mb-4 flex flex-col text-sm text-slate-200">
            Amount of coffee (grams):{" "}
            <input
              type="number"
              name="coffeeAmount"
              value={newBeanForm.coffeeAmount}
              onChange={handleChange}
              className="border-b border-slate-500 bg-slate-700 pt-2 text-lg  text-slate-50 focus:outline-none"
            />
          </label>
        </FormSectionWrapper>
        <FormSectionWrapper title="🧊 Storage">
          <label className="mb-4 flex items-center gap-2 text-sm text-slate-200">
            Frozen?:{" "}
            <input
              type="checkbox"
              name="frozen"
              checked={newBeanForm.frozen}
              onChange={handleChange}
              className="border-b border-slate-500 bg-slate-700 pt-2 text-lg  text-slate-50 focus:outline-none"
            />
          </label>
          {newBeanForm.frozen && (
            <label className="mb-4 flex flex-col text-sm text-slate-200">
              Freeze Date:{" "}
              <input
                type="date"
                name="freezeDate"
                value={newBeanForm.freezeDate}
                onChange={handleChange}
                className="max-w-fit border-b border-slate-500 bg-slate-700 pt-2 text-lg  text-slate-50 focus:outline-none"
              />
            </label>
          )}
        </FormSectionWrapper>
        <button
          type="submit"
          className="-mx-1 my-2 rounded-xl bg-emerald-300 py-3 font-semibold uppercase text-slate-800"
        >
          Save coffee bean
        </button>
      </form>
    </main>
  );
};

export default NewBean;
