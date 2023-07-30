import { SessionProvider, SessionProviderProps } from "next-auth/react";
import { AppProps } from "next/app";
import "../styles/global-styles.css";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import RootLayout from "@/components/layouts/RootLayout";

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
          <RootLayout>
            <Component {...pageProps} />
          </RootLayout>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
};

export default App;
