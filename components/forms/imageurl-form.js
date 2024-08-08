'use client'
import React, { useState } from 'react';
import { FiTrash } from "react-icons/fi";
import ImageUpload from './image-upload';

const ImageUrlForm = ({ images, setImages }) => {
  const handleUpload = (url) => {
    setImages((prev) => [...prev, url]);
  };

  const handleDelete = (url) => {
    setImages((prev) => prev.filter((image) => image !== url));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className='h-32 bg-neutral-400'>
      <ImageUpload onUpload={handleUpload} />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {images.map((url) => (
          <div key={url} className="relative">
            <img src={url} alt="Uploaded" className="w-full h-32 object-cover rounded" />
            <button
              onClick={() => handleDelete(url)}
              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
            >
              <FiTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUrlForm;
