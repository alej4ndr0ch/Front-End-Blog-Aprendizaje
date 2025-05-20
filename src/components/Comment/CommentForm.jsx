import { useState } from "react";
import { addComment } from "../../services";

const CommentForm = ({ publicationId, onCommentAdded }) => {
  const [username, setUsername] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim() || !text.trim()) return;

    try {
      const res = await addComment(publicationId, { username, text });
      if (res.success) {
        setUsername("");
        setText("");
        onCommentAdded?.();
      } else {
        console.error("Error al agregar comentario:", res.message);
      }
    } catch (error) {
      console.error("Error al enviar comentario:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form-css">
      <input
        type="text"
        placeholder="Tu nombre"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <textarea
        placeholder="Escribe un comentario..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <button type="submit">Comentar</button>
    </form>
  );
};

export default CommentForm;
