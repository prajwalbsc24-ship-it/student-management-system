function StudentCard({ student, onEdit, onDelete }) {
  const handleEdit = () => {
    onEdit(student);
  };

  const handleDelete = () => {
    onDelete(student.id);
  };

  return (
    <div className="student-card">
      <h3>{student.name}</h3>

      <p>Roll Number: {student.rollNumber}</p>
      <p>Department: {student.department}</p>
      <p>Year: {student.year}</p>

      <br />

      <button onClick={handleEdit}>Edit</button>

      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default StudentCard;