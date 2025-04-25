import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface OfferClarityResult {
  oneLiner: string;
  elevatorPitch: string;
  callToAction?: string;
}

const OfferClarityPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    targetAudience: '',
    serviceType: ''
  });
  const [result, setResult] = useState<OfferClarityResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // In a production app, this would be set in an environment variable
      const API_URL = 'http://localhost:5000';
      
      const response = await axios.post(`${API_URL}/api/offers/generate`, formData);
      
      if (response.data.success) {
        setResult(response.data.data);
      } else {
        setError(response.data.message || 'Failed to generate offer clarity');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Error connecting to server');
      console.error('Error generating offer clarity:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinue = () => {
    // Save the result to local storage or context for use in contract generation
    if (result) {
      localStorage.setItem('offerClarity', JSON.stringify(result));
      // Navigate to contract page handled by Link component
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Get Clear on What You Sell
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Tell us about your offer, and we'll craft a clear, compelling one-liner and elevator pitch.
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 md:p-8">
        {!result ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Describe your service/offer in detail*
              </label>
              <textarea
                id="description"
                name="description"
                rows={5}
                required
                value={formData.description}
                onChange={handleChange}
                placeholder="E.g., I help busy professionals organize their digital files and create systems for maintaining inbox zero. My clients typically save 5+ hours per week after working with me."
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <p className="mt-1 text-sm text-gray-500">
                The more details you provide, the better your results will be.
              </p>
            </div>

            <div>
              <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700">
                Who is this service for? (Target audience)
              </label>
              <input
                type="text"
                id="targetAudience"
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleChange}
                placeholder="E.g., Small business owners, busy professionals, new parents"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700">
                Type of service
              </label>
              <select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select a service type</option>
                <option value="coaching">Coaching</option>
                <option value="consulting">Consulting</option>
                <option value="freelance">Freelance Service</option>
                <option value="digital_product">Digital Product</option>
                <option value="course">Online Course</option>
                <option value="membership">Membership</option>
                <option value="other">Other</option>
              </select>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading || !formData.description}
                className={`bg-blue-600 text-white px-6 py-3 rounded-md font-medium ${
                  isLoading || !formData.description
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-blue-700'
                }`}
              >
                {isLoading ? 'Generating...' : 'Generate Offer Clarity'}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-medium text-gray-900">Your One-Liner</h2>
              <div className="mt-2 p-4 bg-gray-50 rounded-md text-lg">{result.oneLiner}</div>
            </div>

            <div>
              <h2 className="text-xl font-medium text-gray-900">Your Elevator Pitch</h2>
              <div className="mt-2 p-4 bg-gray-50 rounded-md">{result.elevatorPitch}</div>
            </div>

            {result.callToAction && (
              <div>
                <h2 className="text-xl font-medium text-gray-900">Suggested Call to Action</h2>
                <div className="mt-2 p-4 bg-gray-50 rounded-md">{result.callToAction}</div>
              </div>
            )}

            <div className="flex justify-between pt-6 border-t border-gray-200">
              <button
                onClick={() => setResult(null)}
                className="text-gray-600 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50"
              >
                Edit Description
              </button>
              <Link
                to="/contract"
                onClick={handleContinue}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                Create Contract
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferClarityPage; 