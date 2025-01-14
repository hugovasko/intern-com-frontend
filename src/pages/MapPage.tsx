import { FC, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Building, Mail, Phone, MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import api from "@/lib/api";

interface MapPageProps {}

interface PartnerCoordinates {
  id: string;
  companyName: string;
  companyCoordinates?: string;
  phoneNumber?: string;
  email: string;
}

interface LocationDetails {
  [key: string]: string | undefined;
}

const MapPage: FC<MapPageProps> = () => {
  const [partnersCoordinates, setPartnersCoordinates] = useState<PartnerCoordinates[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPartners, setFilteredPartners] = useState<PartnerCoordinates[]>([]);
  const [locationDetails, setLocationDetails] = useState<LocationDetails>({});

  const fetchLocationName = async (lat: number, lon: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`
      );
      const data = await response.json();
      return (
        data.address.city ||
        data.address.town ||
        data.address.county ||
        data.address.state ||
        "Unknown Location"
      );
    } catch (error) {
      console.error("Error fetching location name:", error);
      return "Unknown Location";
    }
  };

  const handleMarkerClick = async (coordinates: string) => {
    if (locationDetails[coordinates]) return;

    const [lat, lon] = coordinates.split(",").map(Number);
    const locationName = await fetchLocationName(lat, lon);

    setLocationDetails((prev) => ({
      ...prev,
      [coordinates]: locationName,
    }));
  };

  const fetchAllPartnersCoordinates = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/users/all-partnes-coordinates`);
      const partners = response.data as PartnerCoordinates[];
      setPartnersCoordinates(partners);
      setFilteredPartners(partners);
    } catch (error) {
      console.error("Failed to fetch partners coordinates", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPartnersCoordinates();
  }, []);

  useEffect(() => {
    const filtered = partnersCoordinates.filter((partner) =>
      partner.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPartners(filtered);
  }, [searchTerm, partnersCoordinates]);

  const defaultCenter: [number, number] = [42.7339, 25.4858]; // Bulgaria's center

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="space-y-4">
          <Skeleton className="h-12 w-full max-w-sm" />
          <Skeleton className="h-[700px] w-full rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">Company Locations</h1>
            <p className="text-muted-foreground">Find partner companies across Bulgaria</p>
          </div>
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-full sm:w-64"
            />
          </div>
        </div>

        <Card>
          <MapContainer
            center={defaultCenter}
            zoom={8}
            scrollWheelZoom={true}
            className="w-full h-[600px] rounded-lg z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredPartners.map((partner) => {
              if (partner.companyCoordinates) {
                const coordinates = partner.companyCoordinates.split(",");
                const latitude = Number(coordinates[0]);
                const longitude = Number(coordinates[1]);

                return (
                  <Marker
                    key={partner.id}
                    position={[latitude, longitude]}
                    eventHandlers={{
                      click: () => handleMarkerClick(partner.companyCoordinates!),
                    }}
                  >
                    <Popup className="w-64">
                      <div className="py-2">
                        <div className="flex justify-between gap-2 mb-3">
                          <div className="flex items-center justify-center gap-2">
                            <Building className="h-4 w-4 flex-shrink-0" />
                            <h3 className="font-medium">{partner.companyName}</h3>
                          </div>
                          <Badge variant="secondary">
                            <MapPin className="h-3 w-3 mr-1" />
                            {locationDetails[partner.companyCoordinates] || "Loading..."}
                          </Badge>
                        </div>

                        {partner.email && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <Mail className="h-4 w-4" />
                            <a href={`mailto:${partner.email}`} className="hover:underline">
                              {partner.email}
                            </a>
                          </div>
                        )}

                        {partner.phoneNumber && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="h-4 w-4" />
                            <a href={`tel:${partner.phoneNumber}`} className="hover:underline">
                              {partner.phoneNumber}
                            </a>
                          </div>
                        )}
                      </div>
                    </Popup>
                  </Marker>
                );
              }
              return null;
            })}
          </MapContainer>
        </Card>

        {filteredPartners.length === 0 && (
          <Card className="mt-4">
            <CardContent className="p-6 text-center text-muted-foreground">
              No companies found matching your search.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MapPage;
