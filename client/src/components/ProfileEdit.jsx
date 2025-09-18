import React, { useState } from "react";

const ProfileEdit = ({ user, onSave }) => {
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [photo, setPhoto] = useState(user.photo || "");
  const [preview, setPreview] = useState(user.photo || "");

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, email, photo });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <div className="flex flex-col items-center gap-2">
        <label htmlFor="photo" className="cursor-pointer">
          <img
            src={preview || "https://ui-avatars.com/api/?name=" + name}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-2 border-purple-400"
          />
        </label>
        <input
          id="photo"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePhotoChange}
        />
      </div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="p-2 border rounded"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="p-2 border rounded"
        disabled
      />
      <button
        type="submit"
        className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700 font-semibold"
      >
        Save Changes
      </button>
    </form>
  );
};

export default ProfileEdit;
