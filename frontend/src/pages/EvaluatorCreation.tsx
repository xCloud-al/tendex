import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCheck, Mail, Phone, Award, Star, FileText } from 'lucide-react';
import { ToastContext } from '../components/Layout';
import { useContext } from 'react';

interface EvaluatorFormData {
  name: string;
  email: string;
  phone: string;
  expertise: string;
  status: 'active' | 'inactive';
  rating: number;
  assignedTenders: string[];
}

interface Tender {
  id: string;
  title: string;
  status: string;
  deadline: string;
  progress: number;
  submissions: number;
  budget: string;
  category: string;
}

const EvaluatorCreation: React.FC = () => {
  const navigate = useNavigate();
  const { addToast } = useContext(ToastContext);
  const [formData, setFormData] = useState<EvaluatorFormData>({
    name: '',
    email: '',
    phone: '',
    expertise: '',
    status: 'active',
    rating: 0,
    assignedTenders: []
  });

  // Mock data - replace with actual API call
  const mockTenders: Tender[] = [
    {
      id: '1',
      title: 'Website Development Project',
      status: 'In Progress',
      deadline: '2024-06-15',
      progress: 60,
      submissions: 5,
      budget: '$50,000',
      category: 'IT'
    },
    {
      id: '2',
      title: 'Office Building Construction',
      status: 'Not Started',
      deadline: '2024-07-20',
      progress: 0,
      submissions: 3,
      budget: '$2,000,000',
      category: 'Construction'
    },
    {
      id: '3',
      title: 'Medical Equipment Supply',
      status: 'In Progress',
      deadline: '2024-06-30',
      progress: 30,
      submissions: 4,
      budget: '$500,000',
      category: 'Healthcare'
    },
    {
      id: '4',
      title: 'Software Development Framework',
      status: 'Completed',
      deadline: '2024-05-15',
      progress: 100,
      submissions: 6,
      budget: '$75,000',
      category: 'IT'
    },
    {
      id: '5',
      title: 'Hospital Renovation',
      status: 'In Progress',
      deadline: '2024-08-10',
      progress: 45,
      submissions: 2,
      budget: '$1,500,000',
      category: 'Construction'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTenderToggle = (tenderId: string) => {
    setFormData(prev => ({
      ...prev,
      assignedTenders: prev.assignedTenders.includes(tenderId)
        ? prev.assignedTenders.filter(id => id !== tenderId)
        : [...prev.assignedTenders, tenderId]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.expertise) {
      addToast('Please fill in all required fields', 'error');
      return;
    }
    
    // TODO: Implement form submission
    console.log('Form submitted:', formData);
    addToast('Evaluator created successfully!', 'success');
    navigate('/evaluators');
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'not started':
        return 'bg-gray-100 text-gray-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold heading-underline mb-2">Add Evaluator</h1>
          <p className="text-neutral-600">Add a new evaluator to the system</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Rating
            </label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleInputChange}
              min="0"
              max="5"
              step="0.1"
              className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Expertise (comma-separated)
            </label>
            <input
              type="text"
              name="expertise"
              value={formData.expertise}
              onChange={handleInputChange}
              placeholder="e.g., IT, Software Development, Construction"
              className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Assign Tenders</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Tender
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Deadline
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Assign
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {mockTenders.map((tender) => (
                  <tr key={tender.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-neutral-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-neutral-900">{tender.title}</div>
                          <div className="text-sm text-neutral-500">{tender.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(tender.status)}`}>
                        {tender.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      {new Date(tender.deadline).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-full bg-neutral-200 rounded-full h-2.5">
                        <div
                          className="bg-primary-600 h-2.5 rounded-full"
                          style={{ width: `${tender.progress}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={formData.assignedTenders.includes(tender.id)}
                        onChange={() => handleTenderToggle(tender.id)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={() => navigate('/evaluators')}
            className="px-4 py-2 text-neutral-700 hover:text-neutral-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            Add Evaluator
          </button>
        </div>
      </form>
    </div>
  );
};

export default EvaluatorCreation; 