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

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<ProtectedRoute><ProductDashboard /></ProtectedRoute>} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/product/:id/add-review" element={<ProtectedRoute><AddReview /></ProtectedRoute>} />
            <Route path="/product/:id/reviews" element={<ViewReviews />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
