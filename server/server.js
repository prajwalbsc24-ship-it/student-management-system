const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let students = [
  {
    id: 1,
    name: "Rahul Kumar",
    rollNumber: "CS001",
    department: "Computer Science",
    year: "3rd Year",
  },
  {
    id: 2,
    name: "Ananya Sharma",
    rollNumber: "CS002",
    department: "Computer Science",
    year: "2nd Year",
  },
  {
    id: 3,
    name: "Arjun Reddy",
    rollNumber: "EC001",
    department: "Electronics",
    year: "3rd Year",
  },
  {
    id: 4,
    name: "Sneha Patil",
    rollNumber: "ME001",
    department: "Mechanical",
    year: "2nd Year",
  },
  {
    id: 5,
    name: "Kiran Gowda",
    rollNumber: "IS001",
    department: "Information Science",
    year: "4th Year",
  },
];

// GET all students
app.get("/api/students", (req, res) => {
  res.json(students);
});

// GET one student
app.get("/api/students/:id", (req, res) => {
  const student = students.find(
    (student) => student.id === Number(req.params.id)
  );

  if (!student) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  res.json(student);
});

// ADD student
app.post("/api/students", (req, res) => {
  const { name, rollNumber, department, year } = req.body;

  if (!name || !rollNumber || !department || !year) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const newStudent = {
    id: students.length + 1,
    name,
    rollNumber,
    department,
    year,
  };

  students.push(newStudent);

  res.status(201).json({
    message: "Student added successfully",
    student: newStudent,
  });
});

// UPDATE student
app.put("/api/students/:id", (req, res) => {
  const studentId = Number(req.params.id);
  const { name, rollNumber, department, year } = req.body;

  const studentIndex = students.findIndex(
    (student) => student.id === studentId
  );

  if (studentIndex === -1) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  if (!name || !rollNumber || !department || !year) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  students[studentIndex] = {
    id: studentId,
    name,
    rollNumber,
    department,
    year,
  };

  res.json({
    message: "Student updated successfully",
    student: students[studentIndex],
  });
});

// DELETE student
app.delete("/api/students/:id", (req, res) => {
  const studentId = Number(req.params.id);

  const studentExists = students.some(
    (student) => student.id === studentId
  );

  if (!studentExists) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  students = students.filter(
    (student) => student.id !== studentId
  );

  res.json({
    message: "Student deleted successfully",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});