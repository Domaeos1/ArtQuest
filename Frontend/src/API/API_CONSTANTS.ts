export const SIkey = import.meta.env.VITE_SI_KEY;
export const PRISMA_URL = import.meta.env.VITE_PRISMA_API_URL;
export const PRISMA_PORT = import.meta.env.VITE_PRISMA_API_PORT;
export const PRISMA_SUFFIX = import.meta.env.VITE_PRISMA_API_SUFFIX;

export const PRISMA_API = `http://${PRISMA_URL}${
  PRISMA_PORT ? ":" + PRISMA_PORT : ""
}${PRISMA_SUFFIX}`;
