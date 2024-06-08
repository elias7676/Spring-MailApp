import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function FileDropzone({ setFile }) {
  const onDrop = useCallback((acceptedFiles) => {
    setFile(
      acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      )
    );
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
      <input {...getInputProps()} />
      Drag & Drop here or Click to select file
    </div>
  );
}
