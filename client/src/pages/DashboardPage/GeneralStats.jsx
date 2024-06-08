import BadgeIcon from "@mui/icons-material/Badge";
import CategoryIcon from "@mui/icons-material/Category";
import Groups3Icon from "@mui/icons-material/Groups3";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import SchoolIcon from "@mui/icons-material/School";
import StairsIcon from "@mui/icons-material/Stairs";
import { CardHeader, Grid, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
  root: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 150px)",
    gap: "16px",
    padding: "16px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  card: {
    backgroundColor: "#faf0a2 ",
    color: "#333",
    borderRadius: "12px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "8px",
    marginBottom: "10px",
    transition: "box-shadow 0.3s ease-in-out",
    "&:hover": {
      boxShadow: "0px 6px 16px rgba(0, 0, 0, 1.0)",
    },
  },
  title: {
    fontSize: "1rem",
    fontWeight: "bold",
    marginBottom: "4px",
    textAlign: "center",
    fontFamily: "Courier Prime, monospace",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  blinkingText: {
    animation: "$blink 5s infinite",
  },
  "@keyframes blink": {
    "0%, 100%": {
      opacity: 1,
    },
    "50%": {
      opacity: 0.25,
    },
  },
});

const GeneralStats = ({ otherReport }) => {
  const classes = useStyles();
  const icons = [
    <SchoolIcon sx={{ fontSize: 80, color: "#0088FE" }} />,
    <CategoryIcon sx={{ fontSize: 80, color: "#00C49F" }} />,
    <StairsIcon sx={{ fontSize: 80, color: "#FFBB28" }} />,
    <LocalLibraryIcon sx={{ fontSize: 80, color: "#FF8042" }} />,
    <BadgeIcon sx={{ fontSize: 80, color: "#FF6F61" }} />,
    <Groups3Icon sx={{ fontSize: 80, color: "#6A0572" }} />,
  ];

  // <Grid container spacing={2}>
  //   {cardTitles.slice(0, 3).map((title, index) => (
  //     <Grid item key={index} xs={4}>
  //       <Card
  //         elevation={0}
  //         className={classes.card}
  //         style={{ borderBottomColor: cardColors[index] }}
  //       >
  //         <CardHeader
  //           title={title}
  //           sx={{ textAlign: "left" }}
  //           className={classes.title}
  //         />
  //         <CardContent className={classes.content}>
  //           <Grid container alignItems="center">
  //             <Grid item xs={8} style={{ textAlign: "left" }}>
  //               <div>
  //                 <Typography variant="h3" className={classes.blinkingText}>
  //                   {contents[index]}
  //                 </Typography>
  //               </div>
  //             </Grid>
  //             <Grid item xs={4}>
  //               {icons[index]}
  //             </Grid>
  //           </Grid>
  //         </CardContent>
  //       </Card>
  //     </Grid>
  //   ))}
  // </Grid>;
  const buildCard = (key, value, index) => {
    return (
      <Card elevation={2} sx={{ px: 1, py: 1, width: 270, m: 1 }}>
        <CardHeader
          title={key}
          sx={{ textAlign: "left" }}
          className={classes.title}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            pt: 3,
            textAlign: "center",
          }}
        >
          <Grid container alignItems="center">
            <Grid item xs={8} style={{ textAlign: "left" }}>
              <div>
                <Typography variant="h3" className={classes.blinkingText}>
                  {value}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={4}>
              {icons[index]}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };

  return (
    <Stack direction="row" flexWrap="wrap" mb={2}>
      {buildCard("Branches", otherReport?.branches ?? "", 0)}
      {buildCard("Enrolled In Year", otherReport?.enrolledInYear ?? "", 1)}
      {buildCard("Grade Categories", otherReport?.gradeCategories ?? "", 2)}
      {buildCard("Grades", otherReport?.grades ?? "", 3)}
      {buildCard("Staff", otherReport?.staff ?? "", 4)}
      {buildCard("Students", otherReport?.students ?? "", 5)}
    </Stack>
  );
};

export default GeneralStats;
