import { useState } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import EmployeesTab from "./EmployeesTab";
import AddEmployeeTab from "./AddEmployeeTab";

export default function EmployeesPage() {
  const { user } = useSelector((state) => state.auth);
  const [value, setValue] = useState("employees");

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <TabList onChange={(e, newValue) => setValue(newValue)}>
         
            <Tab label="Employees" value="employees" />
            {user?.authorities?.some(auth => auth?.authority == "employee.create") &&(
     
            <Tab label="Add Employee" value="addEmployee" />)}
          

        </TabList>

        <TabPanel value="employees" sx={{ px: 0 }}>
          <EmployeesTab />
        </TabPanel>
        
        <TabPanel value="addEmployee" sx={{ px: 0 }}>
          <AddEmployeeTab setValue={setValue} />
        </TabPanel>
        

      </TabContext>
    </Box>
  );
}
