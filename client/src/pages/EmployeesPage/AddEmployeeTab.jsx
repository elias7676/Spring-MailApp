import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
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

import {

  useGetUserRolesQuery,
  useCreateEmployeeMutation,
  useUploadFileMutation
} from "../../features/api/apiSlice";
import { cities, subCities } from "../../constants/countriesAndCities";
import BranchDropdown from "../../components/BranchDropdown";
import FileDropzone from "../../components/FileDropzone";
import { Phone } from "@mui/icons-material";

const educationLevels = ["BSc", "MSc", "Phd", "Diploma"];

export default function AddEmployeeTab({ setValue }) {
  const { user } = useSelector((state) => state.auth);

  const [img, setImg] = useState("");
  const [branchData, setBranchData] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [educationLevel, setEducationLevel] = useState("BSc");
  const [educationField, setEducationField] = useState("");
  const [gender, setGender] = useState("Male");
  const [city, setCity] = useState("Addis Ababa");
  const [subCity, setSubCity] = useState("Arada");
  const [addressInfo, setAddressInfo] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [file, setFile] = useState("");
  const [status, setStatus] = useState("Active");
  const [certificateImg, setCertificateImg] = useState("");
  const [submitFileUpload, { isLoading: isUploadLoading }] =
  useUploadFileMutation();


  const [createEmployee, { isLoading: createEmployeeLoading }] =
    useCreateEmployeeMutation();


  const handleFileChange = (e) => {
    const selectedImg = e.target.files[0];
    const fileTypes = ["image/png", "image/jpg", "image/jpeg"];

    if (selectedImg && fileTypes.includes(selectedImg.type)) {
      setImg(selectedImg);
    } else {
      setImg("");
      toast.error("Unsupported file type. (png/jpg/jpeg)");
    }
  };

  const handleCertificateFileChange = (e) => {
    const selectedImg = e.target.files[0];
    const fileTypes = ["image/png", "image/jpg", "image/jpeg"];

    if (selectedImg && fileTypes.includes(selectedImg.type)) {
      setCertificateImg(selectedImg);
    } else {
      setCertificateImg("");
      toast.error("Unsupported file type. (png/jpg/jpeg)");
    }
  };

  const onSubmitClick = async (e) => {
    e.preventDefault();

    if (
      // !img ||
      !branchData ||
      !username ||
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

    const newEmployeeData = {
      branchId: branchData.id,
      username: username,
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      email: email,
      phone: phone,
      educationLevel: `${educationLevel}. ${educationField}`,
      city: city,
      subCity: subCity,
      addressInfo: addressInfo,
      jobPosition: jobPosition,
      gender: gender,
      status: status,
      userRoleId: jobPosition.id,

      photo: ""
    }

      const formData = new FormData(); 
      formData.append("fileName", img[0]);
      const savedImg = img[0] && (await submitFileUpload(formData));
      if (savedImg?.error?.data) {
        newEmployeeData.photo = savedImg?.error.data;
      } 

  

    await createEmployee(newEmployeeData)
      .then((res) => {
        res.error && toast.error(res.error.data.title);
        if (res.data) {
          toast.success("Successfully Created");
          setValue("employees");
        }
      })
      .catch((err) => toast.error("Data is not saved"));
  };

  return (
    <Box>
      <form onSubmit={onSubmitClick}>
        <Grid container spacing={5}>
          <Grid item xs={7}>
            <Paper elevation={3} sx={{ width: "100%", p: 4 }}>
              <Stack spacing={3}>
                {/* BRANCH NAME */}
                <BranchDropdown setBranchData={setBranchData} />

                <TextField
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                    // type="Number"
                    id="phone"
                    label="Phone Number"
                    name="phone"
                    value={phone}
                    // inputProps={{ pattern: "[0-9]{9}" }}
                    onChange={(e) => {
                      // if (e.target.value.length > 10) return;
                      setPhone(e.target.value);
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone />
                          +251
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>

                {/* EMAIL */}
                <FormControl fullWidth>
                    <InputLabel id="gender">Gender</InputLabel>
                    <Select
                      labelId="gender"
                      id="Gender"
                      label="gender"
                      name="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </Select>
                  </FormControl>
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
                    <InputLabel id="educationLevel">Education Level</InputLabel>
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
                        TTT
                        {/* {schoolData?.terms[0]?.teacherTerms} */}
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
                    src={img[0]?.preview}
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
                  loading={createEmployeeLoading}
                  startIcon={<SaveIcon />}
                >
                  Save
                </LoadingButton>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
