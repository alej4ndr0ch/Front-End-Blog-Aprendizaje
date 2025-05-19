export default function PublicationForm({ onSubmit, initialData = {} }) {
  const [form, setForm] = useState({
    title: initialData.title || '',
    content: initialData.content || '',
    username: initialData.username || '',
    name: initialData.name || '',
  });

  const [image, setImage] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = e => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('content', form.content);
    formData.append('username', form.username);
    formData.append('name', form.name);

    if (image) {
      formData.append('image', image);
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
      <input name="title" placeholder="Título" value={form.title} onChange={handleChange} className="input" required />
      <textarea name="content" placeholder="Contenido" value={form.content} onChange={handleChange} className="textarea" required />
      <input name="username" placeholder="Usuario" value={form.username} onChange={handleChange} className="input" required />
      <input name="name" placeholder="Curso" value={form.name} onChange={handleChange} className="input" required />

      <input type="file" accept="image/*" onChange={handleImageChange} className="input" />
      
      <button type="submit" className="btn">Guardar</button>
    </form>
  );
}
