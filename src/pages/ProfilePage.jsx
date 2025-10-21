import { useState, useEffect } from "react";

function ProfilePage() {
  const [currentUser, setCurrentUser] = useState(null);

  // Load use from the local storage if exists
  useEffect(() => {
    const raw = localStorage.getItem("app_currentUser");
    if (raw) setCurrentUser(JSON.parse(raw));
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-semibold text-xl text-center">Use Information</h1>
      <div className="mx-auto border-[1px] border-[var(--system-blue)] p-4 rounded-md md:min-w-[550px]">
        <div className="mb-3">
          <div className="text-lg font-semibold mb-1">
            {/* {currentUser.firstName} {currentUser.lastName} */}
            Sarah Johnson
          </div>
          <span className="text-xs bg-[#bbe2f8] text-[var(--system-blue)] rounded-md px-1 py-0.5">
            {currentUser?.role}
          </span>
        </div>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-[var(--system-gray)]">Email</div>
            <div>{currentUser?.email}</div>
          </div>
          <div>
            <div className="text-[var(--system-gray)]">Phone</div>
            {/* <div>{currentUser?.phone}</div> */}
            <div>(555) 987-6543</div>
          </div>
          {currentUser?.role === "student" && (
            <div>
              <div className="text-[var(--system-gray)]">Department</div>
              {/* <div>{currentUser?.department}</div> */}
              <div>Software Development - SD</div>
            </div>
          )}
          {currentUser?.role === "student" && (
            <div>
              <div className="text-[var(--system-gray)]">Program/Status</div>
              {/* <div>{currentUser?.program}</div> */}
              <div>Computer Science</div>
            </div>
          )}
          <div>
            <div className="text-[var(--system-gray)]">Birthday</div>
            {/* <div>{currentUser?.birthday}</div> */}
            <div>April 15, 1998</div>
          </div>
          <div>
            <div className="text-[var(--system-gray)]">
              {currentUser?.role} ID
            </div>
            {/* <div>{currentUser?.id}</div> */}
            <div>STU-2023-0042</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
