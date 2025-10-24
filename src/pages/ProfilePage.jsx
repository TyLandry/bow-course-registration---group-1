import { useEffect } from "react";
import { useAuth } from "../auth/authentication";

function ProfilePage() {
  const { currentUser } = useAuth();

  // If there's no logged-in user, try to load from localStorage as fallback
  useEffect(() => {
    // no-op, left for future side-effects
  }, []);

  if (!currentUser) {
    return (
      <div className="flex flex-col gap-5">
        <h1 className="font-semibold text-xl text-center">User Information</h1>
        <p className="text-center text-gray-500">No user is currently logged in.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-semibold text-xl text-center">User Information</h1>
      <div className="mx-auto border-[1px] border-[var(--system-blue)] p-4 rounded-md md:min-w-[550px]">
        <div className="mb-3">
          <div className="text-lg font-semibold mb-1">{currentUser.firstName} {currentUser.lastName}</div>
          <span className="text-xs bg-[#bbe2f8] text-[var(--system-blue)] rounded-md px-1 py-0.5">{currentUser?.role}</span>
        </div>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-[var(--system-gray)]">Email</div>
            <div>{currentUser?.email || '—'}</div>
          </div>
          <div>
            <div className="text-[var(--system-gray)]">Phone</div>
            <div>{currentUser?.phone || '—'}</div>
          </div>
          {currentUser?.role === "student" && (
            <div>
              <div className="text-[var(--system-gray)]">Department</div>
              <div>{currentUser?.department || 'Software Development - SD'}</div>
            </div>
          )}
          {currentUser?.role === "student" && (
            <div>
              <div className="text-[var(--system-gray)]">Program/Status</div>
              <div>{currentUser?.program || 'Computer Science'}</div>
            </div>
          )}
          <div>
            <div className="text-[var(--system-gray)]">Birthday</div>
            <div>{currentUser?.birthday || '—'}</div>
          </div>
          <div>
            <div className="text-[var(--system-gray)]">{currentUser?.role} ID</div>
            <div>{currentUser?.id || '—'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
