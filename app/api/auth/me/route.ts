import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/auth-middleware";
import { JWTPayload } from "@/lib/auth-types";

export const GET = withAuth(
  async (request: NextRequest, user: JWTPayload) => {
    return NextResponse.json({
      user: {
        id: user.userId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });
  }
);
