export interface Document {
  id: string;
  name: string;
  ext: string;
  size: string;
  updatedAt: string;
  url: string;
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

export interface Offer {
  id: string;
  tenderId: string;
  vendor: Vendor;
  submittedAt: string;
  offer_status: 'submitted' | 'qualified' | 'disqualified' | 'accepted';
  documents: Document[];
  aiCheck?: {
    isQualified: boolean;
    reasons: string[];
    score: number;
  };
}

export interface Tender {
  id: string;
  title: string;
  description: string;
  open_date: string;
  deadline: string;
  status: 'draft' | 'active' | 'evaluation' | 'completed';
  budget: number;
  category: string;
  requirements: string[];
  documents: Document[];
  criteria_document?: Document;
  offers: Offer[];
  progress: number;
} 