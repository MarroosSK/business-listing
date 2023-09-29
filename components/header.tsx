import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <div className="container p-5 px-10 h-[80px] flex items-center justify-between shadow-sm">
      <h2 className="text-[18px] md:text-[25px] text-slate-500 font-semibold tracking-widest">
        <Link href="/" className="cursor-pointer">
          Business<span className="text-indigo-500">GO</span>
        </Link>
      </h2>
    </div>
  );
};
