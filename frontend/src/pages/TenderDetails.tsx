import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  FileText, Calendar, Clock, Users, Download, Edit, Trash2, 
  CheckCircle, AlertTriangle, ExternalLink, FileCheck, BarChart, Share2, Pencil
} from 'lucide-react';
import { mockTenders, mockSubmissions } from '../data/mockData';
import { formatDate, daysUntil } from '../utils/dateUtils';

const TenderDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [submissions, setSubmissions] = useState(mockSubmissions.filter(s => s.tenderId === id));
  const [hasRunAICheck, setHasRunAICheck] = useState(false);
  
  const tender = mockTenders.find(t => t.id === id);
  
  if (!tender) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <FileText className="h-16 w-16 text-neutral-300 mb-4" />
        <h2 className="text-2xl font-bold text-neutral-700 mb-2">Tender Not Found</h2>
        <p className="text-neutral-500 mb-4">The tender you're looking for doesn't exist or has been removed.</p>
        <Link 
          to="/tenders"
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          Back to Tenders
        </Link>
      </div>
    );
  }
  
  const daysRemaining = daysUntil(tender.deadline);
  const isUrgent = daysRemaining !== null && daysRemaining < 3 && tender.status === 'active';
  const isActive = tender.status === 'active';
  const isCompleted = tender.status === 'completed';
  const isEvaluation = tender.status === 'evaluation';
  
  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedSubmissions = [...submissions].sort((a, b) => {
      if (key === 'vendor') {
        return direction === 'asc' 
          ? a.vendor.name.localeCompare(b.vendor.name)
          : b.vendor.name.localeCompare(a.vendor.name);
      }
      if (key === 'submittedOn') {
        return direction === 'asc'
          ? new Date(a.submittedDate).getTime() - new Date(b.submittedDate).getTime()
          : new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime();
      }
      if (key === 'documents') {
        return direction === 'asc'
          ? a.documentCount - b.documentCount
          : b.documentCount - a.documentCount;
      }
      if (key === 'status') {
        return direction === 'asc'
          ? a.status.localeCompare(b.status)
          : b.status.localeCompare(a.status);
      }
      return 0;
    });

    setSubmissions(sortedSubmissions);
  };

  const handleAICheck = () => {
    // Update submissions with AI check results
    const updatedSubmissions = submissions.map(sub => {
      const isQualified = Math.random() > 0.5;
      const aiCheck = {
        isQualified,
        reasons: isQualified ? [
          'All required documents are present',
          'Company has sufficient experience',
          'Financial capability meets requirements'
        ] : [
          'Missing required certifications',
          'Insufficient financial documentation'
        ],
        score: Math.floor(Math.random() * 100)
      };

      // Update the submission in mockSubmissions
      const submissionIndex = mockSubmissions.findIndex(s => s.id === sub.id);
      if (submissionIndex !== -1) {
        mockSubmissions[submissionIndex] = {
          ...mockSubmissions[submissionIndex],
          aiCheck,
          status: isQualified ? 'qualified' as const : 'disqualified' as const
        };
      }

      return {
        ...sub,
        aiCheck,
        status: isQualified ? 'qualified' as const : 'disqualified' as const
      };
    });

    setSubmissions(updatedSubmissions);
    setHasRunAICheck(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-primary-100 text-primary-700';
      case 'qualified':
        return 'bg-warning-100 text-warning-700';
      case 'disqualified':
        return 'bg-error-100 text-error-700';
      case 'accepted':
        return 'bg-success-100 text-success-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };
  
  const getStatusIcon = () => {
    if (isActive) return <Clock className="h-5 w-5 mr-2" />;
    if (isCompleted) return <CheckCircle className="h-5 w-5 mr-2" />;
    if (isEvaluation) return <FileCheck className="h-5 w-5 mr-2" />;
    return <AlertTriangle className="h-5 w-5 mr-2" />;
  };
  
  const handleEdit = () => {
    navigate(`/tenders/${id}/edit`);
  };
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
            <div className="p-6">
              <div 
                className="prose prose-sm max-w-none text-neutral-700 prose-headings:text-xl prose-headings:font-semibold prose-headings:mb-4"
                dangerouslySetInnerHTML={{ __html: tender.description }}
              />
            </div>
          </div>
        );
        
      case 'documents':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Tender Documents</h2>
                <Link 
                  to="#" 
                  className="inline-flex items-center px-3 py-1.5 bg-primary-50 text-primary-700 text-sm font-medium rounded-md border border-primary-200 hover:bg-primary-100 transition-colors"
                >
                  <Download className="h-4 w-4 mr-1.5" />
                  Download All
                </Link>
              </div>
              
              <div className="space-y-4">
                {[
                  { name: 'Request for Proposal (RFP)', type: 'PDF', size: '3.2 MB', date: '2025-01-15' },
                  { name: 'Technical Specifications', type: 'DOCX', size: '1.8 MB', date: '2025-01-15' },
                  { name: 'Financial Proposal Template', type: 'XLSX', size: '0.9 MB', date: '2025-01-15' },
                  { name: 'Terms and Conditions', type: 'PDF', size: '1.5 MB', date: '2025-01-15' },
                  { name: 'Evaluation Criteria', type: 'PDF', size: '1.1 MB', date: '2025-01-15' },
                ].map((doc, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="bg-primary-100 p-2 rounded mr-4">
                        <FileText className="h-6 w-6 text-primary-700" />
                      </div>
                      <div>
                        <h3 className="font-medium text-neutral-800">{doc.name}</h3>
                        <div className="flex items-center text-sm text-neutral-500 mt-1">
                          <span className="mr-3">{doc.type}</span>
                          <span className="mr-3">{doc.size}</span>
                          <span>Updated: {formatDate(doc.date)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        className="p-1.5 text-neutral-500 hover:text-neutral-700 rounded-full hover:bg-neutral-100"
                        title="Download"
                      >
                        <Download className="h-5 w-5" />
                      </button>
                      <button 
                        className="p-1.5 text-neutral-500 hover:text-neutral-700 rounded-full hover:bg-neutral-100"
                        title="View"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 'submissions':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Vendor Submissions</h2>
                <div className="flex items-center space-x-4">
                  <span className="text-neutral-500 text-sm">
                    {submissions.length} submission{submissions.length !== 1 ? 's' : ''}
                  </span>
                  {!isActive && !isCompleted && (
                    <button
                      onClick={handleAICheck}
                      disabled={hasRunAICheck}
                      className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md border transition-colors
                        ${hasRunAICheck 
                          ? 'bg-neutral-50 text-neutral-400 border-neutral-200 cursor-not-allowed' 
                          : 'bg-primary-50 text-primary-700 border-primary-200 hover:bg-primary-100'
                        }`}
                    >
                      <FileCheck className="h-4 w-4 mr-1.5" />
                      {hasRunAICheck ? 'AI Check Completed' : 'Run AI Criteria Check'}
                    </button>
                  )}
                </div>
              </div>
              
              {isActive && (
                <div className="bg-warning-50 border-l-4 border-warning-500 p-4 rounded mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-warning-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-warning-800">
                        Submissions are hidden until deadline
                      </h3>
                      <div className="mt-2 text-sm text-warning-700">
                        <p>
                          To ensure fairness, vendor submissions cannot be viewed or evaluated until the tender 
                          deadline has passed. Check back after {formatDate(tender.deadline)}.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {!isActive && submissions.length === 0 && (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-neutral-700 mb-1">No submissions yet</h3>
                  <p className="text-neutral-500">This tender hasn't received any submissions.</p>
                </div>
              )}
              
              {!isActive && submissions.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-neutral-200">
                    <thead>
                      <tr>
                        <th 
                          className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer hover:text-neutral-700"
                          onClick={() => handleSort('vendor')}
                        >
                          <div className="flex items-center">
                            Vendor
                            {sortConfig?.key === 'vendor' && (
                              <span className="ml-1">
                                {sortConfig.direction === 'asc' ? '↑' : '↓'}
                              </span>
                            )}
                          </div>
                        </th>
                        <th 
                          className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer hover:text-neutral-700"
                          onClick={() => handleSort('submittedOn')}
                        >
                          <div className="flex items-center">
                            Submitted On
                            {sortConfig?.key === 'submittedOn' && (
                              <span className="ml-1">
                                {sortConfig.direction === 'asc' ? '↑' : '↓'}
                              </span>
                            )}
                          </div>
                        </th>
                        <th 
                          className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer hover:text-neutral-700"
                          onClick={() => handleSort('documents')}
                        >
                          <div className="flex items-center">
                            Documents
                            {sortConfig?.key === 'documents' && (
                              <span className="ml-1">
                                {sortConfig.direction === 'asc' ? '↑' : '↓'}
                              </span>
                            )}
                          </div>
                        </th>
                        <th 
                          className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer hover:text-neutral-700"
                          onClick={() => handleSort('status')}
                        >
                          <div className="flex items-center">
                            Status
                            {sortConfig?.key === 'status' && (
                              <span className="ml-1">
                                {sortConfig.direction === 'asc' ? '↑' : '↓'}
                              </span>
                            )}
                          </div>
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-neutral-200">
                      {submissions.map((sub) => (
                        <tr key={sub.id} className="hover:bg-neutral-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-neutral-200 flex items-center justify-center">
                                <span className="text-neutral-700 font-medium">
                                  {sub.vendor.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-neutral-900">{sub.vendor.name}</div>
                                <div className="text-sm text-neutral-500">{sub.vendor.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                            {formatDate(sub.submittedDate)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                            {sub.documentCount} documents
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(sub.status)}`}>
                              {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => navigate(`/tenders/${tender.id}/submissions/${sub.id}/evaluate`)}
                              className="inline-flex items-center px-3 py-1.5 bg-primary-50 text-primary-700 text-sm font-medium rounded-md border border-primary-200 hover:bg-primary-100 transition-colors"
                            >
                              Evaluate
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="animate-fade-in">
      {/* Tender Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <div>
          <Link 
            to="/tenders" 
            className="text-primary-600 hover:text-primary-800 text-sm flex items-center mb-2"
          >
            ← Back to Tenders
          </Link>
          <h1 className="text-3xl font-bold mb-2">{tender.title}</h1>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <button className="inline-flex items-center px-3 py-2 border border-neutral-300 text-neutral-700 font-medium rounded hover:bg-neutral-50">
            <Share2 className="h-5 w-5 mr-1.5" />
            Share
          </button>
          {tender.status === 'active' && (
            <button
              onClick={handleEdit}
              className="inline-flex items-center px-3 py-1.5 bg-primary-50 text-primary-700 text-sm font-medium rounded-md border border-primary-200 hover:bg-primary-100 transition-colors"
            >
              <Pencil className="w-4 h-4 mr-1.5" />
              Edit Tender
            </button>
          )}
          <button 
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this tender?')) {
                // TODO: Implement tender deletion
                navigate('/tenders');
              }
            }}
            className="inline-flex items-center px-3 py-1.5 bg-error-50 text-error-700 text-sm font-medium rounded-md border border-error-200 hover:bg-error-100 transition-colors"
          >
            <Trash2 className="w-4 h-4 mr-1.5" />
            Delete Tender
          </button>
        </div>
      </div>
      
      {/* Status and Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className={`col-span-1 md:col-span-2 flex items-center p-4 border rounded-lg ${getStatusColor(tender.status)}`}>
          {getStatusIcon()}
          <div>
            <h3 className="font-medium">
              {isActive ? 'Active Tender' : 
               isCompleted ? 'Completed Tender' : 
               isEvaluation ? 'In Evaluation' : 'Draft Tender'}
            </h3>
            <p className="text-sm">
              {isActive && daysRemaining !== null ? 
                `${daysRemaining} days remaining before deadline` : 
               isCompleted ? 'Evaluation completed and winner selected' :
               isEvaluation ? 'Under review by evaluation committee' :
               'Tender not yet published'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center p-4 bg-white border border-neutral-200 rounded-lg">
          <Calendar className="h-5 w-5 text-neutral-500 mr-3" />
          <div>
            <h3 className="text-sm font-medium text-neutral-700">Published</h3>
            <p className="text-sm text-neutral-600">{formatDate(tender.publishDate)}</p>
          </div>
        </div>
        
        <div className="flex items-center p-4 bg-white border border-neutral-200 rounded-lg">
          <Clock className="h-5 w-5 text-neutral-500 mr-3" />
          <div>
            <h3 className="text-sm font-medium text-neutral-700">Deadline</h3>
            <p className={`text-sm ${isUrgent ? 'text-error-600 font-medium' : 'text-neutral-600'}`}>
              {formatDate(tender.deadline)}
            </p>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="mb-6 border-b border-neutral-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap
                      ${activeTab === 'overview' 
                        ? 'border-primary-600 text-primary-600' 
                        : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                      }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap
                      ${activeTab === 'documents' 
                        ? 'border-primary-600 text-primary-600' 
                        : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                      }`}
          >
            Documents
          </button>
          <button
            onClick={() => setActiveTab('submissions')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap
                      ${activeTab === 'submissions' 
                        ? 'border-primary-600 text-primary-600' 
                        : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                      }`}
          >
            Submissions {submissions.length > 0 && `(${submissions.length})`}
          </button>
        </nav>
      </div>
      
      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};

export default TenderDetails;