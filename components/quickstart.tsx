import React from "react";
import { ShieldQuestion, Check, X } from "lucide-react";

const Quickstart = () => {
  return (
    <div className="container flex flex-col gap-y-4 items-center justify-center h-full mt-[70px]">
      <div className="flex items-center gap-x-4">
        <ShieldQuestion size={28} className="text-slate-500" />{" "}
        <h2 className="text-slate-500 text-[28px]">Key Features</h2>
      </div>
      <div className="p-8  mt-8 border bg-white rounded-md">
        <div className="pb-6 flex items-center gap-x-2">
          <Check className="text-indigo-500" />
          <p className="text-slate-500">
            In order to receive data you must type text in both (term, location)
            inputs.
          </p>
        </div>
        <div className="pb-6 flex items-center gap-x-2">
          <Check className="text-indigo-500" />
          <p className="text-slate-500">
            Every business has it&apos;s own detailed page. Enter it by clicking
            on picture.
          </p>
        </div>
        <div className="pb-6 flex items-center gap-x-2">
          <X className="text-red-500" />
          <p className="text-slate-500">
            Working on contact | darkMode | auth | add to Fav | finish types
            (replace any)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Quickstart;
