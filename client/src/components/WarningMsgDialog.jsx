import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";

export default function WarningMsgDialog({
  openDialog,
  title,
  isLoading,
  onSubmitClick,
}) {
  const [open, setOpen] = useState(openDialog);

  useEffect(() => setOpen(openDialog), [openDialog]);

  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Stack direction="row" justifyContent="space-between" mt={2}>
            <Button
              size="small"
              variant="outlined"
              onClick={() => setOpen(false)}
            >
              Cancle
            </Button>
            <LoadingButton
              size="small"
              color="error"
              loading={isLoading}
              variant="contained"
              onClick={onSubmitClick}
            >
              Continue Anyway
            </LoadingButton>
          </Stack>
        </DialogContent>
      </Dialog>
    </div>
  );
}
