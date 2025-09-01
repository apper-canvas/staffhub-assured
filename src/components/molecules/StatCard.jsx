import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const StatCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendValue, 
  className,
  gradient = false 
}) => {
  const getTrendColor = (trend) => {
    if (trend === "up") return "text-success";
    if (trend === "down") return "text-error";
    return "text-gray-500";
  };

  const getTrendIcon = (trend) => {
    if (trend === "up") return "TrendingUp";
    if (trend === "down") return "TrendingDown";
    return "Minus";
  };

  return (
    <div 
      className={cn(
        "p-6 rounded-lg border transition-all duration-200 hover:shadow-md",
        gradient 
          ? "bg-gradient-to-br from-primary to-secondary text-white border-transparent" 
          : "bg-white border-gray-200",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className={cn(
            "text-sm font-medium",
            gradient ? "text-white/80" : "text-gray-600"
          )}>
            {title}
          </p>
          <p className={cn(
            "text-2xl font-bold mt-1",
            gradient ? "text-white" : "text-gray-900"
          )}>
            {value}
          </p>
          {trend && trendValue && (
            <div className={cn(
              "flex items-center mt-2 text-sm",
              gradient ? "text-white/90" : getTrendColor(trend)
            )}>
              <ApperIcon name={getTrendIcon(trend)} className="w-4 h-4 mr-1" />
              {trendValue}
            </div>
          )}
        </div>
        {icon && (
          <div className={cn(
            "p-3 rounded-full",
            gradient 
              ? "bg-white/20" 
              : "bg-gray-100"
          )}>
            <ApperIcon 
              name={icon} 
              className={cn(
                "w-6 h-6",
                gradient ? "text-white" : "text-gray-600"
              )} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;