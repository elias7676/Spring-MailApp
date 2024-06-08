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
  useUpdateUserPermissionMutation,
  useGetAllPermissionsQuery
} from "../../features/api/apiSlice";

export default function PermissionsPage() {
  const dispatch = useDispatch();
  const [userRole, setUserRole] = useState({});
  const [roleName, setRoleName] = useState("");

  const { data: userRolesData, isLoading: userRolesLoading , refetch: refetchUserRoles } =
    useGetUserRolesQuery();
  const [updateUserRole, { isLoading: updateUserRoleLoading }] =
    useUpdateUserPermissionMutation();
  const [deleteUserRole, { isLoading: isDeleteUserRoleLoading }] =
    useDeleteUserRoleMutation();
    const { data: allPermsData, isLoading: allUsersLoading, refetch: refetchallUsers } =
    useGetAllPermissionsQuery();

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

  const handleChangeGroup = (role, event) => {
    event.persist();

    setFormState((prev) =>
      prev.map((current, currentIndex) => {
        if (current == role) {
          var newPermissions = {};

          for (var perm in current.permissions)
            newPermissions[perm] = event.target.checked;

          return {
            ...current,
            permissions: newPermissions,
          };
        }
        return current;
      })
    );
  };

  const onSubmitClick = async (e) => {


    e.preventDefault();
      
    const newArray = [];
    for (const [key, value] of Object.entries(formState)) {
      for (const [key2, value2] of Object.entries(value)) {
        
        if (value2.checked) {
          newArray.push(value2.id);
        }
      }
    }

    
     const data = {
    permissions: newArray,
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
  const handleMainGroupChange = (role, event) => {
    const isChecked = event.target.checked;
    const updatedFormState = { ...formState };
  
    // Update all sub-items of the main group
    updatedFormState[role] = updatedFormState[role].map(subObject => ({
      ...subObject,
      checked: isChecked
    }));
  
    setFormState(updatedFormState);
  };
  
  // Function to handle changes for the sub-group switches
  const handleSubGroupChange = (role, subIdx, event) => {
    const isChecked = event.target.checked;
    const updatedFormState = { ...formState };
  
    // Update the specific sub-item of the main group
    updatedFormState[role][subIdx] = {
      ...updatedFormState[role][subIdx],
      checked: isChecked
    };
  
    setFormState(updatedFormState);
  };
  useEffect(() => {
    if (!allPermsData || !userRole) return;
    // Initialize an object to store grouped data
const groupedData = {};

// Iterate over each item in allPermsData
allPermsData.forEach(perm => {
  // Extract the common substring
  const groupKey = perm.permission.substring(0, perm.permission.indexOf('.'));

  // Extract the substring for sub-objects
  const subObjectValue = perm.permission.substring(perm.permission.indexOf('.') + 1);

  // Check if the group already exists in groupedData
  if (!groupedData[groupKey]) {
    // If the group doesn't exist, create a new array for sub-objects
    groupedData[groupKey] = [];
  }

  // Add the sub-object to the array
  groupedData[groupKey].push({ subObject: subObjectValue, checked:

    // authorities.permission includes perm.permission
    userRole.authorities?.some(authority => authority.permission === perm.permission)
    , id: perm.id
   });
});
setFormState(groupedData);

    

  }, [allPermsData,userRole]);

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
          {formState &&
      Object.entries(formState).map(([role, subObjects], idx) => (
                  <>
                    <Grid item xs={12} pt={idx && 3} pb={1}>
                      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        {role}{" "}
                        <Switch
                          sx={{ mb: 0.5 }}
                          name={role}
                          onChange={(event) => handleMainGroupChange(role, event)} // Handle main group change
                          checked={Object.values(subObjects).every(
                          (x) => x.checked == true
                        )}
                        />
                      </Typography>
                    </Grid>

                    {subObjects.map((subObject, subIdx) => (
                          <Grid
                            item
                            md={6}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            {subObject.subObject
                            && humanizeString(subObject.subObject)
                          }
                            <Switch
                              name={subIdx}
                              disabled={false}
                              checked={subObject.checked} // Assuming you have a 'checked' property in subObject
                              onChange={(event) => handleSubGroupChange(role, subIdx, event)} // Handle sub group change
                            />
                          </Grid>
                        )
                    )}
                  </>
                ))}
            </Grid>

            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>

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