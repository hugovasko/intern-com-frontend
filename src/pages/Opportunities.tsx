// src/pages/Opportunities.tsx
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export function Opportunities() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    try {
      const response = await api.get("/opportunities");
      setOpportunities(response.data);
      console.log(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch opportunities",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Available Opportunities</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {opportunities.map((opportunity) => (
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
      </div>
    </div>
  );
}
