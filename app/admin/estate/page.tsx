"use client";
import { useState } from "react";

const Estate = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const handleFileUpload = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          resolve(reader.result.toString());
        } else {
          reject(new Error("Failed to convert file to base64"));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true); // Set loading state to true

    if (!title || !description || (!image && !video)) {
      setError("All fields are required");
      setLoading(false); // Set loading state to false
      return;
    }

    try {
      const imageBase64 = image ? await handleFileUpload(image) : null;
      const videoBase64 = video ? await handleFileUpload(video) : null;

      const payload = {
        title,
        description,
        image: imageBase64 ? imageBase64.split(",")[1] : null, // Remove the Data URL prefix to keep only the base64 string
        video: videoBase64 ? videoBase64.split(",")[1] : null,
      };

      const response = await fetch("https://jacinhomes-api.vercel.app/api/catalog/estate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSuccess("Estate uploaded successfully");
      } else {
        const data = await response.json();
        setError(data.message || "Upload failed");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Set loading state to false
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
            const file = e.target.files?.[0] ?? null;
            setImage(file);
          }}
          className="block w-full p-2 mb-4 border"
          accept="image/*"
        />
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files?.[0] ?? null;
            setVideo(file);
          }}
          className="block w-full p-2 mb-4 border"
          accept="video/*"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded flex items-center justify-center"
          disabled={loading} // Disable button when loading
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            "Upload"
          )}
        </button>
      </form>
    </div>
  );
};

export default Estate;
