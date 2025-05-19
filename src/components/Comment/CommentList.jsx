import { useEffect, useState } from "react";

export default function CommentList({ publicationId }) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchComments();
    }, [publicationId]);

    return (
        <div className="mt-4">
            <h3 className="font-semibold">Comentarios</h3>
            <div className="mt-4">
                <CommentForm publicationId={publication._id} />
                <CommentList publicationId={publication._id} />
            </div>
            {comments.length === 0 && <p>No hay comentarios aún.</p>}
            {comments.map((comment) => (
                <div key={comment._id} className="border-b border-gray-600 py-2">
                    <p className="text-sm">{comment.text}</p>
                    <span className="text-xs text-gray-400">— {comment?.user?.username || "Anónimo"}</span>
                </div>
            ))}
        </div>
    );
}
