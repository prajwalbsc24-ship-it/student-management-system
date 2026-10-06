import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router";

import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";
import StudentCard from "./components/StudentCard";
import StudentStats from "./components/StudentStats";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="hero">
        <h1>Student Management System</h1>

        <p>
          Manage student records easily, quickly, and efficiently.
        </p>

        <div>
          <button onClick={() => navigate("/students")}>
            View Students
          </button>

          <button onClick={() => navigate("/add-student")}>
            Add Student
          </button>
        </div>
      </div>

      <div className="home-features">
        <div>
          <h3>👨‍🎓 Student Records</h3>
          <p>Add and manage student information.</p>
        </div>

        <div>
          <h3>🔍 Search & Filter</h3>
          <p>Find students quickly using search and filters.</p>
        </div>

        <div>
          <h3>✏️ Easy Updates</h3>
          <p>Edit and delete student records easily.</p>
        </div>
      </div>
    </div>
  );
}

function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios
      .get("http://localhost:5000/api/students")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);

      alert("Student deleted successfully!");

      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Failed to delete student.");
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/api/students/${editingStudent.id}`,
        {
          name: editingStudent.name,
          rollNumber: editingStudent.rollNumber,
          department: editingStudent.department,
          year: editingStudent.year,
        }
      );

      alert("Student updated successfully!");

      setEditingStudent(null);

      fetchStudents();
    } catch (error) {
      console.error("Error updating student:", error);
      alert("Failed to update student.");
    }
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(search.toLowerCase());

    const matchesDepartment =
      department === "All" || student.department === department;

    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="page-container">
      <h1>Students</h1>

      <StudentStats count={students.length} />

      {editingStudent && (
        <div className="student-card">
          <h2>Edit Student</h2>

          <form onSubmit={handleUpdate}>
            <div>
              <label>Student Name</label>
              <br />

              <input
                type="text"
                value={editingStudent.name}
                onChange={(event) =>
                  setEditingStudent({
                    ...editingStudent,
                    name: event.target.value,
                  })
                }
                required
              />
            </div>

            <div>
              <label>Roll Number</label>
              <br />

              <input
                type="text"
                value={editingStudent.rollNumber}
                onChange={(event) =>
                  setEditingStudent({
                    ...editingStudent,
                    rollNumber: event.target.value,
                  })
                }
                required
              />
            </div>

            <div>
              <label>Department</label>
              <br />

              <select
                value={editingStudent.department}
                onChange={(event) =>
                  setEditingStudent({
                    ...editingStudent,
                    department: event.target.value,
                  })
                }
                required
              >
                <option value="Computer Science">
                  Computer Science
                </option>

                <option value="Electronics">
                  Electronics
                </option>

                <option value="Mechanical">
                  Mechanical
                </option>

                <option value="Information Science">
                  Information Science
                </option>
              </select>
            </div>

            <div>
              <label>Year</label>
              <br />

              <select
                value={editingStudent.year}
                onChange={(event) =>
                  setEditingStudent({
                    ...editingStudent,
                    year: event.target.value,
                  })
                }
                required
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>

            <button type="submit">
              Update Student
            </button>

            <button
              type="button"
              onClick={() => setEditingStudent(null)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      <input
        type="text"
        placeholder="Search by name or roll number"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <select
        value={department}
        onChange={(event) => setDepartment(event.target.value)}
      >
        <option value="All">All Departments</option>
        <option value="Computer Science">
          Computer Science
        </option>
        <option value="Electronics">
          Electronics
        </option>
        <option value="Mechanical">
          Mechanical
        </option>
        <option value="Information Science">
          Information Science
        </option>
      </select>

      <h3>Students Found: {filteredStudents.length}</h3>

      {filteredStudents.length > 0 ? (
        filteredStudents.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <p>No students found.</p>
      )}
    </div>
  );
}

function AddStudent() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/students",
        {
          name,
          rollNumber,
          department,
          year,
        }
      );

      alert("Student added successfully!");

      setName("");
      setRollNumber("");
      setDepartment("");
      setYear("");

      navigate("/students");
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Failed to add student.");
    }
  };

  return (
    <div className="page-container">
      <h1>Add Student</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Student Name</label>
          <br />

          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter student name"
            required
          />
        </div>

        <div>
          <label>Roll Number</label>
          <br />

          <input
            type="text"
            value={rollNumber}
            onChange={(event) =>
              setRollNumber(event.target.value)
            }
            placeholder="Enter roll number"
            required
          />
        </div>

        <div>
          <label>Department</label>
          <br />

          <select
            value={department}
            onChange={(event) =>
              setDepartment(event.target.value)
            }
            required
          >
            <option value="">Select Department</option>

            <option value="Computer Science">
              Computer Science
            </option>

            <option value="Electronics">
              Electronics
            </option>

            <option value="Mechanical">
              Mechanical
            </option>

            <option value="Information Science">
              Information Science
            </option>
          </select>
        </div>

        <div>
          <label>Year</label>
          <br />

          <select
            value={year}
            onChange={(event) =>
              setYear(event.target.value)
            }
            required
          >
            <option value="">Select Year</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
          </select>
        </div>

        <button type="submit">
          Add Student
        </button>
      </form>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/students"
          element={<Students />}
        />

        <Route
          path="/add-student"
          element={<AddStudent />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;