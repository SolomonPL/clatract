import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import html2pdf from 'html2pdf.js';

interface ContractData {
  id: string;
  content: string;
  provider: string;
  client: string;
  created: string;
}

const ContractPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [offerData, setOfferData] = useState<any>(null);
  const [formData, setFormData] = useState({
    serviceDescription: '',
    deliverables: '',
    timeframe: '',
    price: '',
    paymentSchedule: '',
    providerName: '',
    clientName: '',
    additionalTerms: ''
  });
  const [contractData, setContractData] = useState<ContractData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load offer data from localStorage if available
  useEffect(() => {
    const savedOfferData = localStorage.getItem('offerClarity');
    if (savedOfferData) {
      try {
        const parsedData = JSON.parse(savedOfferData);
        setOfferData(parsedData);
        // Pre-fill the service description with the elevator pitch
        setFormData(prev => ({
          ...prev,
          serviceDescription: parsedData.elevatorPitch || ''
        }));
      } catch (err) {
        console.error('Error parsing saved offer data:', err);
      }
    }
  }, []);

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
      
      const response = await axios.post(`${API_URL}/api/contracts/generate`, formData);
      
      if (response.data.success) {
        setContractData(response.data.data);
      } else {
        setError(response.data.message || 'Failed to generate contract');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Error connecting to server');
      console.error('Error generating contract:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadPdf = async () => {
    if (!contractData) return;
    
    try {
      setIsLoading(true);
      
      // Get the element and check if it exists
      const element = document.getElementById('contract-content');
      if (!element) {
        throw new Error('Contract content element not found');
      }
      
      // Option 1: Use html2pdf.js library for client-side PDF generation
      const opt = {
        margin: 1,
        filename: `contract-${contractData.id}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      
      await html2pdf().from(element).set(opt).save();
      
      /* Option 2: Download from server (uncomment this and comment out the above code if you prefer server-side PDF generation)
      const API_URL = 'http://localhost:5000';
      const response = await axios.get(
        `${API_URL}/api/contracts/${contractData.id}/export`,
        { responseType: 'blob' }
      );
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `contract-${contractData.id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      */
    } catch (err: any) {
      console.error('Error downloading PDF:', err);
      setError('Failed to download PDF. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Create Your Service Contract
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Fill in the details to generate a professional service agreement.
        </p>
      </div>

      {!contractData ? (
        <div className="bg-white shadow-md rounded-lg p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {offerData && (
              <div className="bg-blue-50 p-4 rounded-md mb-6">
                <h2 className="font-medium text-blue-700">Using your offer clarity</h2>
                <p className="text-blue-600 mt-1">
                  <strong>One-liner:</strong> {offerData.oneLiner}
                </p>
              </div>
            )}

            <div>
              <label htmlFor="serviceDescription" className="block text-sm font-medium text-gray-700">
                Service Description*
              </label>
              <textarea
                id="serviceDescription"
                name="serviceDescription"
                rows={4}
                required
                value={formData.serviceDescription}
                onChange={handleChange}
                placeholder="Describe the services you'll provide in detail"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="providerName" className="block text-sm font-medium text-gray-700">
                  Your Name/Company*
                </label>
                <input
                  type="text"
                  id="providerName"
                  name="providerName"
                  required
                  value={formData.providerName}
                  onChange={handleChange}
                  placeholder="Your name or business name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="clientName" className="block text-sm font-medium text-gray-700">
                  Client Name*
                </label>
                <input
                  type="text"
                  id="clientName"
                  name="clientName"
                  required
                  value={formData.clientName}
                  onChange={handleChange}
                  placeholder="Your client's name or business name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="deliverables" className="block text-sm font-medium text-gray-700">
                Deliverables*
              </label>
              <textarea
                id="deliverables"
                name="deliverables"
                rows={3}
                required
                value={formData.deliverables}
                onChange={handleChange}
                placeholder="List what you'll deliver (e.g., 3 coaching sessions, 1 website design, etc.)"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="timeframe" className="block text-sm font-medium text-gray-700">
                  Timeframe
                </label>
                <input
                  type="text"
                  id="timeframe"
                  name="timeframe"
                  value={formData.timeframe}
                  onChange={handleChange}
                  placeholder="E.g., 30 days, 3 months, etc."
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price*
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="E.g., $1,000, $5,000, etc."
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="paymentSchedule" className="block text-sm font-medium text-gray-700">
                Payment Schedule
              </label>
              <select
                id="paymentSchedule"
                name="paymentSchedule"
                value={formData.paymentSchedule}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select payment schedule</option>
                <option value="Full payment upfront">Full payment upfront</option>
                <option value="50% upfront, 50% upon completion">50% upfront, 50% upon completion</option>
                <option value="Monthly installments">Monthly installments</option>
                <option value="Custom">Custom</option>
              </select>
            </div>

            <div>
              <label htmlFor="additionalTerms" className="block text-sm font-medium text-gray-700">
                Additional Terms (Optional)
              </label>
              <textarea
                id="additionalTerms"
                name="additionalTerms"
                rows={3}
                value={formData.additionalTerms}
                onChange={handleChange}
                placeholder="Any other terms or conditions you want to include"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className={`bg-blue-600 text-white px-6 py-3 rounded-md font-medium ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                }`}
              >
                {isLoading ? 'Generating...' : 'Generate Contract'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6 md:p-8 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Your Contract</h2>
              <div className="flex space-x-4">
                <button
                  onClick={downloadPdf}
                  disabled={isLoading}
                  className={`bg-blue-600 text-white px-4 py-2 rounded-md font-medium ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                  }`}
                >
                  {isLoading ? 'Processing...' : 'Download PDF'}
                </button>
                <button
                  onClick={() => setContractData(null)}
                  className="text-gray-600 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50"
                >
                  Edit Details
                </button>
              </div>
            </div>
          </div>
          
          <div id="contract-content" className="p-6 md:p-8 whitespace-pre-line">
            <div className="prose prose-blue max-w-none">
              {contractData.content.split('\n').map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractPage; 