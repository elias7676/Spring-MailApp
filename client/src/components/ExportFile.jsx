import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

export default function ExportFile({ componentRef, title }) {
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: title,
    onAfterPrint: () => toast.success("Print Success"),
  });

  return (
    <div>
      <Button
        disableElevation
        id="export button"
        variant="outlined"
        endIcon={<FileDownloadIcon />}
        onClick={handlePrint}
      >
        Export File
      </Button>
    </div>
  );
}
