import { useState, useEffect } from "react";
import Student from "../components/Student";

export default function StudentListPage() {
  const [students, setStudents] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState("All Programs");
  const [filteredStudent, setFilteredStudent] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [studentShow, setStudentShow] = useState(false);

  // Load students from localStorage on component mount
  useEffect(() => {
    try {
      const allUsers = JSON.parse(localStorage.getItem("app_users") || "[]");
      console.log("All users from localStorage:", allUsers);
      
      // Filter only student users
      const studentUsers = allUsers
        .filter(user => user.role === "student")
        .map(user => ({
          ...user,
          department: "Software Development", // Add default department since it's expected by Student component
        }));
      
      console.log("Filtered student users:", studentUsers);
      setStudents(studentUsers);
    } catch (error) {
      console.error("Error loading students:", error);
      setStudents([]);
    }
  }, []);

  useEffect(() => {
    console.log("Students state:", students);
    console.log("Selected program:", selectedProgram);
    console.log("Search value:", searchValue);
    
    if (students.length === 0) {
      setFilteredStudent([]);
      return;
    }
    
    // Filter by program - simplified logic
    let result = students;
    if (selectedProgram !== "All Programs") {
      result = students.filter((s) => {
        if (!s.program) return false;
        
        // Simple case-insensitive includes check with null safety
        const programLower = s.program.toLowerCase();
        const selectedLower = selectedProgram.toLowerCase();
        
        return programLower.includes(selectedLower) || 
               (selectedProgram === "Diploma" && programLower.includes("sd"));
      });
    }
    
    console.log("After program filter:", result);
    
    // Filter by search term with null safety
    const finalResult = result.filter(
      (r) => {
        const firstName = r.firstName || "";
        const lastName = r.lastName || "";
        const id = r.id || "";
        const searchLower = searchValue.toLowerCase();
        
        return firstName.toLowerCase().includes(searchLower) ||
               lastName.toLowerCase().includes(searchLower) ||
               id.toLowerCase().includes(searchLower);
      }
    );
    
    console.log("Final filtered result:", finalResult);
    setFilteredStudent(finalResult);
  }, [selectedProgram, searchValue, students]);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-xl font-bold">View Students</h1>
        <h3 className="text-xs">
          Manage student registrations in the Software Development department.
        </h3>
      </div>
      <div>
        <h2 className="font-semibold">Search Students</h2>
        <input
          type="text"
          placeholder="Enter name or ID"
          onChange={(e) => setSearchValue(e.target.value)}
          className="border border-gray-400 rounded-md px-3 py-2 w-[500px] focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
        />
      </div>
      <div>
        <h2 className="font-semibold">Filter by Program</h2>
        <div className="flex gap-3 mt-4">
          {["All Programs", "Diploma", "Post-Diploma", "Certificate"].map((program) => (
            <button
              key={program}
              onClick={() => setSelectedProgram(program)}
              className={`px-4 py-2 text-sm rounded-md ${
                selectedProgram === program
                  ? "bg-1 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {program}
            </button>
          ))}
        </div>
      </div>

      <div>
        <table className="min-w-full divide-y divide-gray-200 border-[1px] border-[var(--system-purple)] mt-2">
          <thead className="bg-1 text-white">
            <tr className="text-xs font-medium">
              <td className="p-2">ID</td>
              <td className="p-2">First Name</td>
              <td className="p-2">Last Name</td>
              <td className="p-2">Email</td>
              <td className="p-2">Phone</td>
              <td className="p-2">Birthday</td>
              <td className="p-2">Department</td>
              <td className="p-2">Program</td>
            </tr>
          </thead>
          <tbody>
            {filteredStudent.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-8 text-[var(--system-gray)] text-sm">
                  {students.length === 0 
                    ? "No students found in the system." 
                    : "No students found matching the current filter."}
                </td>
              </tr>
            ) : (
              <>
                {filteredStudent.slice(0, 4).map((s) => (
                  <Student
                    key={s.id}
                    id={s.id}
                    firstName={s.firstName}
                    lastName={s.lastName}
                    email={s.email}
                    phone={s.phone}
                    birthday={s.birthday}
                    department={s.department}
                    program={s.program}
                  />
                ))}
                {studentShow &&
                  filteredStudent
                    .slice(4)
                    .map((s) => (
                      <Student
                        key={s.id}
                        id={s.id}
                        firstName={s.firstName}
                        lastName={s.lastName}
                        email={s.email}
                        phone={s.phone}
                        birthday={s.birthday}
                        department={s.department}
                        program={s.program}
                      />
                    ))}
              </>
            )}
          </tbody>
        </table>
        {filteredStudent.length > 4 && (
          <button
            className="btn-primary-outlined mt-5 mx-auto block"
            onClick={() => setStudentShow(!studentShow)}
          >
            {studentShow ? (
              <p className="py-2 px-3">View Less Students</p>
            ) : (
              <p className="py-2 px-3">View All Students</p>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
