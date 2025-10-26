import { useAuth } from "../auth/authentication";
import { useState, useEffect } from "react";

function ProfilePage() {
  const { currentUser, setCurrentUser } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    email: "",
    phone: "",
    birthday: "",
    program: "",
  });

  useEffect(() => {
    setFormData({
      id: currentUser.id,
      email: currentUser.email,
      phone: currentUser.phone,
      birthday: currentUser.birthday,
      program: currentUser.program,
    });
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const normalizeEmail = (e) => e.trim().toLowerCase();

  const handleSubmit = (e) => {
    e.preventDefault();

    const normalizedEmail = normalizeEmail(formData.email);
    const users = JSON.parse(localStorage.getItem("app_users"));
    const user = users.find((u) => u.id === formData.id);
    const otherUsers = users.filter((u) => u.id !== formData.id);

    // duplicate email check
    if (otherUsers.some((u) => u.email === normalizedEmail)) {
      throw new Error("Email already registered.");
    }

    user.email = formData.email;
    user.phone = formData.phone;
    user.birthday = formData.birthday;
    user.program = formData.program;

    for (var u in users) {
      if (u.id === user.id) {
        u = user;
        break;
      }
    }

    localStorage.setItem("app_users", JSON.stringify(users));
    localStorage.setItem("app_currentUser", JSON.stringify(user));
    // refresh currentUser
    setCurrentUser(user);

    setShowModal(false);
  };

  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-semibold text-xl text-center">User Information</h1>
      <div className="mx-auto border-[1px] border-[var(--system-blue)] p-4 rounded-md md:min-w-[550px]">
        <div className="mb-3">
          <div className="text-lg font-semibold mb-1">
            {currentUser.firstName} {currentUser.lastName}
          </div>
          <span className="text-xs bg-[#bbe2f8] text-[var(--system-blue)] rounded-md px-1 py-0.5">
            {currentUser?.role}
          </span>
        </div>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-[var(--system-gray)]">Email</div>
            <div>{currentUser?.email || "—"}</div>
          </div>
          <div>
            <div className="text-[var(--system-gray)]">Phone</div>
            <div>{currentUser?.phone || "—"}</div>
          </div>

          <div>
            <div className="text-[var(--system-gray)]">Department</div>
            <div>{currentUser?.department || "Software Development - SD"}</div>
          </div>

          <div>
            <div className="text-[var(--system-gray)]">Program</div>
            <div>{currentUser?.program || "Computer Science"}</div>
          </div>

          <div>
            <div className="text-[var(--system-gray)]">Birthday</div>
            <div>{currentUser?.birthday || "—"}</div>
          </div>
          <div>
            <div className="text-[var(--system-gray)]">
              {currentUser?.role} ID
            </div>
            <div>{currentUser?.id || "—"}</div>
          </div>
        </div>
        <button
          className="btn-primary-fill py-2 px-4 mt-2 mx-auto text-sm float-right"
          onClick={() => setShowModal(true)}
        >
          Edit
        </button>
      </div>

      {/* Add/Edit Course Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--system-blue)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--system-blue)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Birthday
                  </label>
                  <input
                    type="date"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--system-blue)]"
                  />
                </div>
                {currentUser?.role === "student" && (
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Program
                    </label>
                    <select
                      name="program"
                      value={formData.program}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--system-blue)]"
                    >
                      <option value="Diploma (2 Years)">
                        Diploma (2 Years)
                      </option>
                      <option value="Post-Diploma (1 Year)">
                        Post-Diploma (1 Year)
                      </option>
                      <option value="Certificate (6 Months)">
                        Certificate (6 Months)
                      </option>
                    </select>
                  </div>
                )}
                {/* Form Action Buttons */}
                <div className="flex flex-col md:flex-row justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="btn-secondary py-2 px-4 text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary-fill py-2 px-4 text-sm"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
