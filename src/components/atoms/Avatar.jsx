import React from "react";
import { cn } from "@/utils/cn";

const Avatar = React.forwardRef(({ 
  src, 
  alt, 
  size = "md", 
  fallback, 
  className,
  ...props 
}, ref) => {
  const [imageError, setImageError] = React.useState(false);

  const sizes = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base", 
    lg: "w-12 h-12 text-lg",
    xl: "w-16 h-16 text-xl"
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map(part => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join("");
  };

  return (
    <div 
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-full overflow-hidden bg-gradient-to-br from-primary to-secondary text-white font-medium",
        sizes[size],
        className
      )}
      {...props}
    >
      {src && !imageError ? (
        <img 
          src={src} 
          alt={alt || "Avatar"} 
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
      ) : (
        <span>{getInitials(fallback || alt)}</span>
      )}
    </div>
  );
});

Avatar.displayName = "Avatar";

export default Avatar;