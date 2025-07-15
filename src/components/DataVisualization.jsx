import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart as PieChartIcon,
  Activity,
  Target,
  Users,
  Award,
  Calendar,
  Filter,
  Download,
  Share2,
  RefreshCw,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  Settings
} from 'lucide-react';

const DataVisualization = ({ user, isDarkMode = false }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedChart, setSelectedChart] = useState('bar');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data
  const evaluationData = [
    { month: 'Jan', completed: 45, pending: 12, inProgress: 8, district: 'East Baton Rouge' },
    { month: 'Feb', completed: 52, pending: 15, inProgress: 10, district: 'East Baton Rouge' },
    { month: 'Mar', completed: 48, pending: 18, inProgress: 12, district: 'East Baton Rouge' },
    { month: 'Apr', completed: 61, pending: 8, inProgress: 6, district: 'East Baton Rouge' },
    { month: 'May', completed: 55, pending: 10, inProgress: 9, district: 'East Baton Rouge' },
    { month: 'Jun', completed: 67, pending: 5, inProgress: 4, district: 'East Baton Rouge' },
  ];

  const performanceData = [
    { name: 'Planning', value: 85, fullMark: 100 },
    { name: 'Environment', value: 78, fullMark: 100 },
    { name: 'Instruction', value: 92, fullMark: 100 },
    { name: 'Professional', value: 88, fullMark: 100 },
  ];

  const districtComparison = [
    { district: 'East Baton Rouge', evaluations: 156, completion: 94.2, educators: 2847 },
    { district: 'Jefferson Parish', evaluations: 142, completion: 91.8, educators: 2456 },
    { district: 'Caddo Parish', evaluations: 98, completion: 89.5, educators: 1876 },
    { district: 'Calcasieu Parish', evaluations: 87, completion: 92.1, educators: 1654 },
    { district: 'Lafayette Parish', evaluations: 76, completion: 95.3, educators: 1432 },
  ];

  const trendData = [
    { month: 'Jan', evaluations: 45, target: 50 },
    { month: 'Feb', evaluations: 52, target: 50 },
    { month: 'Mar', evaluations: 48, target: 50 },
    { month: 'Apr', evaluations: 61, target: 50 },
    { month: 'May', evaluations: 55, target: 50 },
    { month: 'Jun', evaluations: 67, target: 50 },
  ];

  const pieData = [
    { name: 'Completed', value: 328, color: '#10b981' },
    { name: 'Pending', value: 68, color: '#f59e0b' },
    { name: 'In Progress', value: 49, color: '#3b82f6' },
  ];

  const COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#8b5cf6', '#ef4444'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-4 rounded-2xl shadow-2xl border ${
          isDarkMode ? 'bg-slate-800 border-white/20' : 'bg-white border-slate-200'
        }`}>
          <p className={`font-semibold mb-2 ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            {label}
          </p>
          {payload.map((entry, index) => (
            <p key={index} className={`text-sm ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              <span style={{ color: entry.color }}>
                {entry.name}: {entry.value}
              </span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleExport = () => {
    // Mock export functionality
    console.log('Exporting data...');
  };

  const handleShare = () => {
    // Mock share functionality
    console.log('Sharing data...');
  };

  const renderChart = () => {
    switch (selectedChart) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={evaluationData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#334155' : '#e2e8f0'} />
              <XAxis 
                dataKey="month" 
                stroke={isDarkMode ? '#94a3b8' : '#64748b'}
                fontSize={12}
              />
              <YAxis 
                stroke={isDarkMode ? '#94a3b8' : '#64748b'}
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="completed" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pending" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              <Bar dataKey="inProgress" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#334155' : '#e2e8f0'} />
              <XAxis 
                dataKey="month" 
                stroke={isDarkMode ? '#94a3b8' : '#64748b'}
                fontSize={12}
              />
              <YAxis 
                stroke={isDarkMode ? '#94a3b8' : '#64748b'}
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="evaluations" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: '#3b82f6', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#ef4444" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={evaluationData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#334155' : '#e2e8f0'} />
              <XAxis 
                dataKey="month" 
                stroke={isDarkMode ? '#94a3b8' : '#64748b'}
                fontSize={12}
              />
              <YAxis 
                stroke={isDarkMode ? '#94a3b8' : '#64748b'}
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="completed" 
                stackId="1"
                stroke="#10b981" 
                fill="#10b981" 
                fillOpacity={0.6}
              />
              <Area 
                type="monotone" 
                dataKey="pending" 
                stackId="1"
                stroke="#f59e0b" 
                fill="#f59e0b" 
                fillOpacity={0.6}
              />
              <Area 
                type="monotone" 
                dataKey="inProgress" 
                stackId="1"
                stroke="#3b82f6" 
                fill="#3b82f6" 
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      case 'radar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={performanceData}>
              <PolarGrid stroke={isDarkMode ? '#334155' : '#e2e8f0'} />
              <PolarAngleAxis 
                dataKey="name" 
                tick={{ fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 12 }}
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]}
                tick={{ fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 12 }}
              />
              <Radar
                name="Performance"
                dataKey="value"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
              />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className={`p-8 rounded-3xl backdrop-blur-xl shadow-xl transition-all duration-300 hover:scale-105 ${
        isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-white/70 border border-white/20'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
                <BarChart3 size={24} className="text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent dark:from-white dark:to-slate-200`}>
                  Data Analytics
                </h1>
                <p className={`text-lg ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Comprehensive evaluation insights and trends
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3 mt-6 lg:mt-0">
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className={`p-3 rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 ${
                isDarkMode 
                  ? 'text-slate-400 hover:text-white hover:bg-white/10' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
              }`}
            >
              {isLoading ? (
                <RefreshCw size={20} className="animate-spin" />
              ) : (
                <RefreshCw size={20} />
              )}
            </button>
            <button
              onClick={handleExport}
              className={`p-3 rounded-xl transition-all duration-200 hover:scale-105 ${
                isDarkMode 
                  ? 'text-slate-400 hover:text-white hover:bg-white/10' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
              }`}
            >
              <Download size={20} />
            </button>
            <button
              onClick={handleShare}
              className={`p-3 rounded-xl transition-all duration-200 hover:scale-105 ${
                isDarkMode 
                  ? 'text-slate-400 hover:text-white hover:bg-white/10' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
              }`}
            >
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className={`p-6 rounded-3xl backdrop-blur-xl shadow-xl ${
        isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-white/70 border border-white/20'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-medium ${
                isDarkMode ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Chart Type:
              </span>
              <select
                value={selectedChart}
                onChange={(e) => setSelectedChart(e.target.value)}
                className={`px-3 py-2 rounded-xl border transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-white/10 border-white/20 text-white' 
                    : 'bg-white/50 border-slate-200 text-slate-900'
                }`}
              >
                <option value="bar">Bar Chart</option>
                <option value="line">Line Chart</option>
                <option value="area">Area Chart</option>
                <option value="pie">Pie Chart</option>
                <option value="radar">Radar Chart</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-medium ${
                isDarkMode ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Period:
              </span>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className={`px-3 py-2 rounded-xl border transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-white/10 border-white/20 text-white' 
                    : 'bg-white/50 border-slate-200 text-slate-900'
                }`}
              >
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="quarter">Last Quarter</option>
                <option value="year">Last Year</option>
              </select>
            </div>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105 ${
              isDarkMode 
                ? 'text-slate-300 hover:text-white hover:bg-white/10' 
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/50'
            }`}
          >
            <Filter size={16} />
            <span>Filters</span>
            {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className={`mt-6 p-4 rounded-2xl ${
            isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-white/50 border border-white/20'
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  District
                </label>
                <select className={`w-full px-3 py-2 rounded-xl border transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-white/10 border-white/20 text-white' 
                    : 'bg-white/50 border-slate-200 text-slate-900'
                }`}>
                  <option value="">All Districts</option>
                  <option value="east-baton-rouge">East Baton Rouge Parish</option>
                  <option value="jefferson">Jefferson Parish</option>
                  <option value="caddo">Caddo Parish</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Evaluation Type
                </label>
                <select className={`w-full px-3 py-2 rounded-xl border transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-white/10 border-white/20 text-white' 
                    : 'bg-white/50 border-slate-200 text-slate-900'
                }`}>
                  <option value="">All Types</option>
                  <option value="annual">Annual</option>
                  <option value="probationary">Probationary</option>
                  <option value="focused">Focused</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Status
                </label>
                <select className={`w-full px-3 py-2 rounded-xl border transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-white/10 border-white/20 text-white' 
                    : 'bg-white/50 border-slate-200 text-slate-900'
                }`}>
                  <option value="">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chart */}
      <div className={`p-8 rounded-3xl backdrop-blur-xl shadow-xl transition-all duration-300 hover:scale-105 ${
        isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-white/70 border border-white/20'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent dark:from-white dark:to-slate-200`}>
            Evaluation Analytics
          </h2>
          <div className="flex items-center space-x-2">
            <button className={`p-2 rounded-xl transition-all duration-200 hover:scale-105 ${
              isDarkMode 
                ? 'text-slate-400 hover:text-white hover:bg-white/10' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
            }`}>
              <Eye size={16} />
            </button>
            <button className={`p-2 rounded-xl transition-all duration-200 hover:scale-105 ${
              isDarkMode 
                ? 'text-slate-400 hover:text-white hover:bg-white/10' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
            }`}>
              <Settings size={16} />
            </button>
          </div>
        </div>
        {renderChart()}
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={`p-6 rounded-2xl backdrop-blur-xl shadow-xl transition-all duration-300 hover:scale-105 ${
          isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-white/70 border border-white/20'
        }`}>
                      <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Target size={24} className="text-white" />
            </div>
            <TrendingUp size={20} className="text-emerald-500" />
          </div>
          <div>
            <p className={`text-sm font-medium ${
              isDarkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Total Evaluations
            </p>
            <p className={`text-3xl font-bold mt-2 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              445
            </p>
            <p className={`text-xs mt-1 ${
              isDarkMode ? 'text-slate-500' : 'text-slate-400'
            }`}>
              +12% from last month
            </p>
          </div>
        </div>

        <div className={`p-6 rounded-2xl backdrop-blur-xl shadow-xl transition-all duration-300 hover:scale-105 ${
          isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-white/70 border border-white/20'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Users size={24} className="text-white" />
            </div>
            <TrendingUp size={20} className="text-emerald-500" />
          </div>
          <div>
            <p className={`text-sm font-medium ${
              isDarkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Educators Evaluated
            </p>
            <p className={`text-3xl font-bold mt-2 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              328
            </p>
            <p className={`text-xs mt-1 ${
              isDarkMode ? 'text-slate-500' : 'text-slate-400'
            }`}>
              73.7% completion rate
            </p>
          </div>
        </div>

        <div className={`p-6 rounded-2xl backdrop-blur-xl shadow-xl transition-all duration-300 hover:scale-105 ${
          isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-white/70 border border-white/20'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Award size={24} className="text-white" />
            </div>
            <TrendingDown size={20} className="text-rose-500" />
          </div>
          <div>
            <p className={`text-sm font-medium ${
              isDarkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Average Score
            </p>
            <p className={`text-3xl font-bold mt-2 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              85.7
            </p>
            <p className={`text-xs mt-1 ${
              isDarkMode ? 'text-slate-500' : 'text-slate-400'
            }`}>
              -2.3% from last month
            </p>
          </div>
        </div>

        <div className={`p-6 rounded-2xl backdrop-blur-xl shadow-xl transition-all duration-300 hover:scale-105 ${
          isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-white/70 border border-white/20'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Calendar size={24} className="text-white" />
            </div>
            <TrendingUp size={20} className="text-emerald-500" />
          </div>
          <div>
            <p className={`text-sm font-medium ${
              isDarkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Days to Complete
            </p>
            <p className={`text-3xl font-bold mt-2 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              12.4
            </p>
            <p className={`text-xs mt-1 ${
              isDarkMode ? 'text-slate-500' : 'text-slate-400'
            }`}>
              -1.2 days average
            </p>
          </div>
        </div>
      </div>

      {/* District Comparison Table */}
      <div className={`p-8 rounded-3xl backdrop-blur-xl shadow-xl transition-all duration-300 hover:scale-105 ${
        isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-white/70 border border-white/20'
      }`}>
        <h2 className={`text-2xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent dark:from-white dark:to-slate-200`}>
          District Comparison
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${
                isDarkMode ? 'border-white/10' : 'border-slate-200'
              }`}>
                <th className={`text-left py-4 px-6 font-semibold ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  District
                </th>
                <th className={`text-left py-4 px-6 font-semibold ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Evaluations
                </th>
                <th className={`text-left py-4 px-6 font-semibold ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Completion Rate
                </th>
                <th className={`text-left py-4 px-6 font-semibold ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Total Educators
                </th>
              </tr>
            </thead>
            <tbody>
              {districtComparison.map((district, index) => (
                <tr 
                  key={index}
                  className={`border-b transition-all duration-200 hover:bg-white/5 ${
                    isDarkMode ? 'border-white/10' : 'border-slate-200'
                  }`}
                >
                  <td className={`py-4 px-6 font-medium ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    {district.district}
                  </td>
                  <td className={`py-4 px-6 ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {district.evaluations}
                  </td>
                  <td className={`py-4 px-6 ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      district.completion >= 90 
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
                        : district.completion >= 80
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400'
                        : 'bg-rose-100 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400'
                    }`}>
                      {district.completion}%
                    </span>
                  </td>
                  <td className={`py-4 px-6 ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {district.educators.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataVisualization; 