import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { withAuth } from "@/lib/auth-middleware";
import { JWTPayload } from "@/lib/auth-types";

export const GET = withAuth(
  async (request: NextRequest, user: JWTPayload) => {
    try {
      const customers = await prisma.customers.findMany({
        take: 50,
        orderBy: { createdAt: "desc" },
      });

      return NextResponse.json({
        customers,
        total: customers.length,
      });
    } catch (error) {
      console.error("Error fetching customers:", error);
      return NextResponse.json(
        { error: "Failed to fetch customers" },
        { status: 500 }
      );
    }
  }
);
