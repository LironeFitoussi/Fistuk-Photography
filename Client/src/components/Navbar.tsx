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

  // console.log(user);

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  // const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const theme: Theme = useTheme();
  const isDesktop: boolean = useMediaQuery(theme.breakpoints.up("md")); // 'md' breakpoint typically starts at 768px

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (): void => {
    setIsMenuOpen(false); // Close the menu when any menu item is clicked
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
          src={"/light-logo.png"}
          alt="Lirone Fitoussi Development"
        />
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            component={Link}
            to={item.link}
            onClick={handleMenuItemClick}
            key={item.name}
          >
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
      <div>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</div>

    </Drawer>
  );

  const desktopMenu = (
    <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}>
      {menuItems.map((item) => (
        <Typography
          key={item.name}
          variant="h6"
          component={Link}
          to={item.link}
          sx={{ marginRight: 4, textDecoration: "none", color: "inherit" }}
          onClick={handleMenuItemClick}
        >
          {item.name}
        </Typography>
      ))}
    </Box>
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
              {desktopMenu}
              <div>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</div>
            </>
          )}
        </Toolbar>
      </AppBar>
      {!isDesktop && drawer}
    </Box>
  );
}
