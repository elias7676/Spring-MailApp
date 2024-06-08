export const statusTags = {
  REQUESTED: "Requested",
  PENDING: "Pending",
  CHECKED: "Checked",
  APPROVED: "Approved",
  STARTED: "Started",
  EXPIRED: "Expired",
  ACCEPTED: "Accepted",
  ACTIVE: "Active",
  IN_ACTIVE: "In Active",
  COMING_UP: "Coming Up",
};

export const statusColor = [
  { name: statusTags.REQUESTED, bgcolor: "#748cab", color: "#ffffff" },
  { name: statusTags.CHECKED, bgcolor: "#ff9800", color: "#000000" },
  { name: statusTags.APPROVED, bgcolor: "#4BCDC4", color: "#000000" },
  { name: statusTags.ACTIVE, bgcolor: "#4BCDC4", color: "#000000" },
  { name: statusTags.STARTED, bgcolor: "#4BCDC4", color: "#000000" },
  { name: statusTags.COMING_UP, bgcolor: "#4BCDC4", color: "#000000" },
  { name: statusTags.DECLINED, bgcolor: "#FF6B6B", color: "#000000" },
  { name: statusTags.IN_ACTIVE, bgcolor: "#FF6B6B", color: "#000000" },
  { name: statusTags.EXPIRED, bgcolor: "#FF6B6B", color: "#000000" },
];
