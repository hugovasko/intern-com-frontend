import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState<Opportunity[]>([]);
  
  // Correctly initialize the filters based on URL query params
  const [filters, setFilters] = useState<Filters>({
    type: searchParams.get("type") || "all",  // Initialize type filter from query params
    location: searchParams.get("location") || "",
  });

  const [uniqueLocations, setUniqueLocations] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Fetch opportunities when component loads
    fetchOpportunities();
  }, []);

  useEffect(() => {
    // Apply filters and update the filtered opportunities whenever opportunities or filters change
    applyFilters();
    extractUniqueLocations();

    // Update the URL query parameters based on the current filters
    const params: Record<string, string> = {};
    if (filters.type !== "all") params["type"] = filters.type;
    if (filters.location) params["location"] = filters.location;

    setSearchParams(params, { replace: true });
  }, [opportunities, filters, setSearchParams]);

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

    // Filter by type: only show internship if 'type' is 'internship' in the URL
    if (filters.type !== "all") {
      result = result.filter((opportunity) => opportunity.type.toLowerCase() === filters.type.toLowerCase());
    }

    // Filter by location
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
    setSearchParams({});
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Available Opportunities</h1>

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
        <Select onValueChange={(value) => handleFilterChange("location", value)} value={filters.location}>
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
