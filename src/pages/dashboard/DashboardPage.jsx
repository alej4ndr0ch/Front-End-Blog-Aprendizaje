import { useEffect, useState } from "react";
import { Navbar } from "../../components/navbars/Navbar";
import { addComment } from "../../services/api";
import { Sidebar } from "../../components/navbars/Sidebar";
import CommentForm from "../../components/Comment/CommentForm";
import PublicationCard from "../../components/publication/PublicationCard";
import Eclipse from "../../assets/Eclipse.mp4";

import {
  getCourses,
  getPublications,
  getPublicationsByCourse,
} from "../../services/api";

export const DashboardPage = () => {
  const [publications, setPublications] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await getCourses();
      if (!res.error) {
        setCourses(res.data.courses || []);
      } else {
        setError("Error al cargar los cursos.");
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    fetchPublications();
  }, [selectedCourse]);

  const handleCommentSubmit = async (publicationId, commentData) => {
    try {
      const response = await addComment(publicationId, commentData);
      if (response.success) {
        console.log("Comentario agregado exitosamente");
      } else {
        console.error("Error al agregar comentario:", response.message);
      }
    } catch (error) {
      console.error("Error en handleCommentSubmit:", error);
    }
  };

  const fetchPublications = async () => {
    setLoading(true);
    setError("");

    try {
      const res = selectedCourse
        ? await getPublicationsByCourse(selectedCourse)
        : await getPublications();

      if (!res.error) {
        const pubs = res.data.publications || [];
        setPublications(pubs.slice(0, 5));
      } else {
        throw new Error("Error al obtener publicaciones");
      }
    } catch (err) {
      setError("No se pudieron cargar las publicaciones.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderCourseFilter = () => (
    <div className="course-filter mb-6">
      <h2 className="text-lg font-bold mb-2">Filtrar por curso</h2>
      <select
        value={selectedCourse}
        onChange={(e) => setSelectedCourse(e.target.value)}
        className="border p-2 rounded mb-6"
      >
        <option value="">-- Todos los cursos --</option>
        {courses.map((course) => (
          <option key={course._id} value={course._id}>
            {course.name}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="main-content">
        <div className="page-container">
          <div className="publication-card">
            <div className="video-background">
              <video autoPlay loop muted playsInline>
                <source src={Eclipse} type="video/mp4" />
              </video>
            </div>

            <h1 className="text-3xl font-bold mb-6">Publicaciones</h1>
            {renderCourseFilter()}

            {loading && <p>Cargando publicaciones...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && publications.length === 0 && (
              <p>No hay publicaciones disponibles.</p>
            )}

            <div className="publication-card-2">
              {publications.map((pub) => (
                <div key={pub._id} className="mb-6">
                  <PublicationCard publication={pub} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
