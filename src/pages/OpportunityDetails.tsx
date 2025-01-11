import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, DollarSign, Building, Calendar } from "lucide-react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

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

export function OpportunityDetails() {
  const { id } = useParams<{ id: string }>();
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchOpportunityDetails(id);
    }
  }, [id]);

  const fetchOpportunityDetails = async (id: string) => {
    try {
      setLoading(true);
      const response = await api.get(`/opportunities/${id}`);
      setOpportunity(response.data);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch opportunity details", error);
      setError("Failed to load opportunity details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="max-w-3xl mx-auto">
          <Skeleton className="h-8 w-2/3 mb-6" />
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/3 mb-4" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="max-w-3xl mx-auto">
          <Card className="border-destructive">
            <CardContent className="pt-6">
              <div className="text-center text-destructive">
                <p className="text-lg font-semibold">{error}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!opportunity) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-3xl mx-auto p-3 sm:p-0">
        <Button onClick={() => navigate(-1)} variant="outline" className="mb-5">
          Back
        </Button>
        <div className="mb-6 space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">{opportunity.title}</h1>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default" className="text-sm">
              {opportunity.type === "full-time" ? "Full-Time" : "Internship"}
            </Badge>
            {opportunity?.salary ? (
              <Badge variant="default" className="text-sm">
                {opportunity.salary} лв.
              </Badge>
            ) : null}
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="space-y-4">
              <div className="flex justify-between">
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <Building className="h-5 w-5" />
                  <span>{opportunity.company.companyName}</span>
                </div>
                {user && user.role === "candidate" && <Button>Apply</Button>}
                {!user && <Button variant="secondary">Login to apply</Button>}
              </div>

              <div className="grid gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{opportunity.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  <span>{opportunity.type === "full-time" ? "Full-Time" : "Internship"}</span>
                </div>
                {opportunity?.salary ? (
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    <span>{opportunity.salary} лв.</span>
                  </div>
                ) : null}
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Posted on {formatDate(opportunity.createdAt)}</span>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <div className="whitespace-pre-wrap">{opportunity.description}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
