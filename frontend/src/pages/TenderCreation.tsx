import { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Upload } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import RichTextEditor from '../components/RichTextEditor';

interface TenderFormData {
  basicInfo: {
    title: string;
    description: string;
    deadline: string;
    budget: string;
  };
  criteria: {
    documents: File[];
  };
  evaluation: {
    documents: File[];
  };
}

const TenderCreation = () => {
  const location = useLocation();
  const clonedTender = location.state?.clonedTender;
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<TenderFormData>({
    basicInfo: {
      title: '',
      description: '',
      deadline: '',
      budget: '',
    },
    criteria: {
      documents: [],
    },
    evaluation: {
      documents: [],
    },
  });

  useEffect(() => {
    if (clonedTender) {
      setFormData(clonedTender);
    }
  }, [clonedTender]);

  const handleBasicInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      basicInfo: {
        ...formData.basicInfo,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleDescriptionChange = (value: string) => {
    setFormData({
      ...formData,
      basicInfo: {
        ...formData.basicInfo,
        description: value,
      },
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'criteria' | 'evaluation') => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData({
        ...formData,
        [type]: {
          documents: [...formData[type].documents, ...files],
        },
      });
    }
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log(formData);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold heading-underline mb-2">
            {clonedTender ? 'Clone Tender' : 'Create Tender'}
          </h1>
          <p className="text-neutral-600">
            {clonedTender 
              ? 'Review and modify the cloned tender details below.'
              : 'Create a new tender and manage its lifecycle'}
          </p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-5 mb-8">
        <div className="mb-4">
          <div className="flex justify-center">           
            <ol className="flex items-center w-full max-w-2xl p-3 space-x-2 text-sm font-semibold text-center text-neutral-500 bg-white rounded-lg sm:text-base sm:p-4 sm:space-x-4 rtl:space-x-reverse">
              <li className={`flex items-center ${currentStep >= 1 ? 'text-primary-600' : 'text-neutral-500'}`}>
                <span className={`flex items-center justify-center w-5 h-5 me-2 text-xs font-semibold border rounded-full shrink-0 ${currentStep === 1 ? 'border-primary-600 bg-primary-50' : 'border-neutral-300'}`}>
                  1
                </span>
                Basic <span className="hidden sm:inline-flex sm:ms-2">Information</span>
                <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
                </svg>
              </li>
              <li className={`flex items-center ${currentStep >= 2 ? 'text-primary-600' : 'text-neutral-500'}`}>
                <span className={`flex items-center justify-center w-5 h-5 me-2 text-xs font-semibold border rounded-full shrink-0 ${currentStep === 2 ? 'border-primary-600 bg-primary-50' : 'border-neutral-300'}`}>
                  2
                </span>
                Criteria <span className="hidden sm:inline-flex sm:ms-2">Documents</span>
                <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
                </svg>
              </li>
              <li className={`flex items-center ${currentStep >= 3 ? 'text-primary-600' : 'text-neutral-500'}`}>
                <span className={`flex items-center justify-center w-5 h-5 me-2 text-xs font-semibold border rounded-full shrink-0 ${currentStep === 3 ? 'border-primary-600 bg-primary-50' : 'border-neutral-300'}`}>
                  3
                </span>
                Evaluation <span className="hidden sm:inline-flex sm:ms-2">Documents</span>
              </li>
            </ol>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.basicInfo.title}
                    onChange={handleBasicInfoChange}
                    className="w-full px-4 py-2 text-base font-medium border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Description</label>
                  <RichTextEditor
                    value={formData.basicInfo.description}
                    onChange={handleDescriptionChange}
                    placeholder="Enter tender description..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Deadline</label>
                  <input
                    type="date"
                    name="deadline"
                    value={formData.basicInfo.deadline}
                    onChange={handleBasicInfoChange}
                    className="w-full px-4 py-2 text-base font-medium border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Budget</label>
                  <input
                    type="text"
                    name="budget"
                    value={formData.basicInfo.budget}
                    onChange={handleBasicInfoChange}
                    className="w-full px-4 py-2 text-base font-medium border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="border-2 border-dashed border-neutral-300 rounded-lg p-8 hover:border-primary-500 transition-colors">
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-neutral-400" />
                  <div className="mt-6">
                    <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-primary-50 text-primary-700 rounded-md border border-primary-200 hover:bg-primary-100 transition-colors">
                      Upload Documents
                      <input
                        type="file"
                        multiple
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'criteria')}
                      />
                    </label>
                  </div>
                  <p className="mt-4 text-sm text-neutral-500">
                    Upload criteria documents (PDF, DOC, DOCX)
                  </p>
                </div>
              </div>
              {formData.criteria.documents.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-neutral-900 mb-4">Uploaded Files:</h4>
                  <ul className="space-y-3">
                    {formData.criteria.documents.map((file, index) => (
                      <li key={index} className="flex items-center text-sm text-neutral-600 bg-neutral-50 px-4 py-2 rounded-md">
                        {file.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="border-2 border-dashed border-neutral-300 rounded-lg p-8 hover:border-primary-500 transition-colors">
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-neutral-400" />
                  <div className="mt-6">
                    <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-primary-50 text-primary-700 rounded-md border border-primary-200 hover:bg-primary-100 transition-colors">
                      Upload Documents
                      <input
                        type="file"
                        multiple
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'evaluation')}
                      />
                    </label>
                  </div>
                  <p className="mt-4 text-sm text-neutral-500">
                    Upload evaluation documents (PDF, DOC, DOCX)
                  </p>
                </div>
              </div>
              {formData.evaluation.documents.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-neutral-900 mb-4">Uploaded Files:</h4>
                  <ul className="space-y-3">
                    {formData.evaluation.documents.map((file, index) => (
                      <li key={index} className="flex items-center text-sm text-neutral-600 bg-neutral-50 px-4 py-2 rounded-md">
                        {file.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="mt-10 flex justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="inline-flex items-center px-4 py-2 bg-white text-neutral-700 rounded-md border border-neutral-300 hover:bg-neutral-50 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Previous
              </button>
            ) : (
              <div></div>
            )}
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="inline-flex items-center px-4 py-2 bg-primary-50 text-primary-700 rounded-md border border-primary-200 hover:bg-primary-100 transition-colors"
              >
                Next
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            ) : (
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 bg-primary-50 text-primary-700 rounded-md border border-primary-200 hover:bg-primary-100 transition-colors"
              >
                Submit Tender
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default TenderCreation; 