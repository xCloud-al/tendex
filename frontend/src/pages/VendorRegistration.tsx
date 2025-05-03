import { useState } from 'react';
import { ArrowRight, Upload } from 'lucide-react';

interface VendorFormData {
  companyInfo: {
    name: string;
    registrationNumber: string;
    taxNumber: string;
    address: string;
    contactPerson: string;
    email: string;
    phone: string;
  };
  documents: {
    registration: File[];
    tax: File[];
    other: File[];
  };
}

const VendorRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<VendorFormData>({
    companyInfo: {
      name: '',
      registrationNumber: '',
      taxNumber: '',
      address: '',
      contactPerson: '',
      email: '',
      phone: '',
    },
    documents: {
      registration: [],
      tax: [],
      other: [],
    },
  });

  const handleCompanyInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      companyInfo: {
        ...formData.companyInfo,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'registration' | 'tax' | 'other') => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData({
        ...formData,
        documents: {
          ...formData.documents,
          [type]: [...formData.documents[type], ...files],
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
    console.log('Vendor registration data:', formData);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold heading-underline mb-2">Vendor Registration</h1>
          <p className="text-neutral-600">Register your company to participate in tenders</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-5 mb-8">
        <div className="mb-8">
          <div className="flex justify-center">           
            <ol className="flex items-center w-full max-w-2xl p-3 space-x-2 text-sm font-semibold text-center text-neutral-500 bg-white rounded-lg sm:text-base sm:p-4 sm:space-x-4 rtl:space-x-reverse">
              <li className={`flex items-center ${currentStep >= 1 ? 'text-primary-600' : 'text-neutral-500'}`}>
                <span className={`flex items-center justify-center w-5 h-5 me-2 text-xs font-semibold border rounded-full shrink-0 ${currentStep === 1 ? 'border-primary-600 bg-primary-50' : 'border-neutral-300'}`}>
                  1
                </span>
                Company <span className="hidden sm:inline-flex sm:ms-2">Information</span>
                <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
                </svg>
              </li>
              <li className={`flex items-center ${currentStep >= 2 ? 'text-primary-600' : 'text-neutral-500'}`}>
                <span className={`flex items-center justify-center w-5 h-5 me-2 text-xs font-semibold border rounded-full shrink-0 ${currentStep === 2 ? 'border-primary-600 bg-primary-50' : 'border-neutral-300'}`}>
                  2
                </span>
                Documents <span className="hidden sm:inline-flex sm:ms-2">Upload</span>
              </li>
            </ol>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.companyInfo.name}
                    onChange={handleCompanyInfoChange}
                    className="w-full px-4 py-2 text-base font-medium border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Registration Number</label>
                  <input
                    type="text"
                    name="registrationNumber"
                    value={formData.companyInfo.registrationNumber}
                    onChange={handleCompanyInfoChange}
                    className="w-full px-4 py-2 text-base font-medium border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Tax Number</label>
                  <input
                    type="text"
                    name="taxNumber"
                    value={formData.companyInfo.taxNumber}
                    onChange={handleCompanyInfoChange}
                    className="w-full px-4 py-2 text-base font-medium border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.companyInfo.address}
                    onChange={handleCompanyInfoChange}
                    className="w-full px-4 py-2 text-base font-medium border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Contact Person</label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.companyInfo.contactPerson}
                    onChange={handleCompanyInfoChange}
                    className="w-full px-4 py-2 text-base font-medium border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.companyInfo.email}
                    onChange={handleCompanyInfoChange}
                    className="w-full px-4 py-2 text-base font-medium border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.companyInfo.phone}
                    onChange={handleCompanyInfoChange}
                    className="w-full px-4 py-2 text-base font-medium border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-neutral-900 mb-4">Registration Documents</h3>
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
                            onChange={(e) => handleFileUpload(e, 'registration')}
                          />
                        </label>
                      </div>
                      <p className="mt-4 text-sm text-neutral-500">
                        Upload company registration documents (PDF, DOC, DOCX)
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-neutral-900 mb-4">Tax Documents</h3>
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
                            onChange={(e) => handleFileUpload(e, 'tax')}
                          />
                        </label>
                      </div>
                      <p className="mt-4 text-sm text-neutral-500">
                        Upload tax certificates and related documents (PDF, DOC, DOCX)
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-neutral-900 mb-4">Other Documents</h3>
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
                            onChange={(e) => handleFileUpload(e, 'other')}
                          />
                        </label>
                      </div>
                      <p className="mt-4 text-sm text-neutral-500">
                        Upload any additional relevant documents (PDF, DOC, DOCX)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-10 flex justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="inline-flex items-center px-4 py-2 bg-white text-neutral-700 rounded-md border border-neutral-300 hover:bg-neutral-50 transition-colors"
              >
                Previous
              </button>
            ) : (
              <div></div>
            )}
            {currentStep < 2 ? (
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
                Submit Registration
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorRegistration; 