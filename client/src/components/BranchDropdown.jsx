import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { useGetAllDepartmentsQuery } from "../features/api/apiSlice";
import { Stack } from "@mui/material";

export default function BranchDropdown({
  preSelectedBranchId,
  setBranchData,
  disabled,
  rest,
}) {
  const { user } = useSelector((state) => state.auth);
  const { data: branchesList, isLoading: branchesListLoading } =
  useGetAllDepartmentsQuery();
  
  const [selectedBranch, setSelectedBranch] = useState({ id: 0, name: "" });
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (branchesList && !preSelectedBranchId) {
      setSelectedBranch({
        id: branchesList[0]?.id,
        name: branchesList[0]?.name,
      });
      setBranchData(branchesList[0]);
    }
    if (branchesList && preSelectedBranchId) {
      const data = branchesList?.find((branchList) => {
        if (branchList?.id === preSelectedBranchId) {
          return branchList;
        }
      });
      setSelectedBranch({ id: data?.id, name: data?.name });
      setBranchData(data);
    }
  }, [branchesList]);

  const handleMenuItemClick = (e, branch) => {
    setSelectedBranch({ id: branch?.id, name: branch?.name });
    setBranchData(branch);
    setAnchorEl(null);
  };

  return (
    <Stack {...rest}>
      <Button
        disabled={disabled}
        disableElevation
        id="branches-dropdown"
        variant="outlined"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {/* {branchesListLoading ? "Branch Loading..." : "Options"} */}
        {branchesListLoading && "Departments Loading..."}
        {branchesList && selectedBranch.name}
      </Button>
      <Menu
        id="branches-list"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "lock-button",
          role: "listbox",
        }}
      >
        {branchesList?.map((branchList) => (
          <MenuItem
            key={branchList.id}
            selected={branchList.id === selectedBranch.id}
            onClick={(e) => handleMenuItemClick(e, branchList)}
          >
            {branchList.name}
          </MenuItem>
        ))}
      </Menu>
    </Stack>
  );
}
