"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";

import { useConfetti } from "@/hooks/use-confetti";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Camera,
  Clock4,
  GanttChartSquare,
  Globe2,
  Home,
  Map,
  MapPin,
  Phone,
  Star,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Rating } from "react-simple-star-rating";
import Skeleton2 from "@/components/skeleton2";

//slick
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { formatTime, getDayName } from "@/lib/formatDayTime";
import Link from "next/link";
import { BusinessDataI, ReviewsDataI } from "@/types/types";
import OpenMap from "@/components/open-map";
import { Button } from "@/components/ui/button";

const BusinessDetailPage = ({ params }: { params: { id: string } }) => {
  const skeletons = [1];

  //slider settings
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    autoPlay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const confetti = useConfetti();
  const [loading, setLoading] = useState(false);
  const [businessData, setBusinessData] = useState<BusinessDataI | null>(null);
  const [reviewsData, setReviewsData] = useState<ReviewsDataI | null>(null);
  const [coords, setCorrds] = useState({
    latitude: "39.7837304",
    longitude: "-100.4458825",
  });

  //Business data fetch
  const fetchBusinessData = async () => {
    setBusinessData(null);
    setLoading(true);
    try {
      const response = await axios.get(`/api/business/${params.id}`);
      const data = await response.data;
      //console.log(data);
      if (data) {
        toast.success("Data fetched successfully!");
        confetti.onOpen();
        setBusinessData(data);
      }
    } catch (error) {
      console.error("[FETCH_ERROR]", error);
      toast.error("Error while fetching data!");
    }
  };

  //Business data review fetch
  //Business data fetch
  const fetchBusinessDataReview = async () => {
    setReviewsData(null);
    setLoading(true);
    try {
      const response = await axios.get(`/api/business/${params.id}/reviews`);
      const data = await response.data;
      //console.log(data);
      if (data) {
        setReviewsData(data);
      }
    } catch (error) {
      console.error("[FETCH_ERROR]", error);
      toast.error("Error while fetching reviews!");
    }
  };

  useEffect(() => {
    fetchBusinessData();
    fetchBusinessDataReview();
  }, []);

  return !businessData ? (
    <div>
      {skeletons.map((item, index) => (
        <Skeleton2 key={index} />
      ))}
    </div>
  ) : (
    <div className="container  flex flex-col   space-y-4 py-2 pb-4">
      <Image
        src={
          businessData?.image_url ? businessData?.image_url : "/placeholder.jpg"
        }
        alt={"business-photo"}
        width={850}
        height={450}
        priority
        className="w-full h-[450px] rounded-lg object-cover"
      />

      <h5 className="text-2xl text-indigo-500">{businessData?.name}</h5>
      <div>
        {businessData?.hours && businessData?.hours[0].is_open_now ? (
          <Badge variant="default">Open</Badge>
        ) : (
          <Badge variant="destructive">Closed</Badge>
        )}
      </div>

      <div className="mt-5 flex flex-col md:flex-row  justify-center gap-4">
        {/* OPEN HOURS */}
        <div className="flex flex-col w-full md:w-1/3 p-8  border bg-white rounded-md">
          <Badge variant="default" className="w-[150px]">
            <Clock4 /> Open Hours
          </Badge>
          {!businessData?.hours ? (
            <p className="mt-[5px] text-slate-500">No open hours available</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-slate-500">Days</TableHead>
                  <TableHead className="text-slate-500">Open Hours</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {businessData?.hours &&
                  businessData?.hours[0].open.map((day, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium text-slate-500">
                        {getDayName(day?.day)}
                      </TableCell>
                      <TableCell className="text-slate-500">
                        {formatTime(day?.start)} - {formatTime(day?.end)}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </div>

        {/* ADDRESS | PHONE | RATING */}
        <div className="h-full flex flex-col w-full md:w-1/3 gap-y-4">
          <div className="flex flex-col p-8  border bg-white rounded-md">
            <Badge variant="default" className="w-[150px]">
              <MapPin /> Address
            </Badge>
            <div className="flex items-center gap-x-2 mt-[5px]">
              <Globe2 className="text-slate-500" />
              <p className="text-slate-500">{businessData?.location.country}</p>
            </div>
            <div className="flex items-center gap-x-2 mt-[5px]">
              <Home className="text-slate-500" />
              <p className="text-slate-500">
                {businessData?.location.address1}, {businessData?.location.city}{" "}
                - {businessData?.location.zip_code}
              </p>
            </div>
          </div>
          <div className="flex flex-col p-8   border bg-white rounded-md ">
            <Badge variant="default" className="w-[150px]">
              <Phone /> Phone
            </Badge>
            {businessData?.display_phone ? (
              <p className="mt-[5px] text-slate-500">
                {businessData?.display_phone}
              </p>
            ) : (
              <p className="mt-[5px] text-slate-500">
                No phone number available
              </p>
            )}
          </div>
          <div className="flex flex-col p-8   border bg-white rounded-md">
            <Badge variant="default" className="w-[150px]">
              <Star /> Rating
            </Badge>
            <Rating
              initialValue={businessData?.rating}
              readonly={true}
              SVGclassName="inline"
              fillColor="text-indigo-500"
              //emptyColor="text-indigo-500"
            />
          </div>
        </div>

        {/* PICTURES | REVIEWS */}
        <div className="h-full flex flex-col  w-full md:w-1/2">
          {/* MAP */}
          <div className=" p-8  border bg-white rounded-md">
            <Badge variant="default" className="w-[150px]">
              <Map /> Map
            </Badge>
            <OpenMap
              lon={businessData?.coordinates.longitude}
              lat={businessData?.coordinates.latitude}
              name={businessData?.name}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-x-4">
        <div className="w-full md:w-1/2 p-8  border bg-white rounded-md">
          <Badge variant="default" className="w-[150px]">
            <GanttChartSquare /> Reviews
          </Badge>
          <div>
            {reviewsData &&
            reviewsData.reviews &&
            reviewsData?.reviews.length <= 1 ? (
              <div className="text-slate-500 mt-[8px]">
                No reviews for this business
              </div>
            ) : (
              <>
                {reviewsData?.reviews.map((review, index) => (
                  <div key={index} className="p-4">
                    <div className="flex items-center gap-x-2">
                      <Avatar>
                        <AvatarImage src={review?.user?.image_url} />
                        <AvatarFallback className="text-slate-500">
                          {review?.user?.name}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-slate-500">{review?.time_created}</p>
                    </div>
                    <Rating
                      initialValue={review?.rating}
                      readonly={true}
                      SVGclassName="text-indigo-500 inline"
                    />
                    <p className="text-slate-500">{review?.text}</p>
                    <Link href={review?.url}>
                      <p className="text-slate-500 mt-[7px] hover:text-slate-700 cursor-pointer">
                        See full review
                      </p>
                    </Link>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        {/* PHOTO */}
        <div className="w-full md:w-1/2 h-auto p-8  border bg-white rounded-md">
          <Badge variant="default" className="w-[150px]">
            <Camera /> Photos
          </Badge>
          <Slider {...settings}>
            {businessData?.photos.map((photo, index) => (
              <div key={index}>
                <Image
                  src={photo ? photo : "/placeholder.jpg"}
                  alt={"business-photo"}
                  width={250}
                  height={330}
                  priority
                  className="w-full h-[330px] rounded-lg object-cover"
                />
              </div>
            ))}
          </Slider>
          {/* HOT LINK */}
          <div className="flex flex-col items-center justify-center pt-8">
            <h2 className="text-slate-500 text-[22px]">
              Do you wish to know more?
            </h2>
            <Link href={businessData?.url}>
              <Button variant="outline">Visit</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetailPage;
