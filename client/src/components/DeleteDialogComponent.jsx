import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/Delete";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button, Divider, IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";

import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import { Close } from "@mui/icons-material";

export default function DeleteDialogComponent({
  id,
  name,
  api,
  dialogLabel,
  handleClose,
}) {
  const [open, setOpen] = useState(false);

  const [deleteFunc, { isLoading: isDeleteLoading, isSuccess }] = api();

  useEffect(() => {
    isSuccess && handleClose && handleClose();
  }, [isSuccess]);

  const onSubmitClick = async (e) => {
    e.preventDefault();

    await deleteFunc({
      id: id,
    })
      .then((res) => {
        if (res.error) {
          toast.error(res.error.data.message);
          setOpen(false);

          return;
        }
        toast.success("Successfully Deleted");
        setOpen(false);
      })
      .catch((err) => toast.error("Data is not saved"));
  };

  return (
    <div>
      <IconButton onClick={() => setOpen(true)} title="Delete">
        <DeleteOutlineIcon color="error" />
      </IconButton>

      <Dialog
        maxWidth="xs"
        fullWidth
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle
          sx={{
            background: (theme) => theme.palette.gradient.main,
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <div style={{ color: "#fff" }}>{dialogLabel}</div>
          <IconButton onClick={() => setOpen(false)}>
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <form onSubmit={onSubmitClick}>
            <Grid container spacing={5} justifyContent="center">
              <Grid item xs={12}>
                <Stack spacing={3}>
                  <Typography gutterBottom variant="body2">
                    Are you sure do you want to Deactivate <b>{name}</b>
                  </Typography>
                  <Stack direction="flex" gap={4}>
                    <LoadingButton
                      type="submit"
                      fullWidth
                      loading={isDeleteLoading}
                      variant="contained"
                      sx={{
                        background: (theme) => theme.palette.gradient.error,
                      }}
                      startIcon={<DeleteOutlineIcon />}
                    >
                      Delete
                    </LoadingButton>
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<CloseIcon />}
                      sx={{
                        background: (theme) => theme.palette.gradient.main,
                      }}
                      onClick={() => setOpen(false)}
                    >
                      Close
                    </Button>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
