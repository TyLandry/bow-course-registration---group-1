import { useState, useEffect } from "react";
import students from "../temp_data/students.json";
import Student from "../components/Student";

export default function StudentListPage() {
  const [selectedProgram, setSelectedProgram] = useState("Diploma");
  const [filteredStudent, setFilteredStudent] = useState(students);
  const [searchValue, setSearchValue] = useState("");
  const [studentShow, setStudentShow] = useState(false);

  useEffect(() => {
    const result = students.filter((s) => s.program === selectedProgram);
    setFilteredStudent(
      result.filter(
        (r) =>
          r.firstName.toLowerCase().startsWith(searchValue.toLowerCase()) ||
          r.lastName.toLowerCase().startsWith(searchValue.toLowerCase()) ||
          r.id.toLowerCase().startsWith(searchValue.toLowerCase())
      )
    );
  }, [selectedProgram, searchValue]);

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
          {["Diploma", "Post-Diploma", "Certificate"].map((program) => (
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
            <>
              {filteredStudent.slice(0, 4).map((s) => (
                <Student
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
