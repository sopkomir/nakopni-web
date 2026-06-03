console.log("TOKEN:", !!process.env.SANITY_API_TOKEN);
import { NextResponse } from "next/server";
import { writeClient } from "@/app/lib/sanity";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    await writeClient
      .patch(id)
      .setIfMissing({ views: 0 })
      .inc({ views: 1 })
      .commit();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}