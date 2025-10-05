import React, {useEffect} from "react";

function LoginPage() {
  return (
    <div className="flex flex-col items-center gap-6 py-10">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Login to your account</h1>
        <p className="text-gray-600">
          Enter your credentials to access your profile.
        </p>
      </div>

      <div className="flex gap-4 mt-6">
        <button className="btn-primary-fill py-2 px-4 text-sm">Login</button>
        <button className="btn-primary-outlined text-sm">
          <p className="py-2 px-3">Forgot Password</p>
        </button>
      </div>

<div className="flex justify-evenly items-start gap-80 mt-40">
  {/* Left section */}
  <div className="flex flex-col self-center">
    <h1 className="text-3xl font-bold">Account Login</h1>
    <p>Securely login to your account</p>
  </div>

  {/* Right section */}
  <div className="flex flex-col">
    <label className="block mt-2 font-semibold">Username</label>
    <input
      type="text"
      placeholder="Username / email"
      className="border border-gray-400 rounded-md px-3 py-2 w-[500px] focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
    />
    <p className="font-extralight text-gray-600 mb-4">We will never share your email</p>
    <label className="block mb-2 font-semibold">Password</label>
    <input
      type="password"
      placeholder="Password"
      className="border border-gray-400 rounded-md px-3 py-2 w-[500px] focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <p className="font-extralight text-gray-600 ">Enter your correct combination</p>
          <div className="flex gap-4 mt-6">
        <button className="btn-primary-fill py-2 px-4 text-sm">Login</button>
        <button className="btn-primary-outlined text-sm">
          <p className="py-2 px-3">Forgot Password</p>
        </button>
      </div>
  </div>
</div>

    </div>
  );
}

export default LoginPage;

