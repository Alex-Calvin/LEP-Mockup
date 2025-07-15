import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, 
  Search, 
  Filter, 
  Download, 
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  Building,
  ChevronDown,
  ChevronUp,
  Users as UsersIcon,
  BarChart3,
  ChevronRight,
  X,
  Unlock,
  School,
  GraduationCap,
  BookOpen,
  Loader,
  Activity,
  Trash2
} from 'lucide-react';
import databaseService from '../services/databaseService';

const RosterVerification = ({ user, isDarkMode = false }) => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPeriod, setCurrentPeriod] = useState('verification');
  const [loading, setLoading] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [periodInfo, setPeriodInfo] = useState(null);
  const [error, setError] = useState('');
  const [schoolTeachers, setSchoolTeachers] = useState([]);
  const [teacherCourses, setTeacherCourses] = useState([]);
  const [verificationStats, setVerificationStats] = useState(null);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [districtsData, periodData, statsData] = await Promise.all([
        databaseService.getDistricts(),
        databaseService.getCurrentVerificationPeriod(),
        databaseService.getVerificationStatistics()
      ]);
      
      setDistricts(districtsData);
      setPeriodInfo(periodData);
      setVerificationStats(statsData);
      
      const now = new Date();
      const viewOnlyStart = new Date(periodData.viewOnlyStart);
      const viewOnlyEnd = new Date(periodData.viewOnlyEnd);
      const verificationStart = new Date(periodData.verificationStart);
      const verificationEnd = new Date(periodData.verificationEnd);

      if (now >= viewOnlyStart && now <= viewOnlyEnd) {
        setCurrentPeriod('view-only');
      } else if (now >= verificationStart && now <= verificationEnd) {
        setCurrentPeriod('verification');
      } else {
        setCurrentPeriod('closed');
      }
    } catch (err) {
      setError('Failed to load data. Please try again.');
      console.error('Error loading initial data:', err);
    } finally {
      setLoading(false);
    }
  };



  const getCurrentPeriodInfo = () => {
    if (!periodInfo) return null;

    const now = new Date();
    const viewOnlyStart = new Date(periodInfo.viewOnlyStart);
    const viewOnlyEnd = new Date(periodInfo.viewOnlyEnd);
    const verificationStart = new Date(periodInfo.verificationStart);
    const verificationEnd = new Date(periodInfo.verificationEnd);

    if (now >= viewOnlyStart && now <= viewOnlyEnd) {
      return {
        period: 'view-only',
        name: 'View-Only Period',
        description: 'Review rosters only. Edits must go through EdLink Data Manager.',
        color: 'amber',
        gradient: 'from-amber-500 via-yellow-500 to-orange-500',
        bgColor: 'bg-gradient-to-br from-amber-50 to-orange-50',
        borderColor: 'border-amber-200',
        textColor: 'text-amber-800'
      };
    } else if (now >= verificationStart && now <= verificationEnd) {
      return {
        period: 'verification',
        name: 'Verification Period',
        description: 'Direct edits allowed in LEP. Verification actions enabled.',
        color: 'emerald',
        gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
        bgColor: 'bg-gradient-to-br from-emerald-50 to-teal-50',
        borderColor: 'border-emerald-200',
        textColor: 'text-emerald-800'
      };
    } else {
      return {
        period: 'closed',
        name: 'Roster Verification Closed',
        description: 'Outside of verification periods.',
        color: 'rose',
        gradient: 'from-rose-500 via-red-500 to-pink-500',
        bgColor: 'bg-gradient-to-br from-rose-50 to-red-50',
        borderColor: 'border-rose-200',
        textColor: 'text-rose-800'
      };
    }
  };

  const handleVerifyCourse = async (courseId) => {
    setLoading(true);
    try {
      await databaseService.verifyCourse(courseId, 'Current User');
      if (selectedCourse && selectedCourse.id === courseId) {
        const updatedCourse = await databaseService.getCourseById(courseId);
        setSelectedCourse(updatedCourse);
      }
    } catch (err) {
      setError('Failed to verify course. Please try again.');
      console.error('Error verifying course:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveStudent = async (studentId) => {
    setLoading(true);
    try {
      await databaseService.removeStudentFromCourse(selectedCourse.id, studentId);
      const updatedCourse = await databaseService.getCourseById(selectedCourse.id);
      setSelectedCourse(updatedCourse);
    } catch (err) {
      setError('Failed to remove student. Please try again.');
      console.error('Error removing student:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveAllStudents = async (courseId) => {
    setLoading(true);
    try {
      await databaseService.removeAllStudentsFromCourse(courseId);
      if (selectedCourse && selectedCourse.id === courseId) {
        const updatedCourse = await databaseService.getCourseById(courseId);
        setSelectedCourse(updatedCourse);
      }
    } catch (err) {
      setError('Failed to remove all students. Please try again.');
      console.error('Error removing all students:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUnlockCourse = async (courseId) => {
    setLoading(true);
    try {
      await databaseService.unlockCourse(courseId);
      if (selectedCourse && selectedCourse.id === courseId) {
        const updatedCourse = await databaseService.getCourseById(courseId);
        setSelectedCourse(updatedCourse);
      }
    } catch (err) {
      setError('Failed to unlock course. Please try again.');
      console.error('Error unlocking course:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExportData = async () => {
    setLoading(true);
    try {
      const exportData = await databaseService.exportRosterData();
      const headers = Object.keys(exportData[0] || {}).join(',');
      const csvContent = [
        headers,
        ...exportData.map(row => Object.values(row).join(','))
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `roster_verification_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError('Failed to export data. Please try again.');
      console.error('Error exporting data:', err);
    } finally {
      setLoading(false);
    }
  };



  const renderDashboard = () => {
    const periodData = getCurrentPeriodInfo();
    if (!periodData) return null;

    return (
      <div className="space-y-6">
        <div className={`relative overflow-hidden rounded-3xl shadow-xl transition-all duration-500 ease-out hover:shadow-2xl ${
          isDarkMode 
            ? 'bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-slate-700' 
            : periodData.bgColor + ' border ' + periodData.borderColor
        }`}>
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
          </div>
          
          <div className="relative p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center space-x-6 mb-6 lg:mb-0">
                <div className="relative">
                  <div className={`w-16 h-16 bg-gradient-to-br ${periodData.gradient} rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500 hover:scale-110`}>
                    <Activity size={28} className="text-white" />
                  </div>
                  <div className={`absolute -inset-2 rounded-2xl bg-gradient-to-br ${periodData.gradient} opacity-20 blur-lg`}></div>
                </div>
                
                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    <h2 className={`text-2xl lg:text-3xl font-bold ${
                      isDarkMode ? 'text-white' : periodData.textColor
                    }`}>
                      {periodData.name}
                    </h2>
                    <div className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      isDarkMode 
                        ? 'bg-white/20 text-white border border-white/30' 
                        : 'bg-white/80 text-slate-700 border border-white/60'
                    }`}>
                      {periodData.period.replace('-', ' ')}
                    </div>
                  </div>
                  <p className={`text-base lg:text-lg ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {periodData.description}
                  </p>
                  
                  <div className="flex items-center space-x-6 mt-4">
                    <div className={`flex items-center space-x-2 text-sm ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${
                        periodData.period === 'verification' ? 'bg-green-500' :
                        periodData.period === 'view-only' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <span>Active Period</span>
                    </div>
                    <div className={`flex items-center space-x-2 text-sm ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      <Clock size={14} />
                      <span>Real-time Updates</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={`relative px-6 py-4 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-white/10 border border-white/20' 
                  : 'bg-white/90 border border-white/60'
              }`}>
                <div className="text-center">
                  <div className={`text-2xl lg:text-3xl font-bold mb-1 ${
                    isDarkMode ? 'text-white' : periodData.textColor
                  }`}>
                    {periodData.period.toUpperCase()}
                  </div>
                  <div className={`text-xs font-medium uppercase tracking-wider ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    Current Status
                  </div>
                </div>
                <div className={`absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl bg-gradient-to-r ${periodData.gradient}`}></div>
              </div>
            </div>
          </div>
        </div>

                <div className={`relative overflow-hidden rounded-3xl shadow-xl transition-all duration-500 ease-out hover:shadow-2xl ${
          isDarkMode 
            ? 'bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-slate-700' 
            : 'bg-gradient-to-br from-white via-blue-50/50 to-indigo-50/50 border border-blue-100'
        }`}>
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
          </div>
          
          <div className="relative p-8 lg:p-10">
            <div className="flex items-center space-x-4 mb-8">
              <div className="relative">
                <div className={`w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500 hover:scale-110`}>
                  <Building size={24} className="text-white" />
                </div>
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 opacity-20 blur-sm"></div>
              </div>
              <div>
                <h3 className={`text-2xl lg:text-3xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  District Summary
                </h3>
                <p className={`text-base ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Select a district to view schools and verification progress
                </p>
              </div>
            </div>
            
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <div className="text-center">
                  <div className="relative">
                    <Loader size={40} className="animate-spin text-blue-600 mx-auto mb-4" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 opacity-20 blur-lg"></div>
                  </div>
                  <p className={`text-lg font-medium ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    Loading districts...
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {districts.map((district) => {
                  const totalSchools = district.schools?.length || 0;
                  const totalTeachers = district.totalTeachers || 0;
                  const totalStudents = district.totalStudents || 0;
                  
                  return (
                    <div 
                      key={district.id}
                      onClick={async () => {
                        setLoading(true);
                        try {
                          const schools = await databaseService.getSchoolsByDistrict(district.id);
                          if (schools.length > 0) {
                            const school = schools[0];
                            setSelectedSchool(school);
                            const teachers = await databaseService.getTeachersBySchool(school.id);
                            setSchoolTeachers(teachers);
                            setCurrentView('school');
                          }
                        } catch (err) {
                          setError('Failed to load school data.');
                        } finally {
                          setLoading(false);
                        }
                      }}
                      className={`group relative overflow-hidden rounded-3xl transition-all duration-500 ease-out cursor-pointer ${
                        isDarkMode 
                          ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700 hover:bg-gradient-to-br hover:from-slate-700/80 hover:to-slate-800/80 hover:border-slate-600 hover:shadow-2xl' 
                          : 'bg-gradient-to-br from-white/90 to-blue-50/50 border border-white/60 hover:bg-gradient-to-br hover:from-white hover:to-blue-50 hover:border-blue-200 hover:shadow-2xl'
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="relative p-8">
                        <div className="flex items-center justify-between mb-6">
                          <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 group-hover:scale-110">
                              <School size={24} className="text-white" />
                            </div>
                            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 opacity-20 blur-sm"></div>
                          </div>
                          <ChevronRight size={24} className={`transition-all duration-300 group-hover:translate-x-2 ${
                            isDarkMode ? 'text-slate-400' : 'text-slate-500'
                          }`} />
                        </div>
                        
                        <h4 className={`font-bold text-xl mb-4 ${
                          isDarkMode ? 'text-white' : 'text-slate-900'
                        }`}>
                          {district.name}
                        </h4>
                        
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className={`p-3 rounded-xl ${
                              isDarkMode ? 'bg-white/10' : 'bg-white/60'
                            }`}>
                              <div className={`text-2xl font-bold mb-1 ${
                                isDarkMode ? 'text-white' : 'text-slate-900'
                              }`}>
                                {totalSchools}
                              </div>
                              <div className={`text-xs font-medium uppercase tracking-wider ${
                                isDarkMode ? 'text-slate-400' : 'text-slate-500'
                              }`}>
                                Schools
                              </div>
                            </div>
                            <div className={`p-3 rounded-xl ${
                              isDarkMode ? 'bg-white/10' : 'bg-white/60'
                            }`}>
                              <div className={`text-2xl font-bold mb-1 ${
                                isDarkMode ? 'text-white' : 'text-slate-900'
                              }`}>
                                {totalTeachers.toLocaleString()}
                              </div>
                              <div className={`text-xs font-medium uppercase tracking-wider ${
                                isDarkMode ? 'text-slate-400' : 'text-slate-500'
                              }`}>
                                Teachers
                              </div>
                            </div>
                          </div>
                          
                          <div className={`p-3 rounded-xl ${
                            isDarkMode ? 'bg-white/10' : 'bg-white/60'
                          }`}>
                            <div className={`text-2xl font-bold mb-1 ${
                              isDarkMode ? 'text-white' : 'text-slate-900'
                            }`}>
                              {totalStudents.toLocaleString()}
                            </div>
                            <div className={`text-xs font-medium uppercase tracking-wider ${
                              isDarkMode ? 'text-slate-400' : 'text-slate-500'
                            }`}>
                              Students
                            </div>
                          </div>
                        </div>
                        
                        <div className={`mt-6 pt-4 border-t ${
                          isDarkMode ? 'border-slate-700' : 'border-slate-200'
                        }`}>
                          <div className={`flex items-center justify-between text-sm ${
                            isDarkMode ? 'text-slate-400' : 'text-slate-500'
                          }`}>
                            <span>Click to explore</span>
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className={`relative overflow-hidden rounded-3xl shadow-xl transition-all duration-500 ease-out hover:shadow-2xl ${
          isDarkMode 
            ? 'bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-slate-700' 
            : 'bg-gradient-to-br from-white via-purple-50/50 to-indigo-50/50 border border-purple-100'
        }`}>
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
          </div>
          
          <div className="relative p-8 lg:p-10">
            <div className="flex items-center space-x-4 mb-8">
              <div className="relative">
                <div className={`w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500 hover:scale-110`}>
                  <BarChart3 size={24} className="text-white" />
                </div>
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 opacity-20 blur-sm"></div>
              </div>
              <div>
                <h3 className={`text-2xl lg:text-3xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  Verification Progress
                </h3>
                <p className={`text-base ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Real-time statistics and completion metrics
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className={`group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700 hover:border-slate-600' 
                  : 'bg-gradient-to-br from-white/90 to-blue-50/50 border border-white/60 hover:border-blue-200'
              }`}>
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Building size={20} className="text-white" />
                      </div>
                      <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 opacity-20 blur-sm"></div>
                    </div>
                    <div className={`text-3xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}>
                      {districts.reduce((total, d) => total + (d.schools?.length || 0), 0)}
                    </div>
                  </div>
                  <div className={`text-sm font-medium uppercase tracking-wider ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    Total Schools
                  </div>
                </div>
              </div>
              
              <div className={`group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700 hover:border-slate-600' 
                  : 'bg-gradient-to-br from-white/90 to-violet-50/50 border border-white/60 hover:border-violet-200'
              }`}>
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <User size={20} className="text-white" />
                      </div>
                      <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 opacity-20 blur-sm"></div>
                    </div>
                    <div className={`text-3xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}>
                      {districts.reduce((total, d) => total + (d.totalTeachers || 0), 0).toLocaleString()}
                    </div>
                  </div>
                  <div className={`text-sm font-medium uppercase tracking-wider ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    Total Teachers
                  </div>
                </div>
              </div>
              
              <div className={`group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700 hover:border-slate-600' 
                  : 'bg-gradient-to-br from-white/90 to-emerald-50/50 border border-white/60 hover:border-emerald-200'
              }`}>
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                        <CheckCircle size={20} className="text-white" />
                      </div>
                      <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 opacity-20 blur-sm"></div>
                    </div>
                    <div className={`text-3xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}>
                      {verificationStats?.verifiedPercentage || 0}%
                    </div>
                  </div>
                  <div className={`text-sm font-medium uppercase tracking-wider ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    Verified Courses
                  </div>
                </div>
              </div>
              
              <div className={`group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700 hover:border-slate-600' 
                  : 'bg-gradient-to-br from-white/90 to-amber-50/50 border border-white/60 hover:border-amber-200'
              }`}>
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Clock size={20} className="text-white" />
                      </div>
                      <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 opacity-20 blur-sm"></div>
                    </div>
                    <div className={`text-3xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}>
                      {verificationStats?.pendingPercentage || 0}%
                    </div>
                  </div>
                  <div className={`text-sm font-medium uppercase tracking-wider ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    Pending
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`p-6 lg:p-8 rounded-3xl backdrop-blur-xl shadow-xl transition-all duration-500 ease-out hover:shadow-2xl hover:backdrop-blur-2xl ${
          isDarkMode ? 'bg-white/5 border border-white/10 hover:bg-white/8' : 'bg-white/70 border border-white/20 hover:bg-white/80'
        }`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-4 mb-4 lg:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 hover:rotate-12">
                <Download size={20} className="text-white" />
              </div>
              <div>
                <h3 className={`text-xl font-bold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  Export Roster Data
                </h3>
                <p className={`text-sm lg:text-base ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Export verification data in CSV format for analysis
                </p>
              </div>
            </div>
            <button
              onClick={handleExportData}
              disabled={loading}
              className={`flex items-center space-x-3 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg ${
                loading 
                  ? 'opacity-50 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white'
              }`}
            >
              {loading ? <Loader size={18} className="animate-spin" /> : <Download size={18} />}
              <span className="font-semibold">{loading ? 'Exporting...' : 'Export to Excel'}</span>
            </button>
          </div>
        </div>

        <div className={`p-6 lg:p-8 rounded-3xl backdrop-blur-xl shadow-xl transition-all duration-500 ease-out hover:shadow-2xl hover:backdrop-blur-2xl ${
          isDarkMode ? 'bg-white/5 border border-white/10 hover:bg-white/8' : 'bg-white/70 border border-white/20 hover:bg-white/80'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 hover:rotate-12">
                <Search size={20} className="text-white" />
              </div>
              <h3 className={`text-xl lg:text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Search & Filter
              </h3>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-white/10 text-white hover:bg-white/20' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Filter size={16} />
              <span className="font-medium">Filters</span>
              {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search size={20} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`} />
                <input
                  type="text"
                  placeholder="Search districts, schools, or teachers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-white/10 border-white/20 text-white placeholder-slate-400 focus:border-white/40 focus:bg-white/15' 
                      : 'bg-white/50 border-white/20 text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:bg-white/80'
                  }`}
                />
              </div>
            </div>
            
            {showFilters && (
              <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className={`px-4 py-3 rounded-xl border transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-white/10 border-white/20 text-white focus:border-white/40' 
                      : 'bg-white/50 border-white/20 text-slate-900 focus:border-blue-500'
                  }`}
                >
                  <option value="All Districts">All Districts</option>
                  {districts.map((district) => (
                    <option key={district.id} value={district.name}>
                      {district.name}
                    </option>
                  ))}
                </select>
                
                <select
                  className={`px-4 py-3 rounded-xl border transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-white/10 border-white/20 text-white focus:border-white/40' 
                      : 'bg-white/50 border-white/20 text-slate-900 focus:border-blue-500'
                  }`}
                >
                  <option value="all">All Status</option>
                  <option value="verified">Verified</option>
                  <option value="pending">Pending</option>
                  <option value="not-verified">Not Verified</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className={`p-4 rounded-2xl bg-red-50 border border-red-200 ${
            isDarkMode ? 'bg-red-900/20 border-red-500/20' : ''
          }`}>
            <div className="flex items-center space-x-3">
              <AlertTriangle size={20} className="text-red-500" />
              <span className="text-sm font-medium text-red-700 dark:text-red-400">{error}</span>
              <button
                onClick={() => setError('')}
                className="ml-auto p-1 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-100 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderTeacherView = () => {
    if (!selectedTeacher) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2 text-sm">
          <button
            onClick={() => {
              setCurrentView('dashboard');
              setSelectedSchool(null);
              setSelectedTeacher(null);
            }}
            className={`hover:underline transition-colors ${
              isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Dashboard
          </button>
          <ChevronRight size={16} className="text-slate-400" />
          <button
            onClick={() => {
              setCurrentView('school');
              setSelectedTeacher(null);
            }}
            className={`hover:underline transition-colors ${
              isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {selectedTeacher.schoolName}
          </button>
          <ChevronRight size={16} className="text-slate-400" />
          <span className={`font-medium ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            {selectedTeacher.firstName} {selectedTeacher.lastName}
          </span>
        </div>

        <div className={`p-6 lg:p-8 rounded-3xl backdrop-blur-xl shadow-xl transition-all duration-500 ease-out hover:shadow-2xl hover:backdrop-blur-2xl ${
          isDarkMode ? 'bg-white/5 border border-white/10 hover:bg-white/8' : 'bg-white/70 border border-white/20 hover:bg-white/80'
        }`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-4 mb-4 lg:mb-0">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 hover:rotate-12">
                <User size={24} className="text-white" />
              </div>
              <div>
                <h2 className={`text-2xl lg:text-3xl font-bold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  {selectedTeacher.firstName} {selectedTeacher.lastName}
                </h2>
                <p className={`text-sm lg:text-base ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Staff ID: {selectedTeacher.staffId} • {selectedTeacher.position}
                </p>
              </div>
            </div>
            <div className="text-center lg:text-right">
              <div className={`text-3xl lg:text-4xl font-bold ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                {teacherCourses.filter(c => c.verified).length}/{teacherCourses.length}
              </div>
              <div className={`text-sm lg:text-base ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Courses Verified
              </div>
            </div>
          </div>
        </div>

        <div className={`p-6 lg:p-8 rounded-3xl backdrop-blur-xl shadow-xl transition-all duration-500 ease-out hover:shadow-2xl hover:backdrop-blur-2xl ${
          isDarkMode ? 'bg-white/5 border border-white/10 hover:bg-white/8' : 'bg-white/70 border border-white/20 hover:bg-white/80'
        }`}>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 hover:rotate-12">
              <BookOpen size={20} className="text-white" />
            </div>
            <h3 className={`text-xl lg:text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Courses
            </h3>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Loader size={32} className="animate-spin text-blue-600 mx-auto mb-4" />
                <p className="text-slate-600">Loading courses...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {teacherCourses.map((course) => (
                <div 
                  key={course.id}
                  onClick={async () => {
                    setLoading(true);
                    try {
                      const courseData = await databaseService.getCourseById(course.id);
                      setSelectedCourse(courseData);
                      setCurrentView('course');
                    } catch (err) {
                      setError('Failed to load course data.');
                    } finally {
                      setLoading(false);
                    }
                  }}
                  className={`p-6 rounded-2xl backdrop-blur-sm transition-all duration-500 ease-out cursor-pointer group ${
                    isDarkMode 
                      ? 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl' 
                      : 'bg-white/50 border border-white/20 hover:bg-white/80 hover:border-white/30 hover:shadow-2xl'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg transition-all duration-500 group-hover:rotate-12">
                        <BookOpen size={20} className="text-white" />
                      </div>
                      <div>
                        <h4 className={`font-semibold text-lg ${
                          isDarkMode ? 'text-white' : 'text-slate-900'
                        }`}>
                          {course.courseName}
                        </h4>
                        <p className={`text-sm ${
                          isDarkMode ? 'text-slate-400' : 'text-slate-500'
                        }`}>
                          Code: {course.courseCode} • Section: {course.sectionNumber}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className={`text-lg font-semibold ${
                          isDarkMode ? 'text-white' : 'text-slate-900'
                        }`}>
                          {course.students?.filter(s => !s.removed).length || 0} students
                        </div>
                        <div className={`text-sm ${
                          isDarkMode ? 'text-slate-400' : 'text-slate-500'
                        }`}>
                          enrolled
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-lg text-sm font-medium ${
                        course.verified 
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400'
                      }`}>
                        {course.verified ? 'Verified' : 'Not Verified'}
                      </div>
                      <ChevronRight size={20} className="text-slate-400 transition-all duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderCourseView = () => {
    if (!selectedCourse) return null;

    const activeStudents = selectedCourse.students?.filter(s => !s.removed) || [];
    const removedStudents = selectedCourse.students?.filter(s => s.removed) || [];

    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2 text-sm">
          <button
            onClick={() => {
              setCurrentView('dashboard');
              setSelectedSchool(null);
              setSelectedTeacher(null);
              setSelectedCourse(null);
            }}
            className={`hover:underline transition-colors ${
              isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Dashboard
          </button>
          <ChevronRight size={16} className="text-slate-400" />
          <button
            onClick={() => {
              setCurrentView('school');
              setSelectedTeacher(null);
              setSelectedCourse(null);
            }}
            className={`hover:underline transition-colors ${
              isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {selectedCourse.schoolName}
          </button>
          <ChevronRight size={16} className="text-slate-400" />
          <button
            onClick={() => {
              setCurrentView('teacher');
              setSelectedCourse(null);
            }}
            className={`hover:underline transition-colors ${
              isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {selectedCourse.teacherName}
          </button>
          <ChevronRight size={16} className="text-slate-400" />
          <span className={`font-medium ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            {selectedCourse.courseName}
          </span>
        </div>

        <div className={`p-6 lg:p-8 rounded-3xl backdrop-blur-xl shadow-xl transition-all duration-500 ease-out hover:shadow-2xl hover:backdrop-blur-2xl ${
          isDarkMode ? 'bg-white/5 border border-white/10 hover:bg-white/8' : 'bg-white/70 border border-white/20 hover:bg-white/80'
        }`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-4 mb-4 lg:mb-0">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 hover:rotate-12">
                <BookOpen size={24} className="text-white" />
              </div>
              <div>
                <h2 className={`text-2xl lg:text-3xl font-bold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  {selectedCourse.courseName}
                </h2>
                <p className={`text-sm lg:text-base ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Code: {selectedCourse.courseCode} • Section: {selectedCourse.sectionNumber}
                </p>
                <p className={`text-sm ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  {selectedCourse.beginDate} - {selectedCourse.endDate}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className={`text-3xl lg:text-4xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  {activeStudents.length}
                </div>
                <div className={`text-sm lg:text-base ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Active Students
                </div>
              </div>
              <div className={`px-4 py-2 rounded-xl text-sm font-medium ${
                selectedCourse.verified 
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
                  : 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400'
              }`}>
                {selectedCourse.verified ? 'Verified' : 'Not Verified'}
              </div>
            </div>
          </div>
        </div>

        <div className={`p-6 lg:p-8 rounded-3xl backdrop-blur-xl shadow-xl transition-all duration-500 ease-out hover:shadow-2xl hover:backdrop-blur-2xl ${
          isDarkMode ? 'bg-white/5 border border-white/10 hover:bg-white/8' : 'bg-white/70 border border-white/20 hover:bg-white/80'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 hover:rotate-12">
                <UsersIcon size={20} className="text-white" />
              </div>
              <h3 className={`text-xl lg:text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Student Roster
              </h3>
            </div>
            <div className="flex items-center space-x-3">
              {currentPeriod === 'verification' && (
                <>
                  <button
                    onClick={() => handleRemoveAllStudents(selectedCourse.id)}
                    disabled={loading || activeStudents.length === 0}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                      loading || activeStudents.length === 0
                        ? 'opacity-50 cursor-not-allowed bg-slate-100 text-slate-400'
                        : 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400'
                    }`}
                  >
                    <Trash2 size={16} />
                    <span className="font-medium">Remove All</span>
                  </button>
                  {!selectedCourse.verified ? (
                    <button
                      onClick={() => handleVerifyCourse(selectedCourse.id)}
                      disabled={loading}
                      className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 hover:scale-105 ${
                        loading
                          ? 'opacity-50 cursor-not-allowed bg-slate-100 text-slate-400'
                          : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400'
                      }`}
                    >
                      <CheckSquare size={16} />
                      <span className="font-medium">Mark Verified</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUnlockCourse(selectedCourse.id)}
                      disabled={loading}
                      className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 hover:scale-105 ${
                        loading
                          ? 'opacity-50 cursor-not-allowed bg-slate-100 text-slate-400'
                          : 'bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/20 dark:text-amber-400'
                      }`}
                    >
                      <Unlock size={16} />
                      <span className="font-medium">Unlock</span>
                    </button>
                  )}
                </>
              )}
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Loader size={32} className="animate-spin text-blue-600 mx-auto mb-4" />
                <p className="text-slate-600">Loading students...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {activeStudents.length > 0 && (
                <div className="space-y-2">
                  <h4 className={`text-lg font-semibold ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    Active Students ({activeStudents.length})
                  </h4>
                  <div className="grid gap-3">
                    {activeStudents.map((student) => (
                      <div 
                        key={student.id}
                        className={`p-4 rounded-xl backdrop-blur-sm transition-all duration-300 ${
                          isDarkMode 
                            ? 'bg-white/5 border border-white/10 hover:bg-white/10' 
                            : 'bg-white/50 border border-white/20 hover:bg-white/80'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center shadow-lg">
                              <User size={16} className="text-white" />
                            </div>
                            <div>
                              <div className={`font-semibold ${
                                isDarkMode ? 'text-white' : 'text-slate-900'
                              }`}>
                                {student.firstName}. {student.lastName}
                              </div>
                              <div className={`text-sm ${
                                isDarkMode ? 'text-slate-400' : 'text-slate-500'
                              }`}>
                                LASID: {student.lasid} • Grade: {student.gradeLevel} • Birth Day: {student.birthDay}
                              </div>
                            </div>
                          </div>
                          {currentPeriod === 'verification' && (
                            <button
                              onClick={() => handleRemoveStudent(student.id)}
                              disabled={loading}
                              className={`p-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                                loading
                                  ? 'opacity-50 cursor-not-allowed'
                                  : 'text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20'
                              }`}
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {removedStudents.length > 0 && (
                <div className="space-y-2">
                  <h4 className={`text-lg font-semibold ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    Removed Students ({removedStudents.length})
                  </h4>
                  <div className="grid gap-3">
                    {removedStudents.map((student) => (
                      <div 
                        key={student.id}
                        className={`p-4 rounded-xl backdrop-blur-sm transition-all duration-300 ${
                          isDarkMode 
                            ? 'bg-white/5 border border-white/10' 
                            : 'bg-white/50 border border-white/20'
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center shadow-lg">
                            <User size={16} className="text-white" />
                          </div>
                          <div className="line-through">
                            <div className={`font-semibold ${
                              isDarkMode ? 'text-slate-400' : 'text-slate-500'
                            }`}>
                              {student.firstName}. {student.lastName}
                            </div>
                            <div className={`text-sm ${
                              isDarkMode ? 'text-slate-500' : 'text-slate-400'
                            }`}>
                              LASID: {student.lasid} • Grade: {student.gradeLevel} • Removed: {student.removedDate}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeStudents.length === 0 && removedStudents.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-400 to-slate-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <UsersIcon size={24} className="text-white" />
                  </div>
                  <p className={`text-lg font-medium ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    No students enrolled in this course
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderSchoolView = () => {
    if (!selectedSchool) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2 text-sm">
          <button
            onClick={() => {
              setCurrentView('dashboard');
              setSelectedSchool(null);
            }}
            className={`hover:underline transition-colors ${
              isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Dashboard
          </button>
          <ChevronRight size={16} className="text-slate-400" />
          <span className={`font-medium ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            {selectedSchool.name}
          </span>
        </div>

        <div className={`p-6 lg:p-8 rounded-3xl backdrop-blur-xl shadow-xl transition-all duration-500 ease-out hover:shadow-2xl hover:backdrop-blur-2xl ${
          isDarkMode ? 'bg-white/5 border border-white/10 hover:bg-white/8' : 'bg-white/70 border border-white/20 hover:bg-white/80'
        }`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-4 mb-4 lg:mb-0">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 hover:rotate-12">
                <School size={24} className="text-white" />
              </div>
              <div>
                <h2 className={`text-2xl lg:text-3xl font-bold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  {selectedSchool.name}
                </h2>
                <p className={`text-sm lg:text-base ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {selectedSchool.verifiedTeachers} of {selectedSchool.totalTeachers} teachers verified
                </p>
              </div>
            </div>
            <div className="text-center lg:text-right">
              <div className={`text-3xl lg:text-4xl font-bold ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                {Math.round((selectedSchool.verifiedCourses / selectedSchool.totalCourses) * 100)}%
              </div>
              <div className={`text-sm lg:text-base ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Complete
              </div>
            </div>
          </div>
        </div>

        <div className={`p-6 lg:p-8 rounded-3xl backdrop-blur-xl shadow-xl transition-all duration-500 ease-out hover:shadow-2xl hover:backdrop-blur-2xl ${
          isDarkMode ? 'bg-white/5 border border-white/10 hover:bg-white/8' : 'bg-white/70 border border-white/20 hover:bg-white/80'
        }`}>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 hover:rotate-12">
              <UsersIcon size={20} className="text-white" />
            </div>
            <h3 className={`text-xl lg:text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Teachers
            </h3>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Loader size={32} className="animate-spin text-blue-600 mx-auto mb-4" />
                <p className="text-slate-600">Loading teachers...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {schoolTeachers.map((teacher) => (
                <div 
                  key={teacher.id}
                  onClick={async () => {
                    setLoading(true);
                    try {
                      const teacherData = await databaseService.getTeacherById(teacher.id);
                      setSelectedTeacher(teacherData);
                      const courses = await databaseService.getCoursesByTeacher(teacher.id);
                      setTeacherCourses(courses);
                      setCurrentView('teacher');
                    } catch (err) {
                      setError('Failed to load teacher data.');
                    } finally {
                      setLoading(false);
                    }
                  }}
                  className={`p-6 rounded-2xl backdrop-blur-sm transition-all duration-500 ease-out cursor-pointer group ${
                    isDarkMode 
                      ? 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl' 
                      : 'bg-white/50 border border-white/20 hover:bg-white/80 hover:border-white/30 hover:shadow-2xl'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transition-all duration-500 group-hover:rotate-12">
                        <User size={20} className="text-white" />
                      </div>
                      <div>
                        <h4 className={`font-semibold text-lg ${
                          isDarkMode ? 'text-white' : 'text-slate-900'
                        }`}>
                          {teacher.firstName} {teacher.lastName}
                        </h4>
                        <p className={`text-sm ${
                          isDarkMode ? 'text-slate-400' : 'text-slate-500'
                        }`}>
                          Staff ID: {teacher.staffId}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className={`text-lg font-semibold ${
                          isDarkMode ? 'text-white' : 'text-slate-900'
                        }`}>
                          {teacher.courses?.filter(c => c.verified).length || 0}/{teacher.courses?.length || 0} courses
                        </div>
                        <div className={`text-sm ${
                          isDarkMode ? 'text-slate-400' : 'text-slate-500'
                        }`}>
                          verified
                        </div>
                      </div>
                      <ChevronRight size={20} className="text-slate-400 transition-all duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className={`relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-500 ease-out hover:shadow-3xl ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 border border-slate-700' 
          : 'bg-gradient-to-br from-white via-blue-50 to-indigo-50 border border-blue-100'
      }`}>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
        </div>
        
        <div className="relative p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-6 mb-6 lg:mb-0">
              <div className="relative">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 hover:scale-110 ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600' 
                    : 'bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600'
                }`}>
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <GraduationCap size={28} className="text-white" />
                  </div>
                </div>
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 opacity-20 blur-sm"></div>
              </div>
              
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className={`text-3xl lg:text-4xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    Roster Verification
                  </h1>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                    isDarkMode 
                      ? 'bg-blue-900/30 text-blue-300 border border-blue-700/30' 
                      : 'bg-blue-100 text-blue-700 border border-blue-200'
                  }`}>
                    LEP System
                  </div>
                </div>
                <p className={`text-lg lg:text-xl ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Louisiana Educator Portal • Course Verification & Roster Management
                </p>
                <div className="flex items-center space-x-4 mt-3">
                  <div className={`flex items-center space-x-2 text-sm ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>Secure • Verified • Compliant</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className={`hidden lg:flex items-center space-x-3 px-4 py-2 rounded-xl ${
                isDarkMode 
                  ? 'bg-white/10 border border-white/20' 
                  : 'bg-white/80 border border-white/60'
              }`}>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <div className="text-sm">
                  <div className={`font-semibold ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    {user?.firstName} {user?.lastName}
                  </div>
                  <div className={`${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    {user?.role}
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleExportData}
                disabled={loading}
                className={`flex items-center space-x-3 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg ${
                  loading 
                    ? 'opacity-50 cursor-not-allowed bg-slate-100 text-slate-400'
                    : isDarkMode
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
                }`}
              >
                {loading ? <Loader size={18} className="animate-spin" /> : <Download size={18} />}
                <span className="font-semibold">{loading ? 'Exporting...' : 'Export Data'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {currentView === 'dashboard' && renderDashboard()}
      {currentView === 'school' && selectedSchool && renderSchoolView()}
      {currentView === 'teacher' && selectedTeacher && renderTeacherView()}
      {currentView === 'course' && selectedCourse && renderCourseView()}
    </div>
  );
};

export default RosterVerification; 