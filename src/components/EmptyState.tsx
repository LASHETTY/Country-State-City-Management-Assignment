
import React from 'react';
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
  className
}) => {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-8 text-center rounded-lg bg-secondary/50",
      "border border-border animate-fade-in",
      className
    )}>
      {icon && (
        <div className="mb-4 text-muted-foreground">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-medium text-foreground mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground mb-4 max-w-md">{description}</p>
      )}
      {action && (
        <div className="mt-2">{action}</div>
      )}
    </div>
  );
};

export default EmptyState;
