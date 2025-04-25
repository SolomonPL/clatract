import { Link } from 'react-router-dom';

interface HeaderProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

const Header = ({ isAuthenticated, setIsAuthenticated }: HeaderProps) => {
  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-blue-600">
                Clatract
              </Link>
            </div>
            <nav className="ml-6 flex items-center space-x-4">
              <Link to="/offer-clarity" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Offer Clarity
              </Link>
              <Link to="/contract" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Contract
              </Link>
              <Link to="/pricing" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Pricing
              </Link>
            </nav>
          </div>
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 