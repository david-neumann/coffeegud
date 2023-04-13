import type { FC } from "react";
import { Coffee, Hash } from "lucide-react";

interface BrewMethodCardProps {
  brewMethod?: string;
  brewStyle?: string;
}

const BrewMethodCard: FC<BrewMethodCardProps> = ({ brewMethod, brewStyle }) => {
  return (
    <section className="rounded-xl bg-slate-700 p-1 shadow-md hover:border hover:border-rose-500/20">
      <div className="p-2 pb-0">
        <h3 className="text-2xl font-semibold">{brewMethod}</h3>
      </div>
      <div className="flex p-2">
        <div className="w-2/5">
          <div className="flex items-center gap-1">
            <Coffee
              size={12}
              strokeWidth={1.5}
              className="-mt-[1px] stroke-rose-500"
            />
            <h4 className="text-xs font-light uppercase tracking-wider text-rose-500">
              Brew Style:
            </h4>
          </div>
          <p className="text-sm">{brewStyle}</p>
        </div>
        <div className="">
          <div className="flex items-center gap-1">
            <Hash
              size={12}
              strokeWidth={1.5}
              className="-mt-[1px] stroke-rose-500"
            />
            <h4 className="text-xs font-light uppercase tracking-wider text-rose-500">
              Brews:
            </h4>
          </div>
          <p className="text-sm">5</p>
        </div>
      </div>
    </section>
  );
};
export default BrewMethodCard;
