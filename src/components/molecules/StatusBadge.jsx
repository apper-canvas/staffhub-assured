import Badge from "@/components/atoms/Badge";

const StatusBadge = ({ status, type = "attendance" }) => {
  const getStatusConfig = (status, type) => {
    if (type === "attendance") {
      switch (status) {
        case "present":
          return { variant: "success", label: "Present" };
        case "absent":
          return { variant: "error", label: "Absent" };
        case "late":
          return { variant: "warning", label: "Late" };
        case "leave":
          return { variant: "accent", label: "On Leave" };
        default:
          return { variant: "default", label: "Unknown" };
      }
    }

    if (type === "leave") {
      switch (status) {
        case "pending":
          return { variant: "warning", label: "Pending" };
        case "approved":
          return { variant: "success", label: "Approved" };
        case "rejected":
          return { variant: "error", label: "Rejected" };
        default:
          return { variant: "default", label: "Unknown" };
      }
    }

    if (type === "employee") {
      switch (status) {
        case "active":
          return { variant: "success", label: "Active" };
        case "inactive":
          return { variant: "error", label: "Inactive" };
        default:
          return { variant: "default", label: "Unknown" };
      }
    }

    return { variant: "default", label: status };
  };

  const { variant, label } = getStatusConfig(status, type);

  return <Badge variant={variant}>{label}</Badge>;
};

export default StatusBadge;