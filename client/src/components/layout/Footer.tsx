import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Clatract</h3>
            <p className="mt-2 text-sm text-gray-600">
              Get Clear on What You Sell. Get Paid with Confidence.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link to="/offer-clarity" className="text-sm text-gray-600 hover:text-blue-600">
                  Offer Clarity
                </Link>
              </li>
              <li>
                <Link to="/contract" className="text-sm text-gray-600 hover:text-blue-600">
                  Contract Builder
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm text-gray-600 hover:text-blue-600">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Legal</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-blue-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-blue-600">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} Clatract. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 