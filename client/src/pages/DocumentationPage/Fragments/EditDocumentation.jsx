import { useEffect, useState } from "react";
import { useStyles } from "../../../App";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { DropzoneArea } from "react-mui-dropzone";

import {
  useUpdateDocumentationMutation,
  useUploadFileMutation,
} from "../../../features/api/apiSlice";
import { toast } from "react-toastify";

export default function EditDocumentation({
  editDoc,
  setEditDoc,
  selectedFolder,
}) {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    attachment: "",
  });

  const [submitFileUpload, { isLoading: isUploadLoading }] =
    useUploadFileMutation();
  const [updateDocumentation, { isLoading: updateDocumentationLoading }] =
    useUpdateDocumentationMutation();

  useEffect(() => {
    if (selectedFolder?.name) {
      setValues({
        name: selectedFolder?.name,
        attachment: selectedFolder?.attachment,
      });
    }
  }, [selectedFolder?.name]);

  const handleValueChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitClick = async (e) => {
    e.preventDefault();

    if (!values?.name) {
      toast.error("Please field is required");
      return;
    }

    const data = {
      ...selectedFolder,
      ...values,
    };

    const formData = new FormData();
    formData.append("fileName", values.attachment[0]);

    const savedImg = values.attachment[0] && (await submitFileUpload(formData));

    if (savedImg?.error?.data){
      data.attachment = savedImg?.error?.data;
    } else {
      data.attachment = selectedFolder?.attachment;
    }

    await updateDocumentation(data)
      .then((res) => {
        if(res.error)
           toast.error(res.error?.data?.message);
       else{
          toast.success("Updated Successfully");
          setValues({ name: "", attachment: "" });
          setEditDoc({ isOpen: false, isFolder: false });
        }
        
      })
      .catch((err) => toast.error("Data is not saved"));
  };

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={editDoc?.isOpen}
      onClose={() => setEditDoc({ isOpen: false, isFolder: false })}
    >
      <DialogTitle>Edit File Inside /{selectedFolder?.name}</DialogTitle>
      <DialogContent>
        <form onSubmit={onSubmitClick}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              required
              variant="filled"
              size="small"
              label="Name"
              name="name"
              value={values.name}
              onChange={handleValueChange}
            />

            {!selectedFolder?.isDirectory && (
              <DropzoneArea
                dropzoneClass={classes.dropZone}
                showAlerts={false}
                useChipsForPreview={true}
                filesLimit={1}
                maxFiles={1}
                maxFileSize={5000000}
                dropzoneText={"* Drag and drop a file here or click"}
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
            size="small"
            color="primary"
            variant="contained"
            onClick={onSubmitClick}
            loading={updateDocumentationLoading || isUploadLoading}
            startIcon={<SaveIcon />}
          >
            <span>Update</span>
          </LoadingButton>
          <Button
            size="small"
            variant="contained"
            startIcon={<CloseIcon />}
            onClick={() => setEditDoc({ isOpen: false, isFolder: false })}
          >
            Cancel
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
