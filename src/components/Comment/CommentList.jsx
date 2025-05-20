import { useEffect, useState } from "react";
import { getComments  } from "../../services/api";
import CommentForm from "./CommentForm";

export default function CommentList({ publicationId }) {
    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
        try {
            const res = await getComments(publicationId);
            setComments(res.comments || []);
        } catch (error) {
            console.error("Error al obtener comentarios:", error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [publicationId]);

    return (
        <div className="mt-4">
            <h3 className="font-semibold">Comentarios</h3>
            <CommentForm publicationId={publicationId} onCommentAdded={fetchComments} />
            {comments.length === 0 && <p>No hay comentarios aún.</p>}
            {comments.map((comment) => (
                <div key={comment._id} className="border-b border-gray-600 py-2">
                    <p className="text-sm">{comment.text}</p>
                    <span className="text-xs text-gray-400">
                        — {comment?.user?.username || "Anónimo"}
                    </span>
                </div>
            ))}
        </div>
    );
}
