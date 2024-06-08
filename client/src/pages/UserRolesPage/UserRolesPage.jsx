import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,

} from '@mui/material';
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import humanizeString from "humanize-string";
import { useEffect, useState } from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { toast } from "react-toastify";
import Avatar from "@mui/material/Avatar";
import { FILE_BASE_URL } from "../../constants/api_tags";
import { Edit, Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { IconButton, TextField } from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useDispatch } from "react-redux";
import Loading from "../../components/Loading";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { USER_ROLE_GROUPS } from "../../constants/USER_ROLE_GROUPS";
import {
  useDeleteUserRoleMutation,
  useGetUserRolesQuery,
  useUpdateUserRoleMutation,
  useGetAllUsersQuery
} from "../../features/api/apiSlice";
import AddUserRoleDialog from "./AddUserRoleDialog";

export default function UserRolesPage() {
  const dispatch = useDispatch();
  const [userRole, setUserRole] = useState({});
  const [roleName, setRoleName] = useState("");

  const { data: userRolesData, isLoading: userRolesLoading , refetch: refetchUserRoles } =
    useGetUserRolesQuery();
  const [updateUserRole, { isLoading: updateUserRoleLoading }] =
    useUpdateUserRoleMutation();
  const [deleteUserRole, { isLoading: isDeleteUserRoleLoading }] =
    useDeleteUserRoleMutation();
    const { data: allUsersData, isLoading: allUsersLoading, refetch: refetchallUsers } =
    useGetAllUsersQuery();

  const [formState, setFormState] = useState({});
  const [role, setRole] = useState({ isAdmin: false, roleName: "" });
  const [usersData, setUsersData] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [newRoleName, setNewRoleName] = useState("");

  useEffect(() => {
    (userRolesData && !selectedRole && setUserRole(userRolesData[0])) 
      || (userRolesData && selectedRole && setUserRole(userRolesData.find((item) => item.id === selectedRole)));
    
    (userRolesData && !selectedRole && setSelectedRole(userRolesData[0]?.id)) 
      || (userRolesData && selectedRole && setSelectedRole(selectedRole));


    (userRolesData && !selectedRole && setRoleName(userRolesData[0]?.name)) 
    ||   (userRolesData && selectedRole && setRoleName(userRolesData.find((item) => item.id === selectedRole)?.name));


    (userRolesData && !selectedRole && setUsersData(userRolesData[0]?.users)) 
    || (userRolesData && selectedRole && setUsersData(userRolesData.find((item) => item.id === selectedRole)?.users));
  }, [userRolesData]);

  useEffect(() => {
    userRole && setRoleName(userRole?.roleName);
  }, [userRole]);
  const handleAddNewMember = () => {
    // Create a new user object or use your preferred format
    const newUser = {
      isNew: true // Assign a unique ID to the new user
      // Add other properties as needed
    };

    // Update usersData state by adding the new user
    setUsersData(prevUsersData => [...prevUsersData, newUser]);
  };



  // const onEditButtonClick = async (e) => {
  //   e.preventDefault();

  //   if (!roleName) {
  //     toast.error("Please fill required fields");
  //     return;
  //   }

  //   await updateUserRole({ ...userRole, roleName })
  //     .then((res) => {
  //       if (res.error) {
  //         toast.error(res?.error?.data?.title);
  //         toast.error(res?.error?.data?.message);
  //       }
  //       if (!res.error) {
  //         toast.success("Successfully Updated");
  //       }
  //     })
  //     .catch((err) => toast.error("Data is not saved"));
  // };

  const handleRemoveUser = (indexToRemove) => {
    setUsersData(prevUsersData => {
      const updatedUsersData = [...prevUsersData];
      updatedUsersData.splice(indexToRemove, 1); // Remove the user at the specified index
      return updatedUsersData;
    });
  };
  const handleChange = (event, index) => {
    const selectedUserId = event.target.value;
    const selectedUser = allUsersData.find(user => user.id === selectedUserId);
  
    // Update only the specified user at the given index
    setUsersData(prevUsersData => {
      const updatedUsersData = [...prevUsersData];
      updatedUsersData[index] = {...selectedUser, isNew: true};;
      return updatedUsersData;
    });
  };
  const onSubmitClick = async (e) => {


    e.preventDefault();
      
      const newArray = usersData.map(user => user.id);

      
       const data = {
      users: newArray,
      roleId: selectedRole
    };


          await updateUserRole(data)
            .then((res) => {
              refetchUserRoles();
              refetchallUsers();
                toast.success("Successfully Updated");
            })
            .catch((err) => toast.error("Data is not saved"));
  };


  useEffect(() => {
    if (!userRolesData?.find((item) => item?.id === userRole?.id)) return;
    //setFormState(roleOption?.data.permissions);

    setRole({ isAdmin: userRole.isAdmin, roleName: userRole.roleName });
  }, [userRole]);

  return (
    <Box>
      <Grid container spacing={5}>
        <Grid item xs={3}>
          <Paper elevation={3} sx={{ width: "100%", p: 3 }}>
            <Stack direction="row" spacing={3} justifyContent="space-between">
              <Typography variant="h6" gutterBottom mb={3}>
                User Roles
              </Typography>
              <AddUserRoleDialog />
            </Stack>

            {userRolesLoading && <Loading />}
            {userRolesData?.map((role) => (
              <ButtonGroup
                disableElevation
                fullWidth
                key={role.id}
                variant={userRole?.id === role.id ? "contained" : "outlined"}
                onClick={() => {
                  setSelectedRole(role.id);
                  setRoleName(role.name);
                  setUsersData(role.users);
                }}
                sx={{ mb: 2.5 }}
              >
                <Button
                  fullWidth
                  size="small"
                  onClick={() => setUserRole(role)}
                >
                  {role.name}
                </Button>
              </ButtonGroup>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Stack
            direction="row"
            spacing={5}
            justifyContent="space-between"
            mb={2}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <TextField
                fullWidth
                required
                id="roleName"
                variant="standard"
                name="roleName"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
              />
              <IconButton color="info" 
              //onClick={onEditButtonClick}
              >
                <Edit fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>
          <form onSubmit={onSubmitClick}>
          <Paper elevation={3} sx={{ width: "100%", p: 3 }}>
            <Grid container columnSpacing={15}>
            {usersData?.map((user,index) => (
              <>
               {!user.isNew ? (
              <Grid item xs={12}  pb={1}>
                <Stack direction="row" sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                <Stack direction="row" spacing={2}>
              <Avatar
                              src={`${FILE_BASE_URL}/${user?.photoPath?.replace(
                                "\\",
                                "%5C"
                              )}`}
                            />
                      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        {user.username}{" "}
                      </Typography>
                      </Stack>
                      </div>
                      <div style={{ flex: 1 }}>
                      <Button
                      sx={{ marginLeft: "auto" }}
                                  variant="outlined"
                                  color="error"
                                  startIcon={<RemoveCircleOutlineIcon />}
                                  onClick={() => handleRemoveUser(index)}
                                  >Remove</Button>
                                  </div>
                      </Stack>
                    </Grid>
               ) : (
                <Grid item xs={12}  pb={1}>
                  <Stack direction="row" sx={{ marginLeft: "auto" }} spacing={2} alignItems="center">
                <FormControl sx={{minWidth:400}} fullwidth margin="normal">
                            <InputLabel>User</InputLabel>
                            <Select
                              name="userId"
                              
                              value={user?.id}
                              onChange={(e) => handleChange(e, index)}
                            >
                              {allUsersData &&
                                allUsersData
                                .filter(role => user.id === role.id || !usersData.some(userData => userData.id === role.id))
                                  .map((role) => (
                                    <MenuItem key={role.id} value={role.id}>
                                      {role.username}
                                    </MenuItem>
                                  ))}
                            </Select>
                          </FormControl>
                          
                      <Button
                      sx={{ marginLeft: "auto" }}
                                  variant="outlined"
                                  color="error"
                                  startIcon={<RemoveCircleOutlineIcon />}
                                  onClick={() => handleRemoveUser(index)}
                                  >Remove</Button>
                                  </Stack>
                          </Grid>
               )}

              </>
              ))}
              
            </Grid>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Button startIcon={<AddIcon/>} 
            onClick={handleAddNewMember}
            >Add New Member</Button>
            <Stack direction="row" spacing={2}>
            {/* <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                    //  onClick={handleDelete}
                    >
                      Delete Department
                    </Button> */}
            <LoadingButton 
            // loading={updateDepartmentLoading || updateDepartmentUserLoading}
            variant="contained" type="submit" startIcon={<SaveIcon />}>Save Changes</LoadingButton>
           
                    </Stack>
            </Stack>
          </Paper>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
}