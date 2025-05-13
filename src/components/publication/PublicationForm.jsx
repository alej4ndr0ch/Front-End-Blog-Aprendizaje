import { useState } from 'react';

export default function PublicationForm({ onSubmit, initialData = {} }) {
  const [form, setForm] = useState({
    title: initialData.title || '',
    content: initialData.content || '',
    username: initialData.username || '',
    name: initialData.name || '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="title" placeholder="Título" value={form.title} onChange={handleChange} className="input" required />
      <textarea name="content" placeholder="Contenido" value={form.content} onChange={handleChange} className="textarea" required />
      <input name="username" placeholder="Usuario" value={form.username} onChange={handleChange} className="input" required />
      <input name="name" placeholder="Curso" value={form.name} onChange={handleChange} className="input" required />
      <button type="submit" className="btn">Guardar</button>
    </form>
  );
}
