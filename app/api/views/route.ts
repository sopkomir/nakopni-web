import { NextResponse } from "next/server";
import { client } from "@/app/lib/sanity";

export async function POST(req: Request) {
  const { id } = await req.json();

  await client
    .patch(id)
    .setIfMissing({ views: 0 })
    .inc({ views: 1 })
    .commit();

  return NextResponse.json({
    success: true,
  });
}