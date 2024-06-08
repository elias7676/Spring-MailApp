import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MailIcon from "@mui/icons-material/Mail";
import AccountCircle from "@mui/icons-material/AccountCircle";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import {
  useGetNotificationsQuery,
  useGetConversationsforChatQuery,
  useGetUsersforChatQuery,
} from "../../features/api/apiSlice";
import NotificationPopover from "../NotificationPopover";
import { useState } from "react";
import { Notifications } from "@mui/icons-material";
import { useEffect } from "react";

const drawerWidth = 220;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
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

export default function NavBar({ openDrawer, handleDrawerOpen }) {
  const { user } = useSelector((state) => state.auth);

  const { data: Users, isLoading: usersLoading } = useGetUsersforChatQuery(
    user?.userId,
    { pollingInterval: 2000 } 
  );


  const { data: notificationData, isLoading: notificationDataLoading } =
    useGetNotificationsQuery(
      { userId: user?.userId },
      { pollingInterval: 60000 }
    );


  // count of all conversations where conversations.readTime is null


  const [anchorEl, setAnchorEl] = useState(null);
  const [msgNotifications, setMsgNotifications] = useState({
    count: 0,
    notifications: [],
  });
  const [otherNotifications, setOtherNotifications] = useState({
    count: 0,
    notifications: [],
  });

  useEffect(() => {
    if (notificationData) {
      setMsgNotifications({
        count: notificationData?.filter((obj) => obj?.type === "Message")
          ?.length,
        notifications: notificationData?.filter(
          (obj) => obj?.type === "Message"
        ),
      });

      setOtherNotifications({
        count: notificationData?.filter((obj) => obj?.type !== "Message")
          ?.length,
        notifications: notificationData?.filter(
          (obj) => obj?.type !== "Message"
        ),
      });
    }
  }, [notificationData]);

  return (
    <AppBar 
      sx={{
        bgcolor: "#32BA86",
        boxShadow: "none",

      }}
    position="fixed" open={openDrawer}>
      <Toolbar>
        <IconButton
          color="secondary"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(openDrawer && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        {/* <Typography variant="h6" noWrap component="div">
          Office Mail
        </Typography> */}
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <IconButton
            size="large"
            color="secondary"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <Badge badgeContent={otherNotifications.count} color="error">
              <Notifications  />
            </Badge>
          </IconButton>
          <NotificationPopover
          
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            notifications={otherNotifications?.notifications}
            notificationDataLoading={notificationDataLoading}
          />
          <Link
            to="/messages"
            style={{ color: "secondary", textDecoration: "none" }}
          >
            <IconButton size="large" color="secondary">
              <Badge badgeContent={Users?.unreadMessageCount} color="error">
                <MailIcon  />
              </Badge>
            </IconButton>
          </Link>
          <Link
            to="/notice-board"
            style={{ color: "secondary", textDecoration: "none" }}
          >
            <IconButton size="large" color="secondary">
              <DeveloperBoardIcon  />
            </IconButton>
          </Link>

          <Link
            to="/account"
            style={{ color: "secondary", textDecoration: "none" }}
          >
            <IconButton size="large" edge="end" color="secondary">
              <AccountCircle  />
            </IconButton>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
