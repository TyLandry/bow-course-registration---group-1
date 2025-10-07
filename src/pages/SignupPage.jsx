import React, { useState } from "react";

function SignUpPage() {
  const countryOptions = ["USA", "Canada", "UK", "Australia"];
  const programOptions = ["Software Development (SD)"];

  const [selectedCountry, settSelectedCountry] = useState("Canada");
  return (
    <div className="flex flex-col items-center gap-6 py-10">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <p className="text-gray-600">Join us for exclusive benefits!</p>
      </div>

      <div className="flex justify-evenly items-start gap-80 mt-20">
        {/* Left section */}
        <div className="flex flex-col self-center">
          <h1 className="text-3xl font-bold">Create Your Account</h1>
          <p>Fill out this form to get started</p>
        </div>

        {/* Right section */}
        <div className="flex flex-col">
          <label className="block mt-2 font-semibold">First Name</label>
          <input
            type="text"
            placeholder="First Name"
            className="border border-gray-400 rounded-md px-3 py-2 w-[500px] focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
          />

          <label className="block mt-2 font-semibold">Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            className="border border-gray-400 rounded-md px-3 py-2 w-[500px] focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
          />

          <label className="block mt-2 font-semibold">Email Address</label>
          <input
            type="Email Address"
            placeholder="Password"
            className="border border-gray-400 rounded-md px-3 py-2 w-[500px] focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
          />

          <label className="block mt-2 font-semibold">Phone</label>
          <input
            type="text"
            placeholder="Phone #"
            className="border border-gray-400 rounded-md px-3 py-2 w-[500px] focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
          />

          <label className="block mt-2 font-semibold">Birthday</label>
          <input
            type="date"
            className="border border-gray-400 rounded-md px-3 py-2 w-[500px] focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
          />

          <label className="block mt-2 font-semibold">Program</label>
          <input
            type="text"
            list="programs"
            placeholder="Choose Program"
            className="border border-gray-400 rounded-md px-3 py-2 w-[500px] focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
          />
          <datalist id="programs">
            {programOptions.map((program) => (
              <option key={program} value={program} />
            ))}
          </datalist>

          <label className="block mt-2 font-semibold">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-400 rounded-md px-3 py-2 w-[500px] focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
          />
          <label className="block mt-2 mb-4 font-semibold">
            Select Country
          </label>
          <div className="flex gap-3">
            {countryOptions.map((country) => (
              <button
                key={country}
                onClick={() => settSelectedCountry(country)}
                className={`px-4 py-2 text-sm rounded-md ${
                  selectedCountry === country
                    ? "bg-1 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {country}
              </button>
            ))}
          </div>
          <div className="flex gap-4 mt-6">
            <button className="btn-primary-fill py-2 px-4 text-sm">
              Sign Up
            </button>
            <button className="btn-primary-outlined text-sm">
              <p className="py-2 px-3">Cancel</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
