import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import PublicLayout from './components/PublicLayout';
import Dashboard from './pages/Dashboard';
import Tenders from './pages/Tenders';
import TenderDetails from './pages/TenderDetails';
import SubmitOffer from './pages/SubmitOffer';
import Evaluation from './pages/Evaluation';
import Reports from './pages/Reports';
import Evaluators from './pages/Evaluators';
import EvaluatorCreation from './pages/EvaluatorCreation';
import EvaluatorDetails from './pages/EvaluatorDetails';
import Settings from './pages/Settings';
import Login from './pages/Login';
import TenderCreation from './pages/TenderCreation';
import TenderEdit from './pages/TenderEdit';
import PublicTenders from './pages/PublicTenders';
import PublicTenderDetails from './pages/PublicTenderDetails';
import VendorRegistration from './pages/VendorRegistration';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import SubmissionEvaluation from './pages/SubmissionEvaluation';
import './App.css';
import EvaluatorEdit from './pages/EvaluatorEdit';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route 
              path="/vendors/tenders" 
              element={!isAuthenticated ? <PublicTenders /> : <Navigate to="/dashboard" />} 
            />
            <Route 
              path="/vendors/tender/:id" 
              element={!isAuthenticated ? <PublicTenderDetails /> : <Navigate to="/dashboard" />} 
            />
            <Route 
              path="/vendor-registration" 
              element={!isAuthenticated ? <VendorRegistration /> : <Navigate to="/dashboard" />} 
            />
          </Route>

          {/* Login Route - No Layout */}
          <Route 
            path="/login" 
            element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} 
          />

          {/* Protected Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="tenders" element={<Tenders />} />
            <Route path="tenders/create" element={<TenderCreation />} />
            <Route path="tenders/:id" element={<TenderDetails />} />
            <Route path="tenders/:id/edit" element={<TenderEdit />} />
            <Route path="submit-offer/:id" element={<SubmitOffer />} />
            <Route path="evaluation/:id" element={<Evaluation />} />
            <Route path="reports" element={<Reports />} />
            <Route path="evaluators" element={<Evaluators />} />
            <Route path="evaluators/create" element={<EvaluatorCreation />} />
            <Route path="evaluators/:id" element={<EvaluatorDetails />} />
            <Route path="evaluators/:id/edit" element={<EvaluatorEdit />} />
            <Route path="settings" element={<Settings />} />
            <Route path="tenders/:tenderId/submissions/:submissionId/evaluate" element={<SubmissionEvaluation />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;