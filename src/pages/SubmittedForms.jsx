import React, { useEffect } from "react";

export default function SubmittedForms() {
  return (
    <div className="flex flex-col items-center gap-6 py-10">
      <div className="text-center space-y-2">
        <h1 className="font-bold text-3xl">Submitted Forms</h1>
        <p className="text-gray-600">
          Manage Submitted messages from students.
        </p>
      </div>
      <div className="flex mt-4">
        <button className=" btn-primary-fill py-4 px-4 text-small">
          Search Messages
        </button>
      </div>

      {/* For forms list */}
      <div className="max-w-6xl mx-auto px-6 mt-28">
        <h2 className="font-bold">Forms list</h2>
        <p className="text-gray-600 py-3">Overview of submitted list</p>

        <div className="rounded-md p-6 flex items-center gap-4 border shadow-md">
          <div className="w-16 h-16 bg-gray-300 rounded-lg" />
          <p className="text-gray-700">Summary content goes here…</p>
        </div>

        {/* For message details space */}
        <div className="flex mt-10">
          <p>I’m here</p>
        </div>

        {/* Search and Filter panel */}
        <div className="flex flex-col mt-10 px-8 md:px-16 lg:px-24">
          <div className="flex flex-col items-center text-center">
            <h1 className="font-bold text-3xl">Search and Filter Panel</h1>
            <p className="text-gray-600">
              Use the fields below to filter messages
            </p>
          </div>

          {/* Forms search bar */}
          {/* md = Calling @media for better response of pizel sizes/screen */}
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:justify-center md:gap-8">
            <div className="rounded-md p-6 flex flex-col gap-4 border shadow-md md:w-96">
              <h2 className="font-bold">Search</h2>
              <p>Search by student name or ID.</p>
              <input
                type="text"
                placeholder="Enter Name or ID"
                className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
              />
            </div>

            <div className="rounded-md p-6 flex flex-col gap-4 border shadow-md md:w-96">
              <h2 className="font-bold">Filter</h2>
              <p>Filter by status or date.</p>
              <input
                type="text"
                placeholder="Enter category or status"
                className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
