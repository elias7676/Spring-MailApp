import Avatar from '@mui/material/Avatar';
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function AvatarWithAddButton({ file, setFile }) {
  const onDrop = useCallback((acceptedFiles) => {
    setFile(
      acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      )
    );
  }, [setFile]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <Avatar
        variant="rounded"
        alt=""
        src={file[0]?.preview}
        sx={{ width: 150, height: 150, marginRight: 2, cursor: 'pointer' }}
      />
      <input {...getInputProps()} style={{ display: 'none' }} />
    </div>
  );
}
