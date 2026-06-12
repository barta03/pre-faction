import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getCurrentUser(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers:  await headers(),
      
    });
    // console.log("SESSION DEBUG:", session);
    if (!session?.user) return null;
    return session.user;
  } catch (e) {
    return null;
  }
}
