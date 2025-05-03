import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, DollarSign, FileText, Building, Upload } from 'lucide-react';

interface TenderDetails {
  id: string;
  title: string;
  reference: string;
  status: 'open' | 'closed' | 'awarded';
  deadline: string;
  budget: string;
  category: string;
  description: string;
  requirements: string[];
  documents: {
    name: string;
    url: string;
  }[];
}

interface ApplicationForm {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  documents: File[];
}

const PublicTenderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [formData, setFormData] = useState<ApplicationForm>({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    documents: []
  });

  // Mock data - replace with actual API call
  const tender: TenderDetails = {
    id: id || '1',
    title: 'Supply of Office Equipment',
    reference: 'TDR-2024-001',
    status: 'open',
    deadline: '2024-04-15',
    budget: '$50,000',
    category: 'Equipment',
    description: 'This tender is for the supply of office equipment including desks, chairs, and storage solutions. The equipment must meet modern ergonomic standards and be suitable for a professional office environment.',
    requirements: [
      'Minimum 5 years of experience in office equipment supply',
      'Valid business registration and tax clearance',
      'Proof of previous similar projects',
      'Financial capability to handle the project',
      'Quality assurance certification'
    ],
    documents: [
      { name: 'Technical Specifications.pdf', url: '#' },
      { name: 'Terms and Conditions.pdf', url: '#' },
      { name: 'Evaluation Criteria.pdf', url: '#' }
    ]
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        documents: [...prev.documents, ...files]
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log('Application submitted:', formData);
    setShowApplyForm(false);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <button
          onClick={() => navigate('/vendors/tenders')}
          className="inline-flex items-center text-neutral-600 hover:text-neutral-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Tenders
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-5 mb-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold heading-underline mb-2">{tender.title}</h1>
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center text-neutral-600">
              <Building className="w-5 h-5 mr-2" />
              <span>{tender.category}</span>
            </div>
            <div className="flex items-center text-neutral-600">
              <Calendar className="w-5 h-5 mr-2" />
              <span>Deadline: {tender.deadline}</span>
            </div>
            <div className="flex items-center text-neutral-600">
              <DollarSign className="w-5 h-5 mr-2" />
              <span>Budget: {tender.budget}</span>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-neutral-600">{tender.description}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Requirements</h2>
            <ul className="list-disc list-inside space-y-2 text-neutral-600">
              {tender.requirements.map((requirement, index) => (
                <li key={index}>{requirement}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Documents</h2>
            <div className="space-y-2">
              {tender.documents.map((doc, index) => (
                <a
                  key={index}
                  href={doc.url}
                  className="flex items-center text-primary-600 hover:text-primary-900"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  {doc.name}
                </a>
              ))}
            </div>
          </div>

          {tender.status === 'open' && (
            <div className="mt-8">
              <button
                onClick={() => setShowApplyForm(true)}
                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Apply for this Tender
              </button>
            </div>
          )}
        </div>
      </div>

      {showApplyForm && (
        <div className="fixed inset-0 bg-neutral-900 bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Apply for Tender</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Required Documents
                  </label>
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
                            onChange={handleFileUpload}
                          />
                        </label>
                      </div>
                      <p className="mt-4 text-sm text-neutral-500">
                        Upload company registration, tax clearance, and other required documents (PDF, DOC, DOCX)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowApplyForm(false)}
                  className="px-4 py-2 text-neutral-700 hover:text-neutral-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicTenderDetails; 