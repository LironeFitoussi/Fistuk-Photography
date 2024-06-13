import styles from "./Navbar.module.css";
import { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Theme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import LogoutButton from "../components/Auth/LogoutButton";
import LoginButton from "../components/Auth/LoginButton";

interface MenuItem {
  name: string;
  link: string;
}

export default function Navbar() {
  const { isAuthenticated, user } = useAuth0();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const theme: Theme = useTheme();
  const isDesktop: boolean = useMediaQuery(theme.breakpoints.up("md"));

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems: MenuItem[] = [
    { name: "Home", link: "/" },
    { name: "Photography", link: "/photography" },
    { name: "Development", link: "/development" },
    // Check VITE_MODE and if development, add the following menu items
    ...(user?.nickname === "LironeFitoussi"
      ? [
          { name: "Admin", link: "/admin" },
          { name: "Upload", link: "/admin/upload" },
          { name: "Collections", link: "/admin/collections" },
          { name: "Albums", link: "/admin/albums" },
        ]
      : []),
  ];

  const drawer = (
    <Drawer
      anchor="left"
      open={isMenuOpen}
      onClose={toggleMenu}
      PaperProps={{ sx: { width: "50%" } }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <img
          className={styles.mainLogo}
          src="/light-logo.png"
          alt="Lirone Fitoussi Development"
        />
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem
            component={Link}
            to={item.link}
            onClick={toggleMenu} // Close menu on item click
            key={item.name}
          >
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
      <div>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</div>
    </Drawer>
  );

  return (
    <Box
      sx={{
        flexGrow: 1,
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#fff",
          color: "black",
          boxShadow: "none",
          transition: "background-color 0.3s ease-in-out", // Add transition to background-color
        }}
      >
        <Toolbar>
          {!isDesktop && (
            <IconButton
              sx={{
                position: "absolute",
                mr: 2,
                color: "#000",
              }}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleMenu}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            component="div"
            align="center"
            sx={{ flexGrow: 1 }}
          >
            <img
              className={styles.mainLogo}
              src="/light-logo.png"
              alt="Lirone Fitoussi Development"
            />
          </Typography>
          {isDesktop && (
            <>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {menuItems.map((item) => (
                  <Typography
                    key={item.name}
                    variant="h6"
                    component={Link}
                    to={item.link}
                    sx={{ marginRight: 4, textDecoration: "none", color: "inherit" }}
                  >
                    {item.name}
                  </Typography>
                ))}
              </Box>
              <div>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</div>
            </>
          )}
        </Toolbar>
      </AppBar>
      {!isDesktop && drawer}
    </Box>
  );
}
