import { FormEvent, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SubscriptionLoading from "@/components/SubscriptionLoading";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (user?.subscriptionStatus === "active") {
    navigate("/");
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/subscription/success`,
        },
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Error",
        description: "Something went wrong with the payment",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <Button disabled={!stripe || isLoading} className="w-full">
        {isLoading ? "Processing..." : "Subscribe Now"}
      </Button>
    </form>
  );
};

export function SubscriptionPage() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const initializeSubscription = async () => {
      try {
        const response = await api.post("/subscriptions");
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error("Failed to initialize subscription:", error);
      }
    };

    initializeSubscription();
  }, []);

  if (!clientSecret) {
    return <SubscriptionLoading />;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Partner Subscription</CardTitle>
            <CardDescription>
              Subscribe to access all partner features including posting opportunities and viewing
              applications.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Premium Plan Features:</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Post unlimited job opportunities</li>
                <li>View and manage candidate applications</li>
                <li>Access detailed candidate profiles</li>
                <li>Premium support</li>
              </ul>
              <div className="mt-4 mb-6">
                <p className="text-2xl font-bold">49.99 BGN/month</p>
              </div>
            </div>
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: { theme: "stripe" },
              }}
            >
              <CheckoutForm />
            </Elements>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
