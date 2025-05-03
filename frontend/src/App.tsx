import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="tenders" element={<Tenders />} />
            <Route path="tenders/create" element={<TenderCreation />} />
            <Route path="tenders/:id" element={<TenderDetails />} />
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