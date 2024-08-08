'use client'
import { useRouter } from 'next/navigation';
import React, { useMemo } from 'react';
import { format } from 'date-fns';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';
import HeartButton from './hear-button';

const ListingCard = ({ data, currentUser, reservation, onAction, disabled, actionLabel, actionId }) => {
  const router = useRouter();

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  const handleAction = (e) => {
    e.stopPropagation();
    if (disabled) {
      return;
    }
    onAction?.(actionId);
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* <Link href={`/listing/${data.id}`}> */}
        <div className="relative">
          <img className="w-full h-48 object-cover" src={data.imageSrc} alt={data.title} />
          <div className="absolute top-2 right-2">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
      {/* </Link> */}
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{data.title}</h2>
          <div className="flex items-center space-x-1">
            <FaStar className="text-yellow-500" />
            <span className="text-sm text-gray-600">{data.rating}</span>
          </div>
        </div>
        <p className="text-sm text-gray-500">{data.category}</p>
        <p className="text-sm text-gray-500">{reservationDate || data.location}</p>
        <div className="mt-4 flex justify-between items-center">
          <div className="text-lg font-bold">${price}/day</div>
          {onAction && (
            <button
              onClick={handleAction}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-300"
              disabled={disabled}
            >
              {actionLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
