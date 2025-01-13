// src/components/SubscriptionBanner.tsx
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

interface SubscriptionBannerProps {
  message?: string;
}

export function SubscriptionBanner({ message }: SubscriptionBannerProps) {
  const navigate = useNavigate();

  return (
    <Alert variant="destructive" className="mb-6">
      <CreditCard className="h-4 w-4" />
      <AlertTitle>Subscription Required</AlertTitle>
      <AlertDescription className="flex items-center justify-between">
        <span>{message || "You need an active subscription to access this feature."}</span>
        <Button variant="outline" size="sm" onClick={() => navigate("/subscription")}>
          Subscribe Now
        </Button>
      </AlertDescription>
    </Alert>
  );
}
