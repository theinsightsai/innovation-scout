"use client";
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { IMAGES, ROUTE } from "@/constants";
import Link from "next/link";

const NAVBAR_MENU = [
  { label: "Register", route: ROUTE.REGISTER },
  { label: "Login", route: ROUTE.LOGIN },
];

const drawerWidth = 240;

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const mobileDrawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        height: "100vh",
        borderRight: "5px solid #005B96",
      }}
    >
      <Typography
        variant="h6"
        component="div"
        sx={{
          flexGrow: 1,
          display: { xs: "flex", sm: "none" },
          justifyContent: "center",
        }}
      >
        <img
          src={IMAGES.LOGO}
          alt="insight-ai"
          style={{
            width: "70%",
            padding: "20px 0px",
          }}
        />
      </Typography>
      <Divider />
      <List>
        {NAVBAR_MENU.map((menuObj, i) => (
          <Link href={menuObj.route} key={`${menuObj.label}-${i}`}>
            <ListItem disablePadding>
              <ListItemButton>
                <div style={{ fontFamily: "Outfit, sans-serif" }}>
                  {menuObj.label}
                </div>
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        component="nav"
        style={{
          background: "white",
          padding: "5px 0px ",
          transition: "transform 1s ease-in-out",
          transform: isVisible ? "translateY(0)" : "translateY(-100%)",
        }}
        position="fixed"
        className={`transition-all duration-700 ease-out transform ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "flex", sm: "none" },
            }}
          >
            <img src={IMAGES.LOGO} alt="insight-ai" style={{ width: "50%" }} />
          </Typography>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              display: { sm: "none" },
              color: "#005B96",
              justifyContent: "end",
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
            }}
          >
            <img src={IMAGES.LOGO} alt="insight-ai" style={{ width: "12%" }} />
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {NAVBAR_MENU.map((menuObj, i, arr) => {
              return (
                <Link
                  key={`${menuObj.label}-${i}`}
                  href={menuObj.route}
                  className="text-black font-medium cursor-pointer hover:text-[#005B96] mr-5"
                >
                  {menuObj.label}
                </Link>
              );
            })}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {mobileDrawer}
        </Drawer>
      </nav>
    </Box>
  );
};
export default Navbar;
