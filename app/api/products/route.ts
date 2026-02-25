import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { withAuth } from "@/lib/auth-middleware";
import { JWTPayload } from "@/lib/auth-types";

export const GET = withAuth(
  async (request: NextRequest, user: JWTPayload) => {
    try {
      const products = await prisma.products.findMany({
        take: 100,
        orderBy: { createdAt: "desc" },
      });

      return NextResponse.json({
        products,
        total: products.length,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      return NextResponse.json(
        { error: "Failed to fetch products" },
        { status: 500 }
      );
    }
  }
);
