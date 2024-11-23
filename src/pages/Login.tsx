import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scissors } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

export function Login() {
  const navigate = useNavigate();
  const { loginWithGoogle, loginWithEmail, signup, error } = useAuthStore();
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogleLogin = async () => {
    try {
      const role = await loginWithGoogle();
      if (role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/book');
      }
    } catch (err) {
      toast.error('Failed to login with Google');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        if (!fullName.trim()) {
          toast.error('Please enter your full name');
          return;
        }
        await signup(fullName, email, password);
        toast.success('Account created successfully!');
        navigate('/book');
      } else {
        const role = await loginWithEmail(email, password);
        if (role === 'admin') {
          navigate('/dashboard');
        } else {
          navigate('/book');
        }
      }
    } catch (err) {
      toast.error(isSignUp ? 'Failed to create account' : 'Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:block relative w-1/2">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1622292620201-978cce6c0ee4?q=80&w=2070&auto=format&fit=crop"
          alt="Modern barbershop interior"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
        <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Scissors className="w-10 h-10" />
            <h1 className="text-5xl font-bold">iBarberco</h1>
          </div>
          <p className="text-xl text-gray-200">
            Premium grooming for the modern gentleman
          </p>
        </div>
      </div>

      {/* Right side - Login/Signup form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-white">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex flex-col items-center lg:hidden mb-8">
            <Scissors className="w-12 h-12 text-black mb-2" />
            <h1 className="text-3xl font-bold">iBarberco</h1>
          </div>

          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Welcome to iBarberco
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {isSignUp ? 'Create your account to get started' : 'Sign in to book your appointment'}
            </p>
          </div>

          <div className="mt-8">
            {!isSignUp && (
              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <img
                  className="h-5 w-5 mr-2"
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google logo"
                />
                Sign in with Google
              </button>
            )}

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    {isSignUp ? 'Sign up with email' : 'Or continue with email'}
                  </span>
                </div>
              </div>

              <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
                {isSignUp && (
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
                  />
                </div>

                {error && (
                  <div className="text-red-500 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  {isSignUp ? 'Sign up' : 'Sign in'}
                </button>
              </form>

              <div className="mt-4 text-center">
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}