'use client';

import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
// import { useDehydratedState } from 'use-dehydrated-state'

function Providers({ children }: React.PropsWithChildren) {
  const [client] = React.useState(new QueryClient());
  // const dehydratedState = useDehydratedState()

  return (
    <QueryClientProvider client={client}>
      {/* <Hydrate state={dehydratedState}> */}
      {children}
      {/* </Hydrate> */}
    </QueryClientProvider>
  );
}

export default Providers;
