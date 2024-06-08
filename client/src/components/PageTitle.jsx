import { Typography } from "@mui/material";

export default function PageTitle({ title, ...rest }) {
  return (
    <Typography
      gutterBottom
      color="primary"
      variant="h4"
      fontWeight="bold"
      mb={2}
      {...rest}
    >
      {title}
    </Typography>
  );
}
