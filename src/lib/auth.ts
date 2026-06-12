import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import { bearer } from "better-auth/plugins";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    additionalFields: {
      username: {
        type: "string",
        required: true,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  plugins: [bearer()],
  trustedOrigins: [process.env.BETTER_AUTH_URL!,],
});
