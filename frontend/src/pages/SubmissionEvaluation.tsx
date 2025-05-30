import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, FileText, Download, CheckCircle, XCircle, 
  AlertTriangle, Edit2, FileCheck, BarChart, Upload, Pencil 
} from 'lucide-react';
import { formatDate } from '../utils/dateUtils';
import React from 'react';
import { useGetOfferByIdQuery } from '../store/services/api';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

interface AutomaticEvaluation {
  id: number;
  documentId: string;
  overall_qualification_status: 'PASS' | 'FAIL';
  missing_documents: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

const SubmissionEvaluation = () => {
  const { tenderId, submissionId } = useParams<{ tenderId: string; submissionId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details');
  const [isEditingEvaluation, setIsEditingEvaluation] = useState(false);
  const [tempEvaluation, setTempEvaluation] = useState<AutomaticEvaluation | null>(null);
  const [manualScore, setManualScore] = useState<number>(0);
  const [comments, setComments] = useState('');

  const { data: offer, isLoading, error } = useGetOfferByIdQuery(submissionId!);

  // Initialize evaluation from offer data
  React.useEffect(() => {
    if (offer?.automatic_evaluation) {
      setTempEvaluation(offer.automatic_evaluation);
    }
  }, [offer]);

  const handleDownloadAll = async () => {
    if (!offer) return;
    
    try {
      const zip = new JSZip();
      
      // Add all documents
      if (offer.documents && offer.documents.length > 0) {
        for (const doc of offer.documents) {
          const response = await fetch(`http://localhost:1337${doc.url}`);
          const blob = await response.blob();
          zip.file(doc.name, blob);
        }
      }
      
      // Generate and download the zip file
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, `${offer.vendor?.name}_documents.zip`);
    } catch (error) {
      console.error('Error downloading documents:', error);
      // TODO: Add toast notification for error
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !offer) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <FileText className="h-16 w-16 text-neutral-300 mb-4" />
        <h2 className="text-2xl font-bold text-neutral-700 mb-2">Not Found</h2>
        <p className="text-neutral-500 mb-4">The submission you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate(`/tenders/${tenderId}`)}
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
        >
          Back to Tender
        </button>
      </div>
    );
  }

  const handleSubmitEvaluation = () => {
    // TODO: Implement evaluation submission
    console.log('Evaluation submitted:', {
      submissionId,
      tenderId,
      manualScore,
      comments
    });
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <div>
          <button 
            onClick={() => navigate(-1)}
            className="text-primary-600 hover:text-primary-800 text-sm flex items-center mb-2"
          >
            ← Back to Tender
          </button>
          <h1 className="text-3xl font-bold mb-2">Submission Evaluation</h1>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <button 
            onClick={() => navigate(`/tenders/${tenderId}/edit`)}
            className="inline-flex items-center px-3 py-2 bg-primary-50 text-primary-700 rounded-md border border-primary-200 hover:bg-primary-100 transition-colors"
          >
            <Pencil className="h-5 w-5 mr-1.5" />
            Edit Tender
          </button>
        </div>
      </div>

      {/* Status and Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex items-center p-4 bg-white border border-neutral-200 rounded-lg">
          <FileText className="h-5 w-5 text-neutral-500 mr-3" />
          <div>
            <h3 className="text-sm font-medium text-neutral-700">Tender</h3>
            <p className="text-sm text-neutral-600">{offer.tenderId}</p>
          </div>
        </div>
        
        <div className="flex items-center p-4 bg-white border border-neutral-200 rounded-lg">
          <FileCheck className="h-5 w-5 text-neutral-500 mr-3" />
          <div>
            <h3 className="text-sm font-medium text-neutral-700">Vendor</h3>
            <p className="text-sm text-neutral-600">{offer.vendor?.name}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 mb-8">
        {/* Submission Details */}
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Submission Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-neutral-700 mb-2">Submitted On</h3>
                <p className="text-neutral-600">{formatDate(offer.submitted_at)}</p>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-700 mb-2">Documents</h3>
                    <p className="text-neutral-600">{offer.documents.length} documents</p>
                  </div>
                  <button
                    onClick={handleDownloadAll}
                    className="inline-flex items-center px-2 py-1 bg-neutral-50 text-neutral-700 text-xs font-medium rounded border border-neutral-200 hover:bg-neutral-100 transition-colors"
                  >
                    <Download className="w-3 h-3 mr-1" />
                    Download All
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* AI Criteria Check */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Automatic Evaluation</h2>
              {!isEditingEvaluation && offer?.automatic_evaluation && (
                <button
                  onClick={() => setIsEditingEvaluation(true)}
                  className="inline-flex items-center px-3 py-1.5 bg-primary-50 text-primary-700 text-sm font-medium rounded-md border border-primary-200 hover:bg-primary-100 transition-colors"
                >
                  <FileCheck className="w-4 h-4 mr-1.5" />
                  Edit Evaluation
                </button>
              )}
              {isEditingEvaluation && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsEditingEvaluation(false)}
                    className="inline-flex items-center px-3 py-1.5 bg-neutral-50 text-neutral-700 text-sm font-medium rounded-md border border-neutral-200 hover:bg-neutral-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // TODO: Implement save evaluation
                      setIsEditingEvaluation(false);
                    }}
                    className="inline-flex items-center px-3 py-1.5 bg-primary-50 text-primary-700 text-sm font-medium rounded-md border border-primary-200 hover:bg-primary-100 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>

            {offer?.automatic_evaluation && (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${
                  offer.automatic_evaluation.overall_qualification_status === 'PASS'
                    ? 'bg-success-50 border border-success-200' 
                    : 'bg-error-50 border border-error-200'
                }`}>
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      {offer.automatic_evaluation.overall_qualification_status === 'PASS' ? (
                        <CheckCircle className="h-5 w-5 text-success-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-error-500" />
                      )}
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium">
                        {offer.automatic_evaluation.overall_qualification_status === 'PASS' 
                          ? 'Qualified for Evaluation' 
                          : 'Disqualified'}
                      </h3>
                      {offer.automatic_evaluation.missing_documents.length > 0 && (
                        <div className="mt-2 text-sm">
                          <h4 className="font-medium mb-2">Missing Documents:</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {offer.automatic_evaluation.missing_documents.map((doc, index) => (
                              <li key={index} className="text-neutral-700">{doc}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {isEditingEvaluation && (
                  <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                    <h3 className="text-sm font-medium text-neutral-700 mb-3">Edit Evaluation</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Qualification Status
                        </label>
                        <select
                          value={tempEvaluation?.overall_qualification_status || 'FAIL'}
                          onChange={(e) => setTempEvaluation(prev => prev ? {
                            ...prev,
                            overall_qualification_status: e.target.value as 'PASS' | 'FAIL'
                          } : null)}
                          className="block w-full px-3 py-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        >
                          <option value="PASS">Qualified</option>
                          <option value="FAIL">Disqualified</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Missing Documents
                        </label>
                        <textarea
                          value={tempEvaluation?.missing_documents.join('\n')}
                          onChange={(e) => setTempEvaluation(prev => prev ? {
                            ...prev,
                            missing_documents: e.target.value.split('\n').filter(line => line.trim())
                          } : null)}
                          rows={4}
                          className="block w-full px-3 py-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Enter missing documents (one per line)"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Manual Evaluation */}
          {offer?.automatic_evaluation?.overall_qualification_status === 'PASS' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Manual Evaluation</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Score (0-100)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={manualScore}
                    onChange={(e) => setManualScore(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Comments
                  </label>
                  <textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Add your evaluation comments here..."
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleSubmitEvaluation}
                    className="inline-flex items-center px-4 py-2 bg-primary-50 text-primary-700 text-base font-medium rounded-md border border-primary-200 hover:bg-primary-100 transition-colors"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Submit Evaluation
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmissionEvaluation; 