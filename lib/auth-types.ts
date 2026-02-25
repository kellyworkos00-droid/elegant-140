export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
}

export interface AuthContext {
  user: JWTPayload | null;
  isAuthenticated: boolean;
}

export type UserRole =
  | "ADMIN"
  | "OWNER"
  | "MANAGER"
  | "SALES"
  | "ACCOUNTANT"
  | "STOREKEEPER"
  | "VIEWER";

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  ADMIN: ["*"],
  OWNER: ["*"],
  MANAGER: [
    "dashboard:view",
    "inventory:manage",
    "sales:manage",
    "customers:view",
    "reports:view",
    "expenses:view",
  ],
  SALES: ["sales:create", "invoices:create", "receipts:print", "payments:record"],
  ACCOUNTANT: [
    "accounting:view",
    "accounting:manage",
    "reports:generate",
    "payments:view",
  ],
  STOREKEEPER: [
    "inventory:view",
    "inventory:manage",
    "stock:adjust",
    "transfers:manage",
  ],
  VIEWER: ["dashboard:view", "reports:view"],
};
