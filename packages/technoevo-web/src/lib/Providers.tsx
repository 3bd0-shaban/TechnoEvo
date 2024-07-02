'use client';

import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import { Session } from 'next-auth';

function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  const [client] = React.useState(new QueryClient());

  return (
    <QueryClientProvider client={client}>
      <AuthProvider session={session}>{children}</AuthProvider>
    </QueryClientProvider>
  );
}

export default Providers;
