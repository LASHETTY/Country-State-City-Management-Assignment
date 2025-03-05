
import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ActionButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  label?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  tooltip?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  icon,
  label,
  variant = "default",
  size = "default",
  className,
  tooltip
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      className={cn(
        "transition-all duration-200",
        size === "icon" && "h-9 w-9",
        className
      )}
      title={tooltip}
    >
      <span className={cn("flex items-center", label && "gap-2")}>
        {icon}
        {label && <span>{label}</span>}
      </span>
    </Button>
  );
};

export default ActionButton;
