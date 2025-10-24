import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CourseRegistration() {
  const navigate = useNavigate();
  const [selectedTerm, setSelectedTerm] = useState('Fall');
  const [availableCourses, setAvailableCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]); // Store all courses from localStorage

  // Load registered courses from localStorage or use default
  // this state persists across page reloads, so users don't lose their selections
  // if no saved data, initialize with some default courses
  // Note: These default courses should match the structure of the course data
  const [registeredCourses, setRegisteredCourses] = useState(() => {
    const saved = localStorage.getItem('registeredCourses');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      {
        code: 'CS250',
        name: 'Software Engineering',
        instructor: 'Dr. Linus Torvalds',
        term: 'Fall 2025',
        status: 'In Progress',
      },
      {
        code: 'CS260',
        name: 'Frontend Frameworks',
        instructor: 'Ms. Tracy Chou',
        term: 'Fall 2025',
        status: 'In Progress',
      },
      {
        code: 'CS270',
        name: 'Backend Development',
        instructor: 'Mr. Brendan Eich',
        term: 'Fall 2025',
        status: 'In Progress',
      },
      {
        code: 'CS280',
        name: 'DevOps & Cloud',
        instructor: 'Ms. Kelsey Hightower',
        term: 'Fall 2025',
        status: 'In Progress',
      },
    ];
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Available terms - simple season options without year limitations
  const terms = ['All Terms', 'Fall', 'Winter', 'Spring', 'Summer'];

  // Load all courses from localStorage (admin-added courses)
  useEffect(() => {
    const loadCourses = () => {
      const savedCourses = localStorage.getItem('courses');
      if (savedCourses) {
        const courses = JSON.parse(savedCourses);
        // Only show Active courses for registration
        const activeCourses = courses.filter(course => course.status === 'Active');
        setAllCourses(activeCourses);
      } else {
        setAllCourses([]);
      }
    };

    // Load courses initially
    loadCourses();

    // Listen for localStorage changes (when admin adds courses)
    const handleStorageChange = () => {
      loadCourses();
    };

    // Add event listener for storage changes
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for same-window localStorage changes
    window.addEventListener('localStorageChange', handleStorageChange);

    // Cleanup event listeners
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChange', handleStorageChange);
    };
  }, []);

  // Filter courses based on selected term
  // This updates whenever the term changes or new courses are added by admin
  useEffect(() => {
    const filtered = allCourses.filter((course) => {
      // More flexible term matching - includes partial matches
      if (selectedTerm === 'All Terms') {
        return true; // Show all courses if "All Terms" is selected
      }
      
      // Extract the season from selected term (e.g., "Fall" from "Fall 2025")
      const selectedSeason = selectedTerm.split(' ')[0];
      
      // Check if course term includes the selected season
      return course.term && course.term.toLowerCase().includes(selectedSeason.toLowerCase());
    });
    setAvailableCourses(filtered);
  }, [selectedTerm, allCourses]);

  // Save registered courses to localStorage whenever they change
  useEffect(() => {
    console.log('Saving to localStorage:', registeredCourses);
    localStorage.setItem(
      'registeredCourses',
      JSON.stringify(registeredCourses)
    );
    // Dispatch custom event to notify other components of localStorage change
    window.dispatchEvent(new Event('localStorageChange'));
  }, [registeredCourses]);

  // Filter available courses by search term
  const filteredAvailableCourses = availableCourses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add course to registered courses
  const addCourse = (course) => {
    // Check if course is already registered
    if (registeredCourses.find((regCourse) => regCourse.code === course.code)) {
      alert('Course is already registered');
      return;
    }

    const newRegisteredCourse = {
      code: course.code,
      name: course.name,
      instructor: course.professor || 'TBD', // Use professor field from admin-added courses
      term: course.term,
      status: 'In Progress',
    };

    const updatedRegisteredCourses = [...registeredCourses, newRegisteredCourse];
    setRegisteredCourses(updatedRegisteredCourses);
    
    // Save to localStorage
    localStorage.setItem('registeredCourses', JSON.stringify(updatedRegisteredCourses));
    
    // Dispatch custom event for real-time updates to StudentDashboard
    window.dispatchEvent(new CustomEvent('localStorageChange', {
      detail: { key: 'registeredCourses', newValue: JSON.stringify(updatedRegisteredCourses) }
    }));

    // Build a notification and persist it so StudentDashboard will show it even if not mounted
    const newNotification = {
      icon: "🔔",
      title: `You registered for ${course.name}`,
      date: new Date().toLocaleDateString(),
    };
    try {
      const prev = JSON.parse(localStorage.getItem('app_notifications') || '[]');
      const next = [newNotification, ...prev];
      localStorage.setItem('app_notifications', JSON.stringify(next));
      // Notify same-tab listeners of notification storage change
      window.dispatchEvent(new CustomEvent('localStorageChange', {
        detail: { key: 'app_notifications', newValue: JSON.stringify(next) }
      }));
    } catch (e) {
      // ignore storage errors
    }

    // Dispatch custom event for notifications (real-time)
    window.dispatchEvent(new CustomEvent('courseAdded', {
      detail: { courseName: course.name }
    }));

    // Also save enrollment data for admin/course details view
    const enrollmentData = {
      courseCode: course.code,
      courseName: course.name,
      studentName: 'Current Student', // This would come from user authentication in a real app
      studentId: 'STU001', // This would come from user authentication
      enrollmentDate: new Date().toLocaleDateString(),
      status: 'Enrolled'
    };

    // Get existing enrollments or create empty array
    const existingEnrollments = JSON.parse(localStorage.getItem('courseEnrollments') || '[]');
    
    // Check if student is already enrolled in this course
    const alreadyEnrolled = existingEnrollments.some(
      enrollment => enrollment.courseCode === course.code && enrollment.studentId === 'STU001'
    );

    if (!alreadyEnrolled) {
      existingEnrollments.push(enrollmentData);
      localStorage.setItem('courseEnrollments', JSON.stringify(existingEnrollments));
    }
  };

  // Remove course from registered courses
  const removeCourse = (courseCode) => {
    const updatedRegisteredCourses = registeredCourses.filter((course) => course.code !== courseCode);
    setRegisteredCourses(updatedRegisteredCourses);
    
    // Save to localStorage
    localStorage.setItem('registeredCourses', JSON.stringify(updatedRegisteredCourses));
    
    // Dispatch custom event for real-time updates to StudentDashboard
    window.dispatchEvent(new CustomEvent('localStorageChange', {
      detail: { key: 'registeredCourses', newValue: JSON.stringify(updatedRegisteredCourses) }
    }));

    // Also remove from enrollments
    const existingEnrollments = JSON.parse(localStorage.getItem('courseEnrollments') || '[]');
    const updatedEnrollments = existingEnrollments.filter(
      enrollment => !(enrollment.courseCode === courseCode && enrollment.studentId === 'STU001')
    );
    localStorage.setItem('courseEnrollments', JSON.stringify(updatedEnrollments));
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-xl font-bold">Course Registration</h1>
        <h3 className="text-xs">
          Manage your course selections for the upcoming term.
        </h3>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold">Select Term</h2>
          <select value={selectedTerm} onChange={(e) => setSelectedTerm(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            {terms.map((term) => (
              <option key={term} value={term}>{term}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <h2 className="font-semibold">Available Courses</h2>
          </div>
          <div className="flex items-center gap-2">
            {/* Search input removed as requested */}
          </div>
        </div>

        <p className="text-gray-600 text-sm">
          Courses available for the selected term.
        </p>

        {/* Available Courses List */}
        <div className="space-y-3">
          {filteredAvailableCourses.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No courses available for the selected term.
            </p>
          ) : (
            filteredAvailableCourses.map((course) => (
              <div key={course.code} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-xs font-bold">{course.code.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{course.name}</h3>
                    <p className="text-sm text-gray-600">{course.code}</p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mt-3 md:mt-0">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">{course.term}</span> |{' '}
                    {course.start} - {course.end}
                  </div>
                  <button onClick={() => addCourse(course)} className="btn-primary-fill px-4 py-2 text-sm">Add Course</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-8">
        <h2 className="font-semibold">Registered Courses</h2>
        <p className="text-gray-600 text-sm">
          Courses you have registered for this term.
        </p>

        {/* Current Courses Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <h3 className="font-semibold p-4 bg-gray-50 border-b border-gray-200">
            Current Courses
          </h3>

          {registeredCourses.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No courses registered for this term.
            </p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200 border-[1px] border-[var(--system-purple)] mt-2">
              <thead className="bg-1 text-white">
                <tr className="text-xs font-medium">
                  <td className="p-2">Code</td>
                  <td className="p-2">Course Name</td>
                  <td className="p-2">Instructor</td>
                  <td className="p-2">Term</td>
                  <td className="p-2">Status</td>
                  <td className="p-2">Actions</td>
                </tr>
              </thead>
              <tbody>
                {registeredCourses.map((course) => (
                  <tr key={course.code} className="text-xs border-b border-[var(--system-purple)]">
                    <td className="p-3">{course.code}</td>
                    <td className="p-3">{course.name}</td>
                    <td className="p-3">{course.instructor}</td>
                    <td className="p-3">{course.term}</td>
                    <td className="p-3">
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">{course.status}</span>
                    </td>
                    <td className="p-3">
                      <button onClick={() => removeCourse(course.code)} className="btn-delete px-3 py-1 text-xs">Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseRegistration;
