import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Calendar,
  Download,
  Eye,
  FileText
} from 'lucide-react';

const Certifications = ({ user, isDarkMode = false }) => {
  const [selectedCert, setSelectedCert] = useState(null);

  // Mock certification data
  const certifications = [
    {
      id: 1,
      name: 'Louisiana Teacher Certification',
      type: 'Standard Teaching',
      status: 'Active',
      issueDate: '2020-08-15',
      expiryDate: '2025-08-15',
      gradeLevel: 'K-12',
      subject: 'General Education',
      certificateNumber: 'LA-TC-2020-001234',
      requirements: [
        'Bachelor\'s Degree in Education',
        'Passed Praxis Core and Subject Tests',
        'Completed Student Teaching',
        'Background Check Clearance'
      ],
      documents: [
        { name: 'Certificate.pdf', type: 'pdf', size: '2.3 MB' },
        { name: 'Transcript.pdf', type: 'pdf', size: '1.8 MB' },
        { name: 'Background_Check.pdf', type: 'pdf', size: '0.9 MB' }
      ]
    },
    {
      id: 2,
      name: 'Special Education Certification',
      type: 'Specialized',
      status: 'Active',
      issueDate: '2021-03-20',
      expiryDate: '2026-03-20',
      gradeLevel: 'K-12',
      subject: 'Special Education',
      certificateNumber: 'LA-SPED-2021-005678',
      requirements: [
        'Valid Teaching Certificate',
        'Special Education Coursework',
        'Passed Special Education Praxis',
        'Field Experience in Special Education'
      ],
      documents: [
        { name: 'Special_Ed_Certificate.pdf', type: 'pdf', size: '2.1 MB' },
        { name: 'Coursework_Transcript.pdf', type: 'pdf', size: '3.2 MB' }
      ]
    },
    {
      id: 3,
      name: 'Administrative Leadership',
      type: 'Administrative',
      status: 'Pending',
      issueDate: null,
      expiryDate: null,
      gradeLevel: 'K-12',
      subject: 'School Administration',
      certificateNumber: 'LA-ADMIN-2024-009876',
      requirements: [
        'Master\'s Degree in Educational Leadership',
        '3+ Years Teaching Experience',
        'Passed School Leadership Assessment',
        'Administrative Internship'
      ],
      documents: [
        { name: 'Application_Form.pdf', type: 'pdf', size: '1.5 MB' },
        { name: 'Leadership_Assessment.pdf', type: 'pdf', size: '2.7 MB' }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/20';
      case 'Pending':
        return 'text-amber-600 bg-amber-100 dark:bg-amber-900/20';
      case 'Expired':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default:
        return 'text-slate-600 bg-slate-100 dark:bg-slate-900/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active':
        return <CheckCircle size={16} className="text-emerald-600" />;
      case 'Pending':
        return <Clock size={16} className="text-amber-600" />;
      case 'Expired':
        return <AlertTriangle size={16} className="text-red-600" />;
      default:
        return <FileText size={16} className="text-slate-600" />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'TBD';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysUntilExpiry = (expiryDate) => {
    if (!expiryDate) return null;
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 lg:p-8 rounded-3xl backdrop-blur-xl shadow-xl bg-white/70 border border-white/20">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Award size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
              Certifications
            </h1>
            <p className="text-slate-600">
              Manage and view your professional certifications
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white/50 border border-white/20">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <CheckCircle size={16} className="text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Active Certifications</p>
                <p className="text-xl font-bold text-slate-900">
                  {certifications.filter(c => c.status === 'Active').length}
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-white/50 border border-white/20">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                <Clock size={16} className="text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Pending</p>
                <p className="text-xl font-bold text-slate-900">
                  {certifications.filter(c => c.status === 'Pending').length}
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-white/50 border border-white/20">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Calendar size={16} className="text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Next Renewal</p>
                <p className="text-xl font-bold text-slate-900">
                  {certifications.filter(c => c.status === 'Active').length > 0 ? '2025' : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications List */}
      <div className="space-y-4">
        {certifications.map((cert) => {
          const daysUntilExpiry = getDaysUntilExpiry(cert.expiryDate);
          const isExpiringSoon = daysUntilExpiry && daysUntilExpiry <= 90;
          
          return (
            <div
              key={cert.id}
              className="p-6 rounded-3xl backdrop-blur-xl shadow-xl bg-white/70 border border-white/20 hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedCert(selectedCert?.id === cert.id ? null : cert)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                      <Award size={20} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-900">
                        {cert.name}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {cert.type} • {cert.gradeLevel} • {cert.subject}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(cert.status)}
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(cert.status)}`}>
                        {cert.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-slate-500">Certificate Number</p>
                      <p className="text-sm font-medium text-slate-900">{cert.certificateNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Issue Date</p>
                      <p className="text-sm font-medium text-slate-900">{formatDate(cert.issueDate)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Expiry Date</p>
                      <p className="text-sm font-medium text-slate-900">{formatDate(cert.expiryDate)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Status</p>
                      <p className="text-sm font-medium text-slate-900">{cert.status}</p>
                    </div>
                  </div>

                  {isExpiringSoon && (
                    <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle size={16} className="text-amber-600" />
                        <span className="text-sm font-medium text-amber-800">
                          Expires in {daysUntilExpiry} days
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Expanded Details */}
                  {selectedCert?.id === cert.id && (
                    <div className="mt-6 space-y-6 border-t border-slate-200 pt-6">
                      {/* Requirements */}
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900 mb-3">Requirements</h4>
                        <ul className="space-y-2">
                          {cert.requirements.map((req, index) => (
                            <li key={index} className="flex items-center space-x-2">
                              <CheckCircle size={14} className="text-emerald-500 flex-shrink-0" />
                              <span className="text-sm text-slate-700">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Documents */}
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900 mb-3">Documents</h4>
                        <div className="space-y-2">
                          {cert.documents.map((doc, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <FileText size={16} className="text-slate-500" />
                                <div>
                                  <p className="text-sm font-medium text-slate-900">{doc.name}</p>
                                  <p className="text-xs text-slate-500">{doc.size}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                                  <Eye size={16} />
                                </button>
                                <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                                  <Download size={16} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="p-6 rounded-3xl backdrop-blur-xl shadow-xl bg-white/70 border border-white/20">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 rounded-2xl bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors">
            <FileText size={20} className="text-blue-600" />
            <span className="text-sm font-medium text-blue-900">Apply for New Certification</span>
          </button>
          <button className="flex items-center space-x-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors">
            <Download size={20} className="text-emerald-600" />
            <span className="text-sm font-medium text-emerald-900">Download All Documents</span>
          </button>
          <button className="flex items-center space-x-3 p-4 rounded-2xl bg-purple-50 border border-purple-200 hover:bg-purple-100 transition-colors">
            <Calendar size={20} className="text-purple-600" />
            <span className="text-sm font-medium text-purple-900">View Renewal Schedule</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Certifications; 