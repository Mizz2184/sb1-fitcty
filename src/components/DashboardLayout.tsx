import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BarChart, Calendar, Users, LogOut, Scissors } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const navigation = [
  { name: 'Dashboard', icon: BarChart, path: '/' },
  { name: 'Appointments', icon: Calendar, path: '/appointments' },
  { name: 'Clients', icon: Users, path: '/clients' },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { barber, isAuthenticated, logout } = useAuthStore();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !barber) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64">
            <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-white border-r">
              <div className="flex items-center flex-shrink-0 px-4">
                <Scissors className="w-8 h-8 text-blue-500" />
                <span className="ml-2 text-xl font-bold text-gray-900">Modern Cuts</span>
              </div>
              <div className="mt-5 flex items-center px-4">
                <img
                  className="w-10 h-10 rounded-full"
                  src={barber.image}
                  alt={barber.name}
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">{barber.name}</p>
                  <p className="text-xs text-gray-500">{barber.email}</p>
                </div>
              </div>
              <div className="mt-5 flex-grow flex flex-col">
                <nav className="flex-1 px-2 space-y-1">
                  {navigation.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                          isActive
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <item.icon
                          className={`mr-3 flex-shrink-0 h-5 w-5 ${
                            isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                          }`}
                        />
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>
              <div className="flex-shrink-0 flex border-t p-4">
                <button
                  onClick={handleLogout}
                  className="flex-shrink-0 w-full group block"
                >
                  <div className="flex items-center">
                    <LogOut className="text-gray-400 group-hover:text-gray-500 mr-3" />
                    <div className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      Logout
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}