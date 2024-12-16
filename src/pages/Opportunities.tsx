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
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

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
  field: string;
  salary: string;
}

export function Opportunities() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState<Opportunity[]>([]);

  const [filters, setFilters] = useState<Filters>({
    type: searchParams.get("type") || "all",
    location: searchParams.get("location") || "",
    field: searchParams.get("field") || "all",
    salary: searchParams.get("salary") || "all",
  });

  const [uniqueLocations, setUniqueLocations] = useState<string[]>([]);
  const [uniqueFields, setUniqueFields] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchOpportunities();
  }, []);

  useEffect(() => {
    applyFilters();
    extractUniqueFilters();

    const params: Record<string, string> = {};
    if (filters.type !== "all") params["type"] = filters.type;
    if (filters.location) params["location"] = filters.location;
    if (filters.field !== "all") params["field"] = filters.field;
    if (filters.salary !== "all") params["salary"] = filters.salary;

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

  const extractUniqueFilters = () => {
    const locations = [...new Set(opportunities.map((opp) => opp.location))];
    const fields = [...new Set(opportunities.map((opp) => opp.company.companyName))];
    setUniqueLocations(locations);
    setUniqueFields(fields);
  };

  const applyFilters = () => {
    let result = opportunities;

    if (filters.type !== "all") {
      result = result.filter(
        (opportunity) => opportunity.type.toLowerCase() === filters.type.toLowerCase()
      );
    }

    if (filters.location) {
      result = result.filter((opportunity) => opportunity.location === filters.location);
    }

    if (filters.field !== "all") {
      result = result.filter((opportunity) => opportunity.company.companyName === filters.field);
    }

    if (filters.salary !== "all") {
      result = result.filter((opportunity) => {
        const salary = parseInt(opportunity.salary || "0", 10);
        const filterSalary = parseInt(filters.salary, 10);
        return salary >= filterSalary;
      });
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
      field: "all",
      salary: "all",
    });
    setSearchParams({});
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Available Opportunities</h1>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

        <Select onValueChange={(value) => handleFilterChange("field", value)} value={filters.field}>
          <SelectTrigger>
            <SelectValue placeholder="Field (Company)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Fields</SelectItem>
            {uniqueFields.map((field) => (
              <SelectItem key={field} value={field}>
                {field}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => handleFilterChange("salary", value)}
          value={filters.salary}
        >
          <SelectTrigger>
            <SelectValue placeholder="Minimum Salary (BGN)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Salary</SelectItem>
            <SelectItem value="500">500+ BGN</SelectItem>
            <SelectItem value="1000">1000+ BGN</SelectItem>
            <SelectItem value="2000">2000+ BGN</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filters.type !== "all" ||
      filters.location ||
      filters.field !== "all" ||
      filters.salary !== "all" ? (
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
              <CardTitle>
                <Link to={`/opportunities/${opportunity.id}`} className="hover:underline">
                  {opportunity.title}
                </Link>
              </CardTitle>
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
