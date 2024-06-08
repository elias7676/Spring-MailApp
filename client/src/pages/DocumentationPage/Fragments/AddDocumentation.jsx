import { useState } from "react";
import { useStyles } from "../../../App";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { DropzoneArea } from "react-mui-dropzone";

import {
  useCreateDocumentationMutation,
  useUploadFileMutation,
} from "../../../features/api/apiSlice";
import { toast } from "react-toastify";

export default function AddDocumentation({
  addDoc,
  setAddDoc,
  selectedFolder,
}) {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    attachment: "",
  });

  const [submitFileUpload, { isLoading: isUploadLoading }] =
    useUploadFileMutation();
  const [createDocumentation, { isLoading: createDocumentationLoading }] =
    useCreateDocumentationMutation();

  const handleValueChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitClick = async (e) => {
    e.preventDefault();

    if (!values?.name) {
      toast.error("Please name field is required");
      return;
    }

    const data = {
      ...values,
      isDirectory: addDoc?.isFolder,
      parentId: selectedFolder?.id,
    };

    const formData = new FormData();
    formData.append("fileName", values.attachment[0]);

    const savedImg = values.attachment[0] && (await submitFileUpload(formData));

    if (savedImg?.error?.data){
      data.attachment = savedImg?.error?.data;
    } else {
      data.attachment = "";
    }

    await createDocumentation(data)
      .then((res) => {
        res.error && toast.error(res.error?.data?.message);
        
          toast.success("Created Successfully");
          setValues({ name: "", attachment: "" });
          setAddDoc({ isOpen: false, isFolder: false });
        
      })
      .catch((err) => toast.error("Data is not saved"));
  };

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={addDoc?.isOpen}
      onClose={() => setAddDoc({ isOpen: false, isFolder: false })}
    >
      <DialogTitle>Add Folder to /{selectedFolder?.name}</DialogTitle>
      <DialogContent>
        <form onSubmit={onSubmitClick}>
          <Stack spacing={2} mt={1}>
            <TextField
              fullWidth
              required
              size="small"
              label="Name"
              name="name"
              variant="filled"
              value={values.name}
              onChange={handleValueChange}
            />

            {!addDoc?.isFolder && (
              <DropzoneArea
                dropzoneClass={classes.dropZone}
                showAlerts={false}
                useChipsForPreview={true}
                filesLimit={1}
                maxFiles={1}
                maxFileSize={5000000}
                dropzoneText={"Drag and drop a file here or click"}
                onChange={(files) =>
                  setValues((prev) => ({ ...prev, attachment: files }))
                }
              />
            )}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <Stack direction="row" spacing={3}>
          <LoadingButton
            type="submit"
            color="primary"
            variant="contained"
            onClick={onSubmitClick}
            loading={createDocumentationLoading || isUploadLoading}
            startIcon={<SaveIcon />}
          >
            <span>Add</span>
          </LoadingButton>
          <Button
            variant="contained"
            size="small"
            startIcon={<CloseIcon />}
            onClick={() => setAddDoc({ isOpen: false, isFolder: false })}
          >
            Cancel
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
