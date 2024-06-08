import CircleIcon from "@mui/icons-material/Circle";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Loading from "../../components/Loading";
import { REPORT_COLORS } from "../../constants/api_tags";
import {
  useGetAcademicEventsQuery,
  useGetReportOtherQuery,
  useGetAllUsersQuery,
  useGetAllDepartmentsQuery
} from "../../features/api/apiSlice";
import GeneralStats from "./GeneralStats";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const [value, setValue] = useState(new Date());
  const [highlightedDays, setHighlightedDays] = useState([1, 2, 15]);
  const { data: usersData, isLoading: usersDataLoading } =
  useGetAllUsersQuery();
  const { data: departmentsData, isLoading: departmentsDataLoading } = useGetAllDepartmentsQuery();

  const handleDateChange = (newValue) => {
    setValue(newValue);
    navigate(
      `/notice-board?startDate=${new Date(
        new Date(newValue).setHours(0, 0, 0, 0)
      )}&endDate=${new Date(new Date(newValue).setHours(23, 0, 0, 0))}`
    );
  };


  const pieData = [
    { name: "Elementary", value: 3 },
    { name: "Middle", value: 5 },
    { name: "High", value: 10 },
  ];

  return (
    <Grid container spacing={3}>
        <Grid item xs={4}>
          <Card elevation={3} sx={{ maxWidth: 345 }}>

              <CardMedia
                component="img"
                height="140"
                image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
              />
              <CardContent>
              <Stack sx={{ width: "100%", pb: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={2}>

              <Typography gutterBottom variant="h6" component="div">
              Number Of Users
</Typography>
                
              <Typography gutterBottom variant="h6" component="div">
  {usersData && usersData.length}
</Typography>
</Stack>

              </CardContent>

          </Card>
          
        </Grid> 
        <Grid item xs={4}>
          <Card elevation={3} sx={{ maxWidth: 345 }}>

              <CardMedia
                component="img"
                height="140"
                image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
              />
              <CardContent>
              <Stack sx={{ width: "100%", pb: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={2}>

              <Typography gutterBottom variant="h6" component="div">
              Number Of Departments
</Typography>
                
              <Typography gutterBottom variant="h6" component="div">
  {departmentsData && departmentsData.length}
</Typography>
</Stack>

              </CardContent>

          </Card>
          
        </Grid> 
              </Grid>
  );
}
