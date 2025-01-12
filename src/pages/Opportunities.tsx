import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { MapPin, Briefcase, DollarSign, Building, FilterX, Filter } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface Opportunity {
  id: number;
  title: string;
  description: string;
  location: string;
  salary?: number;
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
  company: string;
  salary: number | string;
}

export function Opportunities() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<Filters>({
    type: searchParams.get("type") || "all",
    location: searchParams.get("location") || "all",
    company: searchParams.get("company") || "all",
    salary: searchParams.get("salary") || "all",
  });

  const [uniqueLocations, setUniqueLocations] = useState<string[]>([]);
  const [uniqueCompanies, setUniqueCompanies] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchOpportunities();
  }, []);

  useEffect(() => {
    applyFilters();
    extractUniqueFilters();

    const params: Record<string, string> = {};
    if (filters.type !== "all") params["type"] = filters.type;
    if (filters.location !== "all") params["location"] = filters.location;
    if (filters.company !== "all") params["company"] = filters.company;
    if (filters.salary !== "all") params["salary"] = filters.salary.toString();

    setSearchParams(params, { replace: true });
  }, [opportunities, filters, setSearchParams]);

  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      const response = await api.get("/opportunities");
      const sortedOpportunities = response.data.sort(
        (a: Opportunity, b: Opportunity) => a.id - b.id
      );
      setOpportunities(sortedOpportunities);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch opportunities",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const extractUniqueFilters = () => {
    const locations = [...new Set(opportunities.map((opp) => opp.location))];
    const companies = [...new Set(opportunities.map((opp) => opp.company.companyName))];
    setUniqueLocations(locations);
    setUniqueCompanies(companies);
  };

  const applyFilters = () => {
    let result = opportunities;

    if (filters.type !== "all") {
      result = result.filter(
        (opportunity) => opportunity.type.toLowerCase() === filters.type.toLowerCase()
      );
    }

    if (filters.location !== "all") {
      result = result.filter((opportunity) => opportunity.location === filters.location);
    }

    if (filters.company !== "all") {
      result = result.filter((opportunity) => opportunity.company.companyName === filters.company);
    }

    if (filters.salary !== "all") {
      result = result.filter((opportunity) => {
        const salary = parseInt(opportunity.salary?.toString() || "0", 10);
        const filterSalary = parseInt(filters.salary.toString(), 10);
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
      location: "all",
      company: "all",
      salary: "all",
    });
    setSearchParams({});
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.type !== "all") count++;
    if (filters.location !== "all") count++;
    if (filters.company !== "all") count++;
    if (filters.salary !== "all") count++;
    return count;
  };

  const formatSalary = (salary?: number) => {
    if (!salary) return null;
    return new Intl.NumberFormat("bg-BG", {
      style: "currency",
      currency: "BGN",
      maximumFractionDigits: 0,
    }).format(salary);
  };

  const FilterSection = () => (
    <>
      <div className="space-y-4">
        <Select onValueChange={(value) => handleFilterChange("type", value)} value={filters.type}>
          <SelectTrigger className="w-full">
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
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            {uniqueLocations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => handleFilterChange("company", value)}
          value={filters.company}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Companies</SelectItem>
            {uniqueCompanies.map((company) => (
              <SelectItem key={company} value={company}>
                {company}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => handleFilterChange("salary", value)}
          value={filters.salary.toString()}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Minimum Salary" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Salary</SelectItem>
            <SelectItem value="500">500+ BGN</SelectItem>
            <SelectItem value="1000">1000+ BGN</SelectItem>
            <SelectItem value="2000">2000+ BGN</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {getActiveFiltersCount() > 0 && (
        <div className="mt-4">
          <Button variant="outline" className="w-full" onClick={clearFilters}>
            <FilterX className="mr-2 h-4 w-4" />
            Clear All Filters
          </Button>
        </div>
      )}
    </>
  );

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col space-y-6 p-3 sm:p-0">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Available Opportunities</h1>
            <p className="text-muted-foreground mt-1">
              {filteredOpportunities.length} opportunities found
            </p>
          </div>

          {/* Mobile Filter Button */}
          <div className="block lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                  {getActiveFiltersCount() > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {getActiveFiltersCount()}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>Refine your search with filters</SheetDescription>
                </SheetHeader>
                <div className="mt-6">
                  <FilterSection />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-64 space-y-6">
            <div className="sticky top-6">
              <div className="font-medium flex items-center mb-4">
                <Filter className="mr-2 h-4 w-4" />
                Filters
                {getActiveFiltersCount() > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {getActiveFiltersCount()}
                  </Badge>
                )}
              </div>
              <FilterSection />
            </div>
          </div>

          {/* Opportunities Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((n) => (
                  <Card key={n} className="animate-pulse">
                    <CardHeader>
                      <div className="h-6 bg-muted rounded w-3/4 mb-4"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded w-1/2"></div>
                        <div className="h-4 bg-muted rounded w-1/3"></div>
                        <div className="h-4 bg-muted rounded w-1/4"></div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-4 bg-muted rounded w-full mb-2"></div>
                      <div className="h-4 bg-muted rounded w-2/3"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredOpportunities.length === 0 ? (
              <Card className="p-8 text-center">
                <div className="text-muted-foreground">
                  <FilterX className="mx-auto h-12 w-12 mb-4 text-muted-foreground/50" />
                  <h3 className="text-lg font-medium mb-2">No matches found</h3>
                  <p>Try adjusting your filters to find more opportunities</p>
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredOpportunities.map((opportunity) => (
                  <Link
                    key={opportunity.id}
                    to={`/opportunities/${opportunity.id}`}
                    className="block group"
                  >
                    <Card className="h-full transition-all duration-200 hover:shadow-lg hover:border-primary/50">
                      <CardHeader>
                        <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                          {opportunity.title}
                        </CardTitle>
                        <div className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 flex-shrink-0" />
                            <span className="truncate">
                              {opportunity.company.companyName ||
                                `${opportunity.company.firstName} ${opportunity.company.lastName}`}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 flex-shrink-0" />
                            <span>{opportunity.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4 flex-shrink-0" />
                            <span>
                              {opportunity.type === "full-time" ? "Full-Time" : "Internship"}
                            </span>
                          </div>
                          {opportunity.salary ? (
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 flex-shrink-0" />
                              <span>{formatSalary(opportunity.salary)}</span>
                            </div>
                          ) : null}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {opportunity.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
