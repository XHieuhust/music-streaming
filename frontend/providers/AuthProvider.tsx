"use client";

import { SessionProvider } from "next-auth/react";

interface NextAuthProviderProps {
  children: React.ReactNode;
}

export const NextAuthProvider: React.FC<NextAuthProviderProps> = ({
  children,
}) => {
  return <SessionProvider>{children}</SessionProvider>;
};
