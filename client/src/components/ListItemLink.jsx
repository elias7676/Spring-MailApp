import { forwardRef, useMemo } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink, useLocation } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";

// Custom styled ListItem to handle active state with smooth transitions
const StyledListItem = styled(ListItem)(({ theme }) => ({
  transition: "background-color 0.3s, color 0.3s", // Add transition for smooth effect
  "& .MuiListItemIcon-root": {
    transition: "color 0.3s", // Add transition for icon color
  },
  "&.active": {
    backgroundColor: "#A77E29", // Active link background color A77E29 4CAA6E
    color: "#ffffff", // Active link text color
    "& .MuiListItemIcon-root": {
      color: "#ffffff", // Active link icon color
    },
  },
}));

export default function ListItemLink(props) {
  const { icon, primary, to, isPaddingLeft } = props;
  const location = useLocation();
  const isActive = location.pathname === to;

  const renderLink = useMemo(
    () =>
      forwardRef(function Link(itemProps, ref) {
        return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
      }),
    [to]
  );

  return (
    <li>
      <StyledListItem
        button
        component={renderLink}
        sx={{ pl: isPaddingLeft && 4 }}
        className={isActive ? "active" : ""}
      >
        {icon ? (
          <ListItemIcon>
            <Tooltip title={primary}>{icon}</Tooltip>
          </ListItemIcon>
        ) : null}
        <ListItemText primary={primary} />
      </StyledListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  isPaddingLeft: PropTypes.bool,
};
