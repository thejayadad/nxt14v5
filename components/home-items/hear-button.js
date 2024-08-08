'use client'
import { favorite, removeFavorite } from '@/lib/actions/favorite/favorite-listing';
import React, { useState, useEffect } from 'react';
import { FiHeart } from 'react-icons/fi';

const HeartButton = ({ listingId, currentUser }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (currentUser && currentUser.favoriteIds) {
      setIsFavorited(currentUser.favoriteIds.includes(listingId));
    }
  }, [currentUser, listingId]);

  const toggleFavorite = async () => {
    try {
      if (isFavorited) {
        await removeFavorite({ listingId });
        setIsFavorited(false);
      } else {
        await favorite({ listingId });
        setIsFavorited(true);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <div
      onClick={toggleFavorite}
      className={`p-2 rounded-full shadow ${isFavorited ? 'bg-red-500' : 'bg-white'}`}
    >
      <FiHeart className={`text-gray-600 ${isFavorited ? 'text-white' : 'text-gray-600'}`} />
    </div>
  );
};

export default HeartButton;
