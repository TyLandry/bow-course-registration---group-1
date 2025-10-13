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
        "Hello, I would like to inquire about the course syllabus, would that be possible?",
    },
    {
      id: 2,
      studentName: "Jane Smith",
      studentId: "12346",
      program: "Software Development",
      term: "Winter 2024",
      dateSubmitted: "2025-09-29",
      status: "Read",
      messagePreview: "Can I update my registration?",
      fullMessage: "Can I update my registration for Software Security 101?",
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

      {/* Forms list */}
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
                  <div className="w-10 h-10 bg-gray-200 flex items-center justify-center rounded-full">
                    {/* icon omitted for brevity */}
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

              {/* Middle Row */}
              <div className="mt-4 flex flex-wrap justify-between items-center text-sm text-gray-600">
                <p>Date Submitted: {msg.dateSubmitted}</p>
                <p>
                  Status:{" "}
                  <span
                    className={`font-medium ${
                      msg.status === "Read" ? "text-gray-600" : "text-green-600"
                    }`}
                  >
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
                <button
                  onClick={() => setSelectedMessage(msg)}
                  className="text-blue-600 font-medium hover:underline"
                >
                  View Full Message →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Message details (conditional) */}
        {selectedMessage && (
          <div className="flex items-center text-start flex-col mt-10">
            <h2 className="font-bold text-xl">Message details</h2>
            <p className="text-gray-600 py-3">
              Overview of submitted student messages.
            </p>

            <div className="rounded-lg border shadow-md bg-white p-6 max-w-xl">
              <div className="mb-4">
                <p className="font-semibold">
                  From: {selectedMessage.studentName} (
                  {selectedMessage.studentId})
                </p>
                <p className="text-sm text-gray-500">
                  Program: {selectedMessage.program} • Term:{" "}
                  {selectedMessage.term}
                </p>
              </div>

              <div className="rounded-md bg-gray-50 p-4">
                <h3 className="font-bold mb-2">Full Message</h3>
                <p className="text-gray-700">{selectedMessage.fullMessage}</p>
              </div>

              <div className="mt-4 flex justify-between gap-3 py-2">
                <div>
                  {" "}
                  <button className="btn-primary-outlined text-sm mx-2">
                    <p className="py-2 px-3">Archive</p>
                  </button>
                  <button className=" btn-primary-fill py-2 px-3 text-sm">
                    Mark as Read
                  </button>
                </div>
                  
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="btn-secondary py-2 px-3 text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* For message details space
        <div>
          {selectedMessage && (
            <div className="flex items-center flex-col max-w-6xl mx-auto px-6 mt-28">
              <div>
                <h2 className="font-bold text-xl">Message details</h2>
                <p className="text-gray-600 py-3">
                  Overview of submitted student messages.
                </p>
              </div>
              <div className="rounded-md p-6 flex flex-col gap-4 border shadow-md md:w-96">
                <div className="rounded-md p-6 flex flex-col gap-4 border bg-gray-300">
                  <h2 className="font-bold">Full Message</h2>
                  <p>
                    <span className="font-medium"></span>{" "}
                    {selectedMessage.fullMessage}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div> */}

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
