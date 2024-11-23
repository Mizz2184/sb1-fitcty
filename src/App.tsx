import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { Scissors, Calendar, User } from 'lucide-react';
import { ServiceCard } from './components/ServiceCard';
import { BarberCard } from './components/BarberCard';
import { BookingSteps } from './components/BookingSteps';
import { TimeSlot } from './components/TimeSlot';
import { PaymentModal } from './components/PaymentModal';
import { services } from './data/services';
import { barbers } from './data/barbers';
import { Service, Barber } from './types';
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';

const steps = [
  {
    title: 'Services',
    description: 'Choose your services'
  },
  {
    title: 'Barber',
    description: 'Select your barber'
  },
  {
    title: 'Date & Time',
    description: 'Pick appointment time'
  },
  {
    title: 'Confirm',
    description: 'Review and book'
  }
];

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', 
  '12:00 PM', '1:00 PM', '2:00 PM', 
  '3:00 PM', '4:00 PM', '5:00 PM'
];

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);

  const totalPrice = selectedServices.reduce((sum, service) => sum + service.price, 0);
  const totalDuration = selectedServices.reduce((sum, service) => sum + service.duration, 0);

  const handleServiceToggle = (service: Service) => {
    setSelectedServices(prev =>
      prev.some(s => s.id === service.id)
        ? prev.filter(s => s.id !== service.id)
        : [...prev, service]
    );
  };

  const handleBarberSelect = (barber: Barber) => {
    setSelectedBarber(barber);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      setShowPayment(true);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    // Here you would typically save the appointment to your backend
    alert('Booking confirmed! You will receive a confirmation email shortly.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-2">
            <Scissors className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-900">Modern Barbershop</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <BookingSteps steps={steps} currentStep={currentStep} />

        <div className="mt-8">
          {currentStep === 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Select Services</h2>
                {selectedServices.length > 0 && (
                  <div className="text-gray-600">
                    Total: ${totalPrice} ({totalDuration} min)
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map(service => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    isSelected={selectedServices.some(s => s.id === service.id)}
                    onSelect={handleServiceToggle}
                  />
                ))}
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Choose Your Barber</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {barbers.map(barber => (
                  <BarberCard
                    key={barber.id}
                    barber={barber}
                    isSelected={selectedBarber?.id === barber.id}
                    onSelect={handleBarberSelect}
                  />
                ))}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Select Date & Time</h2>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <DayPicker
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="border rounded-lg p-4 bg-white"
                    disabled={{ before: new Date() }}
                  />
                </div>
                <div className="flex-1">
                  {selectedDate && (
                    <div className="border rounded-lg p-4 bg-white">
                      <h3 className="text-lg font-medium mb-4">Available Times</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((time) => (
                          <TimeSlot
                            key={time}
                            time={time}
                            isAvailable={true}
                            isSelected={selectedTime === time}
                            onClick={() => handleTimeSelect(time)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Review & Confirm</h2>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Selected Services</h3>
                    {selectedServices.map(service => (
                      <div key={service.id} className="flex justify-between py-2 border-b">
                        <span>{service.name}</span>
                        <span>${service.price}</span>
                      </div>
                    ))}
                    <div className="flex justify-between py-2 font-semibold">
                      <span>Total</span>
                      <span>${totalPrice}</span>
                    </div>
                  </div>

                  {selectedBarber && (
                    <div>
                      <h3 className="text-lg font-medium mb-2">Your Barber</h3>
                      <div className="flex items-center gap-3">
                        <img
                          src={selectedBarber.image}
                          alt={selectedBarber.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <span>{selectedBarber.name}</span>
                      </div>
                    </div>
                  )}

                  {selectedDate && selectedTime && (
                    <div>
                      <h3 className="text-lg font-medium mb-2">Appointment Time</h3>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        <span>
                          {format(selectedDate, 'MMMM d, yyyy')} at {selectedTime}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            {currentStep > 0 && (
              <button
                onClick={handleBack}
                className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={
                (currentStep === 0 && selectedServices.length === 0) ||
                (currentStep === 1 && !selectedBarber) ||
                (currentStep === 2 && (!selectedDate || !selectedTime))
              }
              className="ml-auto px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentStep === steps.length - 1 ? 'Proceed to Payment' : 'Next'}
            </button>
          </div>
        </div>
      </main>

      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        amount={totalPrice}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
}

export default App;