import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { userLogin } from "../../features/auth/authSlice";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, errorMsg, user } = useSelector(
    (state) => state.auth
  );

  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
      toast.success("Welcome Back!");
    }

    isError && toast.error(errorMsg);
  }, [isSuccess, isError]);

  const onSubmitClick = (e) => {
    e.preventDefault();

    if (!userName || !password) {
      toast.error("Please fill required fields");
      return;
    }

    dispatch(userLogin({ userName, password }));
  };

  return (
    <Box>
      <form onSubmit={onSubmitClick}>
        <Grid container spacing={5} justifyContent="center">
          <Grid item xs={5}>
            <Paper
              elevation={3}
              sx={{ padding: { xs: 2, sm: 4 }, paddingTop: { xs: 6 } }}
            >
              <Stack alignItems="center" spacing={4}>
                <Typography variant="h5" component="h4">
                  Login
                </Typography>

                <TextField
                  fullWidth
                  type="text"
                  label="Username"
                  variant="standard"
                  value={userName}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  fullWidth
                  type="password"
                  label="Password"
                  variant="standard"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <LoadingButton
                  fullWidth
                  type="submit"
                  variant="contained"
                  loading={isLoading}
                >
                  Login
                </LoadingButton>

                <Link to="/signup">Sign Up</Link>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
