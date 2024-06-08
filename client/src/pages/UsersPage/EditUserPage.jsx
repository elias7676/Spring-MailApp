import React, { useState, useEffect, useRef, Fragment } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { debounce } from "lodash";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  useGetUsersforChatQuery,
  useGetChatThreadQuery,
  useSendMessageMutation,
  useGetAllUsersQuery,
  useGetOneUserQuery
} from "../../features/api/apiSlice";
import { FILE_BASE_URL } from "../../constants/api_tags";
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll'
export default function EditUserPage() {
  const { id } = useParams();
  const [selectedUser, setSelectedUser] = useState(2);
  const [newMsg, setNewMsg] = useState("");
  const { user } = useSelector((state) => state.auth);


  const { data: Users, isLoading: usersLoading, refetch: refetchUsers } = useGetAllUsersQuery();
  const { data: currentUser, isLoading: currentUserLoading, refetch: refetchCurrentUser } = useGetOneUserQuery(id);

  const [sendMessage, { isLoading: sendMessageLoading }] =
    useSendMessageMutation();

  // const debouncedRefetch = debounce(refetchThreadData,refetchUsers, 100000);

  // const handleRefetchData = () => {
  //   debouncedRefetch();
  // };

  // handleRefetchData();

  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
    refetchUsers();
  //  setSelectedUser(threadData?.receiverUserAccountId)
  }, [Users]);


  const onSendMsgClick = async (e) => {
    e.preventDefault();
    // const data = {
    //   SenderUserId: user?.userId,
    //   ReceiverUserId: selectedUser,
    //   MessageBody: newMsg,
    // };
    // await sendMessage(data);
    // setNewMsg("");
  };

  return (
    <Grid container spacing={5}>
      {/* USERS */}
      <Grid item xs={3}>
        <Paper elevation={2} sx={{ p: 3, minHeight: "600px" }}>
          <Box>
            <Typography variant="h5" gutterBottom>
              Users
            </Typography>
          </Box>

          {Users?.map((user) => (
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
             {user.username}
            <Badge color="success" badgeContent={user.unreadMessageCount} sx={{ marginLeft: "auto" }}>
             
            </Badge>
          </Button>
          
          ))}
        </Paper>
      </Grid>

      {/* CHATS */}
      <Grid item xs={6}>
        <Box sx={{ p: 3, border: "1px solid #1976D2", borderRadius: 2 }}>
          <Stack spacing={2}>
            <Box
              ref={chatContainerRef}
              sx={{
                minHeight: "450px",
                maxHeight: "450px",
                overflowY: "scroll",
              }}
            >
              <Stack spacing={5}>
                {true && (
                  
                  <Typography>No Messages</Typography>
                )}
              </Stack>
            </Box>
            <form onSubmit={onSendMsgClick}>
              <Stack spacing={2}>
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
                />
                <Stack
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
        </Box>
      </Grid>

      {/* TEMPLATES */}
      <Grid item xs={3}>
        <Box>
          <Typography variant="h5" gutterBottom>
            Templates
          </Typography>
        </Box>
        <Stack spacing={3}>
          {[1, 2, 3].map((template) => (
            <Card variant="outlined">
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  onClick={() =>
                    setNewMsg(
                      "Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem"
                    )
                  }
                >
                  <ContentCopyIcon />
                </IconButton>
              </CardActions>
            </Card>
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
}
