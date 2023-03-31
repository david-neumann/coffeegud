import type { FC } from "react";
import Image from "next/image";
import coffeeLogo from "../public/coffee-plant.png";
import { Menu } from "lucide-react";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <header className="mb-8 pt-12">
      <nav className="sticky top-0 flex items-center justify-between border-b border-slate-600 p-2">
        <div className="flex items-center gap-2">
          <Image
            src={coffeeLogo}
            alt="Coffee plant"
            height={24}
            className="drop-shadow"
          />
          <h1 className="text-lg font-extrabold text-rose-500">coffeegud</h1>
        </div>
        <Menu
          size={32}
          className="cursor-pointer rounded p-1 hover:bg-slate-600"
        />
      </nav>
    </header>
  );
};
export default Navbar;
