import {
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";

const StatusBadge = ({ status }) => {
  const baseClasses =
    "inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition";

  const statusMap = {
    draft: {
      label: "Draft",
      icon: ClockIcon,
      classes: "bg-yellow-50 text-yellow-700",
      dot: "bg-yellow-400",
    },
    published: {
      label: "Published",
      icon: CheckCircleIcon,
      classes: "bg-green-50 text-green-700",
      dot: "bg-green-500",
    },
    error: {
      label: "Error",
      icon: ExclamationCircleIcon,
      classes: "bg-red-50 text-red-700",
      dot: "bg-red-500",
    },
  };

  const current = statusMap[status] || statusMap.draft;
  const Icon = current.icon;

  return (
    <span className={`${baseClasses} ${current.classes} my-5`}>
      <Icon className="h-4 w-4 mr-1.5" />
      {current.label}
    </span>
  );
};

export default StatusBadge;
