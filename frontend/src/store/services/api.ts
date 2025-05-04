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

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:1337/api',
    prepareHeaders: (headers) => {
      // You can add auth headers here if needed
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
  }),
});

export const { useLoginMutation, useCheckEligibilityMutation } = api; 