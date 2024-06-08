import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import { useState } from "react";
import { useSelector } from "react-redux";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { makeStyles } from "@material-ui/core/styles";
import "./App.css";
import NavBar from "./components/layouts/NavBar";
import SideBar from "./components/layouts/SideBar";
import { ProtectedRoute } from "./helpers/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import FirstTimeLoginPage from "./pages/LoginPage/FirstTimeLoginPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MessagesPage from "./pages/MessagesPage/MessagesPage";
import UsersPage from "./pages/UsersPage/UsersPage";
import EditUserPage from "./pages/UsersPage/EditUserPage";
import AccountPage from "./pages/AccountPage/AccountPage";
import DepartmentsPage from "./pages/DepartmentsPage/DepartmentsPage";
import UserRolesPage from "./pages/UserRolesPage/UserRolesPage";
import PermissionsPage from "./pages/PermissionsPage/PermissionsPage";
import Unauthorized from "./pages/Unauthorized";
import EmployeeDetailPage from "./pages/EmployeesPage/EmployeeDetailPage";
import EmployeesPage from "./pages/EmployeesPage/EmployeesPage";
import ListDocumentation from "./pages/DocumentationPage/ListDocumentation";


const theme = createTheme({
  palette: {
    background: {
      default: "#F5F5F5",
    },
     primary: { main: "#32BA86" }, //A77E29, 4CAA6E
     secondary: { main: "#FFFFFF" },
     warning: { main: "#A27E28" },


    gradient: {
      main: "linear-gradient(-39deg, #4bc1ff 0%, #4991f8 100%)",
      mainChannel: "0 0 10",
      light: "linear-gradient(135deg, #4aaffd 0%, #4992f8 100%)",
      lightChannel: "0 0 10",
      dark: "linear-gradient(135deg, #4cc2ff 0%, #4aa0fa 100%)",
      darkChannel: "0 0 10",
      error: "linear-gradient(-39deg, #ff0000 0%, #ff8c8c 100%)",
      errorChannel: "0 0 10",
      contrastText: "#fff",
      contrastTextChannel: "0 0 10",
    },
  },
  DialogTitle: { color: "red" },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  backgroundColor: "#32BA86",// A77E29  ,4CAA6E

  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const DrawerHeader2 = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export const useStyles = makeStyles(() => ({
  // dropZone: {
  //   minHeight: "50px !important",
  // },
  dropZone: {
    "& p": { margin: "5px", fontSize: 18 },
    "& svg": { height: "30px", width: "30px" },
    minHeight: "50px !important",
  },
}));

function App() {
  const { user } = useSelector((state) => state.auth);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => setOpenDrawer(true);
  const handleDrawerClose = () => setOpenDrawer(false);

  return (
    <HashRouter>
      <ThemeProvider  theme={theme}>
        <Box  sx={{ display: "flex", backgroundColor: "warning" }}>
          <CssBaseline />
          <ToastContainer theme="colored" />
          {user && (
            <NavBar
              openDrawer={openDrawer}
              handleDrawerOpen={handleDrawerOpen}
            />
          )}
          {user && (
            <SideBar

              openDrawer={openDrawer}
              handleDrawerClose={handleDrawerClose}
              DrawerHeader={DrawerHeader}
            />
          )}

          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader2 />
            <Routes>
              <Route
                path="/login"
                element={user ? <Navigate to="/" /> : <LoginPage />}
              />
              <Route
                path="/signup"
                element={user ? <Navigate to="/" /> : <FirstTimeLoginPage />}
              />
              <Route element={<ProtectedRoute isAuthenticated={user} />}>
                  <Route path="/" element={<DashboardPage />} />
                  <Route
                    path="/users"
                    element={
                        <UsersPage />
                    }
                  />
                  <Route
                    path="/users/:id"
                    element={
                        <EditUserPage />
                    }
                  />
                  <Route
                    path="/departments"
                    element={
                        <DepartmentsPage />
                    }
                  />
                  <Route
                    path="/roles"
                    element={
                        <UserRolesPage />
                    }
                  />
                  <Route
                    path="/employees"
                    element={
                 
                        <EmployeesPage />
                      
                    }
                  />
                  <Route
                    path="/employee/:id"
                    element={
                      
                        <EmployeeDetailPage />

                    }
                  />

                  <Route path="/messages" element={<MessagesPage />} />
                  <Route path="/account" element={<AccountPage />} />
                  <Route path="/permissions" element={<PermissionsPage />} />
                  <Route path="/unauthorized" element={<Unauthorized />} />
                  <Route
                      path="documentation"
                      element={<ListDocumentation />}
                    />

              </Route>
            </Routes>
          </Box>
        </Box>
      </ThemeProvider>
    </HashRouter>
  );
}

export default App;
