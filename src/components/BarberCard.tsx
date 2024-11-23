import React from 'react';
import { Star, Clock } from 'lucide-react';
import { Barber } from '../types';
import { cn } from '../utils/cn';

interface BarberCardProps {
  barber: Barber;
  isSelected: boolean;
  onSelect: (barber: Barber) => void;
}

export function BarberCard({ barber, isSelected, onSelect }: BarberCardProps) {
  return (
    <div
      className={cn(
        'relative p-6 rounded-xl transition-all cursor-pointer',
        'border-2 hover:shadow-lg',
        isSelected
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 hover:border-blue-200'
      )}
      onClick={() => onSelect(barber)}
    >
      <div className="flex items-start gap-4">
        <img
          src={barber.image}
          alt={barber.name}
          className="w-24 h-24 rounded-full object-cover"
        />
        
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">{barber.name}</h3>
          
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-gray-700">{barber.rating}</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {barber.specialties.map((specialty, index) => (
              <span
                key={index}
                className="px-2 py-1 text-sm bg-gray-100 rounded-full text-gray-700"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}