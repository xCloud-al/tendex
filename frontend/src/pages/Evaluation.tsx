import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileCheck, ArrowUpDown, Download, CheckCircle, UserCheck, BarChart2, 
  AlertCircle, Users, UploadCloud, Edit, Eye, MoreHorizontal 
} from 'lucide-react';
import { mockTenders } from '../data/mockData';
import { formatDate } from '../utils/dateUtils';

const Evaluation: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  
  // Filter tenders based on status
  const filteredTenders = mockTenders.filter(
    tender => selectedStatus === 'all' || tender.status === selectedStatus
  );
  
  // Group tenders by status for the statistics
  const activeTendersCount = mockTenders.filter(t => t.status === 'active').length;
  const evaluationTendersCount = mockTenders.filter(t => t.status === 'evaluation').length;
  const completedTendersCount = mockTenders.filter(t => t.status === 'completed').length;
  
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold heading-underline mb-2">Tender Evaluation</h1>
        <p className="text-neutral-600">
          Manage and track the evaluation process for all tenders
        </p>
      </div>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div 
          className={`p-5 bg-white border border-neutral-200 rounded-lg shadow-sm ${selectedStatus === 'evaluation' ? 'ring-2 ring-warning-400' : ''}`}
          onClick={() => setSelectedStatus('evaluation')}
        >
          <div className="flex items-center">
            <div className="w-12 h-12 bg-warning-100 rounded-full flex items-center justify-center mr-4">
              <FileCheck className="w-6 h-6 text-warning-700" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-neutral-900">{evaluationTendersCount}</h3>
              <p className="text-neutral-600">In Evaluation</p>
            </div>
          </div>
        </div>
        
        <div 
          className={`p-5 bg-white border border-neutral-200 rounded-lg shadow-sm ${selectedStatus === 'active' ? 'ring-2 ring-primary-400' : ''}`}
          onClick={() => setSelectedStatus('active')}
        >
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
              <ArrowUpDown className="w-6 h-6 text-primary-700" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-neutral-900">{activeTendersCount}</h3>
              <p className="text-neutral-600">Awaiting Deadline</p>
            </div>
          </div>
        </div>
        
        <div 
          className={`p-5 bg-white border border-neutral-200 rounded-lg shadow-sm ${selectedStatus === 'completed' ? 'ring-2 ring-success-400' : ''}`}
          onClick={() => setSelectedStatus('completed')}
        >
          <div className="flex items-center">
            <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center mr-4">
              <CheckCircle className="w-6 h-6 text-success-700" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-neutral-900">{completedTendersCount}</h3>
              <p className="text-neutral-600">Evaluation Completed</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Filter Options */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedStatus('all')}
          className={`px-4 py-2 rounded-md text-sm font-medium 
                    ${selectedStatus === 'all' 
                      ? 'bg-neutral-900 text-white' 
                      : 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50'
                    }`}
        >
          All Tenders
        </button>
        <button
          onClick={() => setSelectedStatus('evaluation')}
          className={`px-4 py-2 rounded-md text-sm font-medium
                    ${selectedStatus === 'evaluation' 
                      ? 'bg-warning-600 text-white' 
                      : 'bg-white text-warning-700 border border-warning-300 hover:bg-warning-50'
                    }`}
        >
          <FileCheck className="h-4 w-4 inline-block mr-1" />
          In Evaluation
        </button>
        <button
          onClick={() => setSelectedStatus('active')}
          className={`px-4 py-2 rounded-md text-sm font-medium
                    ${selectedStatus === 'active' 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-white text-primary-700 border border-primary-300 hover:bg-primary-50'
                    }`}
        >
          <ArrowUpDown className="h-4 w-4 inline-block mr-1" />
          Awaiting Deadline
        </button>
        <button
          onClick={() => setSelectedStatus('completed')}
          className={`px-4 py-2 rounded-md text-sm font-medium
                    ${selectedStatus === 'completed' 
                      ? 'bg-success-600 text-white' 
                      : 'bg-white text-success-700 border border-success-300 hover:bg-success-50'
                    }`}
        >
          <CheckCircle className="h-4 w-4 inline-block mr-1" />
          Completed
        </button>
      </div>
      
      {/* Evaluation Table */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200 bg-neutral-50">
          <h2 className="text-lg font-semibold">Evaluation Management</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead>
              <tr className="bg-neutral-50">
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Tender
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Committee
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Deadline / Completed
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Submissions
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {filteredTenders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <FileCheck className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                    <p className="text-neutral-700 font-medium">No tenders found</p>
                    <p className="text-neutral-500 text-sm mt-1">Try changing your filter selection</p>
                  </td>
                </tr>
              ) : (
                filteredTenders.map((tender) => {
                  const statusConfig = {
                    active: {
                      icon: <ArrowUpDown className="h-4 w-4 mr-1" />,
                      text: 'Awaiting Deadline',
                      className: 'bg-primary-100 text-primary-700'
                    },
                    evaluation: {
                      icon: <FileCheck className="h-4 w-4 mr-1" />,
                      text: 'In Evaluation',
                      className: 'bg-warning-100 text-warning-700'
                    },
                    completed: {
                      icon: <CheckCircle className="h-4 w-4 mr-1" />,
                      text: 'Completed',
                      className: 'bg-success-100 text-success-700'
                    },
                    draft: {
                      icon: <Edit className="h-4 w-4 mr-1" />,
                      text: 'Draft',
                      className: 'bg-neutral-100 text-neutral-700'
                    }
                  };
                  
                  const currentStatus = statusConfig[tender.status as keyof typeof statusConfig];
                  
                  return (
                    <tr key={tender.id} className="hover:bg-neutral-50">
                      <td className="px-6 py-4">
                        <Link to={`/tenders/${tender.id}`} className="text-primary-600 hover:text-primary-800 font-medium">
                          {tender.title}
                        </Link>
                        <div className="text-sm text-neutral-500 mt-1 line-clamp-1">
                          {tender.description.substring(0, 60)}...
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${currentStatus.className}`}>
                          {currentStatus.icon}
                          {currentStatus.text}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex -space-x-2">
                          <div className="z-30 h-8 w-8 rounded-full bg-primary-200 flex items-center justify-center border-2 border-white">
                            <span className="text-xs font-medium text-primary-700">JD</span>
                          </div>
                          <div className="z-20 h-8 w-8 rounded-full bg-secondary-200 flex items-center justify-center border-2 border-white">
                            <span className="text-xs font-medium text-secondary-700">AL</span>
                          </div>
                          <div className="z-10 h-8 w-8 rounded-full bg-success-200 flex items-center justify-center border-2 border-white">
                            <span className="text-xs font-medium text-success-700">TS</span>
                          </div>
                          <div className="h-8 w-8 rounded-full bg-neutral-200 flex items-center justify-center border-2 border-white">
                            <span className="text-xs font-medium text-neutral-700">+2</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                        {tender.status === 'completed' ? (
                          <span>Completed on {formatDate('2025-03-15')}</span>
                        ) : (
                          <span>{formatDate(tender.deadline)}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="bg-neutral-100 text-neutral-800 px-2 py-0.5 rounded-md">
                          {tender.submissionCount || 0} submissions
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex justify-end space-x-2">
                          {tender.status === 'active' && (
                            <span className="text-neutral-400 cursor-not-allowed" title="Awaiting deadline">
                              <AlertCircle className="h-5 w-5" />
                            </span>
                          )}
                          
                          {tender.status === 'evaluation' && (
                            <Link 
                              to={`/evaluation/${tender.id}`} 
                              className="text-warning-600 hover:text-warning-800"
                              title="Continue evaluation"
                            >
                              <FileCheck className="h-5 w-5" />
                            </Link>
                          )}
                          
                          {tender.status === 'completed' && (
                            <Link 
                              to={`/reports/${tender.id}`} 
                              className="text-primary-600 hover:text-primary-800"
                              title="View report"
                            >
                              <BarChart2 className="h-5 w-5" />
                            </Link>
                          )}
                          
                          <button className="text-neutral-500 hover:text-neutral-700" title="More options">
                            <MoreHorizontal className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Evaluation;