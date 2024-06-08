import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const weekdays = [
  { id: 1, name: "Monday" },
  { id: 2, name: "Tuesday" },
  { id: 3, name: "Wednesday" },
  { id: 4, name: "Thursday" },
  { id: 5, name: "Friday" },
  { id: 6, name: "Saturday" },
  { id: 7, name: "Sunday" },
];

export default function WeekdayDropdown({ setWeekdayData }) {
  const [selectedDay, setSelectedDay] = useState({ id: 0, name: "" });
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setSelectedDay({
      id: weekdays[0].id,
      name: weekdays[0].name,
    });
    setWeekdayData(weekdays[0]);
  }, []);

  const handleMenuItemClick = (e, day) => {
    setSelectedDay({ id: day.id, name: day.name });
    setWeekdayData(day);
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        disableElevation
        id="weekday-dropdown"
        variant="outlined"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {selectedDay.name}
      </Button>
      <Menu
        id="weekday-list"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "lock-button",
          role: "listbox",
        }}
      >
        {weekdays?.map((day) => (
          <MenuItem
            key={day.id}
            selected={day.id === selectedDay.id}
            onClick={(e) => handleMenuItemClick(e, day)}
          >
            {day.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
