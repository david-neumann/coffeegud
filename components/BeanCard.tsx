import type { FC } from "react";
import Image from "next/image";
import coffeeBeans from "../public/coffee-beans.png";
import { Globe, Clock, Scale, Cherry } from "lucide-react";

interface BeanCardProps {
  coffeeName?: string;
  roaster?: string;
  roastDate?: string;
  coffeeAmount?: number;
  country?: string;
  tastingNotes?: string;
}

const BeanCard: FC<BeanCardProps> = ({
  coffeeName,
  roaster,
  roastDate,
  coffeeAmount,
  country,
  tastingNotes,
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
    <section className="cursor-pointer rounded-xl bg-slate-700 p-1 shadow hover:border hover:border-emerald-300/20">
      <div className="mb-2 flex items-center gap-2 border-b border-emerald-300/10 p-2">
        <Image src={coffeeBeans} alt="coffee beans" height={32} className="" />
        <div className="">
          <h3 className="text-2xl font-semibold">{coffeeName}</h3>
          <p className="-mt-1 text-xs tracking-wider">{roaster}</p>
        </div>
      </div>
      <div className="flex gap-2 p-2">
        <div className="w-1/3">
          <div className="flex items-center gap-1">
            <Globe size={12} strokeWidth={1.5} className="stroke-emerald-300" />
            <h4 className=" text-xs uppercase tracking-wider text-emerald-300">
              Country
            </h4>
          </div>
          <p className="">{country}</p>
        </div>
        <div className="w-1/4">
          <div className="flex items-center gap-1">
            <Clock
              size={12}
              strokeWidth={1.5}
              className="inline stroke-emerald-300"
            />
            <h4 className=" text-xs uppercase tracking-wider text-emerald-300">
              Rest
            </h4>
          </div>
          <p className="">{restTime} days</p>
        </div>
        <div className="">
          <div className="flex items-center gap-1">
            <Scale
              size={12}
              strokeWidth={1.5}
              className="-mt-[1px] inline stroke-emerald-300"
            />
            <h4 className=" text-xs uppercase tracking-wider text-emerald-300">
              Remaining
            </h4>
          </div>
          <p className="">{coffeeAmount}g</p>
        </div>
      </div>
      <div className="p-2">
        <div className="flex items-center gap-1">
          <Cherry
            size={12}
            strokeWidth={1.5}
            className="-mt-[1px] inline stroke-emerald-300"
          />
          <h4 className=" text-xs uppercase tracking-wider text-emerald-300">
            Tasting notes
          </h4>
        </div>
        <p className="text-xs">{tastingNotes}</p>
      </div>
    </section>
  );
};

export default BeanCard;
