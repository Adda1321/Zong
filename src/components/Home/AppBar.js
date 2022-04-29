import * as React from "react";
import "../../App.css";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MailIcon from "@mui/icons-material/Mail";
import ExtensionIcon from "@mui/icons-material/Extension";
import CallIcon from "@mui/icons-material/Call";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import QueueIcon from "@mui/icons-material/Queue";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import ForumIcon from "@mui/icons-material/Forum";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CampaignIcon from "@mui/icons-material/Campaign";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import InputLabel from "@mui/material/InputLabel";
import FlagIcon from "../FactoryIcon";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Adda from "../../Adda.PNG";
const drawerWidth = 240;

const pages = ["Analytics", "Communication Records", "03248562947"];
const settings = [
  { name: "Edit Profile", icon: <ManageAccountsIcon /> },
  { name: "Upload Logo", icon: <FileUploadOutlinedIcon /> },
  { name: "Logout", icon: <LogoutOutlinedIcon /> },
];

const flag = {
  // marginRight:100
};
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  // zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer(props) {
  const theme = useTheme();

  const Theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: "#8dc63f",
      },
      secondary: {
        // This is green.A700 as hex.
        main: "#11cb5f",
      },
    },
  });

  const [open, setOpen] = React.useState(false);
  const [over, setOver] = React.useState(false);
  const [path, setPath] = React.useState("/");
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [age, setAge] = React.useState(10);


  React.useEffect(() => {
    JSON.parse(window.localStorage.getItem('age'))? setAge(JSON.parse(window.localStorage.getItem('age'))) : setAge(10)
    console.log('check' , JSON.parse(window.localStorage.getItem('age')))
    // window.localStorage.clear();
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem('age', age);
  }, [age]);


  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const samplefunc = (path) => {
    setPath(path);
  };
  let buttonstyle = {
    backgroundColor: "yellow",
  };

  if (over) {
    buttonstyle.backgroundColor = "green";
  } else {
    buttonstyle.backgroundColor = "";
  }

  return (
    <ThemeProvider theme={Theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <AppBar position="fixed" open={open} color={"primary"}>
          <Toolbar>
            {open ? (
              <IconButton onClick={handleDrawerClose} sx={{ ml: -2 }}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            ) : (
              <>
                <IconButton
                  // color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{
                    ml: 6,
                    color: "#fff",
                    // marginRight: 5,
                    // ...(open && { display: 'none' }),
                  }}
                >
                  <MenuIcon />
                </IconButton>
              </>
            )}

            <Box
              noWrap
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            >
              {pages.map((page) => (
                <>
                  <Button
                    className=" btn btn-start"
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{
                      mx: 0.5,
                      color: "white",
                      height: "60px",
                      display: "block",
                      backgroundColor: "",
                    }}
                  >
                    {page}
                  </Button>
                </>
              ))}
            </Box>
            <Box>
              <FormControl fullWidth sx={{ mr: 6 }}>
                <InputLabel id="demo-simple-select-label">
                  Select Language
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="SAMA Language"
                  size="small"
                  onChange={handleChange}
                  sx={{
                    textAlign: "initial",
                    fontSize: "15px",
                    color: "white",
                    mr: 3,
                  }}
                >
                  <MenuItem value={10}>
                    <FlagIcon code={"cn"} size={"lg"} className={flag} />
                    <span style={{ marginLeft: 5 }}>Chinese</span>
                  </MenuItem>
                  <MenuItem value={20}>
                    <FlagIcon code={"gb"} size={"lg"} />
                    <span style={{ marginLeft: 5 }}>English</span>
                  </MenuItem>
                  <MenuItem value={30}>
                    <FlagIcon code={"de"} size={"lg"} />
                    <span style={{ marginLeft: 5 }}>German</span>
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={Adda} />
                </IconButton>
              </Tooltip>
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
                {settings.map((setting) => (
                  <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                    <IconButton
                      sx={{ color: "#8dc63f" }}
                      disableFocusRipple
                      disableTouchRipple
                      disableRipple
                    >
                      {setting.icon}
                    </IconButton>
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader
            className={`sidebar  ${
              path === "/" ? "btn-sidebarSec" : "btn-sidebar"
            } `}
          >
            <Link to="/" style={{ color: "black", textDecoration: "none" }}>
              <span
                onClick={() => (setPath(""), setOpen(false), samplefunc("/"))}
              >
                <img
                  style={
                    open
                      ? { marginRight: 70, marginBottom: 10 }
                      : {
                          marginRight: 0,
                          width: 53,
                          height: 43,
                          marginBottom: 10,
                        }
                  }
                  src="	http://zong-cap.com.pk/assets/images/logo/product-logo.png"
                  alt="BigCo Inc. logo"
                />
              </span>
            </Link>
            {/* <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton> */}
          </DrawerHeader>
          <Divider />
          <List>
            {[
              { name: "Extension", icon: <ExtensionIcon />, path: "extension" },
              { name: "Call", icon: <CallIcon />, path: "call" },
              { name: "IVR", icon: <PlayCircleOutlineIcon />, path: "IVR" },
              { name: "Queue", icon: <QueueIcon />, path: "Queue" },
              {
                name: "System Sounds",
                icon: <VolumeDownIcon />,
                path: "systemsounds",
              },
              {
                name: "MOH Classes",
                icon: <MusicNoteIcon />,
                path: "MOHClass",
              },
              {
                name: "Announcements",
                icon: <CampaignIcon />,
                path: "announcement",
              },
              {
                name: "Timing Conditions",
                icon: <CalendarTodayIcon />,
                path: "Timing",
              },
              { name: "Voice Mail", icon: <HeadphonesIcon />, path: "Vmail" },
              { name: "Call Messages", icon: <ForumIcon />, path: "messages" },
            ].map((text, index) => (
              <Tooltip title={text.name} placement="right-start">
                <Link
                  to={text.path}
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <ListItemButton
                    className={`sidebar  ${
                      text.path === path ? "btn-sidebarSec" : "btn-sidebar"
                    } `}
                    key={text.name}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      py: 1.2,
                      // color:'#8dc63f'
                    }}
                    onClick={() => samplefunc(text.path)}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        color: "#8dc63f",
                      }}
                    >
                      {text.icon}

                      {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                    </ListItemIcon>
                    <ListItemText
                      primary={text.name}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </Link>
              </Tooltip>
            ))}
          </List>
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 5 }}>
          {props.children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
