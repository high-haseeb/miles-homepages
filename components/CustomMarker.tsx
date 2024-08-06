// CustomMarker.tsx
import React from "react";
import { Marker } from "@vis.gl/react-google-maps";

interface CustomMarkerProps {
  lat: number;
  lng: number;
  price: string;
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
    <svg width="66" height="80" viewBox="0 0 66 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="path-1-inside-1_275_12319" fill="white">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M41.651 64.8544C55.6802 61.0535 66 48.2319 66 33C66 14.7746 51.2254 0 33 0C14.7746 0 0 14.7746 0 33C0 48.2319 10.3198 61.0535 24.349 64.8544L33 79.8384L41.651 64.8544Z"/>
      </mask>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M41.651 64.8544C55.6802 61.0535 66 48.2319 66 33C66 14.7746 51.2254 0 33 0C14.7746 0 0 14.7746 0 33C0 48.2319 10.3198 61.0535 24.349 64.8544L33 79.8384L41.651 64.8544Z" fill="#019D45"/>
      <text x="33" y="38" dy=".35em" fill="white" font-size="14" font-family="Arial" text-anchor="middle">N${price}</text>
      <path d="M41.651 64.8544L41.0882 62.7772L40.2311 63.0094L39.7871 63.7784L41.651 64.8544ZM24.349 64.8544L26.2128 63.7783L25.7688 63.0093L24.9118 62.7771L24.349 64.8544ZM33 79.8384L31.1361 80.9145L33 84.1428L34.8638 80.9145L33 79.8384ZM63.8478 33C63.8478 47.2355 54.2033 59.2239 41.0882 62.7772L42.2138 66.9317C57.1571 62.8831 68.1522 49.2283 68.1522 33H63.8478ZM33 2.15217C50.0368 2.15217 63.8478 15.9632 63.8478 33H68.1522C68.1522 13.586 52.414 -2.15217 33 -2.15217V2.15217ZM2.15217 33C2.15217 15.9632 15.9632 2.15217 33 2.15217V-2.15217C13.586 -2.15217 -2.15217 13.586 -2.15217 33H2.15217ZM24.9118 62.7771C11.7967 59.2239 2.15217 47.2355 2.15217 33H-2.15217C-2.15217 49.2283 8.84285 62.8831 23.7862 66.9317L24.9118 62.7771ZM34.8638 78.7623L26.2128 63.7783L22.4851 65.9305L31.1361 80.9145L34.8638 78.7623ZM39.7871 63.7784L31.1361 78.7623L34.8638 80.9145L43.5148 65.9305L39.7871 63.7784Z" fill="#019D45" mask="url(#path-1-inside-1_275_12319)"/>
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
