import prisma from "./prismaClient";

export const createContext = () => {
  return {
    prisma,
  };
};
