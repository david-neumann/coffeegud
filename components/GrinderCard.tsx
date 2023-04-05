import type { FC } from "react";

interface GrinderCardProps {
  grinder?: string;
  burrs?: string;
  burrSize?: number;
}

const GrinderCard: FC<GrinderCardProps> = ({ grinder, burrs, burrSize }) => {
  return (
    <div className="rounded-xl border-l-4 border-rose-500 bg-slate-700 p-1">
      <div className="p-2 pb-0">
        <h3 className="text-2xl font-bold">{grinder}</h3>
      </div>
      <div className="flex p-2">
        <div className="w-2/5">
          <h4 className="text-xs uppercase text-rose-500">Burrs:</h4>
          <p className="text-sm">{burrs}</p>
        </div>
        <div>
          <h4 className="text-xs uppercase text-rose-500">Burr Size:</h4>
          <p className="text-sm">{burrSize}mm</p>
        </div>
      </div>
    </div>
  );
};
export default GrinderCard;
