import React from 'react';
import { useLocation } from 'react-router-dom';
import { Sparkles, Menu } from 'lucide-react';

const Header = ({ user, onMobileMenuToggle }) => {
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/roster-verification':
        return 'Roster Verification';
      case '/data-visualization':
        return 'Data Visualization';
      case '/evaluation-workflow':
        return 'Evaluation Workflow';
      default:
        return 'Dashboard';
    }
  };

  const getPageDescription = () => {
    switch (location.pathname) {
      case '/':
        return 'Overview and insights for Louisiana educators';
      case '/roster-verification':
        return 'Verify and manage educator rosters';
      case '/data-visualization':
        return 'Analytics and data insights';
      case '/evaluation-workflow':
        return 'Conduct and manage evaluations';
      default:
        return 'Overview and insights for Louisiana educators';
    }
  };

  return (
    <header className="sticky top-0 z-20 backdrop-blur-xl border-b bg-white/70 border-slate-200/50">
      <div className="px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Mobile menu button and page title */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <button
              onClick={onMobileMenuToggle}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100/50 transition-all duration-200 lg:hidden"
            >
              <Menu size={20} />
            </button>

            {/* Page title and description */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <Sparkles size={16} className="text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-slate-900">{getPageTitle()}</h1>
                <p className="text-xs sm:text-sm text-slate-600 hidden sm:block">{getPageDescription()}</p>
              </div>
            </div>
          </div>

          {/* Right side - Welcome message */}
          <div className="text-right">
            <p className="text-xs sm:text-sm text-slate-600">Welcome back,</p>
            <p className="text-xs sm:text-sm font-medium text-slate-900">
              {user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : 'User'}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 