import { ReactNode } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "components/organisms/Header";

import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#045F40",
    },
  },
  typography: {
    fontFamily: ["Mukta Mahee", "sans-serif"].join(","),
  },
});

const Layout = ({ children }: { children?: ReactNode }) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {/* header */}
      <Header />
      {/* body */}
      <Box>{children}</Box>
    </ThemeProvider>
  );
};

export default Layout;
