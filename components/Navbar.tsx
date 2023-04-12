import type { FC } from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import coffeeLogo from "../public/coffee-plant.png";
import { Menu, X } from "lucide-react";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const [showOverlayNav, setShowOverlayNav] = useState(false);

  return (
    <header className="mb-8 pt-12">
      <nav className="sticky top-0 flex items-center justify-between border-b border-slate-600 p-2">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Image
              src={coffeeLogo}
              alt="Coffee plant"
              height={24}
              className="drop-shadow"
            />
            <h1 className="text-lg font-extrabold text-rose-500">coffeegud</h1>
          </div>
        </Link>
        <Menu
          size={32}
          onClick={() => setShowOverlayNav(true)}
          className="cursor-pointer rounded p-1 hover:bg-slate-600"
        />
      </nav>
      {showOverlayNav && (
        <OverlayNav show={showOverlayNav} setShow={setShowOverlayNav} />
      )}
    </header>
  );
};

interface OverlayNavProps {
  show: boolean;
  setShow: (newValue: boolean) => void;
}
const OverlayNav: FC<OverlayNavProps> = ({ setShow }) => {
  return (
    <nav className="fixed top-0 z-50 h-full w-full bg-slate-800 pt-28 pl-10">
      <X
        size={32}
        onClick={() => setShow(false)}
        className="fixed top-14 right-2 cursor-pointer rounded p-1 hover:bg-slate-600"
      />
      <ul className="w-fit">
        <Link href="/" onClick={() => setShow(false)} className="w-fit">
          <li className="w-fit cursor-pointer rounded p-2 text-3xl hover:bg-slate-600">
            Home
          </li>
        </Link>
        <Link href="/beans" onClick={() => setShow(false)} className="w-fit">
          <li className="w-fit cursor-pointer rounded p-2 text-3xl hover:bg-slate-600 hover:text-emerald-300">
            Beans
          </li>
        </Link>
        <Link href="/brews" onClick={() => setShow(false)} className="w-fit">
          <li className="w-fit cursor-pointer rounded p-2 text-3xl hover:bg-slate-600">
            Brews
          </li>
        </Link>
        <Link href="/gear" onClick={() => setShow(false)} className="w-fit">
          <li className="w-fit cursor-pointer rounded p-2 text-3xl hover:bg-slate-600 hover:text-rose-500">
            Gear
          </li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
