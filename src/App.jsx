import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Authentication from './components/Authentication';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import RosterVerification from './components/RosterVerification';
import DataVisualization from './components/DataVisualization';
import EvaluationWorkflow from './components/EvaluationWorkflow';
import Certifications from './components/Certifications';
import databaseService from './services/databaseService';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    }

    const savedUser = localStorage.getItem('lep_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
        setIsAuthenticated(true);
        loadNotifications(user.id);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('lep_user');
      }
    }
    setLoading(false);
  }, []);

  const loadNotifications = async (userId) => {
    try {
      const userNotifications = await databaseService.getNotificationsForUser(userId);
      setNotifications(userNotifications);
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };

  const handleLogin = async (userData) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('lep_user', JSON.stringify(userData));
    await loadNotifications(userData.id);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setNotifications([]);
    localStorage.removeItem('lep_user');
  };

  const handleNotificationRead = async (notificationId) => {
    try {
      await databaseService.markNotificationAsRead(notificationId);
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleMarkAllNotificationsRead = async () => {
    if (!currentUser) return;
    
    try {
      await databaseService.markAllNotificationsAsRead(currentUser.id);
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-all duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
          : 'bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50'
      }`}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>Loading Louisiana Educator Portal...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Authentication onLogin={handleLogin} />;
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50'
    }`}>
      {/* Sidebar */}
      <Sidebar 
        user={currentUser}
        onLogout={handleLogout}
        notifications={notifications}
        onNotificationRead={handleNotificationRead}
        onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={toggleSidebar}
        mobileMenuOpen={mobileMenuOpen}
        onMobileMenuToggle={toggleMobileMenu}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />
      
      {/* Main content area */}
      <div className={`transition-all duration-300 ease-in-out ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        {/* Header */}
        <Header 
          user={currentUser} 
          onMobileMenuToggle={toggleMobileMenu}
        />
        
        {/* Main content */}
        <main className="p-4 sm:p-6">
          <Routes>
            <Route 
              path="/" 
              element={<Dashboard user={currentUser} isDarkMode={isDarkMode} />} 
            />
            <Route 
              path="/roster-verification" 
              element={<RosterVerification user={currentUser} isDarkMode={isDarkMode} />} 
            />
            <Route 
              path="/data-visualization" 
              element={<DataVisualization user={currentUser} isDarkMode={isDarkMode} />} 
            />
            <Route 
              path="/evaluation-workflow" 
              element={<EvaluationWorkflow user={currentUser} isDarkMode={isDarkMode} />} 
            />
            <Route 
              path="/certifications" 
              element={<Certifications user={currentUser} isDarkMode={isDarkMode} />} 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App; 