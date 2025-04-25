import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Get Clear on What You Sell.<br />
              Get Paid with Confidence.
            </h1>
            <p className="mt-6 text-xl max-w-3xl mx-auto">
              Tell us what you offer — we'll write your one-liner and send a legally sound service contract in 60 seconds.
            </p>
            <div className="mt-10 flex justify-center">
              <Link
                to="/offer-clarity"
                className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-md text-lg font-medium shadow-md"
              >
                Create Your Offer
              </Link>
              <Link
                to="/pricing"
                className="ml-4 bg-blue-800 bg-opacity-50 text-white hover:bg-opacity-70 px-6 py-3 rounded-md text-lg font-medium"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              From confused to crystal clear in three simple steps
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                1
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Describe Your Offer</h3>
              <p className="mt-2 text-base text-gray-600">
                Tell us what you do, who you help, and how your service works.
              </p>
            </div>

            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                2
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Get Your One-Liner</h3>
              <p className="mt-2 text-base text-gray-600">
                We'll craft a clear, compelling elevator pitch that makes your offer irresistible.
              </p>
            </div>

            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                3
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Generate Your Contract</h3>
              <p className="mt-2 text-base text-gray-600">
                Create a professional, legally-sound service agreement in seconds.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/offer-clarity"
              className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-md text-lg font-medium"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

      {/* For Who Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Perfect For
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium text-gray-900">Coaches</h3>
              <p className="mt-2 text-base text-gray-600">
                Clearly define your coaching packages and get clients to commit with confidence.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium text-gray-900">Freelancers</h3>
              <p className="mt-2 text-base text-gray-600">
                Protect your time and income with crystal-clear deliverables and payment terms.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium text-gray-900">Service-Based Creators</h3>
              <p className="mt-2 text-base text-gray-600">
                Turn followers into paying clients with compelling service descriptions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium text-gray-900">Digital Agency Owners</h3>
              <p className="mt-2 text-base text-gray-600">
                Scale your agency with standardized contracts that protect your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Ready to Get Clear and Get Paid?
          </h2>
          <p className="mt-4 text-xl max-w-2xl mx-auto">
            Start for free. One contract generation included.
          </p>
          <div className="mt-8">
            <Link
              to="/offer-clarity"
              className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-md text-lg font-medium shadow-md"
            >
              Get Started for Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 