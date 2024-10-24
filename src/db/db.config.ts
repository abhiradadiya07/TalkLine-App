import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({
    log: ['query', 'info', 'warn', 'error'], // This will log all queries and errors
});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;



// datasource db {
//     provider = "postgresql"
//     url = env("POSTGRES_PRISMA_URL") 
//     directUrl = env("POSTGRES_URL_NON_POOLING")
//   }