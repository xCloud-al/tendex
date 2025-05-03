import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Tenders from './pages/Tenders';
import TenderDetails from './pages/TenderDetails';
import SubmitOffer from './pages/SubmitOffer';
import Evaluation from './pages/Evaluation';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Login from './pages/Login';
import TenderCreation from './pages/TenderCreation';
import TenderEdit from './pages/TenderEdit';
import PublicTenders from './pages/PublicTenders';
import PublicTenderDetails from './pages/PublicTenderDetails';
import VendorRegistration from './pages/VendorRegistration';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes - Only accessible when not logged in */}
          <Route 
            path="/vendors/tenders" 
            element={!isAuthenticated ? <PublicTenders /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/vendors/tender/:id" 
            element={!isAuthenticated ? <PublicTenderDetails /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/login" 
            element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/vendor-registration" 
            element={!isAuthenticated ? <VendorRegistration /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/tender/create" 
            element={isAuthenticated ? <TenderCreation /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/tender/edit/:id" 
            element={isAuthenticated ? <TenderEdit /> : <Navigate to="/login" />} 
          />
          <Route path="/" element={<Navigate to="/dashboard" />} />
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
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;