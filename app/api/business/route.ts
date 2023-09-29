import axios from "axios";
import { NextResponse } from "next/server";

const API_KEY = process.env.YELP_API_KEY;
const options = {
  method: "GET",
  headers: { Authorization: `Bearer ${API_KEY}`, accept: "application/json" },
};

export async function fetchData() {
  try {
    const response = await axios.get(
      `https://api.yelp.com/v3/businesses/search?location=California&term=starbucks&categories=&sort_by=best_match&limit=3`,
      options
    );
    const data = await response.data;

    //console.log(data.businesses);
    const responseData = JSON.stringify(data.businesses);
    return responseData;
  } catch (error) {
    console.error("[FETCH_ERROR", error);
  }
}

export async function GET(req: Request) {
  try {
    const yelpData = await fetchData();
    return new NextResponse(yelpData, { status: 200 });
  } catch (error) {
    console.error("[FETCH_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
