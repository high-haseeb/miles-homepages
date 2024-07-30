// CustomMarker.tsx
import React from "react";
import { Marker } from "@vis.gl/react-google-maps";

interface CustomMarkerProps {
  lat: number;
  lng: number;
  price: number;
  onClick: () => void;
}

const CustomMarker: React.FC<CustomMarkerProps> = ({
  lat,
  lng,
  price,
  onClick,
}) => {
  const iconUrl =
    "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="66" height="79" viewBox="0 0 66 79">
      <circle cx="33" cy="33" r="30" fill="#4CAF50" />
      <polygon points="33,63 28,73 38,73" fill="#4CAF50" />
      <text x="33" y="38" dy=".35em" fill="white" font-size="12" font-family="Arial" text-anchor="middle">${price}</text>
    </svg>
  `);

  return (
    <Marker
      position={{ lat, lng }}
      icon={{
        url: iconUrl,
        scaledSize: new window.google.maps.Size(50, 50),
      }}
      onClick={onClick}
    />
  );
};

export default CustomMarker;
