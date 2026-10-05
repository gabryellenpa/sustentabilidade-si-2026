import React from 'react';

export type BadgeVariant = 'emerald' | 'cyan' | 'amber' | 'stone' | 'indigo' | 'rose';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'stone',
  className = '',
  size = 'md',
}) => {
  const variantStyles: Record<BadgeVariant, string> = {
    emerald: 'bg-emerald-50 text-emerald-800 border-emerald-200/60',
    cyan: 'bg-sky-50 text-sky-800 border-sky-200/60',
    amber: 'bg-amber-50 text-amber-800 border-amber-200/60',
    indigo: 'bg-indigo-50 text-indigo-800 border-indigo-200/60',
    stone: 'bg-stone-100 text-stone-700 border-stone-200',
    rose: 'bg-rose-50 text-rose-800 border-rose-200/60',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
};
