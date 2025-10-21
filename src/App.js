import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DesingLibrary from "./pages/DesignLibrary";
import HomePage from "./pages/HomePage";
import StudentDashboard from "./pages/StudentDashboard";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignupPage";
import AdminDashboard from "./pages/AdminDashboard";
import SubmittedForms from "./pages/SubmittedForms";
import ContactPage from "./pages/ContactPage";
import CourseRegistration from "./pages/CourseRegistration";
import CourseManagement from "./pages/CourseManagement";
import CourseDetails from "./pages/CourseDetails";

// Router setup for authenticated navigation
import { AuthProvider } from "./auth/authentication";
import RoleRoute from "./auth/roleRoute";
import ProtectionRoute from "./auth/protectionRoute";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Header /> {/* Persistent header on all pages */}
          <div className="px-3 py-3 md:px-[100px] flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home-page" element={<HomePage />} />
              <Route path="/design-library" element={<DesingLibrary />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/submitted-forms" element={<SubmittedForms />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route
                path="/course-registration"
                element={<CourseRegistration />}
              />
              <Route path="/course-management" element={<CourseManagement />} />
              <Route
                path="/course-details/:courseCode"
                element={<CourseDetails />}
              />
              <Route path="/profile" element={<ProfilePage />} />

              {/* Connecting Routes to their appropriate Roles and pages */}
              <Route element={<ProtectionRoute />}>
                <Route element={<RoleRoute allow={["student"]} />}>
                  <Route
                    path="/student-dashboard"
                    element={<StudentDashboard />}
                  />
                </Route>
                <Route element={<RoleRoute allow={["admin"]} />}>
                  <Route path="/admin-dashboard" element={<AdminDashboard />} />
                </Route>
              </Route>
              <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
          </div>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}
