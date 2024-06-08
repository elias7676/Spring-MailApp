import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BranchDropdown from "../../components/BranchDropdown";
import PageTitle from "../../components/PageTitle";
import { FILE_BASE_URL } from "../../constants/api_tags";
import { useGetEmployeesQuery } from "../../features/api/apiSlice";

const departmentLists = ["Math", "Social Science", "Natural Science", "KG"];

export default function EmployeesTab() {
  const navigate = useNavigate();
  const [branchData, setBranchData] = useState({});
  const [selectedValue, setSelectedValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { data: employeesData, isLoading: employeesDataLoading } =
    useGetEmployeesQuery(branchData?.id);

  const handleMenuItemClick = (e, value) => {
    setSelectedValue(value);
    setAnchorEl(null);
  };
  return (
    <Stack>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
        <Box>
          <PageTitle title={"Employees"} />
          <Typography variant="h5" gutterBottom>
            {selectedValue}
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <BranchDropdown setBranchData={setBranchData} />
          {/* <div>
            <Button
              disableElevation
              id="course-list"
              variant="outlined"
              onClick={(e) => setAnchorEl(e.currentTarget)}
              endIcon={<KeyboardArrowDownIcon />}
            >
              {selectedValue}
            </Button>
            <Menu
              id="course-list"
              anchorEl={anchorEl}
              open={open}
              onClose={() => setAnchorEl(null)}
              MenuListProps={{
                "aria-labelledby": "lock-button",
                role: "listbox",
              }}
            >
              {departmentLists?.map((department) => (
                <MenuItem
                  key={department}
                  selected={selectedValue === department}
                  onClick={(e) => handleMenuItemClick(e, department)}
                >
                  {department}
                </MenuItem>
              ))}
            </Menu> 
          </div>*/}
        </Stack>
      </Stack>
      <Grid container spacing={5}>
        {employeesData?.map((employee) => (
          <Grid item key={employee.id} xl={3} lg={4} md={6} sm={12}>
            <Paper
              elevation={3}
              sx={{ width: "100%", p: 2, cursor: "pointer" }}
              onClick={() => {
                navigate(`/employee/${employee.id}`);
              }}
            >
              <Stack direction="row" spacing={3}>
                <Avatar
                  src={FILE_BASE_URL + "/" + employee?.photoPath}
                  alt={employee?.firstName}
                  sx={{ width: 70, height: 70 }}
                />
                <Box>
                  <Typography variant="h5" gutterBottom>
                    {`${employee.firstName} ${employee.middleName}`}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {employee.jobPosition}
                  </Typography>
                 
                </Box>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
