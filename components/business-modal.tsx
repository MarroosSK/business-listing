"use client";

import { useEffect, useState } from "react";
import { useBusinessModal } from "@/hooks/use-business-modal";
import Modal from "./ui/modal";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

export const BusinessModal = () => {
  const businessModal = useBusinessModal();
  const businessModalData = useBusinessModal((state) => state.data);
  const [loading, setLoading] = useState(false);

  return (
    <Modal
      title={businessModalData?.name}
      description={businessModalData?.address1}
      isOpen={businessModal.isOpen}
      onClose={businessModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Image
            src={
              businessModalData?.image_url
                ? businessModalData?.image_url
                : "/placeholder.jpg"
            }
            alt={businessModalData?.name}
            width={200}
            height={200}
            priority
            className="w-full h-[200px] rounded-md object-cover"
          />
          <Link href={`/business/${businessModalData?.id}`}>
            <Button
              variant="default"
              onClick={businessModal.onClose}
              className="mt-[10px]"
            >
              Detailed page
            </Button>
          </Link>
        </div>
      </div>
    </Modal>
  );
};
