import React from 'react';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
}

export default function Skeleton({ className = '', width, height, borderRadius }: SkeletonProps) {
  return (
    <div 
      className={`skeleton rounded-md ${className}`} 
      style={{ 
        width: width, 
        height: height,
        borderRadius: borderRadius
      }}
    />
  );
}
