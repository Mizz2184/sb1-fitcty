import React from 'react';
import { Clock, DollarSign, Plus, Check } from 'lucide-react';
import { Service } from '../types';
import { cn } from '../utils/cn';

interface ServiceCardProps {
  service: Service;
  isSelected: boolean;
  onSelect: (service: Service) => void;
}

export function ServiceCard({ service, isSelected, onSelect }: ServiceCardProps) {
  return (
    <div
      className={cn(
        'relative p-6 rounded-xl transition-all cursor-pointer',
        'border-2 hover:shadow-lg',
        isSelected
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 hover:border-blue-200'
      )}
      onClick={() => onSelect(service)}
    >
      <div className="absolute top-4 right-4">
        {isSelected ? (
          <Check className="w-6 h-6 text-blue-500" />
        ) : (
          <Plus className="w-6 h-6 text-gray-400" />
        )}
      </div>
      
      <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
      <p className="text-gray-600 mb-4">{service.description}</p>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center text-gray-700">
          <Clock className="w-4 h-4 mr-1" />
          <span>{service.duration} min</span>
        </div>
        <div className="flex items-center text-gray-700">
          <DollarSign className="w-4 h-4 mr-1" />
          <span>${service.price}</span>
        </div>
      </div>
    </div>
  );
}