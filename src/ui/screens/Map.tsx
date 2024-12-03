import { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

// objeto para almacenar informacion de los lugares que se quiere marcar en el mapa
type Lugar = {
  coords: { lat: number; lng: number };
  name: string | undefined;
};

// De aqui se obtienen las coordenadas y el nombre de los lugares para crear los Pins en el mapa
const lugares: Lugar[] = [
  {
    coords: { lat: 10.598246, lng: -66.930307 },
    name: "Lugar 1",
  },
  {
    coords: { lat: 10.60062, lng: -66.922652 },
    name: "Lugar 2",
  },
];

const Mapa = () => {
  const [open, setOpen] = useState(false);

  return (
    <APIProvider apiKey="AIzaSyB-HqJBWka1qdhm5ZX7p5G1WFfOdoeBrSw">
      <div className="fixed-top" style={{ bottom: 142.333 }}>
        <Map
          mapId="4784455d1ad7fcca"
          zoom={16}
          center={lugares[0].coords}
          style={{ height: "100%" }}
        >
          <AdvancedMarker
            position={lugares[0].coords}
            onClick={() => setOpen(true)}
          >
            <Pin
              background={"lightblue"}
              glyphColor={"#001f7e"}
              borderColor={"#001f7e"}
            />
          </AdvancedMarker>
          {open && <InfoWindow anchor={}></InfoWindow>}
        </Map>
      </div>
    </APIProvider>
  );
};

export default Mapa;
