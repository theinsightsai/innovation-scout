"use client";
import * as React from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Toolbar,
  Tooltip,
  Avatar,
  Menu,
  Badge,
  MenuItem,
} from "@mui/material";
import { IMAGES, ROUTE } from "@/constants";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import UploadIcon from "@mui/icons-material/Upload";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import PrintIcon from "@mui/icons-material/Print";
import MailIcon from "@mui/icons-material/Mail";
import GroupIcon from '@mui/icons-material/Group';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { toast } from "react-toastify";


import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
// import { Profile } from "..";
  
const drawerWidth = 240;

const SIDE_BAR_MENU = [
  { label: "Home", route: ROUTE.DASHBOARD, icon: <HomeIcon /> },
  { label: "Upload Data", route: ROUTE.UPLOAD_DATA, icon: <UploadIcon /> },
  { label: "Run Analysis", route: ROUTE.ANALYSIS, icon: <AnalyticsIcon /> },
  { label: "Results", route: ROUTE.RESULTS, icon: <PrintIcon /> },
  { label: "User Management", route: ROUTE.USER_MANAGEMENT, icon: <GroupIcon /> },
  { label: "Team Management", route: ROUTE.TEAM_MANAGEMENT, icon: < Diversity3Icon /> },
];


const SETTING_MENU = [
  { label: "Profile", identifier: "PROFILE", route: "" },
  { label: "Account", identifier: "ACCOUNT", route: "" },
  { label: "Dashboard", identifier: "DASHBOARD", route: ROUTE.DASHBOARD },
  { label: "Logout", identifier: "LOGOUT", route: ROUTE.LOGIN },
];

export default function SideBar() {
  const router = useRouter();
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onMenuClick = (event, identifier, route) => {
    if (identifier === "LOGOUT") {
      toast.success("Logout successfuly");
      router.push(route);
    } else {
      router.push(route);
    }
  };

  const drawer = (
    <div>
      <div className="py-4 flex justify-center">
        <img src={IMAGES.LOGO} style={{ width: "70%" }} />
      </div>
      <Divider />
      <List>
        {SIDE_BAR_MENU.map((menuObj, index) => (
          <ListItem
            key={`${menuObj?.label}-${index}`}
            disablePadding
            sx={{
              background: pathname === menuObj.route && "#005B96",
              color: pathname === menuObj.route && "white",
              borderRadius: "0px 15px 15px 0px",
            }}
          >
            <ListItemButton>
              <Link href={menuObj.route} className="w-full flex">
                <ListItemIcon
                  sx={{ color: pathname === menuObj.route ? "white" : "black" }}
                >
                  {menuObj?.icon}
                </ListItemIcon>
                <div>{menuObj?.label}</div>
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        style={{ background: "#005B96" }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: {
              xs: "space-between",
              sm: "space-between",
              md: "flex-end",
            },
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 0 }}>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {SETTING_MENU.map((setting, index) => (
                <MenuItem
                  key={`${setting}-${index}`}
                  onClick={(event) =>
                    onMenuClick(event, setting.identifier, setting.route)
                  }
                >
                  <div className="font-outfit">{setting.label}</div>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Tooltip title="Notification">
            <Badge
              badgeContent={4}
              color="primary"
              className="mr-7 cursor-pointer"
            >
              <MailIcon color="action" sx={{ color: "white" }} />
            </Badge>
          </Tooltip>

          <Tooltip title="Open settings">
            {/* <Profile /> */}
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
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
          <div className="h-screen border-r-4 border-[#005B96]">{drawer}</div>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
