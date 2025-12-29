import NotFound from '../pages/not-found'
import Authenticated from '../middleware/Authenticated'
import Home from '../pages/Home'
import Notes from '../pages/Notes'
import NotesCreate from '../pages/NotesCreate'
import NotesDelete from '../pages/NotesDelete'
import NotesEdit from '../pages/NotesEdit'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from '../components/cms/Navbar'
import Footer from '../components/cms/Footer'

export default function index() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />

                <Route element={<Authenticated />}>
                    <Route path="/notes" element={<Notes />} />
                    <Route path="/notes/:id/edit" element={<NotesEdit />} />
                    <Route path="/notes/create" element={<NotesCreate />} />
                    <Route path="/notes/:id/delete" element={<NotesDelete />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}
