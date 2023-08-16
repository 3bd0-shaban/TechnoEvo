"use client";

import React from "react";
import { QueryClientProvider, QueryClient, Hydrate } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { useDehydratedState } from 'use-dehydrated-state'

function Providers({ children }: React.PropsWithChildren) {
    const [client] = React.useState(new QueryClient());
    // const dehydratedState = useDehydratedState()

    return (
        <QueryClientProvider client={client}>
            {/* <Hydrate state={dehydratedState}> */}
            {children}
            {/* </Hydrate> */}

            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default Providers;