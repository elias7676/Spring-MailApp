import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import BadgeIcon from "@mui/icons-material/Badge";
import PeopleIcon from "@mui/icons-material/People";
import SummarizeIcon from "@mui/icons-material/Summarize";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LogoutIcon from "@mui/icons-material/Logout";
import StarBorder from "@mui/icons-material/StarBorder";
import GroupsIcon from "@mui/icons-material/Groups";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import {Stack} from "@mui/material";
import { logout } from "../../features/auth/authSlice";
import ListItemLink from "../ListItemLink";
import { useLocation } from "react-router-dom";
import {
  AccountTree,
  AddToPhotos,
  Assessment,
  BarChart,
  CallSplit,
  CreditCard,
  Diversity3,
  Mediation,
  MenuBook,
  Payment,
  Percent,
  PersonAddAlt1,
  Rule,
  Scoreboard,
  Sms,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";

const drawerWidth = 220;

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

const StyledListItemLink = styled(ListItemLink)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light),
  },
  "&.active": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.getContrastText(theme.palette.primary.main),
  },
}));


const Drawer = styled(Box, {
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


export default function SideBar({
  openDrawer,
  DrawerHeader,
  handleDrawerClose,
}) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [openServiceList, setOpenServiceList] = useState(false);
  const [openReportsList, setOpenReportsList] = useState(false);
  const { pathname } = useLocation();

  return (
    <Drawer variant="permanent"   open={openDrawer}>
      <DrawerHeader>
      <Stack sx={{minHeight: 150, }}>

      <IconButton 
        onClick={handleDrawerClose} 
        sx={{position: 'absolute', top: 0, right: 0}}
      >
        {theme.direction === "rtl" ? (
          <ChevronRightIcon />
        ) : (
          <ChevronLeftIcon />
        )}
      </IconButton>
    </Stack>
      </DrawerHeader>
      <Divider />
      <List>
        {user && (
          <ListItemLink to="/" primary="Dashboard" icon={<DashboardIcon style={{ color: "#32BA86" }} />} />
        )}

        {/* <ListItemButton onClick={() => setOpenServiceList(!openServiceList)}>
          <ListItemIcon>
            <Tooltip title={"Services"}>
              <DesignServicesIcon />
            </Tooltip>
          </ListItemIcon>
          <ListItemText primary="Services" />
          {openServiceList ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton> */}
        <Collapse in={openServiceList} timeout="auto" unmountOnExit>
        </Collapse>
        <ListItemLink to="/departments" primary="Departments" icon={<MenuBookIcon style={{ color: "#32BA86" }} />} className={pathname === "/departments" ? "active" : ""} />
          <ListItemLink to="/users" primary="Users" icon={< GroupsIcon style={{ color: "#32BA86" }}/>} />
          <ListItemLink to="/roles" primary="Roles" icon={<PeopleIcon style={{ color: "#32BA86" }} />} />
          {user?.authorities?.some(auth => auth?.authority == "employee.read") &&(
          <ListItemLink
                to="/employees"
                primary="Employee"
                icon={<BadgeIcon style={{ color: "#32BA86" }} />}
                // isPaddingLeft={true}
              />
              )}
          <ListItemLink to="/permissions" primary="Permissions" icon={<VpnKeyIcon style={{ color: "#32BA86" }} />} />
          <ListItemLink to="/documentation" primary="Documentation" icon={<DocumentScannerIcon style={{ color: "#32BA86" }} />} />


        <Divider />
          {/* <ListItemLink
            to="/settings"
            primary="Settings"
            icon={<SettingsIcon />}
          /> */}

        <ListItemButton onClick={() => dispatch(logout())}>
          <ListItemIcon>
            <Tooltip title="Logout">
              <LogoutIcon style={{ color: "#32BA86" }} />
            </Tooltip>
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
