import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';

export function AvailabilityManager() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [blockedTimes, setBlockedTimes] = useState<string[]>([]);

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM',
    '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const toggleTimeSlot = (time: string) => {
    setBlockedTimes(prev =>
      prev.includes(time)
        ? prev.filter(t => t !== time)
        : [...prev, time]
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="border rounded-lg p-4"
        />
      </div>
      
      {selectedDate && (
        <div>
          <h3 className="text-lg font-medium mb-4">
            {format(selectedDate, 'MMMM d, yyyy')}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => toggleTimeSlot(time)}
                className={`px-4 py-2 text-sm rounded-md transition-colors ${
                  blockedTimes.includes(time)
                    ? 'bg-red-100 text-red-800 hover:bg-red-200'
                    : 'bg-green-100 text-green-800 hover:bg-green-200'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}