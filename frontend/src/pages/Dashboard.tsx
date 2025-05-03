import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Clock, FileText, CheckCircle, AlertTriangle, BarChart2, Users, ArrowRight } from 'lucide-react';
import { mockTenders, mockSubmissions } from '../data/mockData';
import { ToastContext } from '../components/Layout';
import { formatDate, daysUntil } from '../utils/dateUtils';
import { stripHtml } from '../utils/textUtils';

const Dashboard: React.FC = () => {
  const { addToast } = useContext(ToastContext);
  
  // Count items by status
  const activeTenders = mockTenders.filter(t => t.status === 'active').length;
  const completedTenders = mockTenders.filter(t => t.status === 'completed').length;
  const pendingEvaluations = mockTenders.filter(t => t.status === 'evaluation').length;
  
  // Count unique vendors who have submitted
  const uniqueVendors = new Set(mockSubmissions.map(sub => sub.vendor.id)).size;
  
  // Get recent tenders
  const recentTenders = [...mockTenders]
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, 3);
    
  // Calculate tender with nearest deadline
  const upcomingDeadlines = mockTenders
    .filter(t => t.status === 'active' && new Date(t.deadline) > new Date())
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
  
  const nearestDeadline = upcomingDeadlines.length > 0 ? upcomingDeadlines[0] : null;
  
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold heading-underline mb-2">Dashboard</h1>
        <p className="text-neutral-600">Welcome back to AADF Procurement Management Platform</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Active Tenders Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-neutral-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-primary-100 p-3 rounded-full">
              <FileText className="h-6 w-6 text-primary-700" />
            </div>
            <span className="text-3xl font-bold text-primary-700">{activeTenders}</span>
          </div>
          <h3 className="text-lg font-semibold text-neutral-800">Active Tenders</h3>
          <p className="text-neutral-500 text-sm mt-1">Currently accepting submissions</p>
        </div>
        
        {/* Completed Evaluations Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-neutral-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-success-50 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-success-700" />
            </div>
            <span className="text-3xl font-bold text-success-700">{completedTenders}</span>
          </div>
          <h3 className="text-lg font-semibold text-neutral-800">Completed Tenders</h3>
          <p className="text-neutral-500 text-sm mt-1">Fully processed procurement</p>
        </div>
        
        {/* Pending Evaluations Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-neutral-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-warning-50 p-3 rounded-full">
              <AlertTriangle className="h-6 w-6 text-warning-700" />
            </div>
            <span className="text-3xl font-bold text-warning-700">{pendingEvaluations}</span>
          </div>
          <h3 className="text-lg font-semibold text-neutral-800">Pending Evaluations</h3>
          <p className="text-neutral-500 text-sm mt-1">Awaiting committee review</p>
        </div>
        
        {/* Vendors Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-neutral-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-secondary-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-secondary-700" />
            </div>
            <span className="text-3xl font-bold text-secondary-700">{uniqueVendors}</span>
          </div>
          <h3 className="text-lg font-semibold text-neutral-800">Active Vendors</h3>
          <p className="text-neutral-500 text-sm mt-1">Vendors who have submitted proposals</p>
        </div>
      </div>
      
      {/* Nearest Deadline Alert */}
      {nearestDeadline && (
        <div className="bg-warning-50 border-l-4 border-warning-500 p-4 rounded-md mb-8 flex items-center">
          <Clock className="h-5 w-5 text-warning-700 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-warning-700">Upcoming Deadline</h3>
            <p className="text-warning-600">
              "{nearestDeadline.title}" is due on {formatDate(nearestDeadline.deadline)}
            </p>
          </div>
          <Link 
            to={`/tenders/${nearestDeadline.id}`}
            className="ml-auto bg-warning-50 text-warning-700 px-3 py-1 rounded-md text-sm font-medium 
                      border border-warning-200 hover:bg-warning-100 transition-colors"
          >
            View Tender
          </Link>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Tenders */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
          <div className="p-5 border-b border-neutral-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Recent Tenders</h2>
            <Link 
              to="/tenders" 
              className="text-primary-600 hover:text-primary-800 flex items-center text-sm font-medium"
            >
              View all <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="divide-y divide-neutral-200">
            {recentTenders.map(tender => (
              <div key={tender.id} className="p-5 hover:bg-neutral-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-neutral-900">
                    {tender.title}
                  </h3>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium
                    ${tender.status === 'active' ? 'bg-primary-100 text-primary-700' : 
                      tender.status === 'completed' ? 'bg-success-100 text-success-700' : 
                      'bg-warning-100 text-warning-700'}`}
                  >
                    {tender.status.charAt(0).toUpperCase() + tender.status.slice(1)}
                  </span>
                </div>
                <p className="text-neutral-600 text-sm mb-3 line-clamp-2">
                  {stripHtml(tender.description)}
                </p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-500">
                    Published: {formatDate(tender.publishDate)}
                  </span>
                  <Link 
                    to={`/tenders/${tender.id}`} 
                    className="text-primary-600 hover:text-primary-800 font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Activity Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
          <div className="p-5 border-b border-neutral-200">
            <h2 className="text-xl font-semibold">Activity Summary</h2>
          </div>
          <div className="p-5">
            <div className="mb-5">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-neutral-700">Tender Creation Rate</h3>
                <span className="text-success-700 text-sm font-medium">+12%</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div className="bg-primary-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            
            <div className="mb-5">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-neutral-700">Evaluation Completion</h3>
                <span className="text-error-700 text-sm font-medium">-5%</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div className="bg-warning-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            
            <div className="mb-5">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-neutral-700">Vendor Participation</h3>
                <span className="text-success-700 text-sm font-medium">+8%</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div className="bg-secondary-600 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            
            <button 
              onClick={() => addToast('Report downloaded successfully!', 'success')}
              className="mt-3 w-full py-2 bg-primary-50 text-primary-700 rounded-md border border-primary-200 hover:bg-primary-100 transition-colors flex justify-center items-center"
            >
              <BarChart2 className="h-4 w-4 mr-2" />
              <span>Generate Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;