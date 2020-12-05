import { AppProps } from "next/app";
import { ChakraProvider, CSSReset, Box } from "@chakra-ui/react";
import { PaymmentProvider } from "../context/payment-context";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider  >
      <title>Stripe Payments</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <link rel="shortcut icon" href="/favicon.png" key="shortcutIcon" />
      <Box marginX="auto" width={600} p={4}>
        <PaymmentProvider>
          <Component {...pageProps} />
        </PaymmentProvider>
      </Box>
    </ChakraProvider>
  );
};

export default App;
