import * as React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { StoreProvider } from "./StoreProvider";
import theme from "@/lib/mui/theme";
import CssBaseline from "@mui/material/CssBaseline";
import "@/styles/global.css"; // Ensure global styles are imported

export default function RootLayout(props) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              {props.children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
