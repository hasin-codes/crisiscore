import { clerkClient } from "@clerk/clerk-sdk-node";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const users = await clerkClient.users.getUserList();
    // ... rest of the handler
  } catch (error) {
    // ... error handling
  }
}