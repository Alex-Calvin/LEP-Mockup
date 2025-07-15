import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Bell, 
  Search, 
  Menu, 
  X, 
  LogOut,
  Sun,
  Moon,
  User,
  Settings,
  ChevronDown,
  CheckCircle,
  AlertTriangle,
  Info,
  Sparkles,
  Home,
  CheckSquare,
  BarChart3,
  ClipboardList
} from 'lucide-react';

const Sidebar = ({ 
  user, 
  onLogout, 
  notifications = [], 
  onNotificationRead, 
  onMarkAllNotificationsRead,
  isCollapsed,
  onToggleCollapse,
  mobileMenuOpen,
  onMobileMenuToggle,
  isDarkMode,
  onToggleDarkMode
}) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { 
      name: 'Dashboard', 
      href: '/', 
      icon: Home,
      description: 'Overview and insights'
    },
    { 
      name: 'Roster Verification', 
      href: '/roster-verification', 
      icon: CheckSquare,
      description: 'Verify educator rosters'
    },
    { 
      name: 'Data Visualization', 
      href: '/data-visualization', 
      icon: BarChart3,
      description: 'Analytics and insights'
    },
    { 
      name: 'Evaluation Workflow', 
      href: '/evaluation-workflow', 
      icon: ClipboardList,
      description: 'Conduct evaluations'
    }
  ];

  const unreadNotifications = notifications.filter(n => !n.read);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={16} className="text-emerald-500" />;
      case 'warning':
        return <AlertTriangle size={16} className="text-amber-500" />;
      case 'info':
        return <Info size={16} className="text-blue-500" />;
      default:
        return <Bell size={16} className="text-slate-500" />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success':
        return 'border-emerald-200 bg-emerald-50 dark:bg-emerald-900/20';
      case 'warning':
        return 'border-amber-200 bg-amber-50 dark:bg-amber-900/20';
      case 'info':
        return 'border-blue-200 bg-blue-50 dark:bg-blue-900/20';
      default:
        return 'border-slate-200 bg-slate-50 dark:bg-slate-900/20';
    }
  };

  const formatNotificationTime = (timeString) => {
    const time = new Date(timeString);
    const now = new Date();
    const diffInHours = (now - time) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return time.toLocaleDateString();
    }
  };

  return (
    <>
      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={onMobileMenuToggle}
        />
      )}

      {/* Mobile menu */}
      <div className={`fixed left-0 top-0 h-full z-50 lg:hidden transition-transform duration-300 ease-in-out ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } w-80 bg-white/95 backdrop-blur-xl border-r border-slate-200/50 shadow-xl dark:bg-slate-900/95 dark:border-slate-700/50`}>
        
        {/* Mobile header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/25">
                <Sparkles size={16} className="text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-pulse"></div>
            </div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">LEP</h1>
          </div>
          
          <button
            onClick={onMobileMenuToggle}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100/50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-700/50 transition-all duration-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Mobile navigation */}
        <nav className="flex-1 px-3 py-4 space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            const IconComponent = item.icon;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-700/50'
                }`}
                onClick={onMobileMenuToggle}
              >
                <IconComponent size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile bottom section */}
        <div className="border-t border-slate-200/50 dark:border-slate-700/50 p-3 space-y-3">
          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-slate-200 bg-white/50 text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:outline-none dark:border-slate-600 dark:bg-slate-800/50 dark:text-slate-100 dark:placeholder-slate-400"
            />
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 transition-all duration-200"
            >
              <div className="flex items-center space-x-3">
                <Bell size={20} />
                <span>Notifications</span>
              </div>
              {unreadNotifications.length > 0 && (
                <span className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadNotifications.length}
                </span>
              )}
            </button>

            {/* Notifications dropdown */}
            {notificationsOpen && (
              <div className="absolute bottom-full left-0 mb-2 w-full bg-white rounded-xl shadow-xl border border-slate-200 z-50">
                <div className="p-4 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900">Notifications</h3>
                    {unreadNotifications.length > 0 && (
                      <button
                        onClick={onMarkAllNotificationsRead}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-slate-500">
                      No notifications
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors ${
                          !notification.read ? getNotificationColor(notification.type) : ''
                        }`}
                        onClick={() => onNotificationRead(notification.id)}
                      >
                        <div className="flex items-start space-x-3">
                          {getNotificationIcon(notification.type)}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900">
                              {notification.title}
                            </p>
                            <p className="text-sm mt-1 text-slate-600">
                              {notification.message}
                            </p>
                            <p className="text-xs mt-2 text-slate-500">
                              {formatNotificationTime(notification.time)}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={onToggleDarkMode}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-700/50 transition-all duration-200"
          >
            <div className="flex items-center space-x-3">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              <span>{isDarkMode ? 'Light mode' : 'Dark mode'}</span>
            </div>
          </button>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-700/50 transition-all duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                  {user?.firstName && user?.lastName ? `${user.firstName[0]}${user.lastName[0]}` : 'U'}
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-slate-900">
                    {user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : 'User'}
                  </p>
                  <p className="text-xs text-slate-500">
                    {user?.role || 'Role'}
                  </p>
                </div>
              </div>
              <ChevronDown size={16} className={`transition-transform ${
                userMenuOpen ? 'rotate-180' : ''
              }`} />
            </button>

            {/* User dropdown */}
            {userMenuOpen && (
              <div className="absolute bottom-full left-0 mb-2 w-full bg-white rounded-xl shadow-xl border border-slate-200 z-50">
                <div className="p-4 border-b border-slate-200">
                  <p className="font-semibold text-slate-900">
                    {user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : 'User'}
                  </p>
                  <p className="text-sm text-slate-500">
                    {user?.email || 'user@example.com'}
                  </p>
                </div>
                <div className="p-2">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 transition-colors"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <User size={16} />
                    <span>Profile</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 transition-colors"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <Settings size={16} />
                    <span>Settings</span>
                  </Link>
                  <button
                    onClick={() => {
                      onLogout();
                      setUserMenuOpen(false);
                      onMobileMenuToggle();
                    }}
                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-red-600 hover:text-white hover:bg-red-600 transition-colors"
                  >
                    <LogOut size={16} />
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className={`fixed left-0 top-0 h-full z-40 transition-all duration-300 ease-in-out hidden lg:block ${
        isCollapsed ? 'w-16' : 'w-64'
      } bg-white/80 backdrop-blur-xl border-r border-slate-200/50 shadow-xl dark:bg-slate-900/80 dark:border-slate-700/50`}>
        
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200/50 dark:border-slate-700/50">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <Sparkles size={16} className="text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-pulse"></div>
              </div>
              <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">LEP</h1>
            </div>
          )}
          
          <button
            onClick={onToggleCollapse}
            className={`p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100/50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-700/50 transition-all duration-200 ${
              isCollapsed ? 'mx-auto' : ''
            }`}
          >
            {isCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            const IconComponent = item.icon;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-700/50'
                }`}
                title={isCollapsed ? item.name : undefined}
              >
                <IconComponent size={20} />
                {!isCollapsed && <span>{item.name}</span>}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom section - Search, Notifications, User */}
        <div className="border-t border-slate-200/50 dark:border-slate-700/50 p-3 space-y-3">
          {/* Search */}
          {!isCollapsed && (
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-slate-200 bg-white/50 text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:outline-none dark:border-slate-600 dark:bg-slate-800/50 dark:text-slate-100 dark:placeholder-slate-400"
              />
            </div>
          )}

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className={`relative w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                isCollapsed 
                  ? 'justify-center' 
                  : 'justify-between'
              } text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-700/50`}
              title={isCollapsed ? 'Notifications' : undefined}
            >
              <div className="flex items-center space-x-3">
                <Bell size={20} />
                {!isCollapsed && <span>Notifications</span>}
              </div>
              {!isCollapsed && unreadNotifications.length > 0 && (
                <span className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadNotifications.length}
                </span>
              )}
              {isCollapsed && unreadNotifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              )}
            </button>

            {/* Notifications dropdown */}
            {notificationsOpen && !isCollapsed && (
              <div className="absolute bottom-full left-0 mb-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 z-50">
                <div className="p-4 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900">Notifications</h3>
                    {unreadNotifications.length > 0 && (
                      <button
                        onClick={onMarkAllNotificationsRead}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-slate-500">
                      No notifications
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors ${
                          !notification.read ? getNotificationColor(notification.type) : ''
                        }`}
                        onClick={() => onNotificationRead(notification.id)}
                      >
                        <div className="flex items-start space-x-3">
                          {getNotificationIcon(notification.type)}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900">
                              {notification.title}
                            </p>
                            <p className="text-sm mt-1 text-slate-600">
                              {notification.message}
                            </p>
                            <p className="text-xs mt-2 text-slate-500">
                              {formatNotificationTime(notification.time)}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={onToggleDarkMode}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
              isCollapsed 
                ? 'justify-center' 
                : 'justify-between'
            } text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-700/50`}
            title={isCollapsed ? (isDarkMode ? 'Light mode' : 'Dark mode') : undefined}
          >
            <div className="flex items-center space-x-3">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              {!isCollapsed && <span>{isDarkMode ? 'Light mode' : 'Dark mode'}</span>}
            </div>
          </button>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                isCollapsed 
                  ? 'justify-center' 
                  : 'justify-between'
              } text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-700/50`}
              title={isCollapsed ? `${user?.firstName} ${user?.lastName}` : undefined}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                  {user?.firstName && user?.lastName ? `${user.firstName[0]}${user.lastName[0]}` : 'U'}
                </div>
                {!isCollapsed && (
                  <div className="text-left">
                    <p className="text-sm font-medium text-slate-900">
                      {user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : 'User'}
                    </p>
                    <p className="text-xs text-slate-500">
                      {user?.role || 'Role'}
                    </p>
                  </div>
                )}
              </div>
              {!isCollapsed && (
                <ChevronDown size={16} className={`transition-transform ${
                  userMenuOpen ? 'rotate-180' : ''
                }`} />
              )}
            </button>

            {/* User dropdown */}
            {userMenuOpen && !isCollapsed && (
              <div className="absolute bottom-full left-0 mb-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 z-50">
                <div className="p-4 border-b border-slate-200">
                  <p className="font-semibold text-slate-900">
                    {user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : 'User'}
                  </p>
                  <p className="text-sm text-slate-500">
                    {user?.email || 'user@example.com'}
                  </p>
                </div>
                <div className="p-2">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 transition-colors"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <User size={16} />
                    <span>Profile</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 transition-colors"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <Settings size={16} />
                    <span>Settings</span>
                  </Link>
                  <button
                    onClick={() => {
                      onLogout();
                      setUserMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-red-600 hover:text-white hover:bg-red-600 transition-colors"
                  >
                    <LogOut size={16} />
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(notificationsOpen || userMenuOpen) && (
        <div 
          className="fixed inset-0 z-30"
          onClick={() => {
            setNotificationsOpen(false);
            setUserMenuOpen(false);
          }}
        />
      )}
    </>
  );
};

export default Sidebar; 