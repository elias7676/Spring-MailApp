import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { toast } from "react-toastify";
import MailFileDropzone from "../../components/MailFileDropzone";
import DownloadAttachment from "../../components/DownloadAttachment";

import { useSelector } from "react-redux";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import {
  useGetChatThreadQuery,
  useSendMessageMutation,
  useGetConversationsforChatQuery,
  useUploadFileMutation
} from "../../features/api/apiSlice";
import { FILE_BASE_URL } from "../../constants/api_tags";
import DoneIcon from '@mui/icons-material/Done';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import DoneAllIcon from '@mui/icons-material/DoneAll'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import PeopleOutlineTwoToneIcon from "@mui/icons-material/PeopleOutlineTwoTone";
import ComposeDialog from "./ComposeDialog"
import ForwardDialog from "./ForwardDialog"

export default function MessagesPage() {
  
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMsg, setNewMsg] = useState("");
  const [forwardedMsg, setForwardedMsg] = useState("");
  const [forwardedSubject, setForwardedSubject] = useState("");

  const [file, setFile] = useState([]);
  const [file2, setFile2] = useState("");
  const [file3, setFile3] = useState("");
  const [open, setOpen] = useState(false);
  const [openForward, setOpenForward] = useState(false);
  const [files, setFiles] = useState([]);



  const { user } = useSelector((state) => state.auth);


  const { data: conversations, isLoading: usersLoading, refetch: refetchConversations } = useGetConversationsforChatQuery(
    user?.userId, { pollingInterval: 2000 } );
  const [sendMessage, { isLoading: sendMessageLoading }] =
    useSendMessageMutation();
    const [submitFileUpload, { isLoading: isUploadLoading }] =
    useUploadFileMutation();

    const {
      data: threadData,
      isLoading: threadDataLoading,
      refetch: refetchThreadData,
    } = useGetChatThreadQuery({
      senderId: selectedUser,
      receiverId: user?.userId,
    });


    
  // const debouncedRefetch = debounce(refetchThreadData,refetchConversations, 1000);

  // const handleRefetchData = () => {
  //   debouncedRefetch();
  // };

  // handleRefetchData();

  const chatContainerRef = useRef(null);
  const textFieldRef = useRef(null);
  // const scrollToBottom = () => {
  //   window.scrollTo({
  //     top: document.documentElement.scrollHeight,
  //     behavior: 'smooth' // Optionally, use 'auto' instead of 'smooth' for instant scrolling
  //   });
  // }
  const scrollToBottom2 = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight - 750, // Adjust the value as needed
      behavior: 'smooth' // Optionally, use 'auto' instead of 'smooth' for instant scrolling
    });
  }
  
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
      textFieldRef.current.focus();
    }
  };
  

  useEffect(() => {
    scrollToBottom();
     refetchConversations();
    //refetchThreadData();
   //  setSelectedUser(threadData?.receiverUserAccountId)
   }, [threadData, selectedUser]);

  useEffect(() => {
   // scrollToBottom();
    //refetchConversations();
   refetchThreadData();
  //  setSelectedUser(threadData?.receiverUserAccountId)
  }, [conversations]);
  
  const removeFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };
  const onSendMsgClick = async (e) => {
    e.preventDefault();
    if (selectedUser === null) {
      toast.error("Please select a Conversation or Compose a new message");
      return;
    }

    const data = {
      senderUserId: user?.userId,
      threadId: selectedUser,
      messageBody: newMsg,
      attachment: [],
      subject: threadData?.users?.subject,
      receiverUserAccountId: threadData?.users?.users?.map((user) => user.id),
      // "forwardedFromId": 0,
    };

    if(files?.length>0){
 
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append("fileName", files[i]);
      const savedImg = files[i] && (await submitFileUpload(formData));
      if (savedImg?.error?.data) {
        data.attachment.push(savedImg?.error?.data);
      } 
    }
    
  }
  
    await sendMessage(data);
    setNewMsg("");
    refetchConversations();
    scrollToBottom();
  };
  
  useEffect(() => {
   ((selectedUser === null && conversations && setSelectedUser(conversations[0]?.id)) || (conversations && setSelectedUser(conversations.find((userRole) => userRole.id === selectedUser)?.id)));
   ((selectedUser === null && conversations && setForwardedSubject(conversations[0]?.subject)) || (conversations && setForwardedSubject(conversations.find((userRole) => userRole.id === selectedUser)?.subject)));
  }, [conversations]);
  return (
    <Grid container spacing={5}>
      {/* USERS */}
      <Grid item xs={3}>
        <ComposeDialog 
        setOpen={setOpen} open={open} sendMessage={sendMessage} 
        refetchThreadData={refetchThreadData} submitFileUpload={submitFileUpload}
        refetchConversations={refetchConversations} />
        <ForwardDialog 
        setOpen={setOpenForward} open={openForward} sendMessage={sendMessage} 
        refetchThreadData={refetchThreadData} forwardedSubject={forwardedSubject}
        refetchConversations={refetchConversations} forwardedMsg={forwardedMsg}/>
        <Box

            >
        <Paper elevation={2} sx={{ p: 3}}>
          <Box              
           >
          <Stack justifyContent="space-between" alignItems="center">
          <Button startIcon={<ContentPasteIcon/>} 
            
           onClick={() => setOpen(true)}
             >Compose</Button>
             
            <Typography variant="h5" gutterBottom>
              Conversations
            </Typography>
            </Stack>
          </Box>

          {/* {conversations?.map((user) => (
            <Button
            fullWidth
            variant={selectedUser === user.id ? "contained" : "outlined"}
            sx={{ mb: 2, justifyContent: "flex-start", display: "flex", alignItems: "center" }}
            onClick={() => setSelectedUser(user.id)}
          >
            <Avatar
              src={`${FILE_BASE_URL}/${user.photoPath?.replace("\\", "%5C")}`}
              alt="R"
              sx={{ mr: 2 }}
            />
             {user.userName}
            <Badge color="success" badgeContent={user.unreadMessageCount} sx={{ marginLeft: "auto" }}>
             
            </Badge>
          </Button>
          
          ))} */}
           <Box 
           sx={{  minHeight: "400px" ,overflowY: "scroll",maxHeight: "400px",}}             
           >
                    {conversations?.map((thread) => (
  <Button
    key={thread.id}
    fullWidth
    variant={selectedUser === thread.id ? "contained" : "outlined"}

    sx={{ mb: 2, justifyContent: "flex-start", display: "flex", alignItems: "center", textTransform: "none", position: "relative" }}
    onClick={() => {setSelectedUser(thread.id); setForwardedSubject(thread.subject)}}
  >
    <Stack>
  <Typography 
  fontWeight={selectedUser === thread.id ? 800 : 600}
sx={{ marginRight: "auto" }}
  variant="subtitle1" >
    {thread.subject.substring(0, 25)}
  </Typography>
  <Stack direction="row" spacing={2}>

  <Typography variant="body2" sx={{ fontWeight: 400 }}>
      {thread.lastMessageSender}: {thread.lastMessage.substring(0, 18)}
    </Typography>
    <Stack justifyContent="space-between" direction="row" alignItems="center" sx={{ marginLeft: "auto" ,pt:4}}>
    <Typography variant="body2" color="text.secondary" sx={{ position: "absolute", bottom: 0, right: 0, pt:2 }}>
      {new Date(thread.lastMessageDate).toLocaleTimeString()}
    </Typography>
    
  </Stack>
  </Stack>
</Stack>
    {!thread.readTime && thread.lastMessageSenderId !== user.userId && (
    <Badge color="success"  fontSize="3" badgeContent="" sx={{ marginLeft: "auto" }}>
      {/* Add any icon or indicator here */}
    </Badge>
    )}
  </Button>
))}</Box>

        </Paper>
        </Box>
      </Grid>

      {/* CHATS */}
      <Grid item xs={9}>
        <Box    sx={{ p: 3, border: "1px solid #1976D2", borderRadius: 2 }}>
          {threadData ? (
          <Stack 
          spacing={1}>
            <Box
   sx={{  minHeight: "400px" ,overflowY: "scroll",maxHeight: "400px",}}   
   ref={chatContainerRef} 
            >
              
              <Stack spacing={3} fullWidth>
          {/* Sender Section */}
          <Stack direction="row">
            
              <PeopleOutlineTwoToneIcon  />:
              <Typography sx={{pl:5}}>
             {threadData?.users?.users?.map((user) => `${user.fullName}, `)}
             </Typography>
            
          </Stack>
          
          {/* Subject Section */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            Subject: {threadData?.users?.subject}
          </Typography>
          <Button 
            startIcon={<ReplyAllIcon />}
            onClick={scrollToBottom}
          >
            Reply
          </Button>
        </Stack>

                {threadData?.length === 0 && (
                  
                  <Typography>No Messages</Typography>
                )}
                {threadData?.threads?.map((msg, index) => {
                  const currentDate = new Date(
                     msg.updatedAt
                  ).toLocaleDateString();
                  const previousDate =
                    index > 0
                      ? new Date(
                        threadData.threads[index - 1].updatedAt
                        ).toLocaleDateString()
                      : "";

                  return (
                    <React.Fragment key={msg.id}>
                      {currentDate !== previousDate && (
                        <Typography variant="caption" gutterBottom>
                          {currentDate}
                        </Typography>
                      )}
                      <Stack
                      fullWidth
                        direction={
                          msg.senderUserAccountId === user?.userId
                            ? "row"
                            : "row"
                        }
                        spacing={2}
                        alignItems="center"
                      >
                        {/* Message content */}
                        
                        <Avatar
                          src={ `${FILE_BASE_URL}/${msg?.senderPhotoPath?.replace(
                            "\\",
                            "%5C"
                          )}`}
                          alt={msg.senderName.substring(0, 1)}
                        />

              <Paper elevation={2} sx={{ p: 2 ,justifyContent: "space-between", width: "90%",flexGrow: 4 }}>
               <Stack        >
            
                    
                      <Typography variant="body2" color="text.secondary" >
                        {`${msg.senderName} <${msg.senderUserName}>`}
                      { msg.forwardedFromId ? (` From ${msg.forwardedFromId && msg.forwardedFrom }`): ""}
                      </Typography>

                  <Typography variant="body1" gutterBottom>
                    {msg.message}
                  </Typography>
                  <Stack  sx={{borderTop  : '3px solid skyblue'}}>
                    {msg.attachments?.length > 0 && 
                    msg.attachments.map((attachment,index) => (
                      <>
                      {/* {index < 1 && (
                      <AttachFileIcon color="primary" />
                      )} */}
                     
                  <DownloadAttachment
                  startIcon={<DoneIcon />}
                  key={attachment.id}
                        name={attachment.attachment}
                      />
                      
                      </>
                      ))}
              </Stack>
              <Typography align="center"  gutterBottom sx={{ fontStyle: 'italic', fontWeight: 'bold' }}>
              {msg.mailFooter}
            </Typography>

               <Stack direction="row"  justifyContent="space-between" alignItems="center" spacing={1} >
                  <Typography variant="caption" gutterBottom>
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </Typography>
               
                  <Button
                  onClick={() => {setForwardedMsg(msg); setOpenForward(true)}}
                  
                  >
                    <ArrowCircleRightIcon
                    
                    style={{marginLeft:"auto", fontSize: 25, color: "#999", p:0 }} />
                    </Button>
                </Stack>
                </Stack>
              </Paper>


                      </Stack>
                    </React.Fragment>
                  );
                })}
              </Stack>
            </Box>
            <form onSubmit={onSendMsgClick}>
              <Stack   position="fixed" bottom={1} width="65%" spacing={2}>
                <TextField
                  fullWidth
                  required
                  rows={2}
                  multiline
                  id="newMsg"
                  label="Write Message"
                  name="newMsg"
                  value={newMsg}
                  onChange={(e) => setNewMsg(e.target.value)}
                  inputRef={textFieldRef}
                />
                                <Stack
                  direction="row"

                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box width="33%" height={20}>
                  <Stack spacing={1}>
                  {files.length > 0 ? (

    <Stack alignItems="center" direction="row" >
    {files.map((file, index) => (
      <div key={file.path}>
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
       
        </div>
    ))}
     <MailFileDropzone setFile={setFiles} />
    </Stack>
  
) : (<> <MailFileDropzone setFile={setFiles} /></>)}



      
    </Stack>
                  </Box>
                  {/* <Box width="33%" height={20}>
                  {file2?.length>0 ? (
                              <button
                              onClick={() => setFile2(null)}
                              style={{

                                background: "none",
                                border: "none",

                              }}
                            >X {file2[0]?.name}</button>
                    ): (
                    <MailFileDropzone setFile={setFile2} />
                    )}
                  </Box>
                  <Box width="33%" height={20}>
                  {file3?.length>0 ? (
                              <button
                              onClick={() => setFile3(null)}
                              style={{

                                background: "none",
                                border: "none",

                              }}
                            >X {file3[0]?.name}</button>
                    ): (
                    <MailFileDropzone setFile={setFile3} />
                    )}
                  </Box> */}
                </Stack>
                <Stack
                sx={{pt:2}}
              
                spacing={3}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="caption" component="div" gutterBottom>
                    {new Date().toLocaleDateString()}
                  </Typography>
                  <LoadingButton
                    type="submit"
                    loading={false}
                    variant="contained"
                    endIcon={<SendIcon />}
                  >
                    Send
                  </LoadingButton>
                </Stack>

              </Stack>
            </form>
          </Stack>
          ): (
            <Typography align="center" variant="h6">Select a conversation to view messages</Typography>
          )}
        </Box>
      </Grid>

      {/* TEMPLATES */}

    </Grid>
  );
}
