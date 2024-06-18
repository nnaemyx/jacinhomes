"use client"
import { useState, useEffect } from "react";
import axios from "axios";

interface FlyerPromo {
  _id: string;
  title: string;
  description: string;
  image: string;
  type: 'flyer' | 'promo';
}

const ManageFlyerPromo = () => {
  const [flyerPromos, setFlyerPromos] = useState<FlyerPromo[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState<File | null>(null);
  const [type, setType] = useState<'flyer' | 'promo'>('flyer');

  useEffect(() => {
    const fetchFlyerPromos = async () => {
      const response = await axios.get("https://jacinhomes-api.vercel.app/api/catalog/flyers");
      setFlyerPromos(response.data);
    };
    fetchFlyerPromos();
  }, []);

  const handleEdit = (flyerPromo: FlyerPromo) => {
    setEditMode(true);
    setEditId(flyerPromo._id);
    setTitle(flyerPromo.title);
    setDescription(flyerPromo.description);
    setType(flyerPromo.type);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://jacinhomes-api.vercel.app/api/${id}flyer`);
      setFlyerPromos(flyerPromos.filter((flyerPromo) => flyerPromo._id !== id));
    } catch (error) {
      console.error("Failed to delete flyer/promo", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!media) {
      alert("Image is required.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(media);
    reader.onloadend = async () => {
      try {
        const base64Media = reader.result?.toString().split(",")[1];
        const response = await axios.put(`https://jacinhomes-api.vercel.app/api/${editId}/flyer`, {
          title,
          description,
          image: base64Media,
          type,
        });

        if (response.status === 200) {
          setFlyerPromos(flyerPromos.map((flyerPromo) =>
            flyerPromo._id === editId ? response.data : flyerPromo
          ));
          setEditMode(false);
          setEditId(null);
          setTitle("");
          setDescription("");
          setMedia(null);
        } else {
          alert("Failed to update flyer/promo.");
        }
      } catch (error) {
        console.error("Error updating flyer/promo", error);
        alert("Error updating flyer/promo.");
      }
    };
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Flyers and Promos</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Title</th>
            <th className="py-2">Description</th>
            <th className="py-2">Type</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {flyerPromos.map((flyerPromo) => (
            <tr key={flyerPromo._id}>
              <td className="border px-4 py-2">{flyerPromo.title}</td>
              <td className="border px-4 py-2">{flyerPromo.description}</td>
              <td className="border px-4 py-2">{flyerPromo.type}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 mr-2"
                  onClick={() => handleEdit(flyerPromo)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2"
                  onClick={() => handleDelete(flyerPromo._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editMode && (
        <form onSubmit={handleSubmit} className="mt-4">
          <h2 className="text-xl font-bold mb-2">Edit Flyer/Promo</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as 'flyer' | 'promo')}
              className="w-full p-2 border border-gray-300"
              required
            >
              <option value="flyer">Flyer</option>
              <option value="promo">Promo</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setMedia(file);
                }
              }}
              className="w-full p-2 border border-gray-300"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2"
          >
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
};

export default ManageFlyerPromo;
