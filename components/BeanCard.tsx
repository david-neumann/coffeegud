import type { FC } from "react";
import Image from "next/image";
import coffeeBeans from "../public/coffee-beans.png";

interface BeanCardProps {
  coffeeName?: string;
  roaster?: string;
  roastDate?: string;
  coffeeAmount?: number;
  country?: string;
  variety?: string;
  processing?: string;
}

const BeanCard: FC<BeanCardProps> = ({
  coffeeName,
  roaster,
  roastDate,
  coffeeAmount,
  country,
  variety,
  processing,
}) => {
  const today = new Date();
  const beanRoastDate = new Date(roastDate as string);
  const formattedRoastDate = beanRoastDate.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  const calcRestTime = (today: Date, roastDate: Date): number => {
    const restInMillis = today.getTime() - roastDate.getTime();
    const restInDays = Math.floor(restInMillis / (1000 * 60 * 60 * 24));
    return restInDays;
  };

  const restTime = calcRestTime(today, beanRoastDate);

  return (
    <section className="rounded-xl border-l-4 border-emerald-300 bg-slate-700 p-1">
      <div className="mb-2 flex items-center gap-2 border-b border-slate-600 p-2">
        <Image src={coffeeBeans} alt="coffee beans" height={32} className="" />
        <div className="">
          <h3 className="text-2xl font-bold">{coffeeName}</h3>
          <p className="-mt-1 text-xs">{roaster}</p>
        </div>
      </div>
      <div className="flex gap-2 p-2">
        <div className="w-1/3">
          <h4 className="text-xs font-light uppercase text-emerald-300">
            Country
          </h4>
          <p className="text-sm">{country}</p>
        </div>
        <div className="w-1/4">
          <h4 className="text-xs font-light uppercase text-emerald-300">
            Rest
          </h4>
          <p className="text-sm">{restTime} days</p>
        </div>
        <div className="">
          <h4 className="text-xs font-light uppercase text-emerald-300">
            Remaining
          </h4>
          <p className="text-sm">XXX of {coffeeAmount}g</p>
        </div>
      </div>
    </section>
  );
};

export default BeanCard;
