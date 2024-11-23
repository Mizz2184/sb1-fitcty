import React from 'react';
import { BarChart3, DollarSign, Users, Calendar } from 'lucide-react';

const stats = [
  {
    name: 'Total Revenue',
    value: '$4,200',
    change: '+12%',
    changeType: 'increase',
    icon: DollarSign,
  },
  {
    name: 'Appointments',
    value: '48',
    change: '+8%',
    changeType: 'increase',
    icon: Calendar,
  },
  {
    name: 'Clients',
    value: '120',
    change: '+23%',
    changeType: 'increase',
    icon: Users,
  },
  {
    name: 'Avg. Service Value',
    value: '$87.50',
    change: '+4%',
    changeType: 'increase',
    icon: BarChart3,
  },
];

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
        >
          <dt>
            <div className="absolute bg-blue-500 rounded-md p-3">
              <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <p className="ml-16 text-sm font-medium text-gray-500 truncate">{stat.name}</p>
          </dt>
          <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            <p
              className={`ml-2 flex items-baseline text-sm font-semibold ${
                stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {stat.change}
            </p>
          </dd>
        </div>
      ))}
    </div>
  );
}