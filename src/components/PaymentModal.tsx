import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_demo');

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onSuccess: () => void;
}

// In a real app, this would come from your backend
const MOCK_CLIENT_SECRET = 'pi_mock_secret_123456789';

function CheckoutForm({ amount, onSuccess }: { amount: number; onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setError(null);

    try {
      const { error: paymentError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.href,
        },
      });

      if (paymentError) {
        setError(paymentError.message || 'An error occurred');
      } else {
        onSuccess();
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? 'Processing...' : `Pay $${amount}`}
      </button>
    </form>
  );
}

export function PaymentModal({ isOpen, onClose, amount, onSuccess }: PaymentModalProps) {
  if (!isOpen) return null;

  const options = {
    clientSecret: MOCK_CLIENT_SECRET,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#3b82f6',
      },
    },
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-semibold mb-4">Complete Payment</h2>

        <div className="mb-6">
          <div className="flex justify-between py-2 border-b">
            <span>Total Amount</span>
            <span className="font-semibold">${amount}</span>
          </div>
        </div>

        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm amount={amount} onSuccess={onSuccess} />
        </Elements>

        <div className="mt-6 space-y-4">
          <button 
            onClick={() => {
              // In a real app, implement Apple Pay logic
              onSuccess();
            }}
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            <span>Pay with Apple Pay</span>
          </button>
          
          <button
            onClick={() => {
              // In a real app, implement Cash App logic
              onSuccess();
            }}
            className="w-full bg-[#00D632] text-white py-2 px-4 rounded-md hover:bg-[#00C02E] transition-colors flex items-center justify-center gap-2"
          >
            <span>Pay with Cash App</span>
          </button>
        </div>
      </div>
    </div>
  );
}