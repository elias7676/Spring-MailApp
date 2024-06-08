import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  DialogActions,
  DialogTitle,
  Dialog,
  MenuItem,
  DialogContent,
  IconButton
} from '@mui/material';
import { firstTimeUserLogin } from "../../features/auth/authSlice";
import {
  useCreateUserMutation,
  useGetUserRolesQuery
} from "../../features/api/apiSlice";

export default function FirstTimeLoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { isFirstTimeLoading, isFirstTimeSuccess, isFirstTimeError, errorMsg } =
    useSelector((state) => state.auth);

    const { data: allRolesData, isLoading: allRolesLoading, refetch: refetchallRoles } =
    useGetUserRolesQuery();

    const [createUser, { isLoading: isCreateUserLoading }] =
    useCreateUserMutation();
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    phone: '',
    photoPath: '',
    email: '',
    password: '',
    status: '',
    departmentId: '',
    roleId: [],
    departments: [],
    roles: [],


  });
  const handleSubmit = async (e) => {
    // Handle form submission here
    e.preventDefault();

    formData.photoPath = "";
    // formData.departments = [(userRolesData.find((userRole) => userRole.id === formData.departmentId))];
    // formData.roles = formData.roleId.map(roleId => allRolesData.find(role => role.id === roleId));

    await dispatch(firstTimeUserLogin(formData))
        // await createUser(formData)
        .then((res) => {
       
          toast.success(`Successfull`);
          setOpen(true)
        
      })
      .catch(() => toast.error("Data is not saved"));

  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const getModifiedFullName = (fullName) => {
    const spaceIndex = fullName.indexOf(' ');
    if (spaceIndex !== -1) {
      return fullName.substring(0, spaceIndex) + '@digitalequb.com';
    } else {
      return fullName + '@digitalequb.com';
    }
  };

  // useEffect(() => {
  //   if (isFirstTimeSuccess) {
  //     navigate("/login");
  //     toast.success("Successful Set Password");
  //   }
  //   isFirstTimeError && toast.error(errorMsg);
  // }, [isFirstTimeSuccess, isFirstTimeError]);



  return (
    <Box sx={{paddingTop: 0}}>
      <form>
        <Grid container  justifyContent="center">
            <Paper
          
              sx={{ minWidth:950 }}
            >
              <Stack alignItems="center" spacing={4}>
                            
                <Typography variant="h5" component="h4">
                  Sign Up
                </Typography>
              <DialogContent sx={{minWidth:900, display: 'flex', flexDirection: 'row', gap: '20px' }}>
              <div style={{ flex: 1 }}>
      <TextField
        fullWidth
        margin="normal"
        label="Full Name"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="User Name"
        name="fullName"
        value={getModifiedFullName(formData.fullName)}
        disabled
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Gender</InputLabel>
        <Select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        margin="normal"
        label="Phone"
        name="phone"
        type="number"
        value={formData.phone}
        onChange={handleChange}
      />


    </div>

    {/* Second column */}
    <div style={{ flex: 1 }}>
      <TextField
        fullWidth
        margin="normal"
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Status</InputLabel>
        <Select
          name="status"
          value={formData.status}
          onChange={handleChange}
          value = "Active"
          disabled
        >
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </Select>
      </FormControl>
      {/* <FormControl fullWidth margin="normal">
  <InputLabel>Department</InputLabel>
  <Select
    name="departmentId"
    value={formData.departmentId}
    onChange={handleChange}
  >
    {userRolesData && userRolesData.map((role) => (
      <MenuItem key={role.id} value={role.id}>
        {role.name}
      </MenuItem>
    ))}
  </Select>
</FormControl>
<FormControl fullWidth margin="normal">
  <InputLabel>Role</InputLabel>
  <Select
    name="roleId"
    value={formData.roleId}
    onChange={handleChange}
    multiple // Enable multi-select
    className="asset-select"
  >
    {allRolesData && allRolesData.map((role) => (
      <MenuItem key={role.id} value={role.id}>
        {role.name}
      </MenuItem>
    ))}
  </Select>
</FormControl> */}

    </div>
    </DialogContent>
    <Button onClick={handleSubmit} variant="contained" color="primary">
      Submit
    </Button>

                <Link to="/login">Already have an account Login?</Link>

              </Stack>
            </Paper>
        </Grid>
      </form>
      <Dialog open={open} onClose={() => setOpen(false)}>
  <DialogTitle>
  <Stack alignItems="center" spacing={4}>
                            
  <Typography variant="h5" component="h4">Signup Sucessful!</Typography>
  <Typography>Please Contact Your Administrator To Activate Your Account</Typography>
  </Stack>
  </DialogTitle>
  <DialogActions>
  <Link to="/login">
    <Button  variant="contained" color="primary">
      Ok
    </Button>
    </Link>
  </DialogActions>
</Dialog>
    </Box>
  );
}
