export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface Tender {
  id: string;
  title: string;
  description: string;
  publishDate: string;
  deadline: string;
  status: 'active' | 'evaluation' | 'completed';
  category: string;
  submissionCount: number;
  documents: any[];
  budget: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  url: string;
}

export interface Submission {
  id: string;
  tenderId: string;
  vendor: {
    name: string;
    email: string;
  };
  submittedDate: string;
  documentCount: number;
  status: 'submitted' | 'qualified' | 'disqualified' | 'accepted';
  aiCheck?: {
    isQualified: boolean;
    reasons: string[];
    score: number;
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