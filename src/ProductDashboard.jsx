// App.jsx — Root component: routing, context wiring, auth guards
// CO1: Declarative UI (routes as UI state), unidirectional data flow via Context
// CO5: SPA routing fundamentals, protected routes, rendering boundaries

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import { DataProvider } from './context/DataContext';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProductDashboard from './pages/ProductDashboard';
import ProductDetails from './pages/ProductDetails';
import AddReview from './pages/AddReview';
import ViewReviews from './pages/ViewReviews';

import './index.css';

// CO5: Protected route — rendering boundary that guards authenticated views
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  // Unidirectional: auth state drives render decision deterministically
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

// CO1: Declarative routing — what to show for each URL, not how to navigate
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={
        <ProtectedRoute><ProductDashboard /></ProtectedRoute>
      } />
      <Route path="/product/:id" element={
        <ProtectedRoute><ProductDetails /></ProtectedRoute>
      } />
      <Route path="/product/:id/add-review" element={
        <ProtectedRoute><AddReview /></ProtectedRoute>
      } />
      <Route path="/product/:id/reviews" element={
        <ProtectedRoute><ViewReviews /></ProtectedRoute>
      } />
      {/* Catch-all: redirect unknown routes to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

// CO4: Global state provided at root — Context as architectural pattern
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <AppRoutes />
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
