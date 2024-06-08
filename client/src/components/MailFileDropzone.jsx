import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";


export default function MailFileDropzone({ setFile }) {
  const onDrop = useCallback((acceptedFiles) => {
    setFile((prevFiles) => [
      ...prevFiles,
      ...acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      )
    ]);
    // setFile(
    //   acceptedFiles.map((file) =>
    //     Object.assign(file, { preview: URL.createObjectURL(file) })
    //   )
    // );
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <div
      {...getRootProps()}
      style={{
        height: "100%",
        width: "100%",
        border: "1px solid #000",
        borderRadius: 5,
        textAlign: "center",
        // padding: 50,
      }}
    >
  <Stack direction="row"  spacing={2} alignItems="center">
      <AddIcon />
      <input {...getInputProps()} />
     Add Atttachment
     </Stack>
    </div>
  );
}
