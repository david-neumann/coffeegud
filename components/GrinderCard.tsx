import type { FC } from "react";
import { Ruler, Settings } from "lucide-react";

interface GrinderCardProps {
  grinder?: string;
  burrs?: string;
  burrSize?: number;
}

const GrinderCard: FC<GrinderCardProps> = ({ grinder, burrs, burrSize }) => {
  return (
    <div className="rounded-xl bg-slate-700 p-1 shadow-md hover:border hover:border-rose-500/20">
      <div className="p-2 pb-0">
        <h3 className="text-2xl font-bold">{grinder}</h3>
      </div>
      <div className="flex p-2">
        <div className="w-2/5">
          <div className="flex items-center gap-1">
            <Settings size={12} strokeWidth={1.5} className="stroke-rose-500" />
            <h4 className="text-xs font-light uppercase tracking-wider text-rose-500">
              Burrs:
            </h4>
          </div>
          <p className="text-sm">{burrs}</p>
        </div>
        <div>
          <div className="flex items-center gap-1">
            <Ruler size={12} strokeWidth={1.5} className="stroke-rose-500" />
            <h4 className="text-xs font-light uppercase tracking-wider text-rose-500">
              Burr Size:
            </h4>
          </div>
          <p className="text-sm">{burrSize}mm</p>
        </div>
      </div>
    </div>
  );
};
export default GrinderCard;
