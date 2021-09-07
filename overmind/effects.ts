import INote from '../interfaces/INote';
import http from '../utils/http';

export const api = {
  getAllNotes() {
    return http.get('/note');
  },
  getAllNotesByTag(tag: string) {
    return http.get(`note/tag/${tag}`);
  },
  createNote(payload: INote) {
    return http.post('/note', {...payload});
  },
  getAllTags() {
    return http.get('/tags');
  },
  deleteNote(id: number) {
    return http.delete(`/note/${id}`);
  },
  updateNote(payload: INote) {
    return http.put(`/note/${payload.id}`, {...payload, id: undefined});
  },
};
