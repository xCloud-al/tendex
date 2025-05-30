import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Filter, Search, FileText, ArrowDown, ArrowUp, Calendar, CheckCircle, Loader, X, Download, Copy, ArrowRight, Clock, AlertTriangle, FileCheck, Pencil, Users, Edit, Trash2, ExternalLink, BarChart, Share2, Loader2 } from 'lucide-react';
import { formatDate, daysUntil } from '../utils/dateUtils';
import { stripHtml } from '../utils/textUtils';
import { useGetTendersQuery } from '../store/services/api';

type SortField = 'title' | 'publishDate' | 'deadline' | 'status' | 'progress' | 'submissions';
type SortDirection = 'asc' | 'desc';

const ITEMS_PER_PAGE = 10;

const Tenders: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('publishDate');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const { data: tenders = [], isLoading, error } = useGetTendersQuery();

  console.log(tenders);
  
  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  // Filter and sort tenders
  const filteredTenders = tenders
    .filter(tender => 
      (statusFilter === 'all' || tender.tender_status === statusFilter) &&
      (tender.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
       tender.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortConfig?.key === 'title') {
        return sortConfig.direction === 'asc' 
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else if (sortConfig?.key === 'publishDate') {
        return sortConfig.direction === 'asc'
          ? new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime()
          : new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
      } else if (sortConfig?.key === 'deadline') {
        return sortConfig.direction === 'asc'
          ? new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
          : new Date(b.deadline).getTime() - new Date(a.deadline).getTime();
      } else if (sortConfig?.key === 'status') {
        return sortConfig.direction === 'asc'
          ? a.status.localeCompare(b.status)
          : b.status.localeCompare(a.status);
      } else if (sortConfig?.key === 'progress') {
        return sortConfig.direction === 'asc'
          ? a.progress - b.progress
          : b.progress - a.progress;
      } else if (sortConfig?.key === 'submissions') {
        return sortConfig.direction === 'asc'
          ? a.submissions - b.submissions
          : b.submissions - a.submissions;
      }
      return 0;
    });

  // Calculate pagination
  const totalPages = Math.ceil(filteredTenders.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTenders = filteredTenders.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-primary-100 text-primary-700';
      case 'completed':
        return 'bg-success-100 text-success-700';
      case 'evaluation':
        return 'bg-warning-100 text-warning-700';
      case 'draft':
        return 'bg-neutral-100 text-neutral-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  const handleClone = (tender: any) => {
    navigate('/tenders/create', { 
      state: { 
        clonedTender: {
          basicInfo: {
            title: tender.title,
            description: tender.description,
            deadline: tender.deadline,
            budget: tender.budget.toString()
          },
          criteria: {
            documents: tender.documents
          },
          evaluation: {
            documents: []
          }
        }
      }
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Clock className="h-3 w-3 mr-1 inline" />;
      case 'completed':
        return <CheckCircle className="h-3 w-3 mr-1 inline" />;
      case 'evaluation':
        return <FileCheck className="h-3 w-3 mr-1 inline" />;
      case 'draft':
        return <FileText className="h-3 w-3 mr-1 inline" />;
      default:
        return <AlertTriangle className="h-3 w-3 mr-1 inline" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <AlertTriangle className="h-16 w-16 text-error-500 mb-4" />
        <h2 className="text-2xl font-bold text-neutral-700 mb-2">Error Loading Tenders</h2>
        <p className="text-neutral-500 mb-4">There was a problem loading the tenders. Please try again later.</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold heading-underline mb-2">Tenders</h1>
          <p className="text-neutral-600">Manage procurement tenders and requests for proposals</p>
        </div>
        <Link
          to="/tenders/create"
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-primary-50 text-primary-700 rounded-md border border-primary-200 hover:bg-primary-100 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create Tender
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden mb-8">
        <div className="p-4 sm:p-6 border-b border-neutral-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-neutral-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="Search tenders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full sm:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="block w-full py-2 px-3 pr-8 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500 appearance-none bg-no-repeat bg-[right_0.5rem_center] bg-[length:1.5em_1.5em] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236B7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')]"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="evaluation">In Evaluation</option>
                <option value="completed">Completed</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('title')}
                >
                  <div className="flex items-center">
                    <span>Tender Title</span>
                    {sortConfig?.key === 'title' && (
                      <span className="ml-2">
                        {sortConfig.direction === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('publishDate')}
                >
                  <div className="flex items-center">
                    <span>Published</span>
                    {sortConfig?.key === 'publishDate' && (
                      <span className="ml-2">
                        {sortConfig.direction === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('deadline')}
                >
                  <div className="flex items-center">
                    <span>Deadline</span>
                    {sortConfig?.key === 'deadline' && (
                      <span className="ml-2">
                        {sortConfig.direction === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center">
                    <span>Status</span>
                    {sortConfig?.key === 'status' && (
                      <span className="ml-2">
                        {sortConfig.direction === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                      </span>
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {currentTenders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <FileText className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                    <p className="text-neutral-500 font-medium">No tenders found</p>
                    <p className="text-neutral-400 text-sm mt-1">Try adjusting your search or filters</p>
                  </td>
                </tr>
              ) : (
                currentTenders.map((tender) => {
                  const daysLeft = daysUntil(tender.deadline);
                  const isUrgent = daysLeft !== null && daysLeft < 3 && tender.tender_status === 'active';
                  
                  return (
                    <tr key={tender.id} className="hover:bg-neutral-50">
                      <td className="px-6 py-4">
                        <div className="flex items-start">
                          <div className="bg-neutral-100 p-2 rounded mr-3 hidden sm:block">
                            <FileText className="h-5 w-5 text-neutral-500" />
                          </div>
                          <div>
                            <Link 
                              to={`/tenders/${tender.documentId}`}
                              className="text-primary-600 hover:text-primary-800 font-medium"
                            >
                              {tender.title}
                            </Link>
                            <p className="text-neutral-500 text-sm mt-1 line-clamp-1">
                              {stripHtml(tender.description)}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-neutral-400" />
                          {formatDate(tender.open_date)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {isUrgent ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-error-100 text-error-800">
                            {daysLeft === 0 ? "Today" : daysLeft === 1 ? "Tomorrow" : `${daysLeft} days left`}
                          </span>
                        ) : (
                          <span className="text-neutral-500">{formatDate(tender.deadline)}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(tender.tender_status)}`}>
                          {getStatusIcon(tender.tender_status)}
                          {tender.tender_status.charAt(0).toUpperCase() + tender.tender_status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button 
                            onClick={() => handleClone(tender)}
                            className="text-neutral-500 hover:text-neutral-700" 
                            title="Clone Tender"
                          >
                            <Copy className="h-5 w-5" />
                          </button>
                          <Link 
                            to={`/tenders/${tender.documentId}`} 
                            className="text-primary-600 hover:text-primary-800"
                            title="View Details"
                          >
                            <ArrowRight className="h-5 w-5" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t border-neutral-200 bg-neutral-50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-neutral-500">
              Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">{Math.min(endIndex, filteredTenders.length)}</span> of <span className="font-medium">{filteredTenders.length}</span> tenders
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 border border-neutral-300 rounded ${
                  currentPage === 1 
                    ? 'bg-white text-neutral-400 cursor-not-allowed' 
                    : 'bg-white text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                Previous
              </button>
              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 border border-neutral-300 rounded ${
                  currentPage === totalPages 
                    ? 'bg-white text-neutral-400 cursor-not-allowed' 
                    : 'bg-white text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tenders;