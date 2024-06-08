import { useState } from "react";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SaveIcon from "@mui/icons-material/Save";

import { useCreateUserRoleMutation } from "../../features/api/apiSlice";
import { toast } from "react-toastify";

export default function AddUserRoleDialog() {
  const [open, setOpen] = useState(false);
  const [roleName, setRoleName] = useState("");

  const [createUserRole, { isLoading: createUserRoleLoading }] =
    useCreateUserRoleMutation();

  const onSubmitClick = async (e) => {
    e.preventDefault();

    if (!roleName) {
      toast.error("Please fill required fields");
      return;
    }

    await createUserRole(roleName)
      .then((res) => {
        res.error && toast.error(res.error.data.title);
        if (res.data) {
          setRoleName("");
          toast.success("Successfully Created");
          setOpen(false);
        }
      })
      .catch((err) => toast.error("Data is not saved"));
  };

  return (
    <div>
      <IconButton color="info" onClick={() => setOpen(true)}>
        <AddCircleOutlineIcon />
      </IconButton>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>Create User Role</DialogTitle>
        <DialogContent>
          <form onSubmit={onSubmitClick}>
            <Stack spacing={3} py={1}>
              <TextField
                fullWidth
                required
                id="roleName"
                label="Role Name"
                name="roleName"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
              />

              <LoadingButton
                type="submit"
                loading={createUserRoleLoading}
                variant="contained"
                startIcon={<SaveIcon />}
              >
                Save
              </LoadingButton>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}