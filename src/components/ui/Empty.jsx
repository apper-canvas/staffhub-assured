import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  className, 
  title = "No data found", 
  description = "There are no items to display", 
  icon = "FileX",
  action
}) => {
  return (
    <div className={cn("flex items-center justify-center p-12", className)}>
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
          <ApperIcon name={icon} className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        {action && (
          <div>
            {action}
          </div>
        )}
      </div>
    </div>
  );
};

export default Empty;