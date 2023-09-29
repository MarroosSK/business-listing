import axios from "axios";
import { NextResponse } from "next/server";

const API_KEY = process.env.YELP_API_KEY;
const options = {
  method: "GET",
  headers: { Authorization: `Bearer ${API_KEY}`, accept: "application/json" },
};

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const response = await axios.get(
      `https://api.yelp.com/v3/businesses/${id}/reviews?limit=5&sort_by=newest`,
      options
    );
    const data = await response.data;

    console.log(data);
    const responseData = JSON.stringify(data);

    return new NextResponse(responseData, { status: 200 });
  } catch (error) {
    console.error("[FETCH_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
