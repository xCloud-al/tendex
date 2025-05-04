import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Tender, Offer } from '../types';

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
    baseUrl: 'https://strapi.tendex.xcloud.al/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');
      return headers;
    },
    credentials: 'include',
  }),
  tagTypes: ['Tender', 'Submission', 'Vendor', 'Evaluator'],
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
    getTenders: builder.query<Tender[], void>({
      query: () => '/tenders',
      providesTags: ['Tender'],
      transformResponse: (response: { data: Tender[] }) => response.data,
    }),
    getTenderById: builder.query<Tender, string>({
      query: (id) => `/tenders/${id}?populate[documents]=true&populate[criteria_document]=true&populate[offers][populate][documents]=true&populate[offers][populate][vendor]=true&populate[offers][populate][automatic_evaluation]=true&populate[offers][populate][evaluations]=true`,
      providesTags: (result, error, id) => [{ type: 'Tender', id }],
      transformResponse: (response: { data: Tender }) => response.data,
    }),
    getOfferById: builder.query<Offer, string>({
      query: (id) => `/offers/${id}?populate[documents]=true&populate[vendor]=true&populate[automatic_evaluation]=true&populate[evaluations]=true`,
      providesTags: (result, error, id) => [{ type: 'Submission', id }],
      transformResponse: (response: { data: Offer }) => response.data,
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
  useGetTendersQuery,
  useGetTenderByIdQuery,
  useGetOfferByIdQuery,
  useRunAutomaticEvaluationMutation 
} = api; 