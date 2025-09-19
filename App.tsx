
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SweetProvider } from './context/SweetContext';
import { CartProvider } from './context/CartContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import SharedLayout from './pages/SharedLayout';
import ProtectedRoute from './components/ProtectedRoute';
import { Role } from './types';

function App() {
  return (
    <AuthProvider>
      <SweetProvider>
        <CartProvider>
          <HashRouter>
            <Routes>
              <Route path="/" element={<SharedLayout />}>
                <Route index element={<HomePage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route 
                  path="cart" 
                  element={
                    <ProtectedRoute roles={[Role.USER, Role.ADMIN]}>
                      <CartPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="orders" 
                  element={
                    <ProtectedRoute roles={[Role.USER, Role.ADMIN]}>
                      <OrdersPage />
                    </ProtectedRoute>
                  } 
                />
                <Route
                  path="admin"
                  element={
                    <ProtectedRoute roles={[Role.ADMIN]}>
                      <AdminDashboardPage />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Routes>
          </HashRouter>
        </CartProvider>
      </SweetProvider>
    </AuthProvider>
  );
}

export default App;
