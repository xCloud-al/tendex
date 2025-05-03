import { Tender, Submission } from '../types/index';

// Mock tender data
export const mockTenders: Tender[] = [
  {
    id: '1',
    title: 'Supply of Office Equipment',
    description: 'This tender is for the supply of office equipment including desks, chairs, and storage solutions.',
    publishDate: '2025-01-15',
    deadline: '2025-04-15',
    status: 'active',
    category: 'Equipment',
    submissionCount: 5,
    documents: [],
    budget: '$50,000'
  },
  {
    id: '2',
    title: 'IT Infrastructure Upgrade',
    description: 'Upgrade of existing IT infrastructure including servers, networking equipment, and security systems.',
    publishDate: '2025-01-20',
    deadline: '2025-04-20',
    status: 'active',
    category: 'IT',
    submissionCount: 3,
    documents: [],
    budget: '$100,000'
  },
  {
    id: '3',
    title: 'Cleaning Services',
    description: 'Provision of cleaning services for office premises on a contract basis.',
    publishDate: '2025-01-25',
    deadline: '2025-04-25',
    status: 'evaluation',
    category: 'Services',
    submissionCount: 8,
    documents: [],
    budget: '$30,000'
  },
  {
    id: '4',
    title: 'Security Services',
    description: 'Provision of security services including guards and surveillance systems.',
    publishDate: '2025-02-01',
    deadline: '2025-05-01',
    status: 'completed',
    category: 'Security',
    submissionCount: 6,
    documents: [],
    budget: '$75,000'
  },
  {
    id: '5',
    title: 'Catering Services',
    description: 'Provision of catering services for corporate events and meetings.',
    publishDate: '2025-02-05',
    deadline: '2025-05-05',
    status: 'completed',
    category: 'Services',
    submissionCount: 4,
    documents: [],
    budget: '$40,000'
  },
  {
    id: '6',
    title: 'Software Development',
    description: 'Development of custom software solutions for business processes.',
    publishDate: '2025-02-10',
    deadline: '2025-05-10',
    status: 'active',
    category: 'IT',
    submissionCount: 7,
    documents: [],
    budget: '$150,000'
  },
  {
    id: '7',
    title: 'Furniture Supply',
    description: 'Supply of office furniture including workstations and meeting room furniture.',
    publishDate: '2025-02-15',
    deadline: '2025-05-15',
    status: 'completed',
    category: 'Equipment',
    submissionCount: 5,
    documents: [],
    budget: '$80,000'
  }
];

// Mock submission data
export const mockSubmissions: Submission[] = [
  {
    id: '1',
    tenderId: '1',
    vendor: {
      name: 'TechSolutions Inc.',
      email: 'contact@techsolutions.com'
    },
    submittedDate: '2025-02-15',
    documentCount: 5,
    status: 'submitted',
    aiCheck: {
      isQualified: true,
      reasons: [
        'All required documents are present',
        'Company has sufficient experience',
        'Financial capability meets requirements'
      ],
      score: 85
    }
  },
  {
    id: '2',
    tenderId: '1',
    vendor: {
      name: 'InnovateTech',
      email: 'info@innovatetech.com'
    },
    submittedDate: '2025-02-16',
    documentCount: 4,
    status: 'submitted',
    aiCheck: {
      isQualified: false,
      reasons: [
        'Missing required certifications',
        'Insufficient financial documentation'
      ],
      score: 45
    }
  },
  {
    id: '3',
    tenderId: '2',
    vendor: {
      name: 'Global Services Ltd.',
      email: 'contact@globalservices.com'
    },
    submittedDate: '2025-02-14',
    documentCount: 6,
    status: 'submitted',
    aiCheck: {
      isQualified: true,
      reasons: [
        'Complete documentation provided',
        'Strong financial standing',
        'Relevant experience in the field'
      ],
      score: 92
    }
  },
  {
    id: '4',
    tenderId: '1',
    vendor: {
      name: 'Office Solutions Inc',
      email: 'contact@officesolutions.com'
    },
    submittedDate: '2025-04-05',
    documentCount: 5,
    status: 'submitted'
  },
  {
    id: '5',
    tenderId: '1',
    vendor: {
      name: 'Tech Supplies Co',
      email: 'info@techsupplies.com'
    },
    submittedDate: '2025-04-07',
    documentCount: 4,
    status: 'qualified'
  },
  {
    id: '6',
    tenderId: '1',
    vendor: {
      name: 'Global Equipment Ltd',
      email: 'sales@globalequipment.com'
    },
    submittedDate: '2025-04-08',
    documentCount: 6,
    status: 'disqualified'
  },
  {
    id: '7',
    tenderId: '3',
    vendor: {
      name: 'CleanPro Services',
      email: 'info@cleanpro.com'
    },
    submittedDate: '2025-04-20',
    documentCount: 5,
    status: 'submitted'
  },
  {
    id: '8',
    tenderId: '3',
    vendor: {
      name: 'Sparkle Solutions',
      email: 'contact@sparkle.com'
    },
    submittedDate: '2025-04-21',
    documentCount: 4,
    status: 'submitted'
  },
  {
    id: '9',
    tenderId: '3',
    vendor: {
      name: 'EcoClean Services',
      email: 'info@ecoclean.com'
    },
    submittedDate: '2025-04-22',
    documentCount: 6,
    status: 'submitted'
  }
];