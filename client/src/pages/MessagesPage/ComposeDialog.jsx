import { useState } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import MailFileDropzone from "../../components/MailFileDropzone";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  Select,
  MenuItem} from '@mui/material';
import {
    useGetAllUsersQuery,
  } from "../../features/api/apiSlice";

export default function ComposeDialog({setOpen, open, refetchThreadData, sendMessage, submitFileUpload, refetchConversations}) {
  const { user } = useSelector((state) => state.auth);
    const [file, setFile] = useState("");
    const [file2, setFile2] = useState("");
    const [file3, setFile3] = useState("");
    const [arr, setArr] = useState([]);
    const [files, setFiles] = useState([]);
    const { data: allUsersData, isLoading: allUsersLoading, refetch: refetchallUsers } =
    useGetAllUsersQuery();
    const [formDataz, setFormDataz] = useState({
        senderUserId: user?.userId,
        messageBody: '',
        subject: '',
        receiverUserAccountId: [],
        receiverUserAccount: [],
        attachment: [],
        attachment1: '',
        attachment3: '',
        attachment2: ''
    
      });
      const removeFile = (index) => {
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
      };

      const onSendMsgClick = async (e) => {
        e.preventDefault();
        // if (selectedUser === null) {
        //   toast.error("Please select a Conversation or Compose a new message");
        //   return;
        // }
    
        if(files?.length>0){
 
          for (let i = 0; i < files.length; i++) {
            const formData = new FormData();
            formData.append("fileName", files[i]);
            const savedImg = files[i] && (await submitFileUpload(formData));
            if (savedImg?.error?.data) {
              formDataz.attachment.push(savedImg?.error?.data);
            } 
          }
          
        }
        await sendMessage(formDataz);
        setOpen(false);
        refetchThreadData();
        refetchConversations();
      };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if(name==="receiverUserAccountId"){
        setFormDataz((prevFormDataz) => ({
        ...prevFormDataz,
        receiverUserAccountId: value,
        }));
        
        }
        else{
        setFormDataz((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    }
      };

    return (
        <Dialog sx={{minHeight: 600}} open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Compose New Mail</DialogTitle>
        <form onSubmit={onSendMsgClick}>
        <Stack spacing={0.5} padding={2} >
        <Stack direction="row" paddingBottom={0} >
                        
                        <Typography variant="body1" sx={{ fontWeight: 600, pt:2 }}>
                          To: 
                        </Typography>
                        <FormControl fullWidth margin="normal" 
              sx={{border:'0px', pr: 2, pl: 6}}
              >
                            <Select
                            name="receiverUserAccountId"
                            value={formDataz?.receiverUserAccountId || []}
                            onChange={handleChange}
                            multiple // Enable multi-select
                            className="asset-select"
                            >
                            {allUsersData &&
                                allUsersData
                                .filter((role) => user.userId !== role.id)
                                .map((role) => (
                                    <MenuItem key={role.id} value={role.id}>
                                    {role.fullName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
            
                                  </Stack>
                  <Stack direction="row" paddingBottom={0} >
                        
            <Typography variant="body1" sx={{ fontWeight: 600, pt:2 }}>
              Subject: 
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={2}
            //   style={{border: 0}}
              sx={{border:'0px', pr: 2, pl: 2}}
              margin="normal"
              name="subject"
              value={formDataz.subject}
              onChange={handleChange}
            />

                      </Stack>
                      <Stack
                      padding={0}
                      sx={{ pt:0 }}
                        direction="row" 
                      >
            <Typography variant="body1" sx={{ fontWeight: 600, pt:2 }}>
              Message: 
            </Typography>
            <TextField
              fullWidth
              required
              multiline
              rows={3}
              margin="normal"
              name="messageBody"
              sx={{border:'0px', pr: 2, pl: 2}}
              value={formDataz.messageBody}
              onChange={handleChange}
            />
            </Stack>
            </Stack>
        <DialogContent sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
          
        <Stack
                  direction="row"
                width={900}

                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box width="33%" height={20}>
                  {files.length > 0 ? (

<Stack alignItems="center" direction="row" >
{files.map((file, index) => (
  <>
    <button
      onClick={() => removeFile(index)}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      X {file.path}
    </button>
   
    </>
))}
 <MailFileDropzone setFile={setFiles} />
</Stack>

) : (<> <MailFileDropzone setFile={setFiles} /></>)}
                  </Box>

                  
                </Stack>
    
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <LoadingButton
                    type="submit"
                    loading={false}
                    variant="contained"
                    endIcon={<SendIcon />}
                  >
                    Send
                  </LoadingButton>
        </DialogActions>
        </form>

      </Dialog>
        );
    }