'use client'
'use client'
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FaMapPin } from 'react-icons/fa';

// Fix icon issue in leaflet
delete L.Icon.Default.prototype._getIconUrl;

const LocationMap = ({ center }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && center) {
      mapRef.current.setView(center, 12);
    }
  }, [center]);

  const customIcon = L.divIcon({
    html: `<div style="color: red; font-size: 24px;"><i class="fa fa-map-pin"></i></div>`,
    className: 'custom-marker',
    iconSize: [24, 24],
  });

  return (
    <MapContainer
      center={center || [37.7749, -122.4194]}
      zoom={12}
      scrollWheelZoom={false}
      className='h-[35vh] rounded-lg'
      ref={mapRef}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {center && (
        <Marker position={center} icon={customIcon}>
          <Popup>
            Selected Location
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default LocationMap;
