import { useNavigate } from "react-router-dom";
import PublicationCard from "./PublicationCard";

export const Publications = ({ publications }) => {
    const navigate = useNavigate();

    const handleNavigateToPublication = (id) => {
        navigate(`/publications/${id}`);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {publications.map((publication) => (
                <div key={publication._id} onClick={() => handleNavigateToPublication(publication._id)} className="cursor-pointer">
                    <PublicationCard publication={publication} />
                </div>
            ))}
        </div>
    );
};
