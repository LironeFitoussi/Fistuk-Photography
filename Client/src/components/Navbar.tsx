import { useState } from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme, Theme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

interface MenuItem {
  name: string;
  link: string;
}

export default function ButtonAppBar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const theme: Theme = useTheme();
  const isDesktop: boolean = useMediaQuery(theme.breakpoints.up('md')); // 'md' breakpoint typically starts at 768px

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (): void => {
    setIsMenuOpen(false); // Close the menu when any menu item is clicked
  };

  const menuItems: MenuItem[] = [
    { name: "Home", link: "/" },
    { name: "Admin", link: "/admin" }
  ];

  const drawer = (
    <Drawer
      anchor="left"
      open={isMenuOpen}
      onClose={toggleMenu}
      PaperProps={{ sx: { width: "50%" } }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem button component={Link} to={item.link} onClick={handleMenuItemClick} key={item.name}>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );

  const desktopMenu = (
    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
      {menuItems.map((item) => (
        <Typography
          key={item.name}
          variant="h6"
          component={Link}
          to={item.link}
          sx={{ marginRight: 4, textDecoration: 'none', color: 'inherit' }}
          onClick={handleMenuItemClick}
        >
          {item.name}
        </Typography>
      ))}
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black' }}>
        <Toolbar>
          {!isDesktop && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleMenu}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" align='center' sx={{ flexGrow: 1 }}>
            Lirone Fitoussi Photography
          </Typography>
          {isDesktop && desktopMenu}
        </Toolbar>
      </AppBar>
      {!isDesktop && drawer}
    </Box>
  );
}
