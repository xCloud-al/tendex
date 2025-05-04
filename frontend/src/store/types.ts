export interface Tender {
  id: string;
  title: string;
  description: string;
  publishDate: string;
  deadline: string;
  status: string;
  budget: number;
  category: string;
  requirements: string[];
  documents: Document[];
}

export interface Submission {
  id: string;
  tenderId: string;
  vendorId: string;
  status: string;
  documents: Document[];
  submittedAt: string;
  evaluationScore?: number;
  feedback?: string;
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
  url: string;
  uploadDate: string;
} 