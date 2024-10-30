import React from "react";
import { Provider as JotaiProvider } from "jotai";
import { useHydrateAtoms } from "jotai/react/utils";
import { queryClientAtom } from "jotai-tanstack-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { App as ZApp, ZMPRouter } from "zmp-ui";

import ConfigProvider from "./ConfigProvider";
import Layout from "./Layout";

const queryClient = new QueryClient();

const HydrateAtoms = ({ children }: { children: React.ReactNode }) => {
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
                <ZMPRouter>
                  <Layout />
                </ZMPRouter>
              </ZApp>
            </ConfigProvider>
          </ChakraProvider>
        </HydrateAtoms>
      </JotaiProvider>
    </QueryClientProvider>
  );
};

export default App;
