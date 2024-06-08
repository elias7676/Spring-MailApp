import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import EditIcon from "@mui/icons-material/Edit";

export default function EditUserRoleDialog({
  role,
  setRole,
  submitUpdate,
  isUpdateUserRoleLoading,
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton
        color="primary"
        sx={{ ml: 1, mb: 0.5 }}
        onClick={() => setOpen(true)}
      >
        <EditIcon fontSize="large" />
      </IconButton>
      <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
        <form onSubmit={submitUpdate}>
          <DialogTitle>Update user role</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              fullWidth
              id="roleName"
              value={role.roleName}
              onChange={(e) =>
                setRole((prev) => ({ ...prev, roleName: e.target.value }))
              }
            />
            <FormGroup sx={{ mt: 1 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={role.isAdmin}
                    onChange={(e) =>
                      setRole((prev) => ({
                        ...prev,
                        isAdmin: !role.isAdmin,
                      }))
                    }
                  />
                }
                label="Is Admin"
              />
            </FormGroup>
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <LoadingButton type="submit" loading={isUpdateUserRoleLoading}>
              Update
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
