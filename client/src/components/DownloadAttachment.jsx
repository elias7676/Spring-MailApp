import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { IconButton, Stack } from "@mui/material";
import { BASE_FILE_URL } from "../constants/api_tags";
import Typography from "@mui/material/Typography";

export default function DownloadAttachment({ name }) {
  if (name == "" || name == undefined) return;
  return (
    <Stack direction="row" spacing={0.5} alignItems="center" >
    <IconButton href={BASE_FILE_URL + "/" + name} target="_blank" download>
      <FolderOpenIcon color="primary" />
    </IconButton>
    <IconButton href={BASE_FILE_URL + "/" + name} download>
      <DownloadForOfflineIcon color="primary" />
    </IconButton>
    <Typography variant="body2">{name}</Typography>
  </Stack>
  
  );
}
