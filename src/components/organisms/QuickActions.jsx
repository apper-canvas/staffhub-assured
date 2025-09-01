import { useState } from "react";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const QuickActions = ({ onActionComplete }) => {
  const [isLoading, setIsLoading] = useState({});

  const handleAction = async (actionType) => {
    setIsLoading(prev => ({ ...prev, [actionType]: true }));
    
    try {
      // Simulate action delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      switch (actionType) {
        case "clock-in":
          toast.success("Successfully clocked in");
          break;
        case "clock-out":
          toast.success("Successfully clocked out");
          break;
        case "mark-attendance":
          toast.success("Attendance marked for today");
          break;
        case "generate-report":
          toast.success("Report generation started");
          break;
        default:
          toast.success("Action completed");
      }

      if (onActionComplete) {
        onActionComplete(actionType);
      }
    } catch (error) {
      toast.error("Action failed. Please try again.");
    } finally {
      setIsLoading(prev => ({ ...prev, [actionType]: false }));
    }
  };

  const actions = [
    {
      id: "clock-in",
      label: "Clock In",
      icon: "Clock",
      variant: "success",
      description: "Mark your arrival time"
    },
    {
      id: "clock-out", 
      label: "Clock Out",
      icon: "LogOut",
      variant: "secondary",
      description: "Mark your departure time"
    },
    {
      id: "mark-attendance",
      label: "Mark Attendance",
      icon: "CheckSquare",
      variant: "primary",
      description: "Update team attendance"
    },
    {
      id: "generate-report",
      label: "Generate Report",
      icon: "FileText",
      variant: "outline",
      description: "Create attendance report"
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 font-display mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action) => (
          <div
            key={action.id}
            className="p-4 border border-gray-200 rounded-lg hover:border-primary/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <ApperIcon name={action.icon} className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{action.label}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </div>
            </div>
            
            <Button
              variant={action.variant}
              size="sm"
              className="w-full"
              onClick={() => handleAction(action.id)}
              disabled={isLoading[action.id]}
            >
              {isLoading[action.id] ? (
                <>
                  <ApperIcon name="Loader" className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                action.label
              )}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;