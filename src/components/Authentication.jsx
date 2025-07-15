import React, { useState } from 'react';
import { 
  Shield, 
  Eye, 
  EyeOff, 
  Lock, 
  User, 
  Phone,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import databaseService from '../services/databaseService';

const Authentication = ({ onLogin }) => {
  const [step, setStep] = useState('login'); // login, mfa, success
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    mfaCode: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const user = await databaseService.authenticateUser(formData.username, formData.password);
      setCurrentUser(user);
      setStep('mfa');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMFA = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const user = await databaseService.verifyMFACode(currentUser.id, formData.mfaCode);
      setStep('success');
      
      // Simulate successful login
      setTimeout(() => {
        onLogin({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          email: user.email,
          district: user.district,
          schools: user.schools,
          permissions: user.permissions
        });
      }, 1000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const resendMFA = () => {
    setError('');
    // Mock resend MFA
    console.log('Resending MFA code...');
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
        <div className="max-w-md w-full mx-auto p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Login Successful
            </h2>
            <p className="text-slate-600 mb-6">
              Redirecting to Louisiana Educator Portal...
            </p>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-30 animate-pulse bg-blue-400/20" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-30 animate-pulse bg-purple-400/20" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-20 animate-pulse bg-indigo-400/20" />
      </div>

      <div className="max-w-md w-full mx-auto p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 animate-pulse">
              <Shield size={32} className="text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center animate-bounce">
              <Sparkles size={12} className="text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Louisiana Educator Portal
          </h1>
          <p className="text-slate-600">
            {step === 'login' ? 'Sign in to access your account' : 'Multi-Factor Authentication'}
          </p>
        </div>

        {/* Login Form */}
        {step === 'login' && (
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Username or Email
                </label>
                <div className="relative">
                  <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                    placeholder="Enter your username or email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full pl-10 pr-12 py-3 text-sm rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center space-x-2 p-3 rounded-lg bg-red-50 border border-red-200">
                  <AlertTriangle size={16} className="text-red-500" />
                  <span className="text-sm text-red-700">{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="text-center">
                <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Forgot your password?
                </a>
              </div>
            </div>
          </div>
        )}

        {/* MFA Form */}
        {step === 'mfa' && (
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone size={24} className="text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">
                Two-Factor Authentication
              </h2>
              <p className="text-slate-600 text-sm">
                Enter the 6-digit code sent to your device
              </p>
            </div>

            <form onSubmit={handleMFA} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Verification Code
                </label>
                <input
                  type="text"
                  value={formData.mfaCode}
                  onChange={(e) => handleInputChange('mfaCode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full px-4 py-3 text-center text-lg font-mono tracking-widest rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                  placeholder="000000"
                  maxLength={6}
                  required
                />
              </div>

              {error && (
                <div className="flex items-center space-x-2 p-3 rounded-lg bg-red-50 border border-red-200">
                  <AlertTriangle size={16} className="text-red-500" />
                  <span className="text-sm text-red-700">{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <span>Verify Code</span>
                    <CheckCircle size={16} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="text-center space-y-3">
                <button
                  onClick={resendMFA}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Didn't receive the code? Resend
                </button>
                <div>
                  <button
                    onClick={() => setStep('login')}
                    className="text-sm text-slate-500 hover:text-slate-700"
                  >
                    ← Back to login
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500">
            © 2025 Louisiana Department of Education. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Authentication; 