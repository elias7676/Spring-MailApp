import { useState } from "react";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";

import {
  useGetUserRolesQuery,
  useUpdateEmployeeMutation,
  useUploadFileMutation
} from "../../features/api/apiSlice";
import { FILE_BASE_URL } from "../../constants/api_tags";
import { cities, subCities } from "../../constants/countriesAndCities";
import BranchDropdown from "../../components/BranchDropdown";
import FileDropzone from "../../components/FileDropzone";

const educationLevels = ["BSc", "MSc", "Phd", "Diploma"];

export default function EditEmployeeDialog({ employeeData }) {
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState("");
  const [branchId, setBranchId] = useState(employeeData.branchId);
  const [firstName, setFirstName] = useState(employeeData.firstName);
  const [middleName, setMiddleName] = useState(employeeData.middleName);
  const [lastName, setLastName] = useState(employeeData.lastName);
  const [email, setEmail] = useState(employeeData.email);
  const [phone, setPhone] = useState(employeeData.phone);
  const [educationLevel, setEducationLevel] = useState(
    employeeData.educationLevel?.split(".")[0]
  );
  const [educationField, setEducationField] = useState(
    employeeData.educationLevel?.split(".")[1]
  );
  const [city, setCity] = useState(employeeData.city);
  const [subCity, setSubCity] = useState(employeeData.subCity);
  const [addressInfo, setAddressInfo] = useState(employeeData.addressInfo);
  const [jobPosition, setJobPosition] = useState(employeeData.jobPosition);
  const [status, setStatus] = useState(employeeData.status);
  const [certificateImg, setCertificateImg] = useState("");
  const [userRoleId, setUserRoleId] = useState(employeeData.userId);

  const [updateEmployee, { isLoading: updateEmployeeLoading }] =
    useUpdateEmployeeMutation();
  const { data: userRolesData, isLoading: userRolesLoading } =
    useGetUserRolesQuery();
    const [submitFileUpload, { isLoading: isUploadLoading }] =
  useUploadFileMutation();

  const onSubmitClick = async (e) => {
    e.preventDefault();

    if (
      // !img ||
      !branchId ||
      !firstName ||
      !middleName ||
      !lastName ||
      !email ||
      !phone ||
      !educationLevel ||
      !educationField ||
      !city ||
      !addressInfo ||
      !jobPosition ||
      !status
      // !certificateImg
    ) {
      toast.error("Please fill required fields");
      return;
    }

    const updatedEmployeeData = {
      id: employeeData.id,
      photo: img[0],
      departmentId: branchId,
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      email: email,
      phone: phone,
      educationLevel:
        `${educationLevel}. ${educationField}`
      ,
      city: city,
      subCity: subCity,
      addressInfo: addressInfo,
      jobPosition: jobPosition,
      status: status,
      userId: userRoleId,
      photo: ""
    }
    const formData = new FormData(); 
      formData.append("fileName", img[0]);
      const savedImg = img[0] && (await submitFileUpload(formData));
      if (savedImg?.error?.data) {
        updatedEmployeeData.photo = savedImg?.error.data;
      } 
    await updateEmployee(
      updatedEmployeeData
    )
      .then((res) => {
  

        res.error && toast.error(res.error.data.title);
        if (res.data) {
          toast.success("Successfully Updated");
          setOpen(false);
        }
      })
      .catch((err) => toast.error("Data is not saved"));
  };

  return (
    <div>
      <Button
        size="small"
        color="info"
        variant="text"
        onClick={() => setOpen(true)}
        startIcon={<EditIcon />}
      >
        Edit
      </Button>
      <Dialog maxWidth="lg" open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Employee Detail</DialogTitle>
        <DialogContent>
          <form onSubmit={onSubmitClick}>
            <Grid container spacing={5}>
              <Grid item xs={7}>
                <Paper elevation={3} sx={{ width: "100%", p: 4 }}>
                  <Stack spacing={3}>
                    {/* BRANCH NAME */}
                    <BranchDropdown
                      preSelectedBranchId={employeeData.branchId}
                      setBranchData={(data) => setBranchId(data.id)}
                    />

                    {/* FULL NAME */}
                    <Stack
                      direction="row"
                      spacing={3}
                      justifyContent="space-between"
                    >
                      <TextField
                        fullWidth
                        id="firstName"
                        label="First Name"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      <TextField
                        fullWidth
                        id="middleName"
                        label="Middle Name"
                        name="middleName"
                        value={middleName}
                        onChange={(e) => setMiddleName(e.target.value)}
                      />
                    </Stack>

                    {/* CONTACTS */}
                    <Stack
                      direction="row"
                      spacing={3}
                      justifyContent="space-between"
                    >
                      <TextField
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                      <TextField
                        fullWidth
                        type="Number"
                        id="phone"
                        label="Phone Number"
                        name="phone"
                        value={phone}
                        onChange={(e) => {
                          if (e.target.value.length > 10) return;
                          setPhone(e.target.value);
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PhoneAndroidIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Stack>

                    {/* EMAIL */}
                    <TextField
                      fullWidth
                      type="email"
                      label="Email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    {/* EDUCATION LEVEL */}
                    <Stack
                      direction="row"
                      spacing={3}
                      justifyContent="space-between"
                    >
                      <FormControl sx={{ width: 150 }}>
                        <InputLabel id="educationLevel">
                          Education Level
                        </InputLabel>
                        <Select
                          labelId="educationLevel"
                          id="eduLevel"
                          label="Education Level"
                          name="educationLevel"
                          value={educationLevel}
                          onChange={(e) => setEducationLevel(e.target.value)}
                        >
                          {educationLevels.map((eduLevel, index) => (
                            <MenuItem key={index} value={eduLevel}>
                              {eduLevel}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <TextField
                        fullWidth
                        id="educationField"
                        label="Education Field"
                        name="educationField"
                        value={educationField}
                        onChange={(e) => setEducationField(e.target.value)}
                      />
                    </Stack>

                    {/* CITY & SUBCITY */}
                    <Stack
                      direction="row"
                      spacing={3}
                      justifyContent="space-between"
                    >
                      <Autocomplete
                        fullWidth
                        disablePortal
                        id="city"
                        name="city"
                        value={city}
                        options={cities}
                        onChange={(e, newValue) => {
                          if (newValue.label !== "Addis Ababa") setSubCity("");
                          setCity(newValue.label);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} label="City" />
                        )}
                      />

                      <Autocomplete
                        fullWidth
                        disablePortal
                        id="subCity"
                        name="subCity"
                        value={subCity}
                        options={subCities}
                        disabled={city === "" || city !== "Addis Ababa"}
                        onChange={(e, newValue) => setSubCity(newValue)}
                        renderInput={(params) => (
                          <TextField {...params} label="Sub City" />
                        )}
                      />
                    </Stack>

                    {/* ADDRESS INFO */}
                    <TextField
                      fullWidth
                      id="addressInfo"
                      label="Woreda"
                      name="addressInfo"
                      value={addressInfo}
                      onChange={(e) => setAddressInfo(e.target.value)}
                    />

                    {/* JOB POSITION & STATUS */}
                    <Stack
                      direction="row"
                      spacing={3}
                      justifyContent="space-between"
                    >
                      <TextField
                    fullWidth
                    id="position"
                      label="Job Position"
                      name="jobPosition"
                      value={jobPosition}
                      onChange={(e) => setJobPosition(e.target.value)}
                  />
                      <FormControl fullWidth>
                        <InputLabel id="status">Status</InputLabel>
                        <Select
                          labelId="status"
                          id="status"
                          label="Status"
                          name="status"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <MenuItem value="Active">Active</MenuItem>
                          <MenuItem value="Rejected">Rejected</MenuItem>
                        </Select>
                      </FormControl>
                    </Stack>

                    {/* TERMS & CONDITIONS */}
                    <Box>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          id="termsAndConditions"
                          sx={{ alignItems: "center" }}
                        >
                          <Checkbox disabled checked />
                          <Typography sx={{ pt: 1, color: "text.secondary" }}>
                            Terms & Conditions
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Suspendisse malesuada lacus ex, sit amet
                            blandit leo lobortis eget.
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Box>
                  </Stack>
                </Paper>
              </Grid>
              <Grid item xs={5}>
                <Paper elevation={3} sx={{ width: "100%", p: 4 }}>
                  <Stack spacing={3}>
                    {/* IMG */}
                    <Stack
                      direction="row"
                      spacing={5}
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Avatar
                        variant="rounded"
                        alt=""
                        src={
                          img[0]?.preview ||
                          `${FILE_BASE_URL}/${employeeData.photoPath?.replace(
                            "\\",
                            "%5C"
                          )}`
                        }
                        sx={{ width: 150, height: 150 }}
                      />
                      <Box width="100%" height={100}>
                        <FileDropzone setFile={setImg} />
                      </Box>
                    </Stack>

                    {/* CERTIFICATE IMG */}
                    <Stack
                      direction="row"
                      spacing={5}
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Avatar
                        variant="rounded"
                        alt=""
                        src={certificateImg[0]?.preview}
                        sx={{ width: 150, height: 150 }}
                      />
                      <Box width="100%" height={100}>
                        <FileDropzone setFile={setCertificateImg} />
                      </Box>
                    </Stack>

                    <LoadingButton
                      type="submit"
                      variant="contained"
                      loading={updateEmployeeLoading}
                      startIcon={<SaveIcon />}
                    >
                      Save
                    </LoadingButton>
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
