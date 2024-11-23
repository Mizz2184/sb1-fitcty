import React from 'react';
import { format } from 'date-fns';

const appointments = [
  {
    id: 1,
    client: 'John Smith',
    service: 'Classic Haircut',
    date: new Date(2024, 2, 15, 10, 30),
    status: 'confirmed',
    price: 35,
  },
  {
    id: 2,
    client: 'Michael Brown',
    service: 'Beard Trim & Shape',
    date: new Date(2024, 2, 15, 14, 0),
    status: 'confirmed',
    price: 25,
  },
  // Add more appointments as needed
];

export function AppointmentsList() {
  return (
    <div className="overflow-hidden">
      <ul role="list" className="divide-y divide-gray-200">
        {appointments.map((appointment) => (
          <li key={appointment.id} className="py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {appointment.client}
                </p>
                <p className="text-sm text-gray-500">
                  {appointment.service} - ${appointment.price}
                </p>
                <p className="text-sm text-gray-500">
                  {format(appointment.date, 'MMM d, yyyy h:mm a')}
                </p>
              </div>
              <div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    appointment.status === 'confirmed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {appointment.status}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}