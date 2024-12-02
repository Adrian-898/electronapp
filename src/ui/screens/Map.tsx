import { useState, useCallback, memo } from "react";
import {
  // DirectionsRenderer,
  // DirectionsService,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
// import getErrorMessage from "../../utils/getErrorMessage";

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

function Mapa() {
  // Coordenadas donde se centra el mapa al cargar
  const [position, _setPosition] = useState<Lugar>(lugares[0]);

  // instancia del mapa
  const [_map, setMap] = useState<google.maps.Map | null>(null);

  // configuración para renderizar el mapa una vez esté cargado
  const { isLoaded } = useJsApiLoader({
    id: "la-guaira-map-script",
    googleMapsApiKey: "AIzaSyB-HqJBWka1qdhm5ZX7p5G1WFfOdoeBrSw",
    language: "es",
    region: "VE",
  });

  const onLoad = useCallback((map: any) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback((_map: google.maps.Map) => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div className="fixed-top" style={{ bottom: 142.333 }}>
      <GoogleMap
        id="la-guaira-map"
        mapContainerStyle={{ height: "100%" }}
        center={position.coords}
        zoom={16}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          clickableIcons: false,
          controlSize: 100,
          fullscreenControl: false,
          keyboardShortcuts: false,
          streetViewControl: false,
        }}
      >
        {lugares.map((lugar, index) => {
          return (
            <Marker key={index} position={lugar.coords} title={lugar.name} />
          );
        })}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default memo(Mapa);
