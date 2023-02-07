import { PrismaClient } from "@prisma/client";

declare global {
  namespace NodeJS {
    interface Global {}
  }
}
interface CustomNodeJsGlobal extends NodeJS.Global {
  prisma: PrismaClient;
}

let prisma: PrismaClient;
declare const global: CustomNodeJsGlobal;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
