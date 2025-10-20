import React, { useState } from "react";
import { useAuth } from "../auth/authentication";

function SignUpPage() {
  const countryOptions = ["USA", "Canada", "UK", "Australia"];
  const programOptions = ["Software Development (SD)"];

  const [selectedCountry, setSelectedCountry] = useState("Canada");

  const { signup } = useAuth();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthday: "",
    program: "",
    password: "",
    // Might have to create a way to select role later for admin
    role: "student",
  });

  const [error, setError] = useState("");

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Signup logic to be implemented
    setError("");
    try {
      signup({ email: form.email, password: form.password, role: form.role });
    } catch (err) {
      setError(err.message || "Sign up failed.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 py-10">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <p className="text-gray-600">Join us for exclusive benefits!</p>
      </div>

      <form
        onSubmit={onSubmit}
        className="flex justify-evenly items-start gap-80 mt-20"
      >
        {/* Left section */}
        <div className="flex flex-col self-center">
          <h1 className="text-3xl font-bold">Create Your Account</h1>
          <p>Fill out this form to get started</p>
          {error && <p className="text-red-600 mt-3">{error}</p>}
        </div>

        {/* Right section */}
        <div className="flex flex-col">
          <label className="block mt-2 font-semibold">First Name</label>
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            value={form.firstName}
            onChange={onChange}
            className="border border-gray-400 rounded-md px-3 py-2 w-[500px] focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
          />

          <label className="block mt-2 font-semibold">Last Name</label>
          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            value={form.lastName}
            onChange={onChange}
            className="border border-gray-400 rounded-md px-3 py-2 w-[500px] focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
          />

          <label className="block mt-2 font-semibold">Email Address</label>
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={onChange}
            className="border border-gray-400 rounded-md px-3 py-2 w-[500px] focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
          />

          <label className="block mt-2 font-semibold">Phone</label>
          <input
            name="phone"
            type="text"
            placeholder="Phone #"
            value={form.phone}
            onChange={onChange}
            className="border border-gray-400 rounded-md px-3 py-2 w-[500px] focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
          />

          <label className="block mt-2 font-semibold">Birthday</label>
          <input
            name="birthday"
            type="date"
            value={form.birthday}
            onChange={onChange}
            className="border border-gray-400 rounded-md px-3 py-2 w-[500px] focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
          />

          <label className="block mt-2 font-semibold">Program</label>
          <input
            name="program"
            type="text"
            list="programs"
            placeholder="Choose Program"
            value={form.program}
            onChange={onChange}
            className="border border-gray-400 rounded-md px-3 py-2 w-[500px] focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
          />
          <datalist id="programs">
            {programOptions.map((program) => (
              <option key={program} value={program} />
            ))}
          </datalist>

          <label className="block mt-2 font-semibold">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={onChange}
            className="border border-gray-400 rounded-md px-3 py-2 w-[500px] focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
          />

          <label className="block mt-2 mb-4 font-semibold">
            Select Country
          </label>
          <div className="flex gap-3">
            {countryOptions.map((country) => (
              <button
                type="button"
                key={country}
                onClick={() => setSelectedCountry(country)}
                className={`px-4 py-2 text-sm rounded-md ${
                  selectedCountry === country
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {country}
              </button>
            ))}
          </div>

          <div className="flex gap-4 mt-6">
            <button type="submit" className="btn-primary-fill py-2 px-4 text-sm">
              Sign Up
            </button>
            <a href="/login">
              <button type="button" className="btn-primary-outlined text-sm">
                <p className="py-2 px-3">Cancel</p>
              </button>
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUpPage;
