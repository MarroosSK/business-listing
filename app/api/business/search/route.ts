export const dynamic = "force-dynamic";

import axios from "axios";
import { NextResponse } from "next/server";

const API_KEY = process.env.YELP_API_KEY;
const options = {
  method: "GET",
  headers: { Authorization: `Bearer ${API_KEY}`, accept: "application/json" },
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("location");
    const term = searchParams.get("term");
    const response = await axios.get(
      `https://api.yelp.com/v3/businesses/search?location=${q}&term=${term}&limit=50`,
      options
    );
    const data = await response.data;

    //console.log(data.businesses);
    const responseData = JSON.stringify(data.businesses);

    return new NextResponse(responseData, { status: 200 });
  } catch (error) {
    console.error("[FETCH_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
