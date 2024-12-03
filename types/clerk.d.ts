import { User } from "@clerk/nextjs/server";

declare module "@clerk/nextjs/server" {
  interface RequestAuth {
    userId: string | null;
    user?: User | null;
    sessionId: string | null;
    session?: Session | null;
    orgId: string | null;
    organization?: Organization | null;
    actor?: Actor | null;
  }

  interface NextRequestWithAuth extends Request {
    auth: RequestAuth;
  }
} 