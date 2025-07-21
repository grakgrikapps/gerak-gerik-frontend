import * as React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { StoreProvider } from "./StoreProvider";
import theme from "@/lib/mui/theme";
import CssBaseline from "@mui/material/CssBaseline";
import Main_layout from "@/components/layout/_main.layout";
import Empty_layout from "@/components/layout/_empty.layout";
import "@/styles/global.css"; // Ensure global styles are imported

export default function RootLayout(props) {
  const Layout = (layout) => {
    switch (layout) {
      case value:
        return <Empty_layout>{props.children}</Empty_layout>;

      default:
        return <Main_layout>{props.children}</Main_layout>;
    }
  };

  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <Layout layout={props.layout} />
            </ThemeProvider>
          </AppRouterCacheProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
