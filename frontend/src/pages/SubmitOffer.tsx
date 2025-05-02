import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FileText, Upload, X, CheckCircle, AlertTriangle, 
  Clock, ArrowLeft, Send, Plus, Trash
} from 'lucide-react';
import { mockTenders } from '../data/mockData';
import { formatDate, daysUntil } from '../utils/dateUtils';

const SubmitOffer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tender = mockTenders.find(t => t.id === id);
  
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    technicalProposal: null as File | null,
    financialProposal: null as File | null,
    companyDocuments: [] as File[],
    additionalFiles: [] as File[],
    termsAccepted: false
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const files = e.target.files;
    if (!files) return;
    
    if (fieldName === 'companyDocuments' || fieldName === 'additionalFiles') {
      setFormData(prev => ({
        ...prev,
        [fieldName]: [...prev[fieldName as keyof typeof prev] as File[], ...Array.from(files)]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [fieldName]: files[0]
      }));
    }
    
    // Reset the input to allow selecting the same file again
    e.target.value = '';
  };
  
  const removeFile = (fieldName: string, index?: number) => {
    if (fieldName === 'companyDocuments' || fieldName === 'additionalFiles') {
      setFormData(prev => ({
        ...prev,
        [fieldName]: (prev[fieldName as keyof typeof prev] as File[]).filter((_, i) => i !== index)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [fieldName]: null
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 2000);
  };
  
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
  
  if (tender.status !== 'active') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <AlertTriangle className="h-16 w-16 text-warning-500 mb-4" />
        <h2 className="text-2xl font-bold text-neutral-700 mb-2">Submissions Closed</h2>
        <p className="text-neutral-500 mb-4">
          {tender.status === 'evaluation' 
            ? "This tender is currently under evaluation and no longer accepting submissions."
            : "This tender is no longer accepting submissions."}
        </p>
        <Link 
          to="/tenders"
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          View Other Tenders
        </Link>
      </div>
    );
  }
  
  const daysRemaining = daysUntil(tender.deadline);
  const isUrgent = daysRemaining !== null && daysRemaining < 3;
  
  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-lg shadow-sm border border-neutral-200 mt-10">
          <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-success-600" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-800 mb-2">Submission Successful!</h2>
          <p className="text-neutral-600 mb-6">
            Your offer for "{tender.title}" has been successfully submitted.
            You will receive a confirmation email shortly.
          </p>
          <div className="flex space-x-4">
            <Link 
              to="/tenders"
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              View All Tenders
            </Link>
            <Link 
              to={`/tenders/${tender.id}`}
              className="px-4 py-2 border border-primary-600 text-primary-600 rounded-md hover:bg-primary-50 transition-colors"
            >
              Back to Tender
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <Link 
          to={`/tenders/${tender.id}`} 
          className="text-primary-600 hover:text-primary-800 flex items-center text-sm mb-2"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Tender
        </Link>
        <h1 className="text-3xl font-bold mb-2">Submit Offer</h1>
        <p className="text-neutral-600">
          Complete the form below to submit your offer for "{tender.title}"
        </p>
      </div>
      
      {/* Deadline Alert */}
      <div className={`mb-8 p-4 rounded-lg border ${
        isUrgent 
          ? 'bg-error-50 border-error-200 text-error-700' 
          : 'bg-primary-50 border-primary-200 text-primary-700'
      }`}>
        <div className="flex items-center">
          <Clock className="h-5 w-5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-medium">Submission Deadline</h3>
            <p>
              {isUrgent 
                ? `Urgent: Only ${daysRemaining === 0 ? 'today' : daysRemaining === 1 ? 'tomorrow' : `${daysRemaining} days`} left to submit!` 
                : `Deadline: ${formatDate(tender.deadline)}`}
            </p>
          </div>
        </div>
      </div>
      
      {/* Form Container */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden mb-8">
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            {/* Company Information */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Company Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-neutral-700 mb-1">
                    Company Name <span className="text-error-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    required
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="contactPerson" className="block text-sm font-medium text-neutral-700 mb-1">
                    Contact Person <span className="text-error-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="contactPerson"
                    name="contactPerson"
                    required
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                    Email Address <span className="text-error-600">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                    Phone Number <span className="text-error-600">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            </div>
            
            {/* Technical and Financial Proposals */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Proposal Documents</h2>
              <div className="space-y-6">
                {/* Technical Proposal */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Technical Proposal <span className="text-error-600">*</span>
                  </label>
                  {formData.technicalProposal ? (
                    <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-md flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-primary-600 mr-2" />
                        <span className="text-sm text-neutral-700">
                          {formData.technicalProposal.name}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile('technicalProposal')}
                        className="text-neutral-400 hover:text-error-500"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-neutral-300 rounded-md p-4">
                      <div className="text-center">
                        <Upload className="h-8 w-8 text-neutral-400 mx-auto mb-2" />
                        <p className="text-sm text-neutral-600 mb-2">
                          Drag and drop your technical proposal here, or
                        </p>
                        <label htmlFor="technicalProposal" className="inline-flex items-center px-3 py-1.5 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700 transition-colors cursor-pointer">
                          Browse Files
                          <input
                            type="file"
                            id="technicalProposal"
                            onChange={(e) => handleFileChange(e, 'technicalProposal')}
                            className="hidden"
                            accept=".pdf,.doc,.docx"
                          />
                        </label>
                        <p className="text-xs text-neutral-500 mt-2">
                          PDF, Word documents up to 10MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Financial Proposal */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Financial Proposal <span className="text-error-600">*</span>
                  </label>
                  {formData.financialProposal ? (
                    <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-md flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-primary-600 mr-2" />
                        <span className="text-sm text-neutral-700">
                          {formData.financialProposal.name}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile('financialProposal')}
                        className="text-neutral-400 hover:text-error-500"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-neutral-300 rounded-md p-4">
                      <div className="text-center">
                        <Upload className="h-8 w-8 text-neutral-400 mx-auto mb-2" />
                        <p className="text-sm text-neutral-600 mb-2">
                          Drag and drop your financial proposal here, or
                        </p>
                        <label htmlFor="financialProposal" className="inline-flex items-center px-3 py-1.5 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700 transition-colors cursor-pointer">
                          Browse Files
                          <input
                            type="file"
                            id="financialProposal"
                            onChange={(e) => handleFileChange(e, 'financialProposal')}
                            className="hidden"
                            accept=".pdf,.xlsx,.xls"
                          />
                        </label>
                        <p className="text-xs text-neutral-500 mt-2">
                          PDF, Excel spreadsheets up to 10MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Company Documents */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Company Documents</h2>
                <label htmlFor="companyDocumentsUpload" className="inline-flex items-center px-3 py-1.5 bg-neutral-100 text-neutral-700 text-sm font-medium rounded-md hover:bg-neutral-200 transition-colors cursor-pointer">
                  <Plus className="h-4 w-4 mr-1.5" />
                  Add Document
                  <input
                    type="file"
                    id="companyDocumentsUpload"
                    onChange={(e) => handleFileChange(e, 'companyDocuments')}
                    className="hidden"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                </label>
              </div>
              
              {formData.companyDocuments.length === 0 ? (
                <div className="text-center p-8 border border-neutral-200 rounded-md bg-neutral-50">
                  <FileText className="h-8 w-8 text-neutral-400 mx-auto mb-2" />
                  <p className="text-neutral-600 mb-2">No documents uploaded yet</p>
                  <p className="text-sm text-neutral-500">
                    Upload registration documents, tax certificates, and other company credentials
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {formData.companyDocuments.map((file, index) => (
                    <div 
                      key={index} 
                      className="p-3 bg-neutral-50 border border-neutral-200 rounded-md flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-primary-600 mr-2" />
                        <span className="text-sm text-neutral-700 truncate max-w-md">
                          {file.name}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile('companyDocuments', index)}
                        className="text-neutral-400 hover:text-error-500"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Terms and Conditions */}
            <div className="mb-8">
              <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-md">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="termsAccepted"
                      name="termsAccepted"
                      type="checkbox"
                      required
                      checked={formData.termsAccepted}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="termsAccepted" className="font-medium text-neutral-700">
                      I confirm that all information provided is accurate and complete
                    </label>
                    <p className="text-neutral-500">
                      By submitting this offer, I acknowledge that I have read and agreed to the terms and conditions
                      of the tender. I understand that false information may result in disqualification.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className={`inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-md 
                           hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
                           ${submitting ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Submit Offer
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubmitOffer;