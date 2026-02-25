import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { withAuth } from "@/lib/auth-middleware";
import { JWTPayload } from "@/lib/auth-types";

export const GET = withAuth(
  async (request: NextRequest, user: JWTPayload) => {
    try {
      const invoices = await prisma.invoices.findMany({
        take: 50,
        include: {
          customers: true,
        },
        orderBy: { createdAt: "desc" },
      });

      return NextResponse.json({
        invoices,
        total: invoices.length,
      });
    } catch (error) {
      console.error("Error fetching invoices:", error);
      return NextResponse.json(
        { error: "Failed to fetch invoices" },
        { status: 500 }
      );
    }
  }
);
