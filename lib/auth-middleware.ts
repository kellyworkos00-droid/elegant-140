import { NextRequest, NextResponse } from "next/server";
import { verifyToken, extractTokenFromHeader } from "@/lib/jwt";
import { JWTPayload, ROLE_PERMISSIONS } from "@/lib/auth-types";

export interface AuthenticatedRequest extends NextRequest {
  user?: JWTPayload;
}

export class AuthenticationError extends Error {
  constructor(message: string = "Unauthorized") {
    super(message);
    this.name = "AuthenticationError";
  }
}

export class AuthorizationError extends Error {
  constructor(message: string = "Forbidden") {
    super(message);
    this.name = "AuthorizationError";
  }
}

export function authenticateRequest(request: NextRequest): JWTPayload {
  const token = extractTokenFromHeader(request.headers.get("authorization"));

  if (!token) {
    throw new AuthenticationError("No token provided");
  }

  try {
    const user = verifyToken(token);
    return user;
  } catch (error) {
    throw new AuthenticationError("Invalid or expired token");
  }
}

export function requireAuth(request: NextRequest): JWTPayload {
  return authenticateRequest(request);
}

export function requireRole(user: JWTPayload, requiredRoles: string[]): boolean {
  if (user.role === "ADMIN" || user.role === "OWNER") {
    return true;
  }

  return requiredRoles.includes(user.role);
}

export function checkPermission(
  user: JWTPayload,
  permission: string
): boolean {
  const permissions = ROLE_PERMISSIONS[user.role as keyof typeof ROLE_PERMISSIONS];

  if (!permissions) {
    return false;
  }

  if (permissions.includes("*")) {
    return true;
  }

  return permissions.includes(permission);
}

export function withAuth(
  handler: (
    request: NextRequest,
    user: JWTPayload,
    context?: any
  ) => Promise<NextResponse>
) {
  return async (request: NextRequest, context?: any) => {
    try {
      const user = requireAuth(request);
      return await handler(request, user, context);
    } catch (error) {
      if (error instanceof AuthenticationError) {
        return NextResponse.json(
          { error: error.message },
          { status: 401 }
        );
      }
      if (error instanceof AuthorizationError) {
        return NextResponse.json(
          { error: error.message },
          { status: 403 }
        );
      }
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  };
}

export function withRole(
  handler: (
    request: NextRequest,
    user: JWTPayload,
    context?: any
  ) => Promise<NextResponse>,
  allowedRoles: string[]
) {
  return withAuth(async (request, user, context) => {
    if (!requireRole(user, allowedRoles)) {
      throw new AuthorizationError("Insufficient permissions");
    }
    return handler(request, user, context);
  });
}
