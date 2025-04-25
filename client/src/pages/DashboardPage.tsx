import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface DashboardPageProps {
  isAuthenticated: boolean;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  plan: string;
  contractsGenerated: number;
  contractsRemaining: number | 'unlimited';
  joinDate: string;
}

interface Contract {
  id: string;
  title: string;
  client: string;
  created: string;
  status: 'draft' | 'sent' | 'signed';
}

const DashboardPage = ({ isAuthenticated }: DashboardPageProps) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Fetch user profile and contracts
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const API_URL = 'http://localhost:5000';
        const token = localStorage.getItem('token');
        
        if (!token) {
          navigate('/login');
          return;
        }
        
        // Fetch user profile
        const profileResponse = await axios.get(`${API_URL}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (profileResponse.data.success) {
          setProfile(profileResponse.data.data);
        }
        
        // In a real app, you would also fetch the user's contracts
        // For demo purposes, using mock data
        setContracts([
          {
            id: '1',
            title: 'Web Design Services',
            client: 'Acme Corp',
            created: '2023-04-15T10:30:00Z',
            status: 'signed'
          },
          {
            id: '2',
            title: 'Social Media Management',
            client: 'Johnson & Sons',
            created: '2023-04-10T14:20:00Z',
            status: 'sent'
          },
          {
            id: '3',
            title: 'Marketing Consultation',
            client: 'Tech Startup Inc.',
            created: '2023-04-05T09:15:00Z',
            status: 'draft'
          }
        ]);
      } catch (err: any) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            {profile?.name}'s Dashboard
          </h1>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Link
            to="/offer-clarity"
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create New Offer
          </Link>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Account Summary */}
        <div className="bg-white shadow rounded-lg p-6 col-span-1">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Account Summary</h2>
          {profile && (
            <dl className="space-y-3">
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="text-sm text-gray-900">{profile.email}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Current Plan</dt>
                <dd className="text-sm text-blue-600 font-medium">{profile.plan}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Contracts Generated</dt>
                <dd className="text-sm text-gray-900">{profile.contractsGenerated}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Contracts Remaining</dt>
                <dd className="text-sm text-gray-900">
                  {profile.contractsRemaining === 'unlimited' 
                    ? 'Unlimited' 
                    : profile.contractsRemaining}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Member Since</dt>
                <dd className="text-sm text-gray-900">
                  {new Date(profile.joinDate).toLocaleDateString()}
                </dd>
              </div>
            </dl>
          )}
          <div className="mt-6">
            <Link
              to="/pricing"
              className="block w-full text-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Upgrade Plan
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white shadow rounded-lg p-6 col-span-1 lg:col-span-2">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Contracts</h2>
          {contracts.length === 0 ? (
            <p className="text-gray-500">No contracts yet. Create your first offer to get started.</p>
          ) : (
            <div className="overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {contracts.map((contract) => (
                  <li key={contract.id} className="py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{contract.title}</p>
                        <p className="text-sm text-gray-500">Client: {contract.client}</p>
                        <p className="text-sm text-gray-500">
                          Created: {new Date(contract.created).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span 
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${contract.status === 'signed' ? 'bg-green-100 text-green-800' : 
                              contract.status === 'sent' ? 'bg-blue-100 text-blue-800' : 
                              'bg-gray-100 text-gray-800'}
                          `}
                        >
                          {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
                        </span>
                        <Link
                          to={`/contract/${contract.id}`}
                          className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="mt-6">
            <Link
              to="/contract"
              className="block w-full text-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create New Contract
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 