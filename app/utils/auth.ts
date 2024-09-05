import { clerkClient } from "@clerk/nextjs/server";

// ... existing code ...

// Wrap the async operation in a function
async function getUser(userId: string) {
  // Use clerkClient as a function
  const user = await clerkClient().users.getUser(userId);
  return user;
}

// Export the function for use in other parts of your application
export { getUser };

// ... rest of the code ...