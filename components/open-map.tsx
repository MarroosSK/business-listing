import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import React from "react";
import "leaflet/dist/leaflet.css";
import icon from "../public/icon.png";
import L from "leaflet";
import "./styles.css";

const OpenMap = ({
  lon,
  lat,
  name,
}: {
  lon: number;
  lat: number;
  name: string;
}) => {
  console.log(lon, lat);

  const customIcon = new L.Icon({
    iconUrl: icon.src,
    iconSize: [25, 35],
    iconAnchor: [5, 30],
  });

  function MapView() {
    let map = useMap();
    map.setView([lat, lon], map.getZoom());

    return null;
  }

  return (
    <>
      <MapContainer center={[lat, lon]} zoom={12} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> 
        contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker icon={customIcon} position={[lat, lon]}>
          <Popup>{name}</Popup>
        </Marker>
        <MapView />
      </MapContainer>
    </>
  );
};

export default OpenMap;
