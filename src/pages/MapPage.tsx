import { FC, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import api from "@/lib/api";

const MapPage: FC<MapPageProps> = () => {
  const [partnersCoordinates, setPartnersCoordinates] = useState<PartnerCoordanes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAllPartnersCoordinates = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/users/all-partnes-coordinates`);
      setPartnersCoordinates(response.data as PartnerCoordanes[]);
    } catch (error) {
      console.error("Failed to fetch partners coordinates", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPartnersCoordinates();
  }, []);

  return (
    <div className="pt-16 flex justify-center items-center">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <MapContainer
          center={[42.7339, 25.4858]}
          zoom={8}
          scrollWheelZoom={true}
          className="w-10/12 h-[500px] sm:h-[700px] z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {partnersCoordinates &&
            partnersCoordinates.map((partner) => {
              if (partner.companyCoordinates) {
                const coordinates = partner.companyCoordinates.split(",");
                const latitude = Number(coordinates[0]);
                const longitude = Number(coordinates[1]);
                return (
                  <Marker position={[latitude, longitude]}>
                    <Popup>{partner.companyName}</Popup>
                  </Marker>
                );
              }
            })}
        </MapContainer>
      )}
    </div>
  );
};

export default MapPage;

interface MapPageProps {}

interface PartnerCoordanes {
  id: string;
  companyName: string;
  companyCoordinates?: string;
}
