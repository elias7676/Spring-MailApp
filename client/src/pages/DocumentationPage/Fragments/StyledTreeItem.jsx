import { styled } from "@mui/material/styles";
import { IconButton, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDeleteDocumentationMutation } from "../../../features/api/apiSlice";
import DeleteDialog from "../../../components/DeleteDialog";
import DownloadAttachment from "../../../components/DownloadAttachment";
import { BASE_FILE_URL } from "../../../constants/api_tags";

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "&.Mui-expanded": {
      fontWeight: theme.typography.fontWeightRegular,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: "var(--tree-view-color)",
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: "inherit",
      color: "inherit",
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 10,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

export default function StyledTreeItem(props) {
  const {
    bgColor,
    color,
    node,
    addDoc,
    setAddDoc,
    editDoc,
    setEditDoc,
    selectedFolder,
    setSelectedFolder,
    ...other
  } = props;
  const { user } = useSelector((state) => state.auth);
  const [deleteDocumentation] = useDeleteDocumentationMutation();
  const onDeleteClick = (id) => async () => {
    await deleteDocumentation(id);
    toast.success("Deleted successfully");
  }

  return (
    <StyledTreeItemRoot
      label={
        <Box
          href={
            node?.attachment ? `${BASE_FILE_URL}/${node?.attachment}}` : "#"
          }
          sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 0 }}
        >
          <Box color="inherit" sx={{ mr: 1 }}>
            {node?.isDirectory ? (
              <FolderIcon color="primary" />
            ) : (
              <TextSnippetIcon color="primary" />
            )}
          </Box>
          <Typography
            variant="body2"
            sx={{ fontWeight: "inherit", flexGrow: 1 }}
          >
            {node?.name}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ pr: 1 }}>
            {node?.isDirectory && (
                <>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setAddDoc({ isOpen: true, isFolder: true });
                      setSelectedFolder(node);
                    }}
                  >
                    <CreateNewFolderOutlinedIcon />
                  </IconButton>

                  <IconButton
                    color="primary"
                    onClick={() => {
                      setAddDoc({ isOpen: true, isFolder: false });
                      setSelectedFolder(node);
                    }}
                  >
                    <NoteAddOutlinedIcon />
                  </IconButton>
                </>
              )}
            <DownloadAttachment name={node?.attachment} />
            
              <IconButton
                onClick={() => {
                  setEditDoc({ isOpen: true, isFolder: false });
                  setSelectedFolder(node);
                }}
              >
                <EditIcon color="primary" />
              </IconButton>
            

            {((node?.isDirectory && node?.children?.filter(child => !child?.isDeleted)?.length <= 0) ||
              !node?.isDirectory) &&
              node?.name !== 'Root' && (
                <DeleteDialog
                  onDeleteClick={onDeleteClick(node?.id)}
                  dialogLabel="Delete"
                  name={node?.name}
                  id={node?.id}
                />
              )}
          </Stack>
        </Box>
      }
      style={{
        "--tree-view-color": color,
        "--tree-view-bg-color": bgColor,
      }}
      {...other}
    />
  );
}
