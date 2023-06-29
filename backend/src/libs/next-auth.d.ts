import "next-auth";

/**
 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
 */
declare module "next-auth" {
  interface Session {
    user: User;
  }

  interface User {
    id: string;
    username: string;
  }
}
