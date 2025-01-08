import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Briefcase, DollarSign, Building } from "lucide-react";
import api from "@/lib/api"; // Assuming you have an API instance to fetch data

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

export function OpportunityDetails() {
  const { id } = useParams<{ id: string }>();
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);

  useEffect(() => {
    if (id) {
      fetchOpportunityDetails(id);
    }
  }, [id]);

  const fetchOpportunityDetails = async (id: string) => {
    try {
      const response = await api.get(`/opportunities/${id}`);
      setOpportunity(response.data);
    } catch (error) {
      console.error("Failed to fetch opportunity details", error);
    }
  };

  if (!opportunity) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">{opportunity.title}</h1>
      <Card>
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
          <p>{opportunity.description}</p>
        </CardContent>
      </Card>
    </div>
  );
}
