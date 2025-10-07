import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import coursesData from '../temp_data/courses.json';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [adminName] = useState('John Doe');
  const [selectedTerm, setSelectedTerm] = useState('Fall 2025');
  const [termCourses, setTermCourses] = useState([]);


  // Update courses when term changes
  useEffect(() => {
    // Create mock courses for the selected term
    const mockCoursesByTerm = {
      'Spring 2025': [
        { name: 'Advanced Web Development', code: 'WEB-301', term: 'Spring 2025', start: 'January 15, 2025', end: 'May 1, 2025' },
        { name: 'Machine Learning Basics', code: 'ML-101', term: 'Spring 2025', start: 'January 15, 2025', end: 'May 1, 2025' },
      ],
      'Summer 2025': [
        { name: 'Cloud Computing', code: 'CLOUD-201', term: 'Summer 2025', start: 'May 15, 2025', end: 'August 30, 2025' },
        { name: 'DevOps Fundamentals', code: 'DEV-301', term: 'Summer 2025', start: 'May 15, 2025', end: 'August 30, 2025' },
      ],
      'Fall 2025': [
        { name: 'Software Engineering', code: 'CS-250', term: 'Fall 2025', start: 'September 5, 2025', end: 'December 15, 2025' },
        { name: 'Frontend Frameworks', code: 'CS-260', term: 'Fall 2025', start: 'September 5, 2025', end: 'December 15, 2025' },
        { name: 'Backend Development', code: 'CS-270', term: 'Fall 2025', start: 'September 5, 2025', end: 'December 15, 2025' },
        { name: 'DevOps & Cloud', code: 'CS-280', term: 'Fall 2025', start: 'September 5, 2025', end: 'December 15, 2025' },
      ],
      'Winter 2025': [
        { name: 'AI and Ethics', code: 'AI-401', term: 'Winter 2025', start: 'January 5, 2026', end: 'April 20, 2026' },
        { name: 'Capstone Project', code: 'CAP-499', term: 'Winter 2025', start: 'January 5, 2026', end: 'April 20, 2026' },
      ]
    };
    setTermCourses(mockCoursesByTerm[selectedTerm] || []);
  }, [selectedTerm]);

  // Handle navigation to course details page
  const handleViewCourseDetails = (courseCode) => {
    navigate(`/course-details`, { state: { courseCode } });
  };

  // Mock data for recent activity
  const recentActivity = [
    {
      type: 'course',
      title: 'New Course Added',
      description: 'Introduction to Programming Course has been successfully added.',
      timestamp: 'Just now'
    },
    {
      type: 'student',
      title: 'Student Registered',
      description: 'John Doe has registered for Advanced Algorithms.',
      timestamp: '2 hours ago'
    },
    {
      type: 'message',
      title: 'Message from Student',
      description: 'Alice Smith has submitted a question regarding the course syllabus.',
      timestamp: '1 day ago'
    }
  ];

  // Mock notifications data
  const notifications = [
    { icon: '🔔', title: 'New student registration pending approval', date: 'October 15, 2023' },
    { icon: '🔔', title: 'Course capacity reached for CS250', date: 'October 12, 2023' },
    { icon: '🔔', title: 'System maintenance scheduled for this weekend', date: 'October 8, 2023' }
  ];

  return (
    <div className="flex flex-col gap-10">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-bold">Welcome, {adminName}!</h1>
      </div>

      {/* Quick Actions Section*/}
      <div>
        <h2 className="text-xl font-bold mb-3">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Link to="/course-management" className="flex flex-col items-center p-6 border-[1px] border-[var(--system-purple)] rounded-md hover:bg-gray-50 transition-colors">
            <div className="w-12 h-12 bg-1 rounded-md flex items-center justify-center mb-3">
              <span className="text-2xl">📚</span>
            </div>
            <h3 className="font-semibold text-sm mb-1">Manage Courses</h3>
            <p className="text-xs text-[var(--system-gray)] text-center">Search, add, edit, delete courses</p>
          </Link>

          <Link to="/student-list" className="flex flex-col items-center p-6 border-[1px] border-[var(--system-purple)] rounded-md hover:bg-gray-50 transition-colors">
            <div className="w-12 h-12 bg-1 rounded-md flex items-center justify-center mb-3">
              <span className="text-2xl">👥</span>
            </div>
            <h3 className="font-semibold text-sm mb-1">View Students</h3>
            <p className="text-xs text-[var(--system-gray)] text-center">See list of registered students</p>
          </Link>

          <Link to="/submitted-forms" className="flex flex-col items-center p-6 border-[1px] border-[var(--system-purple)] rounded-md hover:bg-gray-50 transition-colors">
            <div className="w-12 h-12 bg-1 rounded-md flex items-center justify-center mb-3">
              <span className="text-2xl">📄</span>
            </div>
            <h3 className="font-semibold text-sm mb-1">View Submitted Forms</h3>
            <p className="text-xs text-[var(--system-gray)] text-center">Read submitted core and electives</p>
          </Link>

          <Link to="/profile" className="flex flex-col items-center p-6 border-[1px] border-[var(--system-purple)] rounded-md hover:bg-gray-50 transition-colors">
            <div className="w-12 h-12 bg-1 rounded-md flex items-center justify-center mb-3">
              <span className="text-2xl">👤</span>
            </div>
            <h3 className="font-semibold text-sm mb-1">Profile</h3>
            <p className="text-xs text-[var(--system-gray)] text-center">View and update info</p>
          </Link>
        </div>
      </div>

      {/* Term Selection */}
      <div>
        <h3 className="text-sm font-semibold mb-2">Select Term</h3>
        <div className="flex gap-3">
          {['Spring 2025', 'Summer 2025', 'Fall 2025', 'Winter 2025'].map((term) => (
            <button key={term} onClick={() => setSelectedTerm(term)} className={`px-4 py-2 text-sm rounded-md ${selectedTerm === term ? 'bg-1 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Course Management Section - showing courses for selected term */}
      <div>
        <div className="mb-3">
          <h2 className="text-xl font-bold">Courses for {selectedTerm}</h2>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Available Courses</h3>
          {termCourses.length === 0 ? (
            <p className="text-gray-500 text-sm">No courses available for {selectedTerm}.</p>
          ) : (
            <table className="min-w-full border-[1px] border-[var(--system-purple)]">
              <thead className="bg-1 text-white">
                <tr className="text-xs font-medium">
                  <td className="p-3">Course Code</td>
                  <td className="p-3">Course Name</td>
                  <td className="p-3">Start Date</td>
                  <td className="p-3">End Date</td>
                  <td className="p-3">Actions</td>
                </tr>
              </thead>
              <tbody>
                {termCourses.map((course, index) => (
                  <tr key={index} className="text-xs border-b border-[var(--system-purple)] hover:bg-gray-50 cursor-pointer">
                    <td className="p-3 font-semibold">{course.code}</td>
                    <td className="p-3">{course.name}</td>
                    <td className="p-3">{course.start}</td>
                    <td className="p-3">{course.end}</td>
                    <td className="p-3">
                      <button 
                        onClick={() => handleViewCourseDetails(course.code)} 
                        className="btn-primary-outlined text-xs"
                      >
                        <p className="py-1 px-3">View Details</p>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Notifications and Messages*/}
      <div className="max-w-2xl mx-auto w-full">
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-lg font-bold">Notifications and Messages</h2>
          <span className="bg-[var(--system-blue)] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
            {notifications.length}
          </span>
        </div>
        <div className="border-[1px] border-[var(--system-purple)] rounded-md">
          {notifications.map((notification, index) => (
            <div key={index} className={`flex items-start gap-3 p-4 ${index !== notifications.length - 1 ? 'border-b border-gray-200' : ''}`}>
              <span className="text-xl">{notification.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-medium">{notification.title}</p>
                <p className="text-xs text-[var(--system-gray)] mt-1">{notification.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}