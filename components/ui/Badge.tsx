import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      variant = 'neutral',
      size = 'md',
      dot = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseStyles = 'badge inline-flex items-center font-medium';
    
    const variantStyles = {
      success: 'badge-success',
      warning: 'badge-warning',
      error: 'badge-error',
      info: 'badge-info',
      neutral: 'badge-neutral',
    };
    
    const sizeStyles = {
      sm: 'text-xs px-2 py-0.5',
      md: 'text-xs px-3 py-1',
      lg: 'text-sm px-4 py-1.5',
    };
    
    return (
      <span
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {dot && (
          <span
            className="w-1.5 h-1.5 rounded-full mr-1.5"
            style={{
              backgroundColor: 'currentColor',
            }}
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
