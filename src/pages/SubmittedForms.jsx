import React, { useState } from "react";

export default function SubmittedForms() {
  const [selectedMessage, setSelectedMessage] = useState(null);
  // Simulated Data for messages and students
  const mockMessages = [
    {
      id: 1,
      studentName: "John Doe",
      studentId: "12345",
      program: "Software Development",
      term: "Fall 2023",
      dateSubmitted: "2025-10-05",
      status: "New",
      messagePreview: "Hello, I would like to inquire about...",
      fullMessage:
        "Hello, I would like to inquire about the course syllabus for...",
    },
  ];
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
        <h2 className="font-bold text-xl">Forms List</h2>
        <p className="text-gray-600 py-3">
          Overview of submitted student messages.
        </p>

        {/* Forms container */}
        <div className="flex flex-col gap-4">
          {mockMessages.map((msg) => (
            <div
              key={msg.id}
              className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              {/* Top Row: Student info + ID + Term */}
              <div className="flex flex-wrap justify-between items-center">
                <div className="flex items-center gap-3">
                  {/* Icon placeholder */}
                  <div className="w-10 h-10 bg-gray-200 flex items-center justify-center rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 text-gray-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25m0 0L12 9m3.75-3.75L19.5 9M4.5 12.75V18a2.25 2.25 0 002.25 2.25h10.5A2.25 2.25 0 0019.5 18v-5.25M4.5 12.75l7.5-7.5 7.5 7.5"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="font-semibold text-blue-600 hover:underline cursor-pointer">
                      {msg.studentName}
                    </p>
                    <p className="text-sm text-gray-500">{msg.program}</p>
                  </div>
                </div>

                <div className="text-right text-sm text-gray-600">
                  <p>
                    Student ID:{" "}
                    <span className="font-medium">{msg.studentId}</span>
                  </p>
                  <p>Term: {msg.term}</p>
                </div>
              </div>

              {/* Middle Row: Date + Status + Message Preview */}
              <div className="mt-4 flex flex-wrap justify-between items-center text-sm text-gray-600">
                <p>Date Submitted: {msg.dateSubmitted}</p>
                <p>
                  Status:{" "}
                  <span className="font-medium text-green-600">
                    {msg.status}
                  </span>
                </p>
              </div>

              {/* Message Preview */}
              <div className="mt-3 text-gray-700 text-sm">
                <p>
                  <span className="font-medium">Message Preview:</span>{" "}
                  {msg.messagePreview}
                </p>
              </div>

              {/* Bottom Link */}
              <div className="mt-4 text-right">
                <button className="text-blue-600 font-medium hover:underline">
                  View Full Message →
                </button>
              </div>
            </div>
          ))}
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
