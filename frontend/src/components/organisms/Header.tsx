import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import Image from "components/atoms/Image";

const Header = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Image
            src={`${process.env.PUBLIC_URL}/logo.svg`}
            alt="logo"
            loading="lazy"
            sx={{ display: { xs: "none", md: "flex" }, mr: 1, width: 40 }}
          />

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            fontWeight={700}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CAFE SWAP
          </Typography>

          {/* Mobile Header */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Image
              src={`${process.env.PUBLIC_URL}/logo.svg`}
              alt="logo"
              loading="lazy"
              sx={{ display: { xs: "flex", md: "none" }, mr: 1, width: 40 }}
            />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Connect Wallet">
              <Button variant="contained" color="primary" type="button">
                Connect Wallet
              </Button>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={false}
            ></Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
