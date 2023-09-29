"use client";
export const dynamic = "force-dynamic";

import BusinessList from "@/components/business-list";
import SearchBusiness from "@/components/search-business";
import { useState, useEffect } from "react";
import "aos/dist/aos.css";
import Aos from "aos";
import Quickstart from "@/components/quickstart";
import { BusinessDataI } from "@/types/types";

export default function Home() {
  const [yelpData, setYelpData] = useState<BusinessDataI[]>([]);
  const [pageToggle, setPageToggle] = useState(false);

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div>
      <SearchBusiness
        setBusinessesData={setYelpData}
        setPageToggle={setPageToggle}
      />
      {pageToggle ? <BusinessList businessesData={yelpData} /> : <Quickstart />}
    </div>
  );
}
