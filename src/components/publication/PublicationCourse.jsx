import React, { useEffect, useState } from "react";
import axios from "axios";
import PublicationCard from "./PublicationCard";

const FilteredPublications = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    axios.get("/api/courses")
      .then(res => setCourses(res.data.courses))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (!selectedCourse) return;

    axios.get(`/api/publications/course/${selectedCourse}`) 
      .then(res => setPublications(res.data.publications))
      .catch(err => console.error(err));
  }, [selectedCourse]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Filtrar por Curso</h2>

      <select
        value={selectedCourse}
        onChange={(e) => setSelectedCourse(e.target.value)}
        className="border p-2 rounded mb-6"
      >
        <option value="">-- Selecciona un curso --</option>
        {courses.map((course) => (
          <option key={course._id} value={course.name}>
            {course.name}
          </option>
        ))}
      </select>

      <div>
        {publications.length === 0 && selectedCourse && (
          <p>No hay publicaciones para este curso.</p>
        )}
        {publications.map((publication) => (
          <PublicationCard key={publication._id} publication={publication} />
        ))}
      </div>
    </div>
  );
};

export default FilteredPublications;
