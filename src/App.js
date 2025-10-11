import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DesingLibrary from "./pages/DesignLibrary";
import HomePage from "./pages/HomePage";
import StudentDashboard from "./pages/StudentDashboard";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignupPage";
import AdminDashboard from "./pages/AdminDashboard";
import StudentListPage from "./pages/StudentListPage";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header /> {/* Persistent header on all pages */}
        <div className="px-3 py-3 md:px-[100px] flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home-page" element={<HomePage />} />
            <Route path="/design-library" element={<DesingLibrary />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />}></Route>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/student-list" element={<StudentListPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
