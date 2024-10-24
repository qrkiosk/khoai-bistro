import React, { ReactNode } from "react";
import { Provider as JotaiProvider } from "jotai";
import "jotai-devtools/styles.css";
import { useHydrateAtoms } from "jotai/react/utils";
import { queryClientAtom } from "jotai-tanstack-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { App as ZApp, ZMPRouter, SnackbarProvider } from "zmp-ui";

import ConfigProvider from "./ConfigProvider";
import Layout from "./Layout";

const queryClient = new QueryClient();

const HydrateAtoms = ({ children }: { children: ReactNode }) => {
  useHydrateAtoms([[queryClientAtom, queryClient]]);
  return <>{children}</>;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <HydrateAtoms>
          <ChakraProvider>
            <ConfigProvider>
              <ZApp>
                <SnackbarProvider>
                  <ZMPRouter>
                    <Layout />
                  </ZMPRouter>
                </SnackbarProvider>
              </ZApp>
            </ConfigProvider>
          </ChakraProvider>
        </HydrateAtoms>
      </JotaiProvider>
    </QueryClientProvider>
  );
};

export default App;
