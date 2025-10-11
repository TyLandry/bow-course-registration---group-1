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
      <div className="px-64 self-start mt-28">
        <h2 className="font-bold">Forms list</h2>
        <p className="text-gray-600 py-3">Overview of submitted list</p>
        <div className="round-md p-6 flex gap-4 max-w-2xl mx-auto border rounded-md shadow-md">
          <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>
        </div>

        {/* Foor message details space */}
        <div className="flex mt-10">
          <p>Im here</p>
        </div>

        {/* ForSearch and Filter pannel */}
        <div className="flex  flex-col mt-10">
          <div className="flex flex-col items-enter text-center">
            <h1 className="font-bold text-3xl">Search and Filter Panel</h1>
            <p className="text-gray-600">
              Use the fields below to filter messages
            </p>
          </div>
          <div className="round-md p-6 flex gap-4 max-w-2xl mx-auto border rounded-md shadow-md flex-col">
            <h2 className="font-bold">Search</h2>
            <p>Search by student id name or ID.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
