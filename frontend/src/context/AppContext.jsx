import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { INITIAL_USER, INITIAL_TRANSACTIONS } from '../data/mockData';
import { calculateHealthMetrics } from '../utils/formatters';
import { api } from '../services/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("umkm_token"));
  const [authLoading, setAuthLoading] = useState(() => {
    const t = localStorage.getItem("umkm_token");
    return !!t && t !== "demo-standalone-token";
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("umkm_user");
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("umkm_transactions");
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [period, setPeriod] = useState("30d");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isConnectedToBe, setIsConnectedToBe] = useState(false);
  const [loading, setLoading] = useState(false);

  // Status autentikasi: user terautentikasi jika memiliki token
  const isAuthenticated = !!token;

  // Sync data from backend if token exists
  const syncFromBackend = useCallback(async () => {
    const currentToken = localStorage.getItem('umkm_token');
    if (!currentToken) {
      setIsConnectedToBe(false);
      setAuthLoading(false);
      return;
    }

    // Jika masuk via mode standalone demo offline
    if (currentToken === 'demo-standalone-token') {
      setIsConnectedToBe(false);
      setAuthLoading(false);
      return;
    }

    try {
      setLoading(true);
      const meData = await api.getMe();
      if (meData) {
        setIsConnectedToBe(true);
        // /api/me returns { user: {...}, business_profile: {...} }
        const u = meData.user || meData;
        const profile = meData.business_profile || u.business_profile || {};
        setUser({
          id: u.id,
          name: u.name,
          email: u.email,
          business_name: profile.business_name || u.name,
          business_type: profile.business_type || 'culinary',
          initial_cash_balance: Number(profile.opening_balance) || 0,
        });
      }

      const txList = await api.getTransactions();
      if (Array.isArray(txList) && txList.length > 0) {
        setTransactions(txList);
      }
    } catch (err) {
      if (err.status === 401) {
        // Sesi token di server sudah tidak valid / revoked
        localStorage.removeItem('umkm_token');
        setToken(null);
        setIsConnectedToBe(false);
      } else {
        // Backend offline / network failure: fallback ke local cache tanpa logout
        setIsConnectedToBe(false);
      }
    } finally {
      setLoading(false);
      setAuthLoading(false);
    }
  }, []);

  useEffect(() => {
    syncFromBackend();
  }, [syncFromBackend]);

  useEffect(() => {
    localStorage.setItem("umkm_user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("umkm_transactions", JSON.stringify(transactions));
  }, [transactions]);

  // Login handler
  const login = async (email, password) => {
    try {
      const data = await api.login(email, password);
      setIsConnectedToBe(true);
      if (data.token) {
        setToken(data.token);
      }
      const u = data.user;
      // business_profile is at data level, NOT inside data.user
      const profile = data.business_profile || u.business_profile || {};
      const newUser = {
        id: u.id,
        name: u.name,
        email: u.email,
        business_name: profile.business_name || "Usaha Saya",
        business_type: profile.business_type || "culinary",
        initial_cash_balance: Number(profile.opening_balance) || 0
      };
      setUser(newUser);
      
      // Fetch user's real transactions from backend
      try {
        const txList = await api.getTransactions();
        if (Array.isArray(txList)) setTransactions(txList);
      } catch {}

      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  // Register handler
  const register = async (payload) => {
    try {
      const data = await api.register(payload);
      setIsConnectedToBe(true);
      if (data.token) {
        setToken(data.token);
      }
      const u = data.user;
      const profile = data.business_profile || u.business_profile || {};
      const newUser = {
        id: u.id,
        name: u.name,
        email: u.email,
        business_name: profile.business_name || payload.business_name,
        business_type: profile.business_type || payload.business_type,
        initial_cash_balance: Number(profile.opening_balance) || Number(payload.opening_balance) || 0
      };
      setUser(newUser);
      setTransactions([]);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  // Standalone demo login handler
  const loginDemo = () => {
    const demoToken = "demo-standalone-token";
    localStorage.setItem("umkm_token", demoToken);
    setToken(demoToken);
    setIsConnectedToBe(false);
    setUser(INITIAL_USER);
    setTransactions(INITIAL_TRANSACTIONS);
    return { success: true };
  };

  // Logout handler
  const logout = async () => {
    await api.logout();
    setIsConnectedToBe(false);
    resetData();
  };

  // Add Transaction
  const addTransaction = async (newTx) => {
    if (isConnectedToBe) {
      try {
        const created = await api.createTransaction(newTx);
        setTransactions((prev) => [created, ...prev]);
        return;
      } catch (e) {
        console.warn("Backend create failed, storing locally:", e.message);
      }
    }

    // Local fallback
    const tx = {
      ...newTx,
      id: Date.now(),
      amount: Number(newTx.amount) || 0,
      date: newTx.date || new Date().toISOString().split("T")[0]
    };
    setTransactions((prev) => [tx, ...prev]);
  };

  // Delete Transaction
  const deleteTransaction = async (id) => {
    if (isConnectedToBe) {
      try {
        await api.deleteTransaction(id);
      } catch (e) {
        console.warn("Backend delete failed:", e.message);
      }
    }
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const resetData = () => {
    localStorage.removeItem("umkm_token");
    setToken(null);
    setIsConnectedToBe(false);
    setUser(INITIAL_USER);
    setTransactions(INITIAL_TRANSACTIONS);
    localStorage.removeItem("umkm_user");
    localStorage.removeItem("umkm_transactions");
  };

  const metrics = calculateHealthMetrics(transactions, user.initial_cash_balance);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        transactions,
        addTransaction,
        deleteTransaction,
        resetData,
        metrics,
        period,
        setPeriod,
        isAddModalOpen,
        setIsAddModalOpen,
        isConnectedToBe,
        isAuthenticated,
        authLoading,
        login,
        register,
        loginDemo,
        logout,
        loading
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
