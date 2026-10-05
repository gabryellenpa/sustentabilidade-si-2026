import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'glass';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  ...props
}) => {
  const variantStyles = {
    default: 'bg-white border border-stone-200/80 shadow-sm rounded-2xl',
    elevated: 'bg-white border border-stone-100 shadow-md shadow-stone-200/50 rounded-2xl',
    glass: 'bg-white/80 backdrop-blur-md border border-stone-200/60 shadow-sm rounded-2xl',
  };

  return (
    <div
      className={`p-5 transition-all duration-200 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
