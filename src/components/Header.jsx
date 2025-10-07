import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-2 text-white py-2 px-3">
      <div className="mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Bow Course Registration</h1>
        <nav className="flex gap-4">
          <Link
            to="/home-page"
            className="px-3 py-2 text-sm rounded hover:text-[var(--system-orange)]"
          >
            Home
          </Link>
          <Link
            to="/programs"
            className="px-3 py-2 text-sm rounded hover:text-[var(--system-orange)]"
          >
            Programs
          </Link>
          <Link
            to="/courses"
            className="px-3 py-2 text-sm rounded hover:text-[var(--system-orange)]"
          >
            Courses
          </Link>
          <Link
            to="/login"
            className="px-3 py-2 text-sm rounded hover:text-[var(--system-orange)]"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-3 py-2 text-sm rounded hover:text-[var(--system-orange)]"
          >
            Sign Up
          </Link>
          <Link
            to="/design-library"
            className="px-3 py-2 text-sm rounded hover:text-[var(--system-orange)]"
          >
            Design Library
          </Link>
          <Link
            to="/student-dashboard"
            className="px-3 py-2 text-sm rounded hover:text-[var(--system-orange)]"
          >
            Student Dashboard
          </Link>
          <Link to="/admin-dashboard" className="px-3 py-2 text-sm rounded hover:text-[var(--system-orange)]">
          Admin Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
