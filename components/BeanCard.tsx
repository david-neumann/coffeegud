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
    <section className="rounded-xl bg-slate-700">
      <div className="mb-3 flex items-center gap-2 rounded-t-xl bg-slate-700 p-2">
        <Image src={coffeeBeans} alt="coffee beans" height={24} className="" />
        <h3 className="text-lg">{coffeeName}</h3>
      </div>
      <div className="flex gap-2 px-2 pb-4">
        <div className="w-2/5">
          <h4 className="text-xs uppercase text-emerald-300">Roaster</h4>
          <p className="text-sm">{roaster}</p>
        </div>
        <div className="w-1/3">
          <h4 className="text-xs uppercase text-emerald-300">Roast Date</h4>
          <p className="text-sm">{formattedRoastDate}</p>
        </div>
        <div className="">
          <h4 className="text-xs uppercase text-emerald-300">Rest</h4>
          <p className="text-sm">{restTime} days</p>
        </div>
      </div>
      <div className="flex gap-2 px-2 pb-4">
        <div className="w-1/5">
          <h4 className="text-xs uppercase text-emerald-300">Variety</h4>
          <p className="text-sm">{variety}</p>
        </div>
        <div className="w-1/4">
          <h4 className="text-xs uppercase text-emerald-300">Country</h4>
          <p className="text-sm">{country}</p>
        </div>
        <div className="px-2">
          <h4 className="text-xs uppercase text-emerald-300">
            Amount Remaining
          </h4>
          <p className="text-sm">XXX of {coffeeAmount}g</p>
        </div>
      </div>
    </section>
  );
};

export default BeanCard;
