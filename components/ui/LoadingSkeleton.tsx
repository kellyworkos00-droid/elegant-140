import React from 'react';

export interface LoadingSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'title' | 'card' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  count?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  variant = 'text',
  width,
  height,
  count = 1,
  className = '',
  ...props
}) => {
  const baseStyles = 'skeleton animate-pulse';
  
  const variantStyles = {
    text: 'skeleton-text h-4',
    title: 'skeleton-title h-6',
    card: 'skeleton-card',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };
  
  const style: React.CSSProperties = {
    width: width || (variant === 'title' ? '60%' : '100%'),
    height: height || undefined,
  };
  
  const skeletons = Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      style={style}
      {...props}
    />
  ));
  
  return count > 1 ? <div className="space-y-3">{skeletons}</div> : skeletons[0];
};

LoadingSkeleton.displayName = 'LoadingSkeleton';

export const TableSkeleton: React.FC<{ rows?: number; columns?: number }> = ({
  rows = 5,
  columns = 4,
}) => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex gap-4">
        {Array.from({ length: columns }).map((_, i) => (
          <div key={i} className="flex-1">
            <LoadingSkeleton variant="text" width="80%" />
          </div>
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div key={colIndex} className="flex-1">
              <LoadingSkeleton variant="text" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

TableSkeleton.displayName = 'TableSkeleton';

export const CardSkeleton: React.FC<{ count?: number }> = ({ count = 1 }) => {
  const skeleton = (
    <div className="card p-6 space-y-4">
      <LoadingSkeleton variant="title" width="40%" />
      <LoadingSkeleton variant="text" count={3} />
      <div className="flex gap-2 mt-4">
        <LoadingSkeleton variant="rectangular" width={80} height={32} />
        <LoadingSkeleton variant="rectangular" width={80} height={32} />
      </div>
    </div>
  );
  
  if (count === 1) return skeleton;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>{skeleton}</div>
      ))}
    </div>
  );
};

CardSkeleton.displayName = 'CardSkeleton';
