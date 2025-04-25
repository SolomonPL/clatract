import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-9xl font-extrabold text-blue-600">404</h1>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Page not found</h2>
          <p className="mt-3 text-xl text-gray-600">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <div className="mt-10">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Go back home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage; 