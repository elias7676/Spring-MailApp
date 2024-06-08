import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { formatDistance } from "date-fns";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import { useClearNotificationMutation } from "../features/api/apiSlice";
import Loading from "./Loading";
import { useSelector } from "react-redux";

export default function NotificationPopover({
  anchorEl,
  setAnchorEl,
  notifications,
  notificationDataLoading,
}) {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [clearNotification, { isLoading: clearNotificationLoading }] =
    useClearNotificationMutation();

  const onClearNotificationClicked = async (id) => {
    await clearNotification({ userId: user?.user?.id })
      .then((res) => {
        res.error && toast.error(res.error?.data?.message);
        res.data && toast.success("Cleared");
      })
      .catch((err) => toast.error("Data is not saved"));
  };

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(null)}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      sx={{ textAlign: "center" }}
    >
      {!notifications && notificationDataLoading && <Loading />}
      {notifications?.length <= 0 && (
        <Typography variant="subtitle2" textAlign="center" mx={5} mt={6}>
          No new notification
        </Typography>
      )}
      {notifications && (
        <List sx={{ maxWidth: 350 }}>
          {notifications?.slice(0, 5)?.map((row) => (
            <Stack key={row.id}>
              <ListItem
                disablePadding
                secondaryAction={
                  <IconButton
                    edge="end"
                    color="error"
                    disabled={clearNotificationLoading}
                    onClick={() => onClearNotificationClicked(row.id)}
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                }
              >
                {/* <ListItemButton
                  onClick={() => {
                    onClearNotificationClicked(row.id);
                    navigate(
                      notificationRoute(row.actionId)?.find(
                        (obj) => obj.type === row.type
                      )?.route
                    );
                  }}
                  sx={{
                    cursor: row?.route ? "pointer" : "default",
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2">{row.title}</Typography>
                    }
                    secondary={
                      <>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {row.type}
                        </Typography>
                        {` — ${formatDistance(
                          new Date(row.createdAt),
                          new Date()
                        )} ago`}
                        <br /> {` — ${row.content}`}
                      </>
                    }
                  />
                </ListItemButton> */}
              </ListItem>
              <Divider />
            </Stack>
          ))}
        </List>
      )}

      <Chip
        label="See All"
        color="secondary"
        size="small"
        sx={{ my: 1.5 }}
        onClick={() => {
          setAnchorEl(null);
          navigate("/all-notification");
        }}
      />
    </Popover>
  );
}
