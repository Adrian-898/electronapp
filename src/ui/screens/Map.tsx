import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { Map } from "leaflet";
import "leaflet/dist/leaflet.css";

const Mapa = () => {
  const position = { lat: 10.597032, lng: -66.930431 };

  // estado del ref del mapa en el DOM, se usa para corregir un error de leaflet.
  const [map, setMap] = useState<Map | null>(null);

  // esta funcion corrige un error de leaflet que no centra el mapa al montar el componente y aparece todo en la esquina superior izquierda del contenedor.
  const MapResize = () => {
    if (map) {
      useEffect(() => {
        console.log("Cargando el mapa correctamente...");
        const i = setInterval(() => {
          map.invalidateSize(true);
        }, 200);
        return () => clearInterval(i);
      }, [map]);
    } else {
      return null;
    }
  };

  return (
    <div id="map" className="fixed-top" style={{ bottom: 142.333 }}>
      <MapContainer
        ref={setMap}
        center={position}
        zoom={16}
        scrollWheelZoom={false}
        className="h-100"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <MapResize />
      </MapContainer>
    </div>
  );
};

export default Mapa;
