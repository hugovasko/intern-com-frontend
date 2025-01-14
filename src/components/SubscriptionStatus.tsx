import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";
import { Loader2, CreditCard, CheckCircle, Clock } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const SubscriptionStatus = () => {
  const [cancelling, setCancelling] = useState(false);
  const { user, setUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCancel = async () => {
    try {
      setCancelling(true);
      const response = await api.delete("/subscriptions");
      if (user) {
        setUser({
          ...user,
          subscriptionStatus: response.data.status,
        });
      }
      toast({
        title: "Success",
        description: "Subscription cancelled successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel subscription",
        variant: "destructive",
      });
    } finally {
      setCancelling(false);
    }
  };

  const getStatusConfig = () => {
    switch (user?.subscriptionStatus) {
      case "active":
        return {
          variant: "default",
          icon: <CheckCircle className="h-4 w-4" />,
          title: "Active Subscription",
          description: "You have full access to all partner features",
          date: user?.subscriptionEndDate && (
            <span className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Next billing date: {new Date(user.subscriptionEndDate).toLocaleDateString()}
            </span>
          ),
        };
      case "canceled":
        return {
          variant: "default" as const,
          icon: <Clock className="h-4 w-4" />,
          title: "Subscription Ending",
          description: "Your access will continue until the end of the billing period",
          date: user?.subscriptionEndDate && (
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Access until: {new Date(user.subscriptionEndDate).toLocaleDateString()}
            </span>
          ),
        };
      default:
        return {
          variant: "destructive" as const,
          icon: <CreditCard className="h-4 w-4" />,
          title: "Subscription Required",
          description: "Subscribe to unlock all partner features",
        };
    }
  };

  const config = getStatusConfig();

  return (
    <Alert variant={config.variant as "default" | "destructive"} className="relative">
      {config.icon}
      <AlertTitle className="flex items-center justify-between">{config.title}</AlertTitle>
      <AlertDescription className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <p>{config.description}</p>
          {config.date && <p className="text-sm">{config.date}</p>}
        </div>
        {user?.subscriptionStatus === "active" ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" disabled={cancelling}>
                {cancelling ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Cancelling...
                  </>
                ) : (
                  "Cancel Subscription"
                )}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Cancel Subscription?</AlertDialogTitle>
                <AlertDialogDescription className="space-y-2">
                  <p>Are you sure you want to cancel your subscription?</p>
                  <p>
                    Your subscription will remain active until{" "}
                    {user?.subscriptionEndDate &&
                      new Date(user.subscriptionEndDate).toLocaleDateString()}
                    .
                  </p>
                  <p>After this date, you'll lose access to:</p>
                  <ul className="list-disc pl-6">
                    <li>Posting job opportunities</li>
                    <li>Viewing candidate applications</li>
                    <li>Accessing candidate profiles</li>
                  </ul>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleCancel}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Yes, Cancel
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <Button variant="outline" size="sm" onClick={() => navigate("/subscription")}>
            Subscribe Now
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default SubscriptionStatus;
