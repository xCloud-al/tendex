import { Tender, Submission, Vendor } from '../types';

// Mock Vendors
export const mockVendors: Vendor[] = [
  {
    id: 'v1',
    name: 'TechSolutions Inc.',
    email: 'contact@techsolutions.com',
    phone: '+1 (555) 123-4567',
    address: '123 Tech Park, Silicon Valley, CA',
    registrationNumber: 'REG123456',
    taxId: 'TAX789012',
    experience: 8,
    rating: 4.5,
    completedProjects: 45
  },
  {
    id: 'v2',
    name: 'Global Innovations Ltd',
    email: 'info@globalinnovations.com',
    phone: '+1 (555) 234-5678',
    address: '456 Innovation Drive, Boston, MA',
    registrationNumber: 'REG234567',
    taxId: 'TAX890123',
    experience: 12,
    rating: 4.8,
    completedProjects: 78
  },
  {
    id: 'v3',
    name: 'Future Systems Corp',
    email: 'contact@futuresystems.com',
    phone: '+1 (555) 345-6789',
    address: '789 Future Street, Seattle, WA',
    registrationNumber: 'REG345678',
    taxId: 'TAX901234',
    experience: 6,
    rating: 4.2,
    completedProjects: 32
  }
];

// Helper function to generate document data
const createDocument = (name: string, type: string, size: string, url: string, uploadDate: string) => ({
  id: `doc-${Math.random().toString(36).substr(2, 9)}`,
  name,
  type,
  size,
  url,
  uploadDate
});

// Mock Tenders
export const mockTenders: Tender[] = [
  {
    id: 't1',
    title: 'Digital Education Platform Development',
    description: `<h2>Project Overview</h2>
<p>The Center for School Leadership is seeking proposals for the development of a comprehensive digital learning platform that will revolutionize teacher training and professional development in Albania.</p>

<h2>Key Objectives</h2>
<ul>
  <li>Create an intuitive, user-friendly platform for teacher training</li>
  <li>Implement robust assessment and progress tracking systems</li>
  <li>Develop interactive learning modules and resources</li>
  <li>Ensure seamless integration with existing educational systems</li>
</ul>

<h2>Technical Requirements</h2>
<p>The platform must be built using modern web technologies and should support:</p>
<ul>
  <li>Scalable cloud infrastructure</li>
  <li>Real-time collaboration features</li>
  <li>Mobile responsiveness</li>
  <li>Advanced analytics and reporting</li>
</ul>

<h2>Timeline and Milestones</h2>
<p>The project is expected to be completed within 6 months, with the following key milestones:</p>
<ul>
  <li>Month 1: Requirements gathering and system design</li>
  <li>Month 2-3: Core platform development</li>
  <li>Month 4: Testing and quality assurance</li>
  <li>Month 5: User acceptance testing</li>
  <li>Month 6: Deployment and training</li>
</ul>`,
    publishDate: '2024-03-01',
    deadline: '2024-04-15',
    status: 'active',
    budget: 500000,
    category: 'Education & Leadership',
    requirements: [
      'Minimum 5 years of experience in educational technology development',
      'Proven track record of successful e-learning platform implementations',
      'Team of at least 10 developers with education sector experience',
      'ISO 27001 certification for data security'
    ],
    documents: [
      createDocument('RFP Document', 'PDF', '2.5MB', '/documents/rfp.pdf', '2024-03-01'),
      createDocument('Technical Requirements', 'DOCX', '1.8MB', '/documents/technical.docx', '2024-03-01'),
      createDocument('Budget Template', 'XLSX', '0.5MB', '/documents/budget.xlsx', '2024-03-01')
    ]
  },
  {
    id: 't2',
    title: 'Startup Ecosystem Development Program',
    description: `<h2>Program Overview</h2>
<p>The Plug and Play Accelerator Program aims to catalyze innovation and entrepreneurship in Albania by providing comprehensive support to promising startups.</p>

<h2>Program Components</h2>
<ul>
  <li>12-week intensive acceleration program</li>
  <li>Mentorship from industry experts</li>
  <li>Access to international investor network</li>
  <li>Co-working space and technical resources</li>
</ul>

<h2>Target Sectors</h2>
<p>We are particularly interested in startups focusing on:</p>
<ul>
  <li>FinTech and Digital Payments</li>
  <li>AgriTech and Food Innovation</li>
  <li>Tourism Technology</li>
  <li>Clean Energy Solutions</li>
</ul>

<h2>Expected Outcomes</h2>
<ul>
  <li>At least 20 startups accelerated per year</li>
  <li>Minimum 30% of startups securing follow-on funding</li>
  <li>Creation of 100+ new jobs</li>
  <li>Development of sustainable business models</li>
</ul>`,
    publishDate: '2024-02-15',
    deadline: '2024-03-30',
    status: 'evaluation',
    budget: 300000,
    category: 'Entrepreneurship',
    requirements: [
      'Experience in startup acceleration programs',
      'Strong network in the Albanian startup ecosystem',
      'Track record of successful startup investments',
      'Experience with international startup programs'
    ],
    documents: [
      createDocument('Program Framework', 'PDF', '1.2MB', '/documents/framework.pdf', '2024-02-15'),
      createDocument('Implementation Plan', 'DOCX', '0.9MB', '/documents/plan.docx', '2024-02-15')
    ]
  },
  {
    id: 't3',
    title: 'Cultural Heritage Digital Archive',
    description: `<h2>Project Scope</h2>
<p>This initiative aims to create a comprehensive digital archive of Albania's rich cultural heritage, with a special focus on documenting and preserving the unique dance traditions of Tropoja.</p>

<h2>Documentation Areas</h2>
<ul>
  <li>Traditional dance forms and choreography</li>
  <li>Oral histories and cultural narratives</li>
  <li>Traditional costumes and artifacts</li>
  <li>Musical traditions and instruments</li>
</ul>

<h2>Technical Requirements</h2>
<p>The digital archive system should include:</p>
<ul>
  <li>High-resolution video and audio recording capabilities</li>
  <li>3D scanning and modeling of physical artifacts</li>
  <li>Multilingual metadata management</li>
  <li>Advanced search and retrieval systems</li>
</ul>

<h2>Preservation Standards</h2>
<p>The project will adhere to international standards for cultural heritage preservation:</p>
<ul>
  <li>UNESCO documentation guidelines</li>
  <li>International Council on Archives standards</li>
  <li>Digital preservation best practices</li>
  <li>Open access principles</li>
</ul>`,
    publishDate: '2024-01-10',
    deadline: '2024-02-28',
    status: 'completed',
    budget: 200000,
    category: 'Cultural Heritage',
    requirements: [
      'Experience in cultural heritage digitization',
      'Knowledge of UNESCO documentation standards',
      'Multimedia archiving expertise',
      'Experience with cultural heritage projects'
    ],
    documents: [
      createDocument('Heritage Documentation Guidelines', 'PDF', '1.5MB', '/documents/guidelines.pdf', '2024-01-10'),
      createDocument('Technical Specifications', 'DOCX', '0.7MB', '/documents/specs.docx', '2024-01-10')
    ]
  },
  {
    id: 't4',
    title: 'Eco-Tourism Development in Drilon',
    description: `<h2>Project Overview</h2>
<p>The Drilon Tushemisht Natural Park development project aims to create a sustainable tourism destination while preserving the area's natural beauty and biodiversity.</p>

<h2>Development Components</h2>
<ul>
  <li>Eco-friendly visitor center</li>
  <li>Nature trails and observation points</li>
  <li>Sustainable accommodation facilities</li>
  <li>Environmental education center</li>
</ul>

<h2>Sustainability Goals</h2>
<p>The project will implement:</p>
<ul>
  <li>Renewable energy systems</li>
  <li>Waste management solutions</li>
  <li>Water conservation measures</li>
  <li>Local community engagement programs</li>
</ul>

<h2>Expected Impact</h2>
<ul>
  <li>Increased visitor numbers by 50%</li>
  <li>Creation of 30+ local jobs</li>
  <li>Enhanced environmental protection</li>
  <li>Improved visitor experience</li>
</ul>`,
    publishDate: '2024-03-15',
    deadline: '2024-05-01',
    status: 'active',
    budget: 250000,
    category: 'Eco-Tourism',
    requirements: [
      'Experience in eco-tourism development',
      'Environmental impact assessment expertise',
      'Visitor center design experience',
      'Sustainable tourism certification'
    ],
    documents: [
      createDocument('Park Development Plan', 'PDF', '1.8MB', '/documents/plan.pdf', '2024-03-15'),
      createDocument('Environmental Guidelines', 'PDF', '2.1MB', '/documents/guidelines.pdf', '2024-03-15'),
      createDocument('Visitor Center Specifications', 'PDF', '1.3MB', '/documents/specs.pdf', '2024-03-15')
    ]
  },
  {
    id: 't5',
    title: '42 Tirana Coding Academy Support',
    description: `<h2>Project Overview</h2>
<p>The 42 Tirana coding academy requires comprehensive technical support and infrastructure development to enhance its peer-to-peer learning environment.</p>

<h2>System Requirements</h2>
<ul>
  <li>Advanced learning management system</li>
  <li>Student progress tracking platform</li>
  <li>Peer review and evaluation tools</li>
  <li>Resource management system</li>
</ul>

<h2>Technical Features</h2>
<p>The system should include:</p>
<ul>
  <li>Real-time collaboration tools</li>
  <li>Automated assessment systems</li>
  <li>Progress analytics and reporting</li>
  <li>Integration with existing platforms</li>
</ul>

<h2>Implementation Timeline</h2>
<ul>
  <li>Phase 1: System design and architecture (1 month)</li>
  <li>Phase 2: Core development (2 months)</li>
  <li>Phase 3: Testing and deployment (1 month)</li>
  <li>Phase 4: Training and support (1 month)</li>
</ul>`,
    publishDate: '2024-02-01',
    deadline: '2024-03-15',
    status: 'evaluation',
    budget: 400000,
    category: 'Education & Leadership',
    requirements: [
      'Experience with coding education platforms',
      'Knowledge of peer-to-peer learning systems',
      'Student progress tracking expertise',
      'Technical infrastructure management'
    ],
    documents: [
      createDocument('Technical Requirements', 'PDF', '2.2MB', '/documents/tech-req.pdf', '2024-02-01'),
      createDocument('Implementation Plan', 'DOCX', '1.5MB', '/documents/plan.docx', '2024-02-01')
    ]
  }
];

// Mock Submissions
export const mockSubmissions: Submission[] = [
  {
    id: 's1',
    tenderId: 't1',
    vendor: mockVendors[0],
    submittedDate: '2024-03-20',
    status: 'submitted',
    documentCount: 5,
    documents: [
      createDocument('Technical Proposal', 'PDF', '3.2MB', '/submissions/tech1.pdf', '2024-03-20'),
      createDocument('Financial Proposal', 'PDF', '1.8MB', '/submissions/fin1.pdf', '2024-03-20'),
      createDocument('Company Profile', 'PDF', '2.1MB', '/submissions/profile1.pdf', '2024-03-20'),
      createDocument('Certifications', 'PDF', '1.5MB', '/submissions/cert1.pdf', '2024-03-20'),
      createDocument('Project Timeline', 'PDF', '0.9MB', '/submissions/timeline1.pdf', '2024-03-20')
    ],
    evaluation: {
      technicalScore: 85,
      financialScore: 90,
      qualificationScore: 88,
      totalScore: 87.5,
      comments: 'Strong technical proposal with clear implementation strategy'
    }
  },
  {
    id: 's2',
    tenderId: 't1',
    vendor: mockVendors[1],
    submittedDate: '2024-03-25',
    status: 'submitted',
    documentCount: 4,
    documents: [
      createDocument('Technical Proposal', 'PDF', '2.8MB', '/submissions/tech2.pdf', '2024-03-25'),
      createDocument('Financial Proposal', 'PDF', '1.6MB', '/submissions/fin2.pdf', '2024-03-25'),
      createDocument('Company Profile', 'PDF', '1.9MB', '/submissions/profile2.pdf', '2024-03-25'),
      createDocument('Certifications', 'PDF', '1.3MB', '/submissions/cert2.pdf', '2024-03-25')
    ],
    evaluation: {
      technicalScore: 82,
      financialScore: 88,
      qualificationScore: 85,
      totalScore: 84.5,
      comments: 'Good proposal with competitive pricing'
    }
  },
  {
    id: 's3',
    tenderId: 't2',
    vendor: mockVendors[2],
    submittedDate: '2024-03-15',
    status: 'qualified',
    documentCount: 6,
    documents: [
      createDocument('Migration Strategy', 'PDF', '2.9MB', '/submissions/migration1.pdf', '2024-03-15'),
      createDocument('Technical Proposal', 'PDF', '2.2MB', '/submissions/tech3.pdf', '2024-03-15'),
      createDocument('Financial Proposal', 'PDF', '1.7MB', '/submissions/fin3.pdf', '2024-03-15'),
      createDocument('Company Profile', 'PDF', '2.0MB', '/submissions/profile3.pdf', '2024-03-15'),
      createDocument('Certifications', 'PDF', '1.4MB', '/submissions/cert3.pdf', '2024-03-15'),
      createDocument('Support Plan', 'PDF', '1.1MB', '/submissions/support3.pdf', '2024-03-15')
    ],
    evaluation: {
      technicalScore: 88,
      financialScore: 85,
      qualificationScore: 90,
      totalScore: 87.8,
      comments: 'Excellent technical approach with comprehensive support plan'
    }
  },
  {
    id: 's4',
    tenderId: 't4',
    vendor: mockVendors[0],
    submittedDate: '2024-03-28',
    status: 'submitted',
    documentCount: 5,
    documents: [
      createDocument('App Architecture', 'PDF', '2.7MB', '/submissions/arch4.pdf', '2024-03-28'),
      createDocument('UI/UX Design', 'PDF', '3.1MB', '/submissions/design4.pdf', '2024-03-28'),
      createDocument('Technical Proposal', 'PDF', '2.3MB', '/submissions/tech4.pdf', '2024-03-28'),
      createDocument('Financial Proposal', 'PDF', '1.9MB', '/submissions/fin4.pdf', '2024-03-28'),
      createDocument('Portfolio', 'PDF', '4.2MB', '/submissions/portfolio4.pdf', '2024-03-28')
    ],
    aiCheck: {
      isQualified: true,
      reasons: [
        'Complete documentation provided',
        'Strong portfolio of mobile apps',
        'Competitive pricing'
      ],
      score: 92
    }
  },
  {
    id: 's5',
    tenderId: 't5',
    vendor: mockVendors[1],
    submittedDate: '2024-03-10',
    status: 'qualified',
    documentCount: 6,
    documents: [
      createDocument('Data Architecture', 'PDF', '2.8MB', '/submissions/data5.pdf', '2024-03-10'),
      createDocument('ML Models', 'PDF', '3.3MB', '/submissions/ml5.pdf', '2024-03-10'),
      createDocument('Technical Proposal', 'PDF', '2.4MB', '/submissions/tech5.pdf', '2024-03-10'),
      createDocument('Financial Proposal', 'PDF', '2.1MB', '/submissions/fin5.pdf', '2024-03-10'),
      createDocument('Case Studies', 'PDF', '3.8MB', '/submissions/cases5.pdf', '2024-03-10'),
      createDocument('Team Profiles', 'PDF', '1.9MB', '/submissions/team5.pdf', '2024-03-10')
    ],
    evaluation: {
      technicalScore: 91,
      financialScore: 88,
      qualificationScore: 93,
      totalScore: 90.5,
      comments: 'Outstanding technical solution with proven track record'
    }
  }
];