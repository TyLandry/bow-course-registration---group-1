import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DesingLibrary from "./pages/DesignLibrary";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <Router>
      <Header /> {/* Persistent header on all pages */}
      <div className="px-3 py-3 md:px-[100px]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/homePage" element={<HomePage />} />
          <Route path="/desingLibrary" element={<DesingLibrary />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}
