import { Route, Routes } from 'react-router-dom';
import { Publications } from '../../publication/Publications'
import { getPublications } from '../../services';

export const Content = ({ publications }) => {
    return (
        <div className="content-container">
            <Routes>
                <Route path='publications' element={<Publications publications={publications}/>}/>
            </Routes>
        </div>
    )
}