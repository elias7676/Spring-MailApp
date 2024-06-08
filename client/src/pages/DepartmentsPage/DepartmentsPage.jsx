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
import LoadingButton from "@mui/lab/LoadingButton";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import EditIcon from "@mui/icons-material/Edit";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import RestoreIcon from "@mui/icons-material/Restore";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField
} from '@mui/material';
import DeleteDialogComponent from "../../components/DeleteDialogComponent";
import {
  useGetAllDepartmentsQuery,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
  useCreateDepartmentMutation,
  useGetAllUsersQuery,
  useUpdateDepartmentUsersMutation
} from "../../features/api/apiSlice";
import { FILE_BASE_URL } from "../../constants/api_tags";
import DeleteIcon from "@mui/icons-material/Delete";

import Loading from "../../components/Loading";
import { set } from "lodash";

export default function UsersPage() {
  const { user } = useSelector((state) => state.auth);
  const [userRoleId, setUserRoleId] = useState("");
  const [newDepartment, setNewDepartment] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const { data: allUsersData, isLoading: allUsersLoading, refetch: refetchallUsers } =
  useGetAllUsersQuery();
  const { data: userRolesData, isLoading: userRolesLoading, refetch: refetchUserRoles } =
  useGetAllDepartmentsQuery();
  const [deleteDepartment, { isLoading: deleteDepartmentLoading }] =
  useDeleteDepartmentMutation();
  const [updateDepartment, { isLoading: updateDepartmentLoading }] =
  useUpdateDepartmentMutation();
  const [createDepartment, { isLoading: createDepartmentLoading }] =
  useCreateDepartmentMutation();
  const [updateDepartmentUser, { isLoading: updateDepartmentUserLoading }] =
  useUpdateDepartmentUsersMutation();
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    contactPersonName: '',
    contactPersonPhone: '',

  });
  const handleChangeAdd = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const onSubmitClick = async (e) => {


    e.preventDefault();
      
      const newArray = [];

      for (let i = 0; i < usersData?.length; i++) {
        const user = { ...usersData[i] }; // Create a new object based on the existing user
        user.departmentId = selectedDepartment.id; // Add the departmentId property
        newArray.push(user); // Push the new object to the newArray
      }
      
  
          await updateDepartmentUser(newArray);

          const updatedUsersData = usersData?.map(user => ({ ...user, isNew: false }));
          setUsersData(updatedUsersData);

          await updateDepartment(selectedDepartment)
            .then((res) => {
              refetchUserRoles();
              refetchallUsers();
                toast.success("Successfully Updated");
            })
            .catch((err) => toast.error("Data is not saved"));
  };
 
  const onSubmitClickAdd = async (e) => {
    e.preventDefault();
    await createDepartment(formData)
      .then((res) => {
        
          toast.success("Successfully Added");
            refetchUserRoles();
            setOpenAdd(false);
      })
      .catch((err) => toast.error("Data is not saved"));

  };
  const handleDelete = () => {
    setOpen(true);
  };
  const handleCancelDelete = () => {
    setOpen(false);
    setOpenAdd(false);
  };
  const handleAddNewMember = () => {
    // Create a new user object or use your preferred format
    const newUser = {
      isNew: true // Assign a unique ID to the new user
      // Add other properties as needed
    };

    // Update usersData state by adding the new user
    setUsersData(prevUsersData => [...prevUsersData, newUser]);
  };
  const handleRemoveUser = (indexToRemove) => {
    setUsersData(prevUsersData => {
      const updatedUsersData = [...prevUsersData];
      updatedUsersData.splice(indexToRemove, 1); // Remove the user at the specified index
      return updatedUsersData;
    });
  };
  
  const handleConfirmDelete = async () => {
    await deleteDepartment(selectedDepartment.id)
      .then((res) => {
        toast.success("Successfully Deleted");
        setOpen(false);
        refetchUserRoles();
      })
      .catch((err) => toast.error(err));
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

  useEffect(() => {
    // userRolesData && !selectedDepartment && setUsersData(userRolesData[0]?.users);

    userRolesData && ((userRoleId && setUsersData(userRolesData.find((userRole) => userRole.id === userRoleId)?.users)) 
    || (!userRoleId && setUsersData(userRolesData[0]?.users)));

    //userRolesData && !selectedDepartment && setUserRoleId(userRolesData[0]?.id);

    userRolesData && ((userRoleId && setUserRoleId(userRolesData.find((userRole) => userRole.id === userRoleId)?.id)) 
                      || (!userRoleId && setUserRoleId(userRolesData[0]?.id)));

    //userRolesData && !selectedDepartment && setSelectedDepartment(userRolesData[0]);
    userRolesData && ((userRoleId && setSelectedDepartment(userRolesData.find((userRole) => userRole.id === userRoleId))) 
                      || (!userRoleId && setSelectedDepartment(userRolesData[0])));
  }, [userRolesData]);

  return (
    <Box>
      <Grid container spacing={5}>
        <Grid item xs={3}>
        <Paper elevation={3} sx={{ width: "100%", p: 3 }}>
          <Stack justifyContent="space-between" alignItems="center">
          <Button startIcon={<AddIcon/>} 
            
            onClick={() => setOpenAdd(true)}
            >Add New Department</Button>
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
                  setSelectedDepartment(userRole);
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

                  <Paper elevation={3} sx={{ width: "100%", p: 4 }}>
                    <form onSubmit={onSubmitClick}>

                        <Stack sx={{ width: "100%", pb: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                        <Typography variant="h5" gutterBottom>
                            Department Name
                        </Typography>
                        <Button
                          disableElevation
                          variant={openEdit ? "contained" : "outlined"}
                          endIcon={<EditIcon />}
                          onClick={() => setOpenEdit(!openEdit)}
                        >
                          Edit
                        </Button>    
                </Stack> 
                        <Stack direction="row" spacing={2}>
                        <TextField
                        fullWidth
                        required
                        variant="outlined"
                        
                        placeholder="Department Name"
                        value={selectedDepartment?.name}
                        onChange={(e) => setSelectedDepartment({ ...selectedDepartment, name: e.target.value })}
                        />
                        </Stack>
                        <Stack direction="row" spacing={2} sx={{pt: 2}}>
                        <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Description"
                        value={selectedDepartment?.description}
                        onChange={(e) => setSelectedDepartment({ ...selectedDepartment, description: e.target.value })}
                        />
                        </Stack>
                        <Stack direction="row" spacing={2} sx={{pt: 2}}>
                        <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Contact Person Name"
                        value={selectedDepartment?.contactPersonName}
                        onChange={(e) => setSelectedDepartment({ ...selectedDepartment, contactPersonName: e.target.value })}
                        />
                        <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Contact Person Phone"
                        value={selectedDepartment?.contactPersonPhone}
                        onChange={(e) => setSelectedDepartment({ ...selectedDepartment, contactPersonPhone: e.target.value })}
                        />
                        </Stack>
              <Typography variant="h6" gutterBottom sx={{  pt: 4 }}>
                            Registered Users
                        </Typography> 
                        {usersData?.map((user,index) => (
               <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                {!user.isNew ? (
                             <List>
                             <ListItem>
                               <ListItemAvatar>
                                 <Avatar
                                   src={`${FILE_BASE_URL}/${user?.photoPath?.replace(
                                           "\\",
                                           "%5C"
                                         )}`
                                   }
                                 />
                               </ListItemAvatar>
                               <ListItemText primary={user.username} />
                             </ListItem>
                           </List>
                           ): (
                            <FormControl fullWidth margin="normal">
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
                           )}
                            {openEdit && (
                              <Stack direction="row" spacing={2}>
                                <Button
                                  variant="outlined"
                                  color="error"
                                  startIcon={<RemoveCircleOutlineIcon />}
                                  onClick={() => handleRemoveUser(index)}
                                  >Remove</Button>

                          </Stack>
                        )}
                        
                        </Stack>
                            ))}
                            {openEdit && (
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Button startIcon={<AddIcon/>} 
            onClick={handleAddNewMember}
            >Add New Member</Button>
            <Stack direction="row" spacing={2}>
            <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={handleDelete}
                    >
                      Delete Department
                    </Button>
            <LoadingButton 
            loading={updateDepartmentLoading || updateDepartmentUserLoading}
            variant="contained" type="submit" startIcon={<SaveIcon />}>Save Changes</LoadingButton>
           
                    </Stack>
            </Stack>
                            )}
                        
                    </form>
                    </Paper>

          </TableContainer>
          <Dialog open={open} onClose={handleCancelDelete}>
              <DialogTitle>Confirmation</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want remove all members and delete {selectedDepartment?.name}?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCancelDelete} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleConfirmDelete} color="secondary">
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog open={openAdd} onClose={handleCancelDelete}>
              <DialogTitle>Add New Department</DialogTitle>
              <DialogContent>

                <Stack sx={{minWidth: 500, minHeight: 300, pt: 3}} spacing={2}>
                <TextField
                fullWidth
                required
                variant="outlined"
                name="name"
                label="Department Name"
                value={formData.name}
                onChange={handleChangeAdd}
                />
                <TextField
                fullWidth
                variant="outlined"
                value={formData.description}
                label="Description"
                name="description"
                onChange={handleChangeAdd}
                />
                <TextField
                fullWidth
                variant="outlined"
                value={formData.contactPersonName}
                label="Contact Person Name"
                name="contactPersonName"
                onChange={handleChangeAdd}
                />
                 <TextField
                fullWidth
                type="number"
                name="contactPersonPhone"
                label="Contact Person Phone"
                variant="outlined"
                value={formData.contactPersonPhone}
                placeholder="Contact Person Phone"
                onChange={handleChangeAdd}
                />
                </Stack>
               
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCancelDelete} color="primary">
                  Cancel
                </Button>
                <LoadingButton
                loading={createDepartmentLoading}
                variant="contained" type="submit" onClick={onSubmitClickAdd} startIcon={<SaveIcon />}>Add</LoadingButton>
              </DialogActions>
            </Dialog>
        </Grid>
      </Grid>
    </Box>
  );
}
