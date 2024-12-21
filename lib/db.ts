import { PrismaClient } from "@prisma/client";

// Add a global variable to store the PrismaClient instance
const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query", "info", "warn", "error"], // Optional logging
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db; // Store instance globally in non-production
}
