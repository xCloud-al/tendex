import { Tender, Submission } from '../types/index';

// Mock tender data
export const mockTenders: Tender[] = [
  {
    id: '1',
    title: 'IT Equipment Supply',
    description: 'Supply of computers, laptops, and peripherals for the AADF office. This tender requires delivery and installation of high-quality equipment that meets specified technical requirements.',
    publishDate: '2025-05-01',
    deadline: '2025-05-20',
    status: 'active',
    category: 'goods',
    submissionCount: 0,
    documents: []
  },
  {
    id: '2',
    title: 'Financial Audit Services',
    description: 'Professional financial audit services for the fiscal year 2025. The selected vendor will conduct a comprehensive audit of our financial statements in accordance with international standards.',
    publishDate: '2025-04-15',
    deadline: '2025-05-15',
    status: 'active',
    category: 'services',
    submissionCount: 3,
    documents: []
  },
  {
    id: '3',
    title: 'Office Renovation',
    description: 'Renovation of AADF headquarters including interior design, furnishing, and electrical work. This project requires expertise in commercial space design with attention to sustainability and functionality.',
    publishDate: '2025-03-20',
    deadline: '2025-04-10',
    status: 'evaluation',
    category: 'works',
    submissionCount: 5,
    documents: []
  },
  {
    id: '4',
    title: 'Strategic Communication Consulting',
    description: 'Consulting services for developing and implementing a strategic communication plan. The selected vendor will help enhance our public presence and stakeholder engagement strategies.',
    publishDate: '2025-03-05',
    deadline: '2025-03-25',
    status: 'completed',
    category: 'consulting',
    submissionCount: 4,
    documents: []
  },
  {
    id: '5',
    title: 'Translation Services',
    description: 'Professional translation services for documents, reports, and publications in multiple languages. The service provider must ensure high-quality translations with expertise in technical and legal terminology.',
    publishDate: '2025-02-20',
    deadline: '2025-03-10',
    status: 'completed',
    category: 'services',
    submissionCount: 6,
    documents: []
  },
  {
    id: '6',
    title: 'Event Management Services',
    description: 'Comprehensive event management services for annual conference and networking events. The provider will handle logistics, venue setup, catering, and audiovisual requirements for our events.',
    publishDate: '2025-04-25',
    deadline: '2025-05-25',
    status: 'active',
    category: 'services',
    submissionCount: 2,
    documents: []
  },
  {
    id: '7',
    title: 'Software Development',
    description: 'Development of a custom grants management system with reporting capabilities. The solution should include user-friendly interfaces for both applicants and administrators with robust reporting features.',
    publishDate: '2025-02-10',
    deadline: '2025-03-01',
    status: 'completed',
    category: 'services',
    submissionCount: 8,
    documents: []
  }
];

// Mock submission data
export const mockSubmissions: Submission[] = [
  {
    id: '1',
    tenderId: '3',
    vendor: {
      name: 'AlphaTech Solutions',
      email: 'contact@alphatech.com'
    },
    submittedDate: '2025-04-05',
    documentCount: 5
  },
  {
    id: '2',
    tenderId: '3',
    vendor: {
      name: 'Beta Builders Ltd',
      email: 'info@betabuilders.com'
    },
    submittedDate: '2025-04-07',
    documentCount: 4
  },
  {
    id: '3',
    tenderId: '3',
    vendor: {
      name: 'Gamma Group',
      email: 'proposals@gammagroup.com'
    },
    submittedDate: '2025-04-08',
    documentCount: 6
  },
  {
    id: '4',
    tenderId: '4',
    vendor: {
      name: 'Delta Communications',
      email: 'info@deltacomms.com'
    },
    submittedDate: '2025-03-20',
    documentCount: 3
  },
  {
    id: '5',
    tenderId: '4',
    vendor: {
      name: 'Epsilon PR Agency',
      email: 'contact@epsilonpr.com'
    },
    submittedDate: '2025-03-22',
    documentCount: 4
  }
];