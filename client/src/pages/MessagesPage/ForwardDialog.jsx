import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import AttachmentIcon from "@mui/icons-material/Attachment";

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

export default function ForwardDialog({setOpen, open, refetchThreadData, sendMessage, forwardedSubject, refetchConversations, forwardedMsg}) {
  const { user } = useSelector((state) => state.auth);
    const [file, setFile] = useState("");
    const [file2, setFile2] = useState("");
    const [file3, setFile3] = useState("");
    const { data: allUsersData, isLoading: allUsersLoading, refetch: refetchallUsers } =
    useGetAllUsersQuery();
    const [formDataz, setFormDataz] = useState({
        senderUserId: user?.userId,
        forwardedFromId: forwardedMsg?.senderUserAccountId,
        messageBody: forwardedMsg?.message,
        subject: `Fwd: ${forwardedSubject}`,
        receiverUserAccountId: [],
        receiverUserAccount: [],
        attachment1: '',
        attachment3: '',
        attachment2: ''
    
      });
      useEffect(() => {
        setFormDataz((prevData) => ({
            ...prevData,
            forwardedFromId: forwardedMsg?.senderUserAccountId,
            messageBody: forwardedMsg?.message,
            subject: `Fwd: ${forwardedSubject}`,
            attachment1: forwardedMsg?.attachment1,
            attachment3: forwardedMsg?.attachment3,
            attachment2: forwardedMsg?.attachment2
          }));
      }, [forwardedMsg, forwardedSubject]);

      const onSendMsgClick = async (e) => {
        e.preventDefault();
        // if (selectedUser === null) {
        //   toast.error("Please select a Conversation or Compose a new message");
        //   return;
        // }
    
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
        <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Forward Mail</DialogTitle>
        <form onSubmit={onSendMsgClick}>
        <Stack spacing={0.5} padding={2}>
        <Stack direction="row" paddingBottom={0} >
        <Typography variant="body1" sx={{ fontWeight: 600, pt:2 }}>
                          Fwd From: {forwardedMsg?.senderName}
                        </Typography>
        </Stack>
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
              disabled
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
              rows={7}
              disabled
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
                width={900}
                >
                  <Box width="33%" height={20}>
                  {forwardedMsg?.attachment1 && (
                              <Button
                              style={{
                                background: "none",
                                border: "none",

                              }}
                    endIcon={<AttachmentIcon />}
                              
                            >{forwardedMsg?.attachment1}</Button>
                    )}
                  </Box>
                  <Box width="33%" height={20}>
                  {forwardedMsg?.attachment2 && (
                              <Button
                              style={{
                                background: "none",
                                border: "none",

                              }}
                    endIcon={<AttachmentIcon />}
                              
                            >{forwardedMsg?.attachment2}</Button>
                    )}
                  </Box>
                  <Box width="33%" height={20}>
                  {forwardedMsg?.attachment3 && (
                              <Button
                              style={{
                                background: "none",
                                border: "none",

                              }}
                    endIcon={<AttachmentIcon />}
                              
                            >{forwardedMsg?.attachment3}</Button>
                    )}
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