import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import FileDropzone from "../../components/FileDropzone";
import AvatarWithAddButton from "./AvatarWithAddButton";
import Dropzone from "../../components/Dropzone";
import RestoreIcon from "@mui/icons-material/Restore";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton
} from '@mui/material';
import DeleteDialogComponent from "../../components/DeleteDialogComponent";
import {
  useGetAllDepartmentsQuery,
  useGetAllUsersQuery,
  useDeactivateUserMutation,
  useResetUserMutation,
  useCreateUserMutation,
  useUploadFileMutation,
  useGetUserRolesQuery
} from "../../features/api/apiSlice";
import { FILE_BASE_URL } from "../../constants/api_tags";
import Loading from "../../components/Loading";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { set } from "lodash";
import { LoadingButton } from "@mui/lab";

export default function UsersPage() {
  const { user } = useSelector((state) => state.auth);
  const [userRoleId, setUserRoleId] = useState(9999);
  const [usersData, setUsersData] = useState([]);
  const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState("");
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    phone: '',
    photoPath: '',
    email: '',
    password: '',
    status: '',
    departmentId: '',
    mailFooter: '',
    roleId: [],
    departments: [],
    roles: [],


  });

  const { data: userRolesData, isLoading: userRolesLoading, refetch: refetchUserRoles } =
  useGetAllDepartmentsQuery();
  const { data: allUsersData, isLoading: allUsersLoading, refetch: refetchallUsers } =
  useGetAllUsersQuery();
  const { data: allRolesData, isLoading: allRolesLoading, refetch: refetchallRoles } =
  useGetUserRolesQuery();
  const [deactivateUser, { isLoading: deactivateUserLoading }] =
  useDeactivateUserMutation();
  const [resetUser, { isLoading: resetUserLoading }] =
  useResetUserMutation();
  const [createUser, { isLoading: isCreateUserLoading }] =
  useCreateUserMutation();
  const [submitFileUpload, { isLoading: isUploadLoading }] =
  useUploadFileMutation();
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleDeactivateClick = (userId) => {
    setSelectedUserId(userId);
    setDeactivateDialogOpen(true);
  };

  const handleDeactivateConfirm = async () => {
    // Perform deactivation logic here
    await deactivateUser(selectedUserId.id)
    .then((res) => {
      toast.success("Successfull");
      refetchUserRoles();
    })
    .catch((err) => toast.error(err));
    setDeactivateDialogOpen(false);
    setSelectedUserId(null);
  };

  const handleDeactivateCancel = () => {
    setDeactivateDialogOpen(false);
    setSelectedUserId(null);
  };

  const handleResetClick = (userId) => {
    setSelectedUserId(userId);
    setResetDialogOpen(true);
  };

  const handleResetConfirm = async () => {
    // Perform deactivation logic here
    await resetUser(selectedUserId.id)
    .then((res) => {
      toast.success("Successfull");
    })
    .catch((err) => toast.error(err));
    setResetDialogOpen(false);
    setSelectedUserId(null);
  };

  const handleResetCancel = () => {
    setResetDialogOpen(false);
    setSelectedUserId(null);
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
 
  

  const handleSubmit = async (e) => {
    // Handle form submission here
    e.preventDefault();
    const formData2 = new FormData();
    formData2.append("fileName", file[0]);
    const savedImg = file[0] && (await submitFileUpload(formData2));
    
    if (savedImg?.error?.originalStatus == 200) {
      formData.photoPath = savedImg?.error.data;
    } else {
      formData.photoPath = "";
    }


    formData.departments = [(userRolesData.find((userRole) => userRole.id === formData.departmentId))];

    formData.departments = formData.departments.map(department => {
      const { users, ...newDepartment } = department; // Destructure users and create a new object without it
      return newDepartment;
  });
  
    formData.roles = formData.roleId.map(roleId => allRolesData.find(role => role.id === roleId));
    formData.roles = formData.roles.map(role => {
      const { authorities, ...newRole } = role; // Destructure users and create a new object without it
      return newRole;
  });
  formData.roles = formData.roles.map(role => {
    const { users, ...newRole } = role; // Destructure users and create a new object without it
    return newRole;
});

    await createUser(formData)
      .then((res) => {
       
          toast.success(`Successfull`);
          setOpen(false);
          refetchUserRoles();
        
      })
      .catch(() => toast.error("Data is not saved"));

  };
  useEffect(() => {
    if(userRoleId === 9999){
      allUsersData && setUsersData(allUsersData);
    }
    else{
    userRolesData && ((userRoleId && setUsersData(userRolesData.find((userRole) => userRole.id === userRoleId)?.users)) 
    || (!userRoleId && setUserRoleId(userRolesData[0]?.users)));

    userRolesData && ((userRoleId && setUserRoleId(userRolesData.find((userRole) => userRole.id === userRoleId)?.id)) 
                      || (!userRoleId && setUserRoleId(userRolesData[0]?.id)));
                    }
  }, [userRolesData, allUsersData]);

  return (
    <Box>
      <Grid container spacing={5}>
        <Grid item xs={3}>
          <Paper elevation={3} sx={{ width: "100%", p: 3 }}>
          <Stack justifyContent="space-between" alignItems="center">
          <Button startIcon={<AddIcon/>} 
            
             onClick={() => setOpen(true)}
             >Add New User</Button>
             </Stack>
          {allUsersLoading && <Loading />}
            <Button
                key={9999}
                fullWidth
                size="small"
                sx={{ mb: 2.5 }}
                variant={userRoleId === 9999 ? "contained" : "outlined"}
                onClick={() => {
                  setUsersData(allUsersData);
                  setUserRoleId(9999);
                }}
              >
                All Users
              </Button>
          <Stack justifyContent="space-between" alignItems="center">

            <Typography variant="h6" gutterBottom mb={3}>
              Departments
            </Typography>
            </Stack>

            {userRolesLoading && <Loading />}
            {userRolesData?.map((userRole) => (
              <Button
                key={userRole.id}
                fullWidth
                size="small"
                sx={{ mb: 2.5 }}
                variant={userRoleId === userRole.id ? "contained" : "outlined"}
                onClick={() => {
                  setUsersData(userRole?.users);
                  setUserRoleId(userRole.id);
                }}
              >
                {userRole.name}
              </Button>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <TableContainer component={Paper}>

            <Table sx={{ minWidth: 650 }} size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="left">ID</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Username</TableCell>
                  <TableCell align="left">Registered Date</TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {usersData?.map((user) => (
                  <TableRow
                    key={user}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{user.id}</TableCell>
                    <TableCell align="left">{user.fullName}</TableCell>
                    <TableCell align="left">
                      <List>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar
                              src={`${FILE_BASE_URL}/${user?.photoPath?.replace(
                                "\\",
                                "%5C"
                              )}`}
                            />
                          </ListItemAvatar>
                          <ListItemText primary={user.username} />
                        </ListItem>
                      </List>
                    </TableCell>
                    <TableCell align="left">
                      {user?.createdDate ? new Date(user?.createdDate).toLocaleDateString() : new Date().toLocaleDateString()}
                    </TableCell>
                    <TableCell align="left">
                      <Stack direction="row" spacing={2}>
                      <Button
                        disableElevation
                        variant="outlined"
                        color={user.enabled ? "error" : "success"}
                        onClick={() => handleDeactivateClick(user)}
                      >
                        {user.enabled ? "Deactivate" : "Activate"}
                      </Button>
                      <Button
                        disableElevation
                        variant="outlined"
                        color= "error"
                        endIcon={<RestoreIcon />}
                        onClick={() => handleResetClick(user)}
                      >
                        Reset
                      </Button>
                      {/* <Link
                        to={`/users/${user.id}`}
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        <Button
                          disableElevation
                          variant="outlined"
                          endIcon={<EditIcon />}
                        >
                          Edit
                        </Button>
                      </Link> */}

                      </Stack>
                    </TableCell>
                  </TableRow>
                  ))}

              </TableBody>
            </Table>
             {/* Deactivate Confirmation Dialog */}
      <Dialog open={deactivateDialogOpen} onClose={handleDeactivateCancel}>
        <DialogTitle>Confirm Deactivation</DialogTitle>
        <DialogContent>
          {selectedUserId?.enabled ? `Are you sure you want to deactivate: ${selectedUserId?.username}?` 
          : `Are you sure you want to activate: ${selectedUserId?.username} ?`}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeactivateCancel} color="primary">
            Cancel
          </Button>
          <LoadingButton onClick={handleDeactivateConfirm} loading={deactivateUserLoading} color={selectedUserId?.enabled ? "error" : "success"}>
          {selectedUserId?.enabled ? "Deactivate" : "Activate"}
          </LoadingButton>
        </DialogActions>
      </Dialog>
       {/* Reset Confirmation Dialog */}
       <Dialog open={resetDialogOpen} onClose={handleResetCancel}>
        <DialogTitle>Confirm Reset</DialogTitle>
        <DialogContent>
           Are you sure you want to Reset user Password for: {selectedUserId?.username}?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleResetCancel} color="primary">
            Cancel
          </Button>
          <LoadingButton onClick={handleResetConfirm} loading={resetUserLoading} color= "error" >
          Reset
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Dialog sx={{ '& .MuiDialog-paper': { width: '90%', maxWidth: 'none' } }}  open={open} onClose={() => setOpen(false)}>
  <DialogTitle>Add New User</DialogTitle>
  <DialogContent sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
    
    {/* First column */}
    
    <div style={{ flex: 1 }}>
    <AvatarWithAddButton file={file} setFile={setFile} />
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




    </div>

    {/* Second column */}
    <div style={{ flex: 1 }}>
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

    </div>
    <div style={{ flex: 1 }}>

      <TextField
        fullWidth
        margin="normal"
        label="Messaging Footer"
        name="mailFooter"
        value={formData.mailFooter}
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
      <FormControl fullWidth margin="normal">
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
</FormControl>

    </div>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpen(false)}>Cancel</Button>
    <LoadingButton onClick={handleSubmit} loading={isCreateUserLoading} variant="contained" color="primary">
      Submit
    </LoadingButton>
  </DialogActions>
</Dialog>


          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
}
