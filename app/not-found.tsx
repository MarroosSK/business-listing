import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <main className="mt-[50px] h-screen flex flex-col items-center  gap-y-4 space-y-2">
      <h2 className="text-3xl text-indigo-500 font-semibold">
        There was a problem
      </h2>
      <p>Page not found. Make sure you have entered correct address.</p>
      <p>
        Go back to the{" "}
        <Link href={"/"} className="text-indigo-500 hover:text-indigo-800">
          Home page.
        </Link>
      </p>
    </main>
  );
};

export default NotFound;
