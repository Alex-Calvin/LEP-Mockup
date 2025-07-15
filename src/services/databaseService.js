import mockDatabase from '../data/mockDatabase.json';

// Simulate database operations with delays
const simulateDatabaseDelay = (delay = 500) => {
  return new Promise(resolve => setTimeout(resolve, delay));
};

// Deep clone function for immutability
const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

class DatabaseService {
  constructor() {
    this.data = deepClone(mockDatabase);
    this.currentUser = null;
  }

  // Authentication methods
  async authenticateUser(username, password) {
    await simulateDatabaseDelay(800);
    
    const user = this.data.users.find(u => 
      u.username === username || u.email === username
    );
    
    if (!user) {
      throw new Error('Invalid username or password');
    }
    
    // In a real system, you'd verify the password hash
    if (password.length < 6) {
      throw new Error('Invalid username or password');
    }
    
    // Update last login
    user.lastLogin = new Date().toISOString();
    
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      district: user.district,
      schools: user.schools,
      permissions: user.permissions,
      lastLogin: user.lastLogin
    };
  }

  async verifyMFACode(userId, mfaCode) {
    await simulateDatabaseDelay(600);
    
    // Mock MFA verification - in real system, verify against stored code
    if (mfaCode.length !== 6 || !/^\d{6}$/.test(mfaCode)) {
      throw new Error('Invalid verification code');
    }
    
    const user = this.data.users.find(u => u.id === userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    return user;
  }

  // District and school methods
  async getDistricts() {
    await simulateDatabaseDelay(300);
    return this.data.districts.map(district => ({
      id: district.id,
      name: district.name,
      code: district.code,
      superintendent: district.superintendent,
      contactEmail: district.contactEmail,
      contactPhone: district.contactPhone,
      schools: district.schools,
      totalSchools: district.totalSchools,
      totalTeachers: district.totalTeachers,
      totalStudents: district.totalStudents
    }));
  }

  async getDistrictById(districtId) {
    await simulateDatabaseDelay(200);
    return this.data.districts.find(d => d.id === districtId);
  }

  async getSchoolsByDistrict(districtId) {
    await simulateDatabaseDelay(300);
    const district = this.data.districts.find(d => d.id === districtId);
    return district ? district.schools : [];
  }

  async getSchoolById(schoolId) {
    await simulateDatabaseDelay(200);
    for (const district of this.data.districts) {
      const school = district.schools.find(s => s.id === schoolId);
      if (school) {
        return { ...school, district: district.name };
      }
    }
    return null;
  }

  // Teacher methods
  async getTeachersBySchool(schoolId) {
    await simulateDatabaseDelay(400);
    for (const district of this.data.districts) {
      const school = district.schools.find(s => s.id === schoolId);
      if (school) {
        return school.teachers.map(teacher => ({
          ...teacher,
          schoolName: school.name,
          districtName: district.name,
          courses: teacher.courses
        }));
      }
    }
    return [];
  }

  async getTeacherById(teacherId) {
    await simulateDatabaseDelay(200);
    for (const district of this.data.districts) {
      for (const school of district.schools) {
        const teacher = school.teachers.find(t => t.id === teacherId);
        if (teacher) {
          return { ...teacher, schoolName: school.name, districtName: district.name };
        }
      }
    }
    return null;
  }

  // Course methods
  async getCoursesByTeacher(teacherId) {
    await simulateDatabaseDelay(300);
    for (const district of this.data.districts) {
      for (const school of district.schools) {
        const teacher = school.teachers.find(t => t.id === teacherId);
        if (teacher) {
          return teacher.courses.map(course => ({
            ...course,
            teacherName: `${teacher.firstName} ${teacher.lastName}`,
            schoolName: school.name,
            districtName: district.name
          }));
        }
      }
    }
    return [];
  }

  async getCourseById(courseId) {
    await simulateDatabaseDelay(200);
    for (const district of this.data.districts) {
      for (const school of district.schools) {
        for (const teacher of school.teachers) {
          const course = teacher.courses.find(c => c.id === courseId);
          if (course) {
            return {
              ...course,
              teacherName: `${teacher.firstName} ${teacher.lastName}`,
              teacherId: teacher.id,
              schoolName: school.name,
              schoolId: school.id,
              districtName: district.name,
              districtId: district.id
            };
          }
        }
      }
    }
    return null;
  }

  // Verification methods
  async verifyCourse(courseId, verifyingEducator) {
    await simulateDatabaseDelay(800);
    
    for (const district of this.data.districts) {
      for (const school of district.schools) {
        for (const teacher of school.teachers) {
          const course = teacher.courses.find(c => c.id === courseId);
          if (course) {
            course.verified = true;
            course.verifiedDate = new Date().toISOString().split('T')[0];
            course.verifyingEducator = verifyingEducator;
            
            // Update school verification counts
            school.verifiedCourses = school.teachers.reduce((total, t) => 
              total + t.courses.filter(c => c.verified).length, 0
            );
            
            return course;
          }
        }
      }
    }
    
    throw new Error('Course not found');
  }

  async unlockCourse(courseId) {
    await simulateDatabaseDelay(600);
    
    for (const district of this.data.districts) {
      for (const school of district.schools) {
        for (const teacher of school.teachers) {
          const course = teacher.courses.find(c => c.id === courseId);
          if (course) {
            course.verified = false;
            course.verifiedDate = null;
            course.verifyingEducator = null;
            
            // Update school verification counts
            school.verifiedCourses = school.teachers.reduce((total, t) => 
              total + t.courses.filter(c => c.verified).length, 0
            );
            
            return course;
          }
        }
      }
    }
    
    throw new Error('Course not found');
  }

  // Student methods
  async removeStudentFromCourse(courseId, studentId) {
    await simulateDatabaseDelay(500);
    
    for (const district of this.data.districts) {
      for (const school of district.schools) {
        for (const teacher of school.teachers) {
          const course = teacher.courses.find(c => c.id === courseId);
          if (course) {
            const student = course.students.find(s => s.id === studentId);
            if (student) {
              student.removed = true;
              student.removedDate = new Date().toISOString().split('T')[0];
              return student;
            }
          }
        }
      }
    }
    
    throw new Error('Student or course not found');
  }

  async removeAllStudentsFromCourse(courseId) {
    await simulateDatabaseDelay(800);
    
    for (const district of this.data.districts) {
      for (const school of district.schools) {
        for (const teacher of school.teachers) {
          const course = teacher.courses.find(c => c.id === courseId);
          if (course) {
            const removedStudents = [];
            course.students.forEach(student => {
              if (!student.removed) {
                student.removed = true;
                student.removedDate = new Date().toISOString().split('T')[0];
                removedStudents.push(student);
              }
            });
            return removedStudents;
          }
        }
      }
    }
    
    throw new Error('Course not found');
  }

  // Period and system methods
  async getCurrentVerificationPeriod() {
    await simulateDatabaseDelay(100);
    return this.data.verificationPeriods.find(p => p.status === 'active');
  }

  async getSystemSettings() {
    await simulateDatabaseDelay(100);
    return this.data.systemSettings;
  }

  // Notification methods
  async getNotificationsForUser(userId) {
    await simulateDatabaseDelay(300);
    return this.data.notifications.filter(n => n.userId === userId);
  }

  async markNotificationAsRead(notificationId) {
    await simulateDatabaseDelay(200);
    const notification = this.data.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
      return notification;
    }
    throw new Error('Notification not found');
  }

  async markAllNotificationsAsRead(userId) {
    await simulateDatabaseDelay(400);
    this.data.notifications
      .filter(n => n.userId === userId && !n.read)
      .forEach(n => n.read = true);
    
    return this.data.notifications.filter(n => n.userId === userId);
  }

  // Export methods
  async exportRosterData(filters = {}) {
    await simulateDatabaseDelay(1500);
    
    const exportData = [];
    
    for (const district of this.data.districts) {
      for (const school of district.schools) {
        for (const teacher of school.teachers) {
          for (const course of teacher.courses) {
            for (const student of course.students) {
              exportData.push({
                SchoolCd: school.code,
                SchoolName: school.name,
                CourseCode: course.courseCode,
                SectionNumber: course.sectionNumber,
                EducatorName: `${teacher.firstName} ${teacher.lastName}`,
                VerifiedDate: course.verifiedDate || '',
                VerifyingEducator: course.verifyingEducator || '',
                StudentIdNumber: student.lasid,
                FirstName: student.firstName,
                LastName: student.lastName,
                BirthDay: student.birthDay,
                GradeCode: student.gradeLevel,
                Removed: student.removed ? student.removedDate : '',
                EnrollmentDate: student.enrollmentDate,
                Absences: student.absences
              });
            }
          }
        }
      }
    }
    
    return exportData;
  }

  // Search methods
  async searchEducators(query) {
    await simulateDatabaseDelay(400);
    
    const results = [];
    const searchTerm = query.toLowerCase();
    
    for (const district of this.data.districts) {
      for (const school of district.schools) {
        for (const teacher of school.teachers) {
          const fullName = `${teacher.firstName} ${teacher.lastName}`.toLowerCase();
          const staffId = teacher.staffId.toLowerCase();
          const schoolName = school.name.toLowerCase();
          
          if (fullName.includes(searchTerm) || 
              staffId.includes(searchTerm) || 
              schoolName.includes(searchTerm)) {
            results.push({
              id: teacher.id,
              name: `${teacher.firstName} ${teacher.lastName}`,
              staffId: teacher.staffId,
              school: school.name,
              district: district.name,
              position: teacher.position
            });
          }
        }
      }
    }
    
    return results.slice(0, 10); // Limit results
  }

  // Statistics methods
  async getDistrictStatistics(districtId) {
    await simulateDatabaseDelay(500);
    
    const district = this.data.districts.find(d => d.id === districtId);
    if (!district) return null;
    
    let totalTeachers = 0;
    let verifiedTeachers = 0;
    let totalCourses = 0;
    let verifiedCourses = 0;
    let totalStudents = 0;
    let removedStudents = 0;
    
    district.schools.forEach(school => {
      totalTeachers += school.totalTeachers;
      verifiedTeachers += school.verifiedTeachers;
      totalCourses += school.totalCourses;
      verifiedCourses += school.verifiedCourses;
      
      school.teachers.forEach(teacher => {
        teacher.courses.forEach(course => {
          course.students.forEach(student => {
            totalStudents++;
            if (student.removed) removedStudents++;
          });
        });
      });
    });
    
    return {
      districtId: district.id,
      districtName: district.name,
      totalSchools: district.schools.length,
      totalTeachers,
      verifiedTeachers,
      totalCourses,
      verifiedCourses,
      totalStudents,
      removedStudents,
      verificationPercentage: totalCourses > 0 ? Math.round((verifiedCourses / totalCourses) * 100) : 0
    };
  }

  async getSchoolStatistics(schoolId) {
    await simulateDatabaseDelay(300);
    
    for (const district of this.data.districts) {
      const school = district.schools.find(s => s.id === schoolId);
      if (school) {
        let totalStudents = 0;
        let removedStudents = 0;
        
        school.teachers.forEach(teacher => {
          teacher.courses.forEach(course => {
            course.students.forEach(student => {
              totalStudents++;
              if (student.removed) removedStudents++;
            });
          });
        });
        
        return {
          schoolId: school.id,
          schoolName: school.name,
          districtName: district.name,
          totalTeachers: school.totalTeachers,
          verifiedTeachers: school.verifiedTeachers,
          totalCourses: school.totalCourses,
          verifiedCourses: school.verifiedCourses,
          totalStudents,
          removedStudents,
          verificationPercentage: school.totalCourses > 0 ? Math.round((school.verifiedCourses / school.totalCourses) * 100) : 0
        };
      }
    }
    
    return null;
  }

  // Course code validation
  async validateCourseCode(courseCode) {
    await simulateDatabaseDelay(100);
    return this.data.courseCodes.find(c => c.code === courseCode);
  }

  async getVAMEligibleCourses() {
    await simulateDatabaseDelay(200);
    return this.data.courseCodes.filter(c => c.vamEligible);
  }

  async getVerificationStatistics() {
    await simulateDatabaseDelay(200);
    
    let totalCourses = 0;
    let verifiedCourses = 0;
    
    for (const district of this.data.districts) {
      for (const school of district.schools) {
        for (const teacher of school.teachers) {
          totalCourses += teacher.courses.length;
          verifiedCourses += teacher.courses.filter(c => c.verified).length;
        }
      }
    }
    
    const verifiedPercentage = totalCourses > 0 ? Math.round((verifiedCourses / totalCourses) * 100) : 0;
    const pendingPercentage = 100 - verifiedPercentage;
    
    return {
      totalCourses,
      verifiedCourses,
      verifiedPercentage,
      pendingPercentage
    };
  }
}

// Create singleton instance
const databaseService = new DatabaseService();

export default databaseService; 