import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

export default function PublicationDetails({ publication }) {
    return (
        <div>
            <h2>{publication.title}</h2>
            <p>{publication.content}</p>

            <CommentForm
                publicationId={publication._id}
                onCommentAdded={() => { }}
            />
            <CommentList publicationId={publication._id} />
        </div>
    );
}
