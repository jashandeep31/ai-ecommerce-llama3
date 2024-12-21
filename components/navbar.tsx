import { Sparkles } from "lucide-react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className="container">
      <Link href={"/"} className="flex items-center  gap-1 font-bold py-3">
        <span className="animate-pulse">
          <Sparkles size={18} />
        </span>{" "}
        Ai Ecommerce
      </Link>
    </header>
  );
};

export default Navbar;
