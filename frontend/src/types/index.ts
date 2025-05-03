export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface Tender {
  budget: string;
  id: string;
  title: string;
  description: string;
  publishDate: string;
  deadline: string;
  status: 'draft' | 'active' | 'evaluation' | 'completed';
  category: string;
  submissionCount: number;
  documents: Document[];
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