import { useState } from 'react';
import { Upload } from 'lucide-react';

interface ApplicationFormData {
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

interface TenderApplicationFormProps {
  tenderId: string;
  onClose: () => void;
}

const TenderApplicationForm = ({ tenderId, onClose }: TenderApplicationFormProps) => {
  const [formData, setFormData] = useState<ApplicationFormData>({
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log('Application data:', { tenderId, ...formData });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-neutral-900 bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full p-6 my-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Apply for Tender</h2>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-700"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-neutral-900">Company Information</h3>
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

          <div className="space-y-6">
            <h3 className="text-lg font-medium text-neutral-900">Required Documents</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-medium text-neutral-900 mb-4">Registration Documents</h4>
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
                          required
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
                <h4 className="text-base font-medium text-neutral-900 mb-4">Tax Documents</h4>
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
                          required
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
                <h4 className="text-base font-medium text-neutral-900 mb-4">Other Documents</h4>
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

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-neutral-700 hover:text-neutral-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TenderApplicationForm; 