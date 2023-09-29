import React from "react";

function Skeleton2() {
  return (
    <div>
      <div className="w-full p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
        <div className="animate-pulse flex flex-col space-x-4">
          <div className="w-full flex items-center justify-center h-[450px] mb-4 bg-gray-300 rounded dark:bg-gray-700"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-200 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Skeleton2;
