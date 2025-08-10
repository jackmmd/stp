import { PrismaClient } from "@prisma/client";
import { enviroment } from "./enviroment";

declare global {
    var prisma: PrismaClient | undefined;
}

const prisma: PrismaClient = globalThis.prisma || new PrismaClient();

if (enviroment.nodeEnv === "development") {
    globalThis.prisma = prisma; // En desarrollo, usamos una única instancia global
}
export default prisma;