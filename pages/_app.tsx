import { AppProps } from "next/app";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { Box } from "@chakra-ui/core";
import { PaymmentProvider } from "../context/payment-context";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider>
      <CSSReset />
      <Box marginX="auto" width={600}>
        <PaymmentProvider>
          <Component {...pageProps} />
        </PaymmentProvider>
      </Box>
    </ThemeProvider>
  );
};

export default App;
