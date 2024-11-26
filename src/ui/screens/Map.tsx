import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = () => {
  const position = { lat: 10.597032, lng: -66.930431 };

  return (
    <div id="map" className="fixed-top">
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} autoPan>
          <Popup>Marcador</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
