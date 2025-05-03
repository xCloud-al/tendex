import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';

interface Tender {
  id: string;
  title: string;
  reference: string;
  status: 'open' | 'closed' | 'awarded';
  deadline: string;
  budget: string;
  category: string;
}

const PublicTenders = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Mock data - replace with actual API call
  const tenders: Tender[] = [
    {
      id: '1',
      title: 'Supply of Office Equipment',
      reference: 'TDR-2024-001',
      status: 'open',
      deadline: '2024-04-15',
      budget: '$50,000',
      category: 'Equipment'
    },
    {
      id: '2',
      title: 'IT Infrastructure Upgrade',
      reference: 'TDR-2024-002',
      status: 'open',
      deadline: '2024-04-20',
      budget: '$100,000',
      category: 'IT'
    },
    // Add more mock data as needed
  ];

  const filteredTenders = tenders.filter(tender => {
    const matchesSearch = tender.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tender.reference.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || tender.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-success-50 text-success-700 border-success-200';
      case 'closed':
        return 'bg-error-50 text-error-700 border-error-200';
      case 'awarded':
        return 'bg-warning-50 text-warning-700 border-warning-200';
      default:
        return 'bg-neutral-50 text-neutral-700 border-neutral-200';
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold heading-underline mb-2">Available Tenders</h1>
          <p className="text-neutral-600">Browse and apply for available tenders</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-5 mb-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-neutral-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tenders..."
                className="pl-10 block w-full py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-neutral-400" />
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="pl-10 block w-full py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
                <option value="awarded">Awarded</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Reference</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Budget</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Deadline</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {filteredTenders.map((tender) => (
                <tr key={tender.id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">{tender.reference}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">{tender.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">{tender.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">{tender.budget}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">{tender.deadline}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(tender.status)}`}>
                      {tender.status.charAt(0).toUpperCase() + tender.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    <button
                      onClick={() => navigate(`/tender/${tender.id}`)}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PublicTenders; 