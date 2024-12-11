import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { MapPin, Briefcase, DollarSign, Building } from "lucide-react";

interface Opportunity {
  id: number;
  title: string;
  description: string;
  location: string;
  salary?: string;
  type: string;
  createdAt: string;
  company: {
    firstName: string;
    lastName: string;
    companyName: string;
  };
}

interface Filters {
  type: string;
  location: string;
}

export function Opportunities() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState<Opportunity[]>([]);
  const [filters, setFilters] = useState<Filters>({
    type: "all",
    location: "",
  });

  const [uniqueLocations, setUniqueLocations] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchOpportunities();
  }, []);

  useEffect(() => {
    applyFilters();
    extractUniqueLocations();
  }, [opportunities, filters]);

  const fetchOpportunities = async () => {
    try {
      const response = await api.get("/opportunities");
      setOpportunities(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch opportunities",
        variant: "destructive",
      });
    }
  };

  const extractUniqueLocations = () => {
    const locations = [...new Set(opportunities.map((opp) => opp.location))];
    setUniqueLocations(locations);
  };

  const applyFilters = () => {
    let result = opportunities;

    if (filters.type !== "all") {
      result = result.filter((opportunity) => opportunity.type.toLowerCase() === filters.type);
    }

    if (filters.location) {
      result = result.filter((opportunity) => opportunity.location === filters.location);
    }

    setFilteredOpportunities(result);
  };

  const handleFilterChange = (filterName: keyof Filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      type: "all",
      location: "",
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Available Opportunities</h1>

      {/* Filters Container */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Type Filter */}
        <Select onValueChange={(value) => handleFilterChange("type", value)} value={filters.type}>
          <SelectTrigger>
            <SelectValue placeholder="Job Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Opportunities</SelectItem>
            <SelectItem value="internship">Internships</SelectItem>
            <SelectItem value="full-time">Full-Time</SelectItem>
          </SelectContent>
        </Select>

        {/* Location Filter */}
        <Select
          onValueChange={(value) => handleFilterChange("location", value)}
          value={filters.location}
        >
          <SelectTrigger>
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            {uniqueLocations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filters.type !== "all" || filters.location ? (
        <div className="mb-6">
          <button onClick={clearFilters} className="text-red-500 hover:underline">
            Clear All Filters
          </button>
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOpportunities.map((opportunity) => (
          <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{opportunity.title}</CardTitle>
              <div className="text-sm text-muted-foreground">
                <div className="flex items-center gap-2 mt-2">
                  <Building className="h-4 w-4" />
                  {opportunity.company.companyName ||
                    `${opportunity.company.firstName} ${opportunity.company.lastName}`}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin className="h-4 w-4" />
                  {opportunity.location}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Briefcase className="h-4 w-4" />
                  {opportunity.type}
                </div>
                {opportunity.salary && (
                  <div className="flex items-center gap-2 mt-1">
                    <DollarSign className="h-4 w-4" />
                    {opportunity.salary}
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {opportunity.description}
              </p>
            </CardContent>
          </Card>
        ))}

        {filteredOpportunities.length === 0 && (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            No opportunities match your current filters.
          </div>
        )}
      </div>
    </div>
  );
}
