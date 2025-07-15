import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ClipboardList, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  CheckSquare,
  Plus,
  ArrowRight,
  Target,
  BarChart3,
  BookOpen,
  FileText,
  Zap,
  Building,
  Sparkles,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Award
} from 'lucide-react';

const Dashboard = ({ user, isDarkMode = false }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const dashboardData = {
    pendingEvaluations: 3,
    completedThisMonth: 12,
    upcomingDeadlines: 5,
    certificationStatus: 'Active',
    districtStats: {
      totalEducators: 2847,
      evaluationsThisYear: 156,
      completionRate: 94.2
    },
    recentActivity: [
      {
        id: 1,
        type: 'evaluation',
        title: 'Completed evaluation for Ms. Rodriguez',
        time: '2 hours ago',
        status: 'completed',
        icon: CheckCircle,
        color: 'emerald',
        priority: 'high'
      },
      {
        id: 2,
        type: 'roster',
        title: 'Updated roster for East Baton Rouge Parish',
        time: '1 day ago',
        status: 'updated',
        icon: CheckSquare,
        color: 'blue',
        priority: 'medium'
      },
      {
        id: 3,
        type: 'training',
        title: 'Completed "Effective Feedback Strategies" training',
        time: '3 days ago',
        status: 'completed',
        icon: BookOpen,
        color: 'purple',
        priority: 'low'
      }
    ],
    quickActions: [
      {
        title: 'Start New Evaluation',
        description: 'Begin evaluating an educator',
        icon: Plus,
        href: '/evaluation-workflow',
        gradient: 'from-emerald-500 to-teal-500',
        badge: '3 pending'
      },
      {
        title: 'View Certifications',
        description: 'Check certification status',
        icon: Award,
        href: '/certifications',
        gradient: 'from-amber-500 to-orange-500'
      },
      {
        title: 'Roster Verification',
        description: 'Verify educator rosters',
        icon: CheckSquare,
        href: '/roster-verification',
        gradient: 'from-blue-500 to-cyan-500',
        badge: '12 new'
      },
      {
        title: 'View Analytics',
        description: 'Review evaluation trends',
        icon: BarChart3,
        href: '/data-visualization',
        gradient: 'from-purple-500 to-pink-500'
      }
    ],
    metrics: [
      {
        title: 'Pending Evaluations',
        value: 3,
        change: '+12%',
        changeType: 'increase',
        icon: Clock,
        gradient: 'from-amber-500 to-orange-500',
        description: 'from last month'
      },
      {
        title: 'Completed This Month',
        value: 12,
        change: '+8%',
        changeType: 'increase',
        icon: CheckCircle,
        gradient: 'from-emerald-500 to-teal-500',
        description: 'on track for goal'
      },
      {
        title: 'Upcoming Deadlines',
        value: 5,
        change: '-3%',
        changeType: 'decrease',
        icon: AlertTriangle,
        gradient: 'from-rose-500 to-red-500',
        description: 'from last week'
      },
      {
        title: 'Completion Rate',
        value: '94.2%',
        change: '+2.1%',
        changeType: 'increase',
        icon: Target,
        gradient: 'from-blue-500 to-cyan-500',
        description: 'district average'
      }
    ]
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/20';
      case 'pending': return 'text-amber-600 bg-amber-100 dark:bg-amber-900/20';
      case 'updated': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      default: return 'text-slate-600 bg-slate-100 dark:bg-slate-900/20';
    }
  };



  const handleQuickAction = (action) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className={`p-6 lg:p-8 rounded-3xl backdrop-blur-xl shadow-xl transition-all duration-500 ease-out hover:shadow-2xl hover:backdrop-blur-2xl ${
        isDarkMode ? 'bg-white/5 border border-white/10 hover:bg-white/8' : 'bg-white/70 border border-white/20 hover:bg-white/80'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center space-x-4 mb-4 lg:mb-0">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 hover:rotate-12">
              <Sparkles size={24} className="text-white" />
            </div>
            <div>
              <h1 className={`text-2xl lg:text-3xl font-bold mb-2 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                {getGreeting()}, {user?.firstName || 'Educator'}!
              </h1>
              <p className={`text-base lg:text-lg ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Welcome to the Louisiana Educator Portal Dashboard
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className={`px-4 py-2 rounded-xl text-sm font-semibold ${
              isDarkMode ? 'bg-emerald-900/20 text-emerald-300' : 'bg-emerald-100 text-emerald-700'
            }`}>
              {dashboardData.certificationStatus}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardData.metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <div
              key={index}
              className={`p-6 rounded-2xl backdrop-blur-sm transition-all duration-500 ease-out hover:shadow-2xl hover:backdrop-blur-2xl group ${
                isDarkMode 
                  ? 'bg-white/5 border border-white/10 hover:bg-white/8' 
                  : 'bg-white/50 border border-white/20 hover:bg-white/80'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${metric.gradient} rounded-xl flex items-center justify-center shadow-lg transition-all duration-500 group-hover:rotate-12`}>
                  <IconComponent size={20} className="text-white" />
                </div>
                <div className={`flex items-center space-x-1 text-sm font-semibold ${
                  metric.changeType === 'increase' 
                    ? 'text-emerald-600' 
                    : 'text-rose-600'
                }`}>
                  {metric.changeType === 'increase' ? (
                    <ArrowUpRight size={16} />
                  ) : (
                    <ArrowDownRight size={16} />
                  )}
                  <span>{metric.change}</span>
                </div>
              </div>
              <h3 className={`text-2xl font-bold mb-1 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                {metric.value}
              </h3>
              <p className={`text-sm mb-2 ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {metric.title}
              </p>
              <p className={`text-xs ${
                isDarkMode ? 'text-slate-400' : 'text-slate-500'
              }`}>
                {metric.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`p-6 lg:p-8 rounded-3xl backdrop-blur-xl shadow-xl transition-all duration-500 ease-out hover:shadow-2xl hover:backdrop-blur-2xl ${
          isDarkMode ? 'bg-white/5 border border-white/10 hover:bg-white/8' : 'bg-white/70 border border-white/20 hover:bg-white/80'
        }`}>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 hover:rotate-12">
              <Zap size={20} className="text-white" />
            </div>
            <h2 className={`text-xl lg:text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Quick Actions
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {dashboardData.quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Link
                  key={index}
                  to={action.href}
                  onClick={() => handleQuickAction(action)}
                  className={`p-4 rounded-2xl backdrop-blur-sm transition-all duration-500 ease-out hover:shadow-2xl hover:backdrop-blur-2xl group ${
                    isDarkMode 
                      ? 'bg-white/5 border border-white/10 hover:bg-white/8' 
                      : 'bg-white/50 border border-white/20 hover:bg-white/80'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${action.gradient} rounded-xl flex items-center justify-center shadow-lg transition-all duration-500 group-hover:rotate-12`}>
                      <IconComponent size={20} className="text-white" />
                    </div>
                    {action.badge && (
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        isDarkMode ? 'bg-amber-900/20 text-amber-300' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {action.badge}
                      </span>
                    )}
                  </div>
                  <h3 className={`font-semibold mb-1 ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    {action.title}
                  </h3>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {action.description}
                  </p>
                  <ArrowRight size={16} className={`mt-2 transition-all duration-300 group-hover:translate-x-1 ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`} />
                </Link>
              );
            })}
          </div>
        </div>

        <div className={`p-6 lg:p-8 rounded-3xl backdrop-blur-xl shadow-xl transition-all duration-500 ease-out hover:shadow-2xl hover:backdrop-blur-2xl ${
          isDarkMode ? 'bg-white/5 border border-white/10 hover:bg-white/8' : 'bg-white/70 border border-white/20 hover:bg-white/80'
        }`}>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 hover:rotate-12">
              <Activity size={20} className="text-white" />
            </div>
            <h2 className={`text-xl lg:text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Recent Activity
            </h2>
          </div>
          <div className="space-y-4">
            {dashboardData.recentActivity.map((activity) => {
              const IconComponent = activity.icon;
              return (
                <div
                  key={activity.id}
                  className={`p-4 rounded-2xl backdrop-blur-sm transition-all duration-500 ease-out hover:shadow-2xl hover:backdrop-blur-2xl group ${
                    isDarkMode 
                      ? 'bg-white/5 border border-white/10 hover:bg-white/8' 
                      : 'bg-white/50 border border-white/20 hover:bg-white/80'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 bg-gradient-to-br from-${activity.color}-500 to-${activity.color}-600 rounded-lg flex items-center justify-center shadow-lg transition-all duration-500 group-hover:rotate-12`}>
                      <IconComponent size={16} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium mb-1 ${
                        isDarkMode ? 'text-white' : 'text-slate-900'
                      }`}>
                        {activity.title}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(activity.status)}`}>
                          {activity.status}
                        </span>
                        <span className={`text-xs ${
                          isDarkMode ? 'text-slate-400' : 'text-slate-500'
                        }`}>
                          {activity.time}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className={`p-6 lg:p-8 rounded-3xl backdrop-blur-xl shadow-xl transition-all duration-500 ease-out hover:shadow-2xl hover:backdrop-blur-2xl ${
        isDarkMode ? 'bg-white/5 border border-white/10 hover:bg-white/8' : 'bg-white/70 border border-white/20 hover:bg-white/80'
      }`}>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 hover:rotate-12">
            <Building size={20} className="text-white" />
          </div>
          <h2 className={`text-xl lg:text-2xl font-bold ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            District Overview
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className={`text-3xl font-bold mb-2 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              {dashboardData.districtStats.totalEducators.toLocaleString()}
            </div>
            <p className={`text-sm ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Total Educators
            </p>
          </div>
          <div className="text-center">
            <div className={`text-3xl font-bold mb-2 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              {dashboardData.districtStats.evaluationsThisYear}
            </div>
            <p className={`text-sm ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Evaluations This Year
            </p>
          </div>
          <div className="text-center">
            <div className={`text-3xl font-bold mb-2 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              {dashboardData.districtStats.completionRate}%
            </div>
            <p className={`text-sm ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Completion Rate
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 