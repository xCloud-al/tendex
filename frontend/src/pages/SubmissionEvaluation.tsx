import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, FileText, Download, CheckCircle, XCircle, 
  AlertTriangle, Edit2, FileCheck, BarChart, Upload, Pencil 
} from 'lucide-react';
import { mockTenders, mockSubmissions } from '../data/mockData';
import { formatDate } from '../utils/dateUtils';
import React from 'react';

interface AICheckResult {
  isQualified: boolean;
  reasons: string[];
  score: number;
}

const SubmissionEvaluation = () => {
  const { tenderId, submissionId } = useParams<{ tenderId: string; submissionId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details');
  const [aiResult, setAIResult] = useState<AICheckResult | null>(null);
  const [isEditingAI, setIsEditingAI] = useState(false);
  const [tempAIResult, setTempAIResult] = useState<AICheckResult | null>(null);
  const [manualScore, setManualScore] = useState<number>(0);
  const [comments, setComments] = useState('');

  const tender = mockTenders.find(t => t.id === tenderId);
  const submission = mockSubmissions.find(s => s.id === submissionId);

  // Initialize AI result from submission data
  React.useEffect(() => {
    if (submission?.aiCheck) {
      setAIResult(submission.aiCheck);
    }
  }, [submission]);

  if (!tender || !submission) {
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

  const handleEditAI = () => {
    setTempAIResult(aiResult);
    setIsEditingAI(true);
  };

  const handleCancelEdit = () => {
    setTempAIResult(null);
    setIsEditingAI(false);
  };

  const handleSaveAI = () => {
    if (tempAIResult) {
      setAIResult(tempAIResult);
      setIsEditingAI(false);
      setTempAIResult(null);
    }
  };

  const handleSubmitEvaluation = () => {
    // TODO: Implement evaluation submission
    console.log('Evaluation submitted:', {
      submissionId,
      tenderId,
      aiResult,
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
          {new Date(tender.deadline) > new Date() && (
            <button 
              onClick={() => navigate(`/tenders/${tenderId}/edit`)}
              className="inline-flex items-center px-3 py-2 bg-primary-50 text-primary-700 rounded-md border border-primary-200 hover:bg-primary-100 transition-colors"
            >
              <Pencil className="h-5 w-5 mr-1.5" />
              Edit Tender
            </button>
          )}
        </div>
      </div>

      {/* Status and Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex items-center p-4 bg-white border border-neutral-200 rounded-lg">
          <FileText className="h-5 w-5 text-neutral-500 mr-3" />
          <div>
            <h3 className="text-sm font-medium text-neutral-700">Tender</h3>
            <p className="text-sm text-neutral-600">{tender.title}</p>
          </div>
        </div>
        
        <div className="flex items-center p-4 bg-white border border-neutral-200 rounded-lg">
          <FileCheck className="h-5 w-5 text-neutral-500 mr-3" />
          <div>
            <h3 className="text-sm font-medium text-neutral-700">Vendor</h3>
            <p className="text-sm text-neutral-600">{submission.vendor.name}</p>
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
                <p className="text-neutral-600">{formatDate(submission.submittedDate)}</p>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-700 mb-2">Documents</h3>
                    <p className="text-neutral-600">{submission.documentCount} documents</p>
                  </div>
                  <button
                    onClick={() => console.log('Download documents')}
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
              <h2 className="text-xl font-semibold">AI Criteria Check</h2>
              {!isEditingAI && aiResult && (
                <button
                  onClick={handleEditAI}
                  className="inline-flex items-center px-3 py-1.5 bg-primary-50 text-primary-700 text-sm font-medium rounded-md border border-primary-200 hover:bg-primary-100 transition-colors"
                >
                  <FileCheck className="w-4 h-4 mr-1.5" />
                  Edit AI Results
                </button>
              )}
              {isEditingAI && (
                <div className="flex space-x-2">
                  <button
                    onClick={handleCancelEdit}
                    className="inline-flex items-center px-3 py-1.5 bg-neutral-50 text-neutral-700 text-sm font-medium rounded-md border border-neutral-200 hover:bg-neutral-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveAI}
                    className="inline-flex items-center px-3 py-1.5 bg-primary-50 text-primary-700 text-sm font-medium rounded-md border border-primary-200 hover:bg-primary-100 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>

            {(aiResult || isEditingAI) && (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${
                  (isEditingAI ? tempAIResult?.isQualified : aiResult?.isQualified)
                    ? 'bg-warning-50 border border-warning-200' 
                    : 'bg-error-50 border border-error-200'
                }`}>
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      {(isEditingAI ? tempAIResult?.isQualified : aiResult?.isQualified) ? (
                        <AlertTriangle className="h-5 w-5 text-warning-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-error-500" />
                      )}
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium">
                        {(isEditingAI ? tempAIResult?.isQualified : aiResult?.isQualified) 
                          ? 'Qualified for Evaluation' 
                          : 'Disqualified'}
                      </h3>
                      <div className="mt-2 text-sm">
                        <ul className="list-disc pl-5 space-y-1">
                          {(isEditingAI ? tempAIResult?.reasons : aiResult?.reasons)?.map((reason, index) => (
                            <li key={index}>{reason}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {isEditingAI && (
                  <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                    <h3 className="text-sm font-medium text-neutral-700 mb-3">Edit AI Results</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Qualification Status
                        </label>
                        <select
                          value={tempAIResult?.isQualified ? 'qualified' : 'disqualified'}
                          onChange={(e) => setTempAIResult(prev => prev ? {
                            ...prev,
                            isQualified: e.target.value === 'qualified'
                          } : null)}
                          className="block w-full px-3 py-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        >
                          <option value="qualified">Qualified</option>
                          <option value="disqualified">Disqualified</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Reasons
                        </label>
                        <textarea
                          value={tempAIResult?.reasons.join('\n')}
                          onChange={(e) => setTempAIResult(prev => prev ? {
                            ...prev,
                            reasons: e.target.value.split('\n').filter(line => line.trim())
                          } : null)}
                          rows={4}
                          className="block w-full px-3 py-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Enter reasons (one per line)"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Manual Evaluation */}
          {aiResult?.isQualified && (
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