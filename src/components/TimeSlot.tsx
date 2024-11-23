import React from 'react';
import { cn } from '../utils/cn';

interface TimeSlotProps {
  time: string;
  isAvailable: boolean;
  isSelected: boolean;
  onClick: () => void;
}

export function TimeSlot({ time, isAvailable, isSelected, onClick }: TimeSlotProps) {
  return (
    <button
      onClick={onClick}
      disabled={!isAvailable}
      className={cn(
        'px-4 py-2 text-sm rounded-md transition-all',
        isAvailable ? 'cursor-pointer' : 'cursor-not-allowed opacity-50',
        isSelected
          ? 'bg-blue-500 text-white border-blue-500'
          : isAvailable
          ? 'border hover:bg-blue-50 hover:border-blue-500'
          : 'border bg-gray-100',
        'border'
      )}
    >
      {time}
    </button>
  );
}