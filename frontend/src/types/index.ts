export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  registrationNumber: string;
  taxId: string;
  experience: number;
  rating: number;
  completedProjects: number;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  url: string;
}

export interface Tender {
  id: string;
  title: string;
  description: string;
  publishDate: string;
  deadline: string;
  status: 'active' | 'evaluation' | 'completed';
  budget: number;
  category: string;
  requirements: string[];
  documents: Document[];
}

export interface Submission {
  id: string;
  tenderId: string;
  vendor: Vendor;
  submittedDate: string;
  status: 'submitted' | 'qualified' | 'disqualified' | 'accepted';
  documentCount: number;
  documents: Document[];
  aiCheck?: {
    isQualified: boolean;
    reasons: string[];
    score: number;
  };
  evaluation?: {
    technicalScore: number;
    financialScore: number;
    qualificationScore: number;
    totalScore: number;
    comments: string;
  };
}

export interface Evaluation {
  id: string;
  tenderId: string;
  evaluator: User;
  criteria: EvaluationCriteria[];
  status: 'pending' | 'in_progress' | 'completed';
  comments: string;
  totalScore: number;
}

export interface EvaluationCriteria {
  id: string;
  name: string;
  weight: number;
  score: number;
  maxScore: number;
}