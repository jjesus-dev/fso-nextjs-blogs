import { getUserFromToken } from "@/app/services/users";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const headersList = new Headers(request.headers);
  const bearerToken = headersList.get("Authorization");

  if (!bearerToken || bearerToken === "") {
    return NextResponse.json({ error: "Empty Token" }, { status: 400 });
  }

  const tokenParts = bearerToken.split(" ");

  if (tokenParts.length !== 2) {
    return NextResponse.json({ error: "Malformed Token" }, { status: 400 });
  }

  const user = await getUserFromToken(tokenParts[1]);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(user);
}
