import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, DollarSign, FileText, Building } from 'lucide-react';
import TenderApplicationForm from '../components/TenderApplicationForm';

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

const PublicTenderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showApplyForm, setShowApplyForm] = useState(false);

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

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <button
          onClick={() => navigate('/tenders')}
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
        <TenderApplicationForm
          tenderId={tender.id}
          onClose={() => setShowApplyForm(false)}
        />
      )}
    </div>
  );
};

export default PublicTenderDetails; 