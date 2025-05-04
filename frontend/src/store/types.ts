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
  documentId: string;
  tenderId: string;
  vendor?: {
    id: string;
    name: string;
    email: string;
  };
  submitted_at: string;
  documents: Array<{
    id: string;
    name: string;
    url: string;
    ext: string;
    size: string;
    updatedAt: string;
  }>;
  offer_status: 'DRAFT' | 'SUBMITTED' | 'QUALIFIED' | 'DISQUALIFIED' | 'APPROVED';
  automatic_evaluation?: {
    id: number;
    documentId: string;
    overall_qualification_status: 'PASS' | 'FAIL';
    missing_documents: string[];
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface Tender {
  documentId: any;
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