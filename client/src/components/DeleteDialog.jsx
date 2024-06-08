import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function EditBranchDialog({
  closeDeleteDialog,
  title,
  onDeleteClick,
  isLoading,
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    closeDeleteDialog && setOpen(false);
  }, [closeDeleteDialog]);

  return (
    <div>
      <Button
        size="small"
        color="error"
        variant="text"
        onClick={() => setOpen(true)}
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Are you sure you want to delete</DialogTitle>
        <DialogContent>
          <DialogContentText>{title}</DialogContentText>
          <Stack direction="row" justifyContent="space-between" mt={2}>
            <Button
              size="small"
              variant="outlined"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <LoadingButton
              size="small"
              color="error"
              loading={isLoading}
              variant="contained"
              startIcon={<DeleteIcon />}
              onClick={onDeleteClick}
            >
              Delete
            </LoadingButton>
          </Stack>
        </DialogContent>
      </Dialog>
    </div>
  );
}
