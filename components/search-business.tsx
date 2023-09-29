"use client";

import React, { FormEvent, useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Search, Car, Store, Coffee, DollarSign } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useConfetti } from "@/hooks/use-confetti";
import { Separator } from "@/components/ui/separator";
import { BusinessDataI } from "@/types/types";

const categories = [
  {
    id: 1,
    name: "Cars",
    icon: <Car />,
  },
  {
    id: 2,
    name: "Stores",
    icon: <Store />,
  },
  {
    id: 3,
    name: "Coffee",
    icon: <Coffee />,
  },
  {
    id: 4,
    name: "Bank",
    icon: <DollarSign />,
  },
];

const SearchBusiness = ({
  setBusinessesData,
  setPageToggle,
}: {
  setBusinessesData: React.Dispatch<React.SetStateAction<BusinessDataI[]>>;
  setPageToggle: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const confetti = useConfetti();

  const [query, setQuery] = useState("");
  const [term, setTerm] = useState("");
  const [showCat, setShowCat] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusinessesData([]);
    setPageToggle(true);
    try {
      const response = await axios.get(
        `/api/business/search?location=${query}&term=${term}`
      );
      const data = await response.data;
      // console.log(data);
      if (data) {
        toast.success("Data fetched successfully!");
        confetti.onOpen();
        setBusinessesData(data);
      }
    } catch (error) {
      console.error("[FETCH_ERROR]", error);
      toast.error("It appears there are no data for this search!");
    }
  };
  return (
    <div>
      <div>
        <Image
          src="/bg4.jpg"
          alt="hero-img"
          width={1200}
          height={500}
          className="hidden md:block w-full h-[60%] absolute "
        />{" "}
        *
        <div className="z-20  mt-[70px] flex flex-col items-center justify-center">
          <h2 className="z-20 text-center text-[45px] md:text-[55px] text-slate-500 font-semibold tracking-widest">
            Business<span className="text-indigo-500">GO</span>
          </h2>
          <h3 className="z-20 text-center text-[25px] text-slate-500">
            we know <span className="text-indigo-500">more</span> about business
            you are looking for
          </h3>
          <form onSubmit={handleSubmit} className="z-20 w-11/12 md:w-auto">
            <div className="z-20 flex flex-col md:flex-row items-center justify-center gap-x-2  mt-[35px] bg-white p-3 border-[1px] rounded-lg  px-5 shadow-sm">
              <input
                type="text"
                name="query"
                placeholder="'e.g: food, cars'"
                className="z-20 outline-none p-5"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                required
              />
              <span className="text-slate-500 hidden md:block z-20 text-2xl">
                |
              </span>
              <Separator
                orientation="horizontal"
                className="md:hidden z-20 text-2xl"
              />
              <input
                type="text"
                name="query"
                placeholder="'e.g: California, Warsaw'"
                className="z-20 outline-none p-5"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                required
              />
              <Button
                type="submit"
                variant="default"
                className="z-20 w-full md:w-auto  rounded-lg"
              >
                <Search />
              </Button>
            </div>
          </form>
          <div className="z-20 mt-[55px]">
            <h2 className="text-center text-[14px] text-slate-500">
              or pick from popular{" "}
              <span
                className="text-indigo-500 hover:text-indigo-700 cursor-pointer group"
                onClick={() => setShowCat(!showCat)}
              >
                categories
              </span>
            </h2>
            {showCat && (
              <div
                data-aos="fade-up"
                data-aos-duration="1100"
                className="mt-[15px] flex items-center justify-center gap-x-4 group transition-all ease-in-out duration-3000 "
              >
                {categories.map((cat, index) => (
                  <div
                    key={index}
                    className="border-[1px] w-[60px] p-4 bg-white rounded-full hover:border-slate-800 hover:scale-110 transition-all cursor-pointer"
                    onClick={() => setTerm(cat.name)}
                  >
                    <p>{cat.icon}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBusiness;
