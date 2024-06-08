import { Button } from "@mui/material";

import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

export default function Unauthorized()  {
    return (
        <Box>

          <Grid container spacing={5} justifyContent="center">
            <Grid item xs={5}>

                <Stack alignItems="center" spacing={2}>
                <Typography variant="h5" component="h4">
                UnAuthorized
                </Typography>
        

                <div>
                    <img src={"/unauth.svg"} width={300} height={300} alt="image" />
                </div>
                <div className="font-mono text-2xl mt-5 mb-5">
                    You are not authorized to access the selected resource,
                    <div> if you think this is a mistake, please contact the admin</div>
                </div>
               
                    <Link align="center" to="/" >
                        <Button variant="contained">back to home</Button>
                    </Link>
                
        

        </Stack>
        </Grid>
        </Grid>
        </Box>
    );
};
