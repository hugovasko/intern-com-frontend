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
import { Input } from "@/components/ui/input";

interface Opportunity {
  id: number;
  title: string;
  description: string;
  location: string;
  salary?: string;
  type: string;
  field: string;
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
  minSalary: string;
}

export function Opportunities() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState<Opportunity[]>([]);
  const [filters, setFilters] = useState<Filters>({
    type: "all",
    location: "",
    field: "",
    minSalary: "",
  });

  // Fetch unique values for dropdowns
  const [uniqueLocations, setUniqueLocations] = useState<string[]>([]);
  const [uniqueFields, setUniqueFields] = useState<string[]>([]);

  const { toast } = useToast();

  useEffect(() => {
    fetchOpportunities();
  }, []);

  useEffect(() => {
    applyFilters();
    extractUniqueValues();
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

  const extractUniqueValues = () => {
    const locations = [...new Set(opportunities.map((opp) => opp.location))];
    const fields = [...new Set(opportunities.map((opp) => opp.field))];

    setUniqueLocations(locations);
    setUniqueFields(fields);
  };

  const applyFilters = () => {
    let result = opportunities;

    
    if (filters.type !== "all") {
      result = result.filter((opportunity) => opportunity.type.toLowerCase() === filters.type);
    }

  
    if (filters.location) {
      result = result.filter((opportunity) => opportunity.location === filters.location);
    }

    
    if (filters.field) {
      result = result.filter((opportunity) => opportunity.field === filters.field);
    }

    if (filters.minSalary) {
      const minSalaryNum = parseFloat(filters.minSalary.replace(/[^0-9.-]+/g, ""));
      result = result.filter((opportunity) => {
        if (!opportunity.salary) return false;
        const opportunitySalary = parseFloat(opportunity.salary.replace(/[^0-9.-]+/g, ""));
        return opportunitySalary >= minSalaryNum;
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
      field: "",
      minSalary: "",
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Available Opportunities</h1>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
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
            <SelectValue placeholder="Field" />
          </SelectTrigger>
          <SelectContent>
            {uniqueFields.map((field) => (
              <SelectItem key={field} value={field}>
                {field}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="text"
          placeholder="Min Salary"
          value={filters.minSalary}
          onChange={(e) => handleFilterChange("minSalary", e.target.value)}
        />
      </div>

      {(filters.type !== "all" || filters.location || filters.field || filters.minSalary) && (
        <div className="mb-6">
          <button onClick={clearFilters} className="text-red-500 hover:underline">
            Clear All Filters
          </button>
        </div>
      )}

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
