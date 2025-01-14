import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

export function SubscriptionSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isVerifying, setIsVerifying] = useState(true);
  const { user, setUser } = useAuth();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const paymentIntent = searchParams.get("payment_intent");
        if (!paymentIntent) {
          throw new Error("No payment intent found");
        }

        await api.post("/subscriptions/verify", { paymentIntent });
        if (user) {
          setUser({
            ...user,
            subscriptionStatus: "active",
          });
        }

        setIsVerifying(false);
        toast({
          title: "Success!",
          description: "Your subscription has been activated.",
        });
      } catch (error) {
        console.error("Failed to verify payment:", error);
        toast({
          title: "Error",
          description: "Failed to verify subscription status",
          variant: "destructive",
        });
        navigate("/subscription");
      }
    };

    verifyPayment();
  }, [searchParams]);

  if (isVerifying) {
    return (
      <div className="container mx-auto py-8">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-lg font-medium">Verifying your subscription...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="h-8 w-8 text-green-500" />
            <CardTitle>Subscription Activated!</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              Thank you for subscribing! Your account has been successfully upgraded and you now
              have access to all partner features.
            </p>
            <p>You can now:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Post unlimited job opportunities</li>
              <li>View and manage candidate applications</li>
              <li>Access detailed candidate profiles</li>
            </ul>
            <div className="pt-4">
              <Button onClick={() => navigate("/opportunities/manage")} className="w-full">
                Manage Your Opportunities
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
