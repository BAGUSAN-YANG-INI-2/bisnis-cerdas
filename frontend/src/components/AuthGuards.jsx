import React from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

/**
 * Route guard untuk halaman yang mewajibkan autentikasi (Protected).
 * Jika user belum login, diarahkan otomatis ke halaman /login.
 */
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, authLoading } = useApp();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-9 w-9 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent"></div>
          <p className="text-xs text-slate-500 font-medium">Memverifikasi sesi...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

/**
 * Route guard untuk halaman publik/guest (Login & Register).
 * Jika user SUDAH login/terautentikasi, diarahkan langsung ke /dashboard.
 */
export const PublicRoute = ({ children }) => {
  const { isAuthenticated, authLoading } = useApp();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-9 w-9 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent"></div>
          <p className="text-xs text-slate-500 font-medium">Memuat...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};
