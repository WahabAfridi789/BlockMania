import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
    console.log(request.body);
}
