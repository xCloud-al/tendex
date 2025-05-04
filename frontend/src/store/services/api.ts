import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface CriteriaCheckRequest {
  tenderId: string;
  vendorId: string;
}

interface CriteriaCheckResponse {
  isEligible: boolean;
  missingCriteria: string[];
  feedback: string;
}

interface LoginRequest {
  identifier: string;
  password: string;
}

interface LoginResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

interface CriteriaVerification {
  criteria_name: string;
  criteria_status: 'PASS' | 'FAIL';
  requirement_source: string;
  evidence_found: string;
}

interface AutomaticEvaluationResponse {
  offer: string;
  evaluation: {
    overall_qualification_status: 'PASS' | 'FAIL';
    missing_documents: string[];
    criteria_verification: CriteriaVerification[];
  };
}

interface AutomaticEvaluationRequest {
  tenderId: string;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:1337/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Tender', 'Submission', 'Vendor'],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/local',
        method: 'POST',
        body: credentials,
      }),
    }),
    checkEligibility: builder.mutation<CriteriaCheckResponse, CriteriaCheckRequest>({
      query: ({ tenderId, vendorId }) => ({
        url: '/ai/check-eligibility',
        method: 'POST',
        body: { tenderId, vendorId },
      }),
    }),
    runAutomaticEvaluation: builder.mutation<AutomaticEvaluationResponse[], AutomaticEvaluationRequest>({
      query: ({ tenderId }) => ({
        url: '/automatic-evaluations',
        method: 'POST',
        body: { tenderId },
      }),
    }),
  }),
});

export const { 
  useLoginMutation, 
  useCheckEligibilityMutation,
  useRunAutomaticEvaluationMutation 
} = api; 