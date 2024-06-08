import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DropzoneArea } from "react-mui-dropzone";
import { InputLabel } from "@mui/material";

export const useStyles = makeStyles(() => ({
  // dropZone: {
  //   minHeight: "50px !important",
  // },
  dropZone: {
    "& p": { margin: "5px", fontSize: 18 },
    "& svg": { height: "30px", width: "30px" },
    minHeight: "50px !important",
  },
}));

export default function Dropzone({ file, setFile }) {
  const classes = useStyles();

  return (
    <>
      {/* <InputLabel>Attachment</InputLabel> */}
      <DropzoneArea
        dropzoneClass={classes.dropZone}
        showAlerts={false}
        useChipsForPreview={true}
        filesLimit={1}
        maxFiles={1}
        maxFileSize={5000000}
        dropzoneText={"Drop or Click to upload your File"}
        onChange={(files) => setFile(files)}
      />
    </>
  );
}
