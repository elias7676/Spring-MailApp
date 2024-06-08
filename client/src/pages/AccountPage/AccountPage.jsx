import { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import DialogContent from "@mui/material/DialogContent";
import SaveIcon from "@mui/icons-material/Save";
import { FILE_BASE_URL } from "../../constants/api_tags";
import {
  useChangePasswordMutation,useUploadFileMutation, useGetOneUserQuery
} from "../../features/api/apiSlice";

import FileDropzone from "../../components/FileDropzone";

export default function AccountPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [photoPath, setPhotoPath] = useState("");
  const [userId, setUserId] = useState(user?.user?.id);
  const [username, setUsername] = useState(user?.user?.username);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [file, setFile] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mailFooter, setMailFooter] = useState("");
  const [fullName, setFullName] = useState("");
  const [changePassword, { isLoading: changePasswordLoading }] =
  useChangePasswordMutation();
  const [submitFileUpload, { isLoading: isUploadLoading }] =
  useUploadFileMutation();
  const { data: userData, error: userError } = useGetOneUserQuery(user?.userId);
  useEffect(() => {
    setMailFooter(userData?.mailFooter);
    setFullName(userData?.fullName);
    setPhotoPath(userData?.photoPath);
  }, [userData]);
  // const getModifiedFullName = (fullName) => {
  //   const spaceIndex = fullName.indexOf(' ');
  //   if (spaceIndex !== -1) {
  //     return fullName.substring(0, spaceIndex) + '@digitalequb.com';
  //   } else {
  //     return fullName + '@digitalequb.com';
  //   }
  // };
  console.log(user);
  const onSubmitClick = async (e) => {
    e.preventDefault();
    

    if (!username || !password || !newPassword) {
      toast.error("Please fill required fields");
      return;
    }
   
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const changePasswordData = {
      username: user?.username,
      password: password,
      newPassword: confirmPassword,
      gender:"",
      fullName: "",
      mailFooter: mailFooter,
      
    };
    const formData2 = new FormData();
    formData2.append("fileName", file[0]);
    const savedImg = file[0] && (await submitFileUpload(formData2));
    
    if (savedImg?.error?.originalStatus == 200) {
      changePasswordData.photoPath = savedImg?.error.data;
    } 
    
      
      const res = await changePassword(changePasswordData);
     
        toast.success(res.error.data);
      // else
      //   toast.success("Successfully changed password");

  };

  return (
    <Box>
      <Grid container spacing={5} justifyContent="center">
        <Grid item xs={10}>
          <form onSubmit={onSubmitClick}>
            <Paper sx={{ width: "100%", p: 5, pt: 4 }}>
            
                <Typography variant="h4" gutterBottom>
                  My Account
                </Typography>
                

                {/* IMG */}
                <Stack
                  direction="row"
                  
                >
                  <Avatar
                   sx={{ width: 100, height: 100 }} 
                              src={file[0]?.preview ? file[0]?.preview : `${FILE_BASE_URL}/${photoPath?.replace(
                                "\\",
                                "%5C"
                              )}`}
                            />
                            <Box width="100%" height={100}>
                    <FileDropzone setFile={setFile} />
                  </Box>

                </Stack>
                <DialogContent sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                <TextField
               
                fullWidth
                margin="normal"
                label="Full Name"
                name="fullName"
                disabled
                value={user?.fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <TextField
                fullWidth
                margin="normal"
                label="User Name"
                name="fullName"
                value={user?.username}
                disabled
              />
              <TextField
                fullWidth
                margin="normal"
                label="Message Footer"
                name="mailFooter"
                value={mailFooter}
                onChange={(e) => setMailFooter(e.target.value)}
              />
                </div>
                <div style={{ flex: 1 }}>
                <TextField
                  type="password"
                  id="password"
                  fullWidth
                  label="Old Password"
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              <TextField
                  type="password"
                  id="newPassword"
                  fullWidth
                  label="New Password"
                  margin="normal"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />

                <TextField
                  type="password"
                  id="confirmPassword"
                  fullWidth
                  label="Confirm Password"
                  margin="normal"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                </div>

                
                </DialogContent>
                <LoadingButton
                  type="submit"
                  size="large"
                  variant="contained"
                   loading={changePasswordLoading}
                  startIcon={<SaveIcon />}
                >
                  Update
                </LoadingButton>

            </Paper>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
}
