import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Save, 
  CheckCircle, 
  AlertTriangle,
  User,
  Target,
  Calendar,
  MapPin,
  Building,
  Sparkles,
  Zap,
  Eye,
  Star
} from 'lucide-react';

const EvaluationWorkflow = ({ user, isDarkMode = false }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    educator: {
      name: 'Maria Rodriguez',
      id: 'EDU-2024-001',
      position: 'Mathematics Teacher',
      school: 'Baton Rouge High School',
      district: 'East Baton Rouge Parish',
      yearsOfService: 8,
      lastEvaluation: '2024-03-15'
    },
    evaluation: {
      type: 'Annual',
      startDate: '2025-01-15',
      dueDate: '2025-02-15',
      status: 'In Progress',
      goals: '',
      observations: '',
      ratings: {},
      comments: '',
      recommendations: ''
    }
  });

  const steps = [
    {
      id: 1,
      title: 'Goal Setting',
      description: 'Establish evaluation goals and objectives',
      icon: Target,
      status: 'completed'
    },
    {
      id: 2,
      title: 'Observation',
      description: 'Conduct classroom observations',
      icon: Eye,
      status: 'current'
    },
    {
      id: 3,
      title: 'Rating & Feedback',
      description: 'Provide ratings and detailed feedback',
      icon: Star,
      status: 'upcoming'
    },
    {
      id: 4,
      title: 'Review & Submit',
      description: 'Final review and submission',
      icon: CheckCircle,
      status: 'upcoming'
    }
  ];

  const ratingCriteria = [
    {
      id: 'planning',
      title: 'Planning and Preparation',
      description: 'Demonstrates knowledge of content and pedagogy',
      rating: 0
    },
    {
      id: 'environment',
      title: 'Classroom Environment',
      description: 'Creates an environment of respect and rapport',
      rating: 0
    },
    {
      id: 'instruction',
      title: 'Instruction',
      description: 'Engages students in learning',
      rating: 0
    },
    {
      id: 'professional',
      title: 'Professional Responsibilities',
      description: 'Reflects on teaching and student learning',
      rating: 0
    }
  ];



  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    console.log('Saving evaluation data:', formData);
  };

  const handleRatingChange = (criteriaId, rating) => {
    setFormData(prev => ({
      ...prev,
      evaluation: {
        ...prev.evaluation,
        ratings: {
          ...prev.evaluation.ratings,
          [criteriaId]: rating
        }
      }
    }));
  };

  const getStepStatus = (step) => {
    if (step.id < currentStep) return 'completed';
    if (step.id === currentStep) return 'current';
    return 'upcoming';
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <GoalSettingStep formData={formData} setFormData={setFormData} isDarkMode={isDarkMode} />;
      case 2:
        return <ObservationStep formData={formData} setFormData={setFormData} isDarkMode={isDarkMode} />;
      case 3:
        return <RatingStep formData={formData} setFormData={setFormData} isDarkMode={isDarkMode} ratingCriteria={ratingCriteria} onRatingChange={handleRatingChange} />;
      case 4:
        return <ReviewStep formData={formData} isDarkMode={isDarkMode} ratingCriteria={ratingCriteria} />;
      default:
        return null;
    }
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
                Educator Evaluation
              </h1>
              <p className={`text-base lg:text-lg ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Conducting evaluation for {formData.educator.name}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className={`px-4 py-2 rounded-xl text-sm font-semibold ${
              formData.evaluation.status === 'In Progress' 
                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300'
                : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300'
            }`}>
              {formData.evaluation.status}
            </div>
            <button
              onClick={handleSave}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg ${
                isDarkMode 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              <Save size={16} />
              <span className="font-semibold">Save Draft</span>
            </button>
          </div>
        </div>
      </div>

      <div className={`p-6 lg:p-8 rounded-3xl backdrop-blur-xl shadow-xl transition-all duration-500 ease-out hover:shadow-2xl hover:backdrop-blur-2xl ${
        isDarkMode ? 'bg-white/5 border border-white/10 hover:bg-white/8' : 'bg-white/70 border border-white/20 hover:bg-white/80'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 hover:rotate-12">
              <Zap size={20} className="text-white" />
            </div>
            <h2 className={`text-xl lg:text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Evaluation Progress
            </h2>
          </div>
          <div className={`text-sm font-medium ${
            isDarkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Step {currentStep} of {steps.length}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step) => {
            const status = getStepStatus(step);
            const StepIcon = step.icon;
            
            return (
              <div
                key={step.id}
                className={`relative p-4 lg:p-6 rounded-2xl border-2 transition-all duration-500 ease-out backdrop-blur-sm group ${
                  status === 'completed'
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/20 hover:shadow-2xl'
                    : status === 'current'
                    ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 hover:shadow-2xl'
                    : isDarkMode
                      ? 'border-white/10 bg-white/5 hover:bg-white/8 hover:border-white/20'
                      : 'border-white/20 bg-white/30 hover:bg-white/50 hover:border-white/30'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center shadow-lg transition-all duration-500 group-hover:rotate-12 ${
                    status === 'completed'
                      ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white'
                      : status === 'current'
                      ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white'
                      : isDarkMode
                        ? 'bg-white/10 text-white/60'
                        : 'bg-slate-100 text-slate-600'
                  }`}>
                    {status === 'completed' ? (
                      <CheckCircle size={18} className="lg:w-5 lg:h-5" />
                    ) : (
                      <StepIcon size={18} className="lg:w-5 lg:h-5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-sm lg:text-base ${
                      status === 'completed' || status === 'current'
                        ? isDarkMode ? 'text-white' : 'text-slate-900'
                        : isDarkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      {step.title}
                    </h3>
                    <p className={`text-xs lg:text-sm mt-1 ${
                      status === 'completed' || status === 'current'
                        ? isDarkMode ? 'text-slate-300' : 'text-slate-600'
                        : isDarkMode ? 'text-slate-500' : 'text-slate-400'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                </div>
                
                {status === 'current' && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className={`p-6 lg:p-8 rounded-3xl backdrop-blur-xl shadow-xl transition-all duration-500 ease-out hover:shadow-2xl hover:backdrop-blur-2xl ${
        isDarkMode ? 'bg-white/5 border border-white/10 hover:bg-white/8' : 'bg-white/70 border border-white/20 hover:bg-white/80'
      }`}>
        {renderStepContent()}
      </div>

      <div className={`p-6 rounded-2xl backdrop-blur-xl shadow-xl transition-all duration-500 ease-out hover:shadow-2xl hover:backdrop-blur-2xl ${
        isDarkMode ? 'bg-white/5 border border-white/10 hover:bg-white/8' : 'bg-white/70 border border-white/20 hover:bg-white/80'
      }`}>
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`flex items-center space-x-2 px-4 lg:px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 ${
              currentStep === 1
                ? 'opacity-50 cursor-not-allowed'
                : isDarkMode
                  ? 'text-slate-300 hover:text-white hover:bg-white/10'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <ChevronLeft size={20} />
            <span className="font-semibold">Previous</span>
          </button>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleSave}
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'text-slate-300 hover:text-white hover:bg-white/10' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Save size={16} />
              <span className="font-semibold">Save Draft</span>
            </button>

            {currentStep < steps.length ? (
              <button
                onClick={handleNext}
                className={`flex items-center space-x-2 px-4 lg:px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg ${
                  isDarkMode 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                <span className="font-semibold">Next</span>
                <ChevronRight size={20} />
              </button>
            ) : (
              <button
                onClick={() => console.log('Submit evaluation')}
                className={`flex items-center space-x-2 px-4 lg:px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg ${
                  isDarkMode 
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                <CheckCircle size={20} />
                <span className="font-semibold">Submit Evaluation</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const GoalSettingStep = ({ formData, setFormData, isDarkMode }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className={`text-xl lg:text-2xl font-bold mb-4 ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}>
          Goal Setting
        </h3>
        <p className={`text-sm lg:text-base ${
          isDarkMode ? 'text-slate-300' : 'text-slate-600'
        }`}>
          Establish clear, measurable goals for this evaluation cycle.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`p-6 rounded-2xl backdrop-blur-sm transition-all duration-500 ease-out hover:shadow-2xl hover:backdrop-blur-2xl ${
          isDarkMode ? 'bg-white/5 border border-white/10 hover:bg-white/8' : 'bg-white/50 border border-white/20 hover:bg-white/80'
        }`}>
          <h4 className={`font-semibold text-lg mb-4 ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Educator Information
          </h4>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center transition-all duration-500 hover:rotate-12">
                <User size={16} className="text-white" />
              </div>
              <span className={`text-sm lg:text-base ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {formData.educator.name}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center transition-all duration-500 hover:rotate-12">
                <Building size={16} className="text-white" />
              </div>
              <span className={`text-sm lg:text-base ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {formData.educator.school}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center transition-all duration-500 hover:rotate-12">
                <MapPin size={16} className="text-white" />
              </div>
              <span className={`text-sm lg:text-base ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {formData.educator.district}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center transition-all duration-500 hover:rotate-12">
                <Calendar size={16} className="text-white" />
              </div>
              <span className={`text-sm lg:text-base ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Last evaluation: {formData.educator.lastEvaluation}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className={`block text-sm lg:text-base font-semibold mb-3 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Evaluation Goals
            </label>
            <textarea
              value={formData.evaluation.goals}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                evaluation: { ...prev.evaluation, goals: e.target.value }
              }))}
              rows={8}
              className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-blue-500/20 ${
                isDarkMode 
                  ? 'bg-white/5 border-white/10 text-white placeholder-slate-400 focus:border-blue-500' 
                  : 'bg-white/50 border-white/20 text-slate-900 placeholder-slate-500 focus:border-blue-500'
              } focus:outline-none`}
              placeholder="Enter specific, measurable goals for this evaluation cycle..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ObservationStep = ({ formData, setFormData, isDarkMode }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className={`text-xl lg:text-2xl font-bold mb-4 ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}>
          Classroom Observation
        </h3>
        <p className={`text-sm lg:text-base ${
          isDarkMode ? 'text-slate-300' : 'text-slate-600'
        }`}>
          Document your classroom observations and evidence of teaching practices.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className={`block text-sm lg:text-base font-semibold mb-3 ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Observation Notes
          </label>
          <textarea
            value={formData.evaluation.observations}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              evaluation: { ...prev.evaluation, observations: e.target.value }
            }))}
            rows={10}
            className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-blue-500/20 ${
              isDarkMode 
                ? 'bg-white/5 border-white/10 text-white placeholder-slate-400 focus:border-blue-500' 
                : 'bg-white/50 border-white/20 text-slate-900 placeholder-slate-500 focus:border-blue-500'
            } focus:outline-none`}
            placeholder="Document your classroom observations, including specific examples of teaching practices, student engagement, and areas for growth..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm lg:text-base font-semibold mb-3 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Observation Date
            </label>
            <input
              type="date"
              value={formData.evaluation.startDate}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                evaluation: { ...prev.evaluation, startDate: e.target.value }
              }))}
              className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-blue-500/20 ${
                isDarkMode 
                  ? 'bg-white/5 border-white/10 text-white focus:border-blue-500' 
                  : 'bg-white/50 border-white/20 text-slate-900 focus:border-blue-500'
              } focus:outline-none`}
            />
          </div>
          <div>
            <label className={`block text-sm lg:text-base font-semibold mb-3 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Duration (minutes)
            </label>
            <input
              type="number"
              placeholder="45"
              className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-blue-500/20 ${
                isDarkMode 
                  ? 'bg-white/5 border-white/10 text-white placeholder-slate-400 focus:border-blue-500' 
                  : 'bg-white/50 border-white/20 text-slate-900 placeholder-slate-500 focus:border-blue-500'
              } focus:outline-none`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const RatingStep = ({ formData, setFormData, isDarkMode, ratingCriteria, onRatingChange }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className={`text-xl lg:text-2xl font-bold mb-4 ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}>
          Rating & Feedback
        </h3>
        <p className={`text-sm lg:text-base ${
          isDarkMode ? 'text-slate-300' : 'text-slate-600'
        }`}>
          Provide ratings for each evaluation criterion and detailed feedback.
        </p>
      </div>

      <div className="space-y-6">
        {ratingCriteria.map((criteria) => (
          <div key={criteria.id} className={`p-6 rounded-2xl backdrop-blur-sm transition-all duration-500 ease-out hover:shadow-2xl hover:backdrop-blur-2xl ${
            isDarkMode ? 'bg-white/5 border border-white/10 hover:bg-white/8' : 'bg-white/50 border border-white/20 hover:bg-white/80'
          }`}>
            <div className="mb-6">
              <h4 className={`font-semibold text-lg mb-3 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                {criteria.title}
              </h4>
              <p className={`text-sm lg:text-base ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {criteria.description}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className={`text-sm lg:text-base font-semibold ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Rating:
                </span>
                <div className="flex items-center space-x-3">
                  {[1, 2, 3, 4].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => onRatingChange(criteria.id, rating)}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 font-semibold ${
                        formData.evaluation.ratings[criteria.id] === rating
                          ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg'
                          : isDarkMode
                            ? 'bg-white/10 text-slate-300 hover:bg-white/20'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {rating}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={`block text-sm lg:text-base font-semibold mb-3 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  Comments for {criteria.title}
                </label>
                <textarea
                  rows={4}
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-blue-500/20 ${
                    isDarkMode 
                      ? 'bg-white/5 border-white/10 text-white placeholder-slate-400 focus:border-blue-500' 
                      : 'bg-white/50 border-white/20 text-slate-900 placeholder-slate-500 focus:border-blue-500'
                  } focus:outline-none`}
                  placeholder={`Provide specific feedback for ${criteria.title.toLowerCase()}...`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <label className={`block text-sm lg:text-base font-semibold mb-3 ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}>
          Overall Comments
        </label>
        <textarea
          value={formData.evaluation.comments}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            evaluation: { ...prev.evaluation, comments: e.target.value }
          }))}
          rows={6}
          className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-blue-500/20 ${
            isDarkMode 
              ? 'bg-white/5 border-white/10 text-white placeholder-slate-400 focus:border-blue-500' 
              : 'bg-white/50 border-white/20 text-slate-900 placeholder-slate-500 focus:border-blue-500'
          } focus:outline-none`}
          placeholder="Provide overall comments and recommendations..."
        />
      </div>
    </div>
  );
};

const ReviewStep = ({ formData, isDarkMode, ratingCriteria }) => {
  const totalRating = Object.values(formData.evaluation.ratings).reduce((sum, rating) => sum + rating, 0);
  const averageRating = totalRating / Object.keys(formData.evaluation.ratings).length || 0;

  return (
    <div className="space-y-6">
      <div>
        <h3 className={`text-xl lg:text-2xl font-bold mb-4 ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}>
          Review & Submit
        </h3>
        <p className={`text-sm lg:text-base ${
          isDarkMode ? 'text-slate-300' : 'text-slate-600'
        }`}>
          Review all evaluation information before final submission.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`p-6 rounded-2xl backdrop-blur-sm transition-all duration-500 ease-out hover:shadow-2xl hover:backdrop-blur-2xl ${
          isDarkMode ? 'bg-white/5 border border-white/10 hover:bg-white/8' : 'bg-white/50 border border-white/20 hover:bg-white/80'
        }`}>
          <h4 className={`font-semibold text-lg mb-4 ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Evaluation Summary
          </h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className={`text-sm lg:text-base ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Average Rating:
              </span>
              <span className={`font-bold text-lg ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                {averageRating.toFixed(1)} / 4.0
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-sm lg:text-base ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Evaluation Type:
              </span>
              <span className={`font-semibold ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                {formData.evaluation.type}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-sm lg:text-base ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Due Date:
              </span>
              <span className={`font-semibold ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                {formData.evaluation.dueDate}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className={`font-semibold text-lg ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Individual Ratings
          </h4>
          {ratingCriteria.map((criteria) => (
            <div key={criteria.id} className="flex justify-between items-center p-3 rounded-xl bg-white/30 transition-all duration-300 hover:scale-105">
              <span className={`text-sm lg:text-base ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {criteria.title}:
              </span>
              <span className={`font-semibold ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                {formData.evaluation.ratings[criteria.id] || 0} / 4
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={`p-6 rounded-2xl backdrop-blur-sm transition-all duration-500 ease-out hover:shadow-2xl hover:backdrop-blur-2xl ${
        isDarkMode ? 'bg-blue-900/20 border border-blue-500/20 hover:bg-blue-900/30' : 'bg-blue-50 border border-blue-200 hover:bg-blue-100'
      }`}>
        <div className="flex items-start space-x-4">
          <AlertTriangle size={24} className="text-blue-600 mt-1" />
          <div>
            <h4 className={`font-semibold text-lg mb-2 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Ready to Submit
            </h4>
            <p className={`text-sm lg:text-base ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Please review all information carefully. Once submitted, this evaluation will be finalized and sent to the educator.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationWorkflow; 