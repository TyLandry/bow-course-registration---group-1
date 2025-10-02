import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DesingLibrary from "./pages/DesignLibrary";
import HomePage from "./pages/HomePage";
import StudentDashboard from "./pages/StudentDashboard";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header /> {/* Persistent header on all pages */}
        <div className="px-3 py-3 md:px-[100px] flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/homePage" element={<HomePage />} />
            <Route path="/desingLibrary" element={<DesingLibrary />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
