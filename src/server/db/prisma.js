import { PrismaClient } from "@prisma/client";

/**
 * Prisma singleton.
 *
 * In Next.js (especially `next dev`), modules can hot-reload and create many
 * PrismaClient instances. We stash one on `globalThis` in development so we
 * don't exhaust database connections.
 */
const globalForPrisma = globalThis;

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
