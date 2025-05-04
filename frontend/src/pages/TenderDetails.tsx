import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  FileText, Calendar, Clock, Users, Download, Trash2, 
  CheckCircle, AlertTriangle, ExternalLink, FileCheck, Share2, Pencil, UserCheck, Mail, Phone, Star, 
  Loader2
} from 'lucide-react';
import { formatDate, daysUntil } from '../utils/dateUtils';
import { useCheckEligibilityMutation, useGetTenderByIdQuery, useRunAutomaticEvaluationMutation } from '../store/services/api';
import { ToastContext } from '../components/Layout';
import { useContext } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Tender, Offer } from '../store/types';

const TenderDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [hasRunAICheck, setHasRunAICheck] = useState(false);
  const [assignedEvaluators, setAssignedEvaluators] = useState([
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
    }
  ]);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [availableEvaluators, setAvailableEvaluators] = useState([
    {
      id: '3',
      name: 'Michael Johnson',
      email: 'michael.johnson@example.com',
      phone: '+1 234 567 892',
      expertise: ['Finance', 'Accounting'],
      status: 'active',
      rating: 4.7,
      assignedTenders: 1
    },
    {
      id: '4',
      name: 'Sarah Williams',
      email: 'sarah.williams@example.com',
      phone: '+1 234 567 893',
      expertise: ['Legal', 'Compliance'],
      status: 'active',
      rating: 4.9,
      assignedTenders: 2
    }
  ]);
  const [selectedEvaluators, setSelectedEvaluators] = useState<string[]>([]);
  const [checkEligibility, { isLoading: isCheckingEligibility }] = useCheckEligibilityMutation();
  const [runAutomaticEvaluation, { isLoading: isRunningAutomaticEvaluation }] = useRunAutomaticEvaluationMutation();
  const { addToast } = useContext(ToastContext);
  const { data: tender, isLoading, error, refetch } = useGetTenderByIdQuery(id!);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (error || !tender) {
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
  };

    const sortedSubmissions = [...(tender.offers || [])].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const { key, direction } = sortConfig;
    const aValue = key === 'vendor' ? a.vendor.name : a[key as keyof Offer];
    const bValue = key === 'vendor' ? b.vendor.name : b[key as keyof Offer];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
        return direction === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
      }
    if (typeof aValue === 'number' && typeof bValue === 'number') {
        return direction === 'asc'
        ? aValue - bValue
        : bValue - aValue;
      }
      return 0;
    });

  const handleAICheck = async () => {
    try {
      await runAutomaticEvaluation({
        tenderId: id!
      }).unwrap();

      setHasRunAICheck(true);
      addToast('AI criteria check completed successfully', 'success');
      
      // Refetch tender data to get the latest state
      await refetch();
    } catch (error) {
      console.error('Error running AI check:', error);
      addToast('Failed to run AI criteria check', 'error');
    }
  };

  const getStatusColor = (status?: string) => {
    if (!status) return 'bg-neutral-100 text-neutral-700';
    
    switch (status.toUpperCase()) {
      case 'DRAFT':
        return 'bg-neutral-100 text-neutral-700';
      case 'SUBMITTED':
        return 'bg-primary-100 text-primary-700';
      case 'QUALIFIED':
        return 'bg-success-100 text-success-700';
      case 'DISQUALIFIED':
        return 'bg-error-100 text-error-700';
      case 'APPROVED':
        return 'bg-success-100 text-success-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };
  
  const getStatusIcon = (status?: string) => {
    if (!status) return null;
    
    switch (status.toUpperCase()) {
      case 'DRAFT':
        return <FileText className="h-4 w-4 mr-1" />;
      case 'SUBMITTED':
        return <Clock className="h-4 w-4 mr-1" />;
      case 'QUALIFIED':
        return <CheckCircle className="h-4 w-4 mr-1" />;
      case 'DISQUALIFIED':
        return <AlertTriangle className="h-4 w-4 mr-1" />;
      case 'APPROVED':
        return <CheckCircle className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };
  
  const handleEdit = () => {
    navigate(`/tenders/${id}/edit`);
  };
  
  const handleAssignEvaluators = () => {
    const newEvaluators = availableEvaluators.filter(e => selectedEvaluators.includes(e.id));
    setAssignedEvaluators(prev => [...prev, ...newEvaluators]);
    setAvailableEvaluators(prev => prev.filter(e => !selectedEvaluators.includes(e.id)));
    setSelectedEvaluators([]);
    setIsAssignModalOpen(false);
  };
  
  const handleDownloadAll = async () => {
    try {
      const zip = new JSZip();
      
      // Add criteria document if exists
      if (tender.criteria_document) {
        const response = await fetch(`http://localhost:1337${tender.criteria_document.url}`);
        const blob = await response.blob();
        zip.file(tender.criteria_document.name, blob);
      }
      
      // Add all supporting documents
      if (tender.documents && tender.documents.length > 0) {
        for (const doc of tender.documents) {
          const response = await fetch(`http://localhost:1337${doc.url}`);
          const blob = await response.blob();
          zip.file(doc.name, blob);
        }
      }
      
      // Generate and download the zip file
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, `${tender.title}_documents.zip`);
    } catch (error) {
      console.error('Error downloading documents:', error);
      addToast('Failed to download documents', 'error');
    }
  };
  
  // const renderOffersTab = () => (
  //   <div className="space-y-6">
  //     <div className="flex justify-between items-center">
  //       <h3 className="text-lg font-semibold">Vendor Offers</h3>
  //       <div className="flex items-center space-x-4">
  //         <span className="text-sm text-gray-500">Sort by:</span>
  //         <select
  //           value={sortConfig?.key || ''}
  //           onChange={(e) => handleSort(e.target.value)}
  //           className="border rounded-md px-3 py-1 text-sm"
  //         >
  //           <option value="vendor">Vendor Name</option>
  //           <option value="submittedAt">Submission Date</option>
  //           <option value="documents">Document Count</option>
  //           <option value="status">Status</option>
  //         </select>
  //         <button
  //           onClick={() => setSortConfig(prev => prev ? { ...prev, direction: prev.direction === 'asc' ? 'desc' : 'asc' } : null)}
  //           className="p-1 hover:bg-gray-100 rounded"
  //         >
  //           {sortConfig?.direction === 'asc' ? '↑' : '↓'}
  //         </button>
  //       </div>
  //     </div>

  //     <div className="bg-white rounded-lg shadow overflow-hidden">
  //       <table className="min-w-full divide-y divide-gray-200">
  //         <thead className="bg-gray-50">
  //           <tr>
  //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
  //               Vendor
  //             </th>
  //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
  //               Submission Date
  //             </th>
  //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
  //               Documents
  //             </th>
  //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
  //               Status
  //             </th>
  //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
  //               Actions
  //             </th>
  //           </tr>
  //         </thead>
  //         <tbody className="bg-white divide-y divide-gray-200">
  //           {sortedOffers.map((offer) => (
  //             <tr key={offer.id}>
  //               <td className="px-6 py-4 whitespace-nowrap">
  //                 <div className="flex items-center">
  //                   <div>
  //                     <div className="text-sm font-medium text-gray-900">
  //                       {offer.vendor.name}
  //                     </div>
  //                     <div className="text-sm text-gray-500">
  //                       {offer.vendor.email}
  //                     </div>
  //                   </div>
  //                 </div>
  //               </td>
  //               <td className="px-6 py-4 whitespace-nowrap">
  //                 <div className="text-sm text-gray-900">
  //                   {formatDate(offer.submitted_at)}
  //                 </div>
  //               </td>
  //               <td className="px-6 py-4 whitespace-nowrap">
  //                 <div className="text-sm text-gray-900">
  //                   {offer.documents.length}
  //                 </div>
  //               </td>
  //               <td className="px-6 py-4 whitespace-nowrap">
  //                 <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
  //                   offer.offer_status === 'submitted' ? 'bg-blue-100 text-blue-800' :
  //                   offer.offer_status === 'qualified' ? 'bg-green-100 text-green-800' :
  //                   offer.offer_status === 'disqualified' ? 'bg-red-100 text-red-800' :
  //                   'bg-purple-100 text-purple-800'
  //                 }`}>
  //                   {offer.offer_status.charAt(0).toUpperCase() + offer.offer_status.slice(1)}
  //                 </span>
  //               </td>
  //               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
  //                 <button
  //                   onClick={() => navigate(`/tenders/${tender.documentId}/submissions/${offer.documentId}/evaluate`)}
  //                   className="text-indigo-600 hover:text-indigo-900"
  //                 >
  //                   View Details
  //                 </button>
  //               </td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>
  //   </div>
  // );

  const renderSubmissionsTab = () => (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Vendor Submissions</h2>
          <div className="flex items-center space-x-4">
            <span className="text-neutral-500 text-sm">
              {tender.offers?.length} submission{tender.offers?.length !== 1 ? 's' : ''}
            </span>
            {!isActive && !isCompleted && (
              <button
                onClick={handleAICheck}
                disabled={hasRunAICheck || isRunningAutomaticEvaluation}
                className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md border transition-colors
                  ${(hasRunAICheck || isRunningAutomaticEvaluation)
                    ? 'bg-neutral-50 text-neutral-400 border-neutral-200 cursor-not-allowed' 
                    : 'bg-primary-50 text-primary-700 border-primary-200 hover:bg-primary-100'
                  }`}
              >
                {isRunningAutomaticEvaluation ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                    Running AI Check...
                  </>
                ) : (
                  <>
                    <FileCheck className="h-4 w-4 mr-1.5" />
                    {hasRunAICheck ? 'AI Check Completed' : 'Run AI Criteria Check'}
                  </>
                )}
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
        
        {!isActive && tender.offers?.length === 0 && (
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-neutral-700 mb-1">No submissions yet</h3>
            <p className="text-neutral-500">This tender hasn't received any submissions.</p>
          </div>
        )}
        
        {!isActive && tender.offers?.length > 0 && (
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
                {tender.offers?.map((sub) => (
                  <tr key={sub.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-neutral-200 flex items-center justify-center">
                          <span className="text-neutral-700 font-medium">
                            {sub.vendor?.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-neutral-900">{sub.vendor?.name}</div>
                          <div className="text-sm text-neutral-500">{sub.vendor?.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      {formatDate(sub.submitted_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      {sub.documents?.length} documents
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(sub.offer_status)}`}>
                        {getStatusIcon(sub.offer_status)}
                        {sub.offer_status.charAt(0).toUpperCase() + sub.offer_status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => navigate(`/tenders/${tender.documentId}/submissions/${sub.documentId}/evaluate`)}
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
                {(tender.documents?.length > 0 || tender.criteria_document) && (
                  <button 
                    onClick={handleDownloadAll}
                  className="inline-flex items-center px-3 py-1.5 bg-primary-50 text-primary-700 text-sm font-medium rounded-md border border-primary-200 hover:bg-primary-100 transition-colors"
                >
                  <Download className="h-4 w-4 mr-1.5" />
                  Download All
                  </button>
                )}
              </div>
              
              {tender.criteria_document && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-neutral-700 mb-4">Evaluation Criteria Document</h3>
                  <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
                    <div className="flex items-center">
                      <div className="bg-primary-100 p-2 rounded mr-4">
                        <FileText className="h-6 w-6 text-primary-700" />
                      </div>
                      <div>
                        <h3 className="font-medium text-neutral-800">{tender.criteria_document.name}</h3>
                        <div className="flex items-center text-sm text-neutral-500 mt-1">
                          <span className="mr-3">{tender.criteria_document.ext}</span>
                          <span className="mr-3">{tender.criteria_document.size}</span>
                          <span>Updated: {formatDate(tender.criteria_document.updatedAt)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <a 
                        href={`http://localhost:1337${tender.criteria_document.url}`}
                        download
                        className="p-1.5 text-neutral-500 hover:text-neutral-700 rounded-full hover:bg-neutral-100"
                        title="Download"
                      >
                        <Download className="h-5 w-5" />
                      </a>
                      <a 
                        href={`http://localhost:1337${tender.criteria_document.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-neutral-500 hover:text-neutral-700 rounded-full hover:bg-neutral-100"
                        title="View"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
              )}
              
              {tender.documents && tender.documents.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-neutral-700 mb-4">Supporting Documents</h3>
                  {tender.documents.map((doc, index) => (
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
                            <span className="mr-3">{doc.ext}</span>
                            <span className="mr-3">{doc.size}</span>
                            <span>Updated: {formatDate(doc.updatedAt)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <a 
                          href={`http://localhost:1337${doc.url}`}
                          download
                          className="p-1.5 text-neutral-500 hover:text-neutral-700 rounded-full hover:bg-neutral-100"
                          title="Download"
                        >
                          <Download className="h-5 w-5" />
                        </a>
                        <a 
                          href={`http://localhost:1337${doc.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-neutral-500 hover:text-neutral-700 rounded-full hover:bg-neutral-100"
                          title="View"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </a>
                    </div>
                  </div>
                ))}
              </div>
              ) : !tender.criteria_document && (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-neutral-700 mb-1">No documents available</h3>
                  <p className="text-neutral-500">This tender doesn't have any documents attached yet.</p>
                </div>
              )}
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
                    {tender.offers?.length} submission{tender.offers?.length !== 1 ? 's' : ''}
                  </span>
                  {!isActive && !isCompleted && (
                    <button
                      onClick={handleAICheck}
                      disabled={hasRunAICheck || isRunningAutomaticEvaluation}
                      className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md border transition-colors
                        ${(hasRunAICheck || isRunningAutomaticEvaluation)
                          ? 'bg-neutral-50 text-neutral-400 border-neutral-200 cursor-not-allowed' 
                          : 'bg-primary-50 text-primary-700 border-primary-200 hover:bg-primary-100'
                        }`}
                    >
                      {isRunningAutomaticEvaluation ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                          Running AI Check...
                        </>
                      ) : (
                        <>
                          <FileCheck className="h-4 w-4 mr-1.5" />
                          {hasRunAICheck ? 'AI Check Completed' : 'Run AI Criteria Check'}
                        </>
                      )}
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
              
              {!isActive && tender.offers?.length === 0 && (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-neutral-700 mb-1">No submissions yet</h3>
                  <p className="text-neutral-500">This tender hasn't received any submissions.</p>
                </div>
              )}
              
              {!isActive && tender.offers?.length > 0 && (
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
                      {tender.offers?.map((sub) => (
                        <tr key={sub.id} className="hover:bg-neutral-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-neutral-200 flex items-center justify-center">
                                <span className="text-neutral-700 font-medium">
                                  {sub.vendor?.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-neutral-900">{sub.vendor?.name}</div>
                                <div className="text-sm text-neutral-500">{sub.vendor?.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                            {formatDate(sub.submitted_at)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                            {sub.documents?.length} documents
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(sub.offer_status)}`}>
                              {getStatusIcon(sub.offer_status)}
                              {sub.offer_status.charAt(0).toUpperCase() + sub.offer_status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => navigate(`/tenders/${tender.documentId}/submissions/${sub.documentId}/evaluate`)}
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
      
      case 'evaluators':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Assigned Evaluators</h2>
                <button 
                  onClick={() => setIsAssignModalOpen(true)}
                  className="inline-flex items-center px-3 py-1.5 bg-primary-50 text-primary-700 text-sm font-medium rounded-md border border-primary-200 hover:bg-primary-100 transition-colors"
                >
                  <Users className="h-4 w-4 mr-1.5" />
                  Assign Evaluator
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-neutral-200">
                  <thead className="bg-neutral-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Evaluator</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Expertise</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Rating</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-neutral-200">
                    {assignedEvaluators.map((evaluator) => (
                      <tr key={evaluator.id} className="hover:bg-neutral-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                                <UserCheck className="h-5 w-5 text-primary-600" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <Link
                                to={`/evaluators/${evaluator.id}`}
                                className="text-sm font-medium text-primary-600 hover:text-primary-900"
                              >
                                {evaluator.name}
                              </Link>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-neutral-500">
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 mr-2" />
                              {evaluator.email}
                            </div>
                            <div className="flex items-center mt-1">
                              <Phone className="h-4 w-4 mr-2" />
                              {evaluator.phone}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {evaluator.expertise.map((skill, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(evaluator.status)}`}>
                            {evaluator.status.charAt(0).toUpperCase() + evaluator.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-warning-500 mr-1" />
                            <span className="text-sm text-neutral-900">{evaluator.rating}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-3">
                            <Link
                              to={`/evaluators/${evaluator.id}`}
                              className="text-primary-600 hover:text-primary-900"
                            >
                              View Details
                            </Link>
                            <button
                              onClick={() => {
                                if (window.confirm('Are you sure you want to remove this evaluator?')) {
                                  setAssignedEvaluators(prev => prev.filter(e => e.id !== evaluator.id));
                                }
                              }}
                              className="text-error-600 hover:text-error-900"
                            >
                              Remove
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Assign Evaluator Modal */}
            {isAssignModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-semibold">Assign Evaluators</h3>
                      <button
                        onClick={() => setIsAssignModalOpen(false)}
                        className="text-neutral-400 hover:text-neutral-500"
                      >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="mb-6">
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-neutral-200">
                          <thead className="bg-neutral-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                <input
                                  type="checkbox"
                                  checked={selectedEvaluators.length === availableEvaluators.length}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedEvaluators(availableEvaluators.map(e => e.id));
                                    } else {
                                      setSelectedEvaluators([]);
                                    }
                                  }}
                                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                                />
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Evaluator</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Expertise</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Rating</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-neutral-200">
                            {availableEvaluators.map((evaluator) => (
                              <tr key={evaluator.id} className="hover:bg-neutral-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <input
                                    type="checkbox"
                                    checked={selectedEvaluators.includes(evaluator.id)}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setSelectedEvaluators(prev => [...prev, evaluator.id]);
                                      } else {
                                        setSelectedEvaluators(prev => prev.filter(id => id !== evaluator.id));
                                      }
                                    }}
                                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                                  />
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                      <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                                        <UserCheck className="h-5 w-5 text-primary-600" />
                                      </div>
                                    </div>
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-neutral-900">{evaluator.name}</div>
                                      <div className="text-sm text-neutral-500">{evaluator.email}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex flex-wrap gap-1">
                                    {evaluator.expertise.map((skill, index) => (
                                      <span
                                        key={index}
                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                                      >
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <Star className="h-4 w-4 text-warning-500 mr-1" />
                                    <span className="text-sm text-neutral-900">{evaluator.rating}</span>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => setIsAssignModalOpen(false)}
                        className="px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-md hover:bg-neutral-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAssignEvaluators}
                        disabled={selectedEvaluators.length === 0}
                        className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
                          selectedEvaluators.length === 0
                            ? 'bg-primary-300 cursor-not-allowed'
                            : 'bg-primary-600 hover:bg-primary-700'
                        }`}
                      >
                        Assign Selected
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      
        return renderSubmissionsTab();
        
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
          {getStatusIcon(tender.status)}
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
            <p className="text-sm text-neutral-600">{formatDate(tender.open_date)}</p>
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
            Submissions {tender.offers?.length > 0 && `(${tender.offers.length})`}
          </button>
          <button
            onClick={() => setActiveTab('evaluators')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap
                      ${activeTab === 'evaluators' 
                        ? 'border-primary-600 text-primary-600' 
                        : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                      }`}
          >
            Evaluators {assignedEvaluators.length > 0 && `(${assignedEvaluators.length})`}
          </button>
        </nav>
      </div>
      
      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};

export default TenderDetails;