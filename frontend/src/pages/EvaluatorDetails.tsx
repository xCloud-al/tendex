import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UserCheck, Mail, Phone, Award, Star, Edit, Trash2, ArrowLeft, FileText, Pencil } from 'lucide-react';
import { mockTenders } from '../data/mockData';

interface Evaluator {
  id: string;
  name: string;
  email: string;
  phone: string;
  expertise: string[];
  status: 'active' | 'inactive';
  rating: number;
  assignedTenders: number;
}

interface AssignedTender {
  id: string;
  title: string;
  status: string;
  deadline: string;
  progress: number;
  submissions: number;
  budget: string;
  category: string;
}

// Mock data - replace with actual API calls
const mockEvaluators: Evaluator[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 890',
    expertise: ['IT', 'Software Development'],
    status: 'active',
    rating: 4.5,
    assignedTenders: 3
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1 234 567 891',
    expertise: ['Construction', 'Engineering'],
    status: 'active',
    rating: 4.8,
    assignedTenders: 2
  },
  {
    id: '3',
    name: 'Michael Johnson',
    email: 'michael.j@example.com',
    phone: '+1 234 567 892',
    expertise: ['Healthcare', 'Medical Technology'],
    status: 'active',
    rating: 4.7,
    assignedTenders: 4
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-primary-50 text-primary-700 border-primary-200';
    case 'evaluation':
      return 'bg-warning-50 text-warning-700 border-warning-200';
    case 'completed':
      return 'bg-success-50 text-success-700 border-success-200';
    default:
      return 'bg-neutral-50 text-neutral-700 border-neutral-200';
  }
};

const EvaluatorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'tenders'>('overview');
  const [evaluator, setEvaluator] = useState<Evaluator | null>(null);
  const [assignedTenders, setAssignedTenders] = useState<AssignedTender[]>([]);

  React.useEffect(() => {
    // Find the evaluator by ID
    const foundEvaluator = mockEvaluators.find(e => e.id === id);
    if (foundEvaluator) {
      setEvaluator(foundEvaluator);
      
      // Get random tenders for this evaluator
      const tenders = mockTenders
        .sort(() => Math.random() - 0.5)
        .slice(0, foundEvaluator.assignedTenders)
        .map(tender => ({
          id: tender.id,
          title: tender.title,
          status: tender.status,
          deadline: tender.deadline,
          progress: Math.floor(Math.random() * 100),
          submissions: Math.floor(Math.random() * 15) + 1,
          budget: `$${tender.budget.toLocaleString()}`,
          category: tender.category
        }));
      
      setAssignedTenders(tenders);
    }
  }, [id]);

  if (!evaluator) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <UserCheck className="h-16 w-16 text-neutral-300 mb-4" />
        <h2 className="text-2xl font-bold text-neutral-700 mb-2">Evaluator Not Found</h2>
        <p className="text-neutral-500 mb-4">The evaluator you're looking for doesn't exist or has been removed.</p>
        <Link 
          to="/evaluators"
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          Back to Evaluators
        </Link>
      </div>
    );
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return 'bg-success-500';
    if (progress >= 50) return 'bg-primary-500';
    if (progress >= 25) return 'bg-warning-500';
    return 'bg-neutral-200';
  };

  const handleDelete = () => {
    // Implement the delete logic here
    console.log('Deleting evaluator');
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <div>
          <Link 
            to="/evaluators" 
            className="text-primary-600 hover:text-primary-800 text-sm flex items-center mb-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Evaluators
          </Link>
          <h1 className="text-3xl font-bold heading-underline mb-2">{evaluator.name}</h1>
        </div>
        <div className="flex space-x-2">
          <Link
            to={`/evaluators/${evaluator.id}/edit`}
            className="inline-flex items-center px-3 py-1.5 bg-primary-50 text-primary-700 text-sm font-medium rounded-md border border-primary-200 hover:bg-primary-100 transition-colors"
          >
            <Edit className="w-4 h-4 mr-1.5" />
            Edit Evaluator
          </Link>
          <button
            onClick={handleDelete}
            className="inline-flex items-center px-3 py-1.5 bg-error-50 text-error-700 text-sm font-medium rounded-md border border-error-200 hover:bg-error-100 transition-colors"
          >
            <Trash2 className="w-4 h-4 mr-1.5" />
            Delete Evaluator
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-neutral-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('tenders')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'tenders'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
            }`}
          >
            Assigned Tenders
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'overview' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <div className="flex items-center mb-6">
              <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
                <UserCheck className="h-8 w-8 text-primary-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold">{evaluator.name}</h2>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(evaluator.status)}`}>
                  {evaluator.status.charAt(0).toUpperCase() + evaluator.status.slice(1)}
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-neutral-400 mr-3" />
                <span className="text-neutral-600">{evaluator.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-neutral-400 mr-3" />
                <span className="text-neutral-600">{evaluator.phone}</span>
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-warning-500 mr-3" />
                <span className="text-neutral-600">Rating: {evaluator.rating}/5</span>
              </div>
              <div className="flex items-center">
                <Award className="h-5 w-5 text-primary-500 mr-3" />
                <span className="text-neutral-600">{evaluator.assignedTenders} Assigned Tenders</span>
              </div>
            </div>
          </div>

          {/* Expertise Card */}
          <div className="md:col-span-2 bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {evaluator.expertise.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Tender</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Submissions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Budget</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Deadline</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Progress</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {assignedTenders.map((tender) => (
                  <tr key={tender.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                            <FileText className="h-5 w-5 text-primary-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-neutral-900">{tender.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-500">{tender.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(tender.status)}`}>
                        {tender.status.charAt(0).toUpperCase() + tender.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-900">{tender.submissions}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-900">{tender.budget}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      {new Date(tender.deadline).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-full bg-neutral-200 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${getProgressColor(tender.progress)}`}
                          style={{ width: `${tender.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-neutral-500 mt-1">{tender.progress}%</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`/tenders/${tender.id}`}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvaluatorDetails; 