"use client"
import { useState } from 'react';

const Estate = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !description || !image) {
      setError('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);

    try {
      const response = await fetch('/api/estate', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSuccess('Estate uploaded successfully');
      } else {
        const data = await response.json();
        setError(data.message || 'Upload failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl mb-4">Upload Estate</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="block w-full p-2 mb-4 border"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="block w-full p-2 mb-4 border"
        ></textarea>
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setImage(e.target.files[0] ?? null); // Explicitly handle the case where file might be undefined
            }
          }}
          className="block w-full p-2 mb-4 border"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Upload
        </button>
      </form>
    </div>
  );
};

export default Estate;
