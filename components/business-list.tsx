"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { Badge } from "./ui/badge";
import Skelton from "./skeleton";
import { useBusinessModal } from "@/hooks/use-business-modal";
import { BusinessDataI } from "@/types/types";

const BusinessList = ({
  businessesData,
}: {
  businessesData: BusinessDataI[];
}) => {
  const skeletons = [1, 2, 3, 4];
  const businessModal = useBusinessModal();

  const handleModal = (data: BusinessDataI) => {
    businessModal.onOpen();
    businessModal.setData(data);
  };
  return (
    <div className="mt-[35px] z-35 container">
      {businessesData && businessesData.length !== 0 && (
        <h2 className="text-slate-500 font-semibold text-[18px]">
          {businessesData.length} places found
        </h2>
      )}
      {businessesData && businessesData.length === 0 ? (
        <div className="grid  md:grid-cols-3 lg:grid-cols-4 gap-5">
          {skeletons.map((item, index) => (
            <Skelton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
          {businessesData &&
            businessesData?.map((bus) => (
              <div key={bus.id} className="mt-6 border bg-white rounded-md p-4">
                <Image
                  src={bus?.image_url ? bus?.image_url : "/placeholder.jpg"}
                  alt={bus?.image_url}
                  width={200}
                  height={80}
                  priority
                  className="w-full h-[150px] rounded-md hover:scale-110 transition-all cursor-pointer object-cover"
                  onClick={() => handleModal(bus)}
                />

                <h4 className="text-slate-500 mt-5 mb-3">{bus?.name}</h4>
                <div className="flex items-center gap-x-2 mb-2">
                  <MapPin />
                  <p className="text-[12px]">
                    {bus?.location?.display_address[0]}
                  </p>
                  <p className="text-[12px]">
                    {bus?.location?.display_address[1]}
                  </p>
                </div>
                {bus?.is_closed ? (
                  <Badge variant="destructive">closed</Badge>
                ) : (
                  <Badge variant="default">open</Badge>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default BusinessList;
