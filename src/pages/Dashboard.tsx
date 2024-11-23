import React from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { DashboardStats } from '../components/dashboard/DashboardStats';
import { AppointmentsList } from '../components/dashboard/AppointmentsList';
import { AvailabilityManager } from '../components/dashboard/AvailabilityManager';

export function Dashboard() {
  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-4">
            <DashboardStats />
            
            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium mb-4">Upcoming Appointments</h2>
                <AppointmentsList />
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium mb-4">Manage Availability</h2>
                <AvailabilityManager />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}