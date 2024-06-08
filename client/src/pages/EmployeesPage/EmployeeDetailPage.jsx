import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Divider from "@mui/material/Divider";
import { Modal } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SchoolIcon from "@mui/icons-material/School";

import {
  useGetEmployeeQuery,
  useDeleteEmployeeMutation,
  
} from "../../features/api/apiSlice";
import Button from "@mui/material/Button";
import { FILE_BASE_URL } from "../../constants/api_tags";
import Loading from "../../components/Loading";
import DeleteDialog from "../../components/DeleteDialog";
import EditEmployeeDialog from "./EditEmployeeDialog";


export default function EmployeeDetailPage() {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [value, setValue] = useState("attendanceHistory");
  const [closeDeleteDialog, setCloseDeleteDialog] = useState(false);

  const permission = user?.userRole?.canChangeLessonPlanStatus;
  const { data: employeeData, isLoading: employeeDataLoading } =
    useGetEmployeeQuery(id);



  const [rating, setRating] = useState();

  const onRatingChange = (newRating) => {
    setRating(newRating.target.value);
  };
  const [deleteEmployee, { isLoading: deleteEmployeeLoading }] =
    useDeleteEmployeeMutation();

  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(true);
    setRating();
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const style = {
    position: "absolute",
    top: "59%",
    left: "20%",
    transform: "translate(-50%, -50%)",
    width: 350,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 3,
  };

  const onDeleteClick = async () => {
    await deleteEmployee({ id: employeeData.id })
      .then((res) => {
        res.error && toast.error(res.error.data.title);
        if (res.data) {
          toast.success("Successfully Deleted");
          setCloseDeleteDialog(true);
        }
      })
      .catch((err) => toast.error("Data is not deleted"));
  };

  return (
    <Box>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={12} md={5} lg={3}>
          <Paper elevation={3} sx={{ width: "100%", p: 3 }}>
            {employeeDataLoading && <Loading />}
            {employeeData && (
              <Stack spacing={2} alignItems="center">
                <Avatar
                  src={`${FILE_BASE_URL}/${employeeData.photoPath?.replace(
                    "\\",
                    "%5C"
                  )}`}
                  alt={employeeData.firstName}
                  sx={{ width: 110, height: 110 }}
                >
                  R
                </Avatar>
                <Typography variant="h4" gutterBottom>
                  {`${employeeData.firstName} ${employeeData.middleName}`}
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  {employeeData.jobPosition}
                </Typography>
                

                <Modal open={isOpen} onClose={handleCloseModal}>
                  <Box sx={style}>
                    <Rating
                      count={5}
                      activeColor="#ffd700"
                      precision={0.5}
                      // value={rating}
                      edit={true}
                      onChange={onRatingChange}
                    />

                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <p style={{ fontWeight: 300, color: "#999" }}>
                        {" "}
                        {rating} /5
                      </p>
                      {/* <Button variant="contained" onClick={onRate}>
                        Rate{" "}
                      </Button> */}
                    </Stack>
                  </Box>
                </Modal>
                <Divider sx={{ width: "100%" }} />
                <Typography
                  variant="subtitle2"
                  align="left"
                  sx={{ width: "100%" }}
                  gutterBottom
                >
                  Detail Info
                </Typography>
                <Stack
                  direction="row"
                  spacing={3}
                  justifyContent="start"
                  sx={{ width: "100%" }}
                >
                  <PhoneIcon color="disabled" />
                  <Typography variant="p" color="text.secondary" gutterBottom>
                    {employeeData.phone}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  spacing={3}
                  justifyContent="start"
                  sx={{ width: "100%" }}
                >
                  <EmailIcon color="disabled" />
                  <Typography variant="p" color="text.secondary" gutterBottom>
                    {employeeData.email}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  spacing={3}
                  justifyContent="start"
                  sx={{ width: "100%" }}
                >
                  <SchoolIcon color="disabled" />
                  <Typography variant="p" color="text.secondary" gutterBottom>
                    {employeeData.educationLevel}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  spacing={3}
                  justifyContent="start"
                  sx={{ width: "100%" }}
                >
                  <LocationOnIcon color="disabled" />
                  <Typography variant="p" color="text.secondary" gutterBottom>
                    {`${employeeData.city}, ${employeeData.subCity}`}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  spacing={3}
                  justifyContent="start"
                  sx={{ width: "100%" }}
                >
                  <LocationOnIcon color="disabled" />
                  <Typography variant="p" color="text.secondary" gutterBottom>
                    {employeeData.addressInfo}
                  </Typography>
                </Stack>
                <Divider sx={{ width: "100%" }} />
                <Stack direction="row" spacing={3}>
                  
                    <>
                    {user?.authorities?.some(auth => auth?.authority == "employee.update") &&(
                      <EditEmployeeDialog employeeData={employeeData} />
                    )}
                      {/* <DeleteDialog
                        closeDeleteDialog={closeDeleteDialog}
                        title={`${employeeData.firstName} ${employeeData.middleName}`}
                        isLoading={deleteEmployeeLoading}
                        onDeleteClick={() => onDeleteClick()}
                      /> */}
                    </>
                  
                </Stack>
              </Stack>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={7} lg={9}>
          <Box sx={{ width: "100%", typography: "body1" }}>

          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
