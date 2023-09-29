"use client";

import { BusinessModal } from "@/components/business-modal";
import React, { useEffect, useState } from "react";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  // render modal once it is completed
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div>
      <BusinessModal />
    </div>
  );
};

export default ModalProvider;
