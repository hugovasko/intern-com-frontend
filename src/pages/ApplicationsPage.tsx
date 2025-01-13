import { FC, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
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
import { SubscriptionBanner } from "@/components/SubscriptionBanner";

interface Application {
  id: number;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
  message?: string;
  note?: string;
  candidate: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    cvFileName: string | null;
  };
  opportunity: {
    id: number;
    title: string;
    company: {
      id: number;
      companyName: string;
    };
  };
}

const ApplicationsPage: FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { toast } = useToast();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingApplication, setEditingApplication] = useState<Application | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [hasActiveSubscription, setHasActiveSubscription] = useState<boolean>(true);

  useEffect(() => {
    fetchApplications();
  }, [user?.role]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const endpoint =
        user?.role === "candidate"
          ? "/applications/my-applications"
          : user?.role === "partner"
            ? "/applications/company-applications"
            : user?.role === "admin"
              ? "/applications"
              : null;
      if (endpoint === null) return;
      const response = await api.get(endpoint);
      const sortedApplications = response.data.sort(
        (a: Application, b: Application) => a.id - b.id
      );
      setApplications(sortedApplications);
    } catch (error: any) {
      if (
        error.response?.status === 403 &&
        error.response?.data?.message?.includes("subscription")
      ) {
        setHasActiveSubscription(false);
      }
      console.error("Failed to fetch applications:", error);
      toast({
        title: "Error",
        description: "Failed to load applications. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateApplication = async () => {
    if (!editingApplication) {
      return;
    }
    try {
      setUpdatingStatus(true);
      await api.patch(`/applications/${editingApplication.id}`, {
        status: editingApplication.status,
        note: editingApplication.note,
      });

      await fetchApplications();
      toast({
        title: "Success",
        description: "Application status updated successfully",
      });
      setIsDialogOpen(false);
      setEditingApplication(null);
    } catch (error) {
      console.error("Failed to update application:", error);
      toast({
        title: "Error",
        description: "Failed to update application status. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setUpdatingStatus(false);
    }
  };

  const deleteApplication = async (id: number) => {
    try {
      await api.delete(`/applications/${id}`);
      toast({
        title: "Success",
        description: "Application deleted successfully",
      });
      fetchApplications();
    } catch (error) {
      console.error("Failed to delete application: ", error);
      toast({
        title: "Error",
        description: "Failed to delete application: ",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "accepted":
        return "default";
      case "rejected":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const handleViewCV = async (userId: number) => {
    if (!userId) return;

    try {
      const response = await api.get(`/users/${userId}/cv`);
      const { cv, cvMimeType } = response.data; // Changed cv to file

      // Create a blob from the base64 data
      const byteCharacters = atob(cv);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: cvMimeType });

      // Create and open blob URL
      const fileURL = URL.createObjectURL(blob);
      window.open(fileURL, "_blank");
    } catch (error) {
      console.error("Failed to view CV:", error);
      toast({
        title: "Error",
        description: "Failed to view CV",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="py-12">
            <div className="flex flex-col items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="mt-2 text-sm text-muted-foreground">
                {" "}
                {t("applicationsPage.loadingapplications")}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (user?.role === "partner" && !hasActiveSubscription) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>Received Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <SubscriptionBanner message="You need an active subscription to view applications." />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>
            {user?.role === "candidate" ? "My Applications" : "Received Applications"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {applications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {t("applicationsPage.noApplications")}
            </div>
          ) : user?.role === "candidate" ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("applicationsPage.tableHeaders.position")}</TableHead>
                  <TableHead>{t("applicationsPage.tableHeaders.company")}</TableHead>
                  <TableHead>{t("applicationsPage.tableHeaders.appliedOn")}</TableHead>
                  <TableHead>{t("applicationsPage.tableHeaders.status")}</TableHead>
                  <TableHead>{t("applicationsPage.tableHeaders.actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell className="font-medium">{application.opportunity.title}</TableCell>
                    <TableCell>{application.opportunity.company.companyName}</TableCell>
                    <TableCell>{formatDate(application.createdAt)}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(application.status)}>
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            {t("applicationsPage.actions.viewDetails")}
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle> {t("applicationsPage.title.details")}</DialogTitle>
                          </DialogHeader>
                          <DialogDescription className="space-y-4">
                            <div>
                              <h4 className="font-medium mb-2">
                                {t("applicationsPage.messages.yourMessage")}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {application.message || "No message provided"}
                              </p>
                            </div>
                            {application.note && (
                              <div>
                                <h4 className="font-medium mb-2">
                                  {t("applicationsPage.messages.companyNote")}
                                </h4>
                                <p className="text-sm text-muted-foreground">{application.note}</p>
                              </div>
                            )}
                          </DialogDescription>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : user?.role === "partner" ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("applicationsPage.tableHeaders.candidate")}</TableHead>
                  <TableHead>{t("applicationsPage.tableHeaders.cv")}</TableHead>
                  <TableHead>{t("applicationsPage.tableHeaders.position")}</TableHead>
                  <TableHead>{t("applicationsPage.tableHeaders.appliedOn")}</TableHead>
                  <TableHead>{t("applicationsPage.tableHeaders.status")}</TableHead>
                  <TableHead>{t("applicationsPage.tableHeaders.actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">
                          {application.candidate.firstName} {application.candidate.lastName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {application.candidate.email}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {application.candidate.cvFileName ? (
                        <Button
                          className="w-24"
                          onClick={() => handleViewCV(application.candidate.id)}
                        >
                          {t("applicationsPage.messages.viewCV")}
                        </Button>
                      ) : (
                        <Button variant="secondary" className="w-24">
                          {t("applicationsPage.messages.noCV")}
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>{application.opportunity.title}</TableCell>
                    <TableCell>{formatDate(application.createdAt)}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(application.status)}>
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Dialog
                        open={isDialogOpen && editingApplication?.id === application.id}
                        onOpenChange={(open) => {
                          setIsDialogOpen(open);
                          if (open) {
                            setEditingApplication(application);
                          } else {
                            setEditingApplication(null);
                          }
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            {t("applicationsPage.actions.manage")}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>
                              {" "}
                              {t("applicationsPage.messages.manageApplication")}
                            </DialogTitle>
                          </DialogHeader>
                          <DialogDescription className="space-y-4 py-4">
                            {editingApplication?.message && (
                              <div className="space-y-2">
                                <Label className="font-medium">
                                  {t("applicationsPage.messages.cMessage")}
                                </Label>
                                <Label className="text-sm text-muted-foreground">
                                  {editingApplication.message}
                                </Label>
                              </div>
                            )}

                            <div className="space-y-2">
                              <Label className="font-=">
                                {t("applicationsPage.messages.updateStatus")}
                              </Label>
                              <Select
                                value={editingApplication?.status}
                                onValueChange={(value) => {
                                  if (editingApplication) {
                                    setEditingApplication({
                                      ...editingApplication,
                                      status: value as Application["status"],
                                    });
                                  }
                                }}
                                disabled={updatingStatus}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">
                                    {t("applicationsPage.statusOptions.pending")}
                                  </SelectItem>
                                  <SelectItem value="accepted">
                                    {t("applicationsPage.statusOptions.accepted")}
                                  </SelectItem>
                                  <SelectItem value="rejected">
                                    {t("applicationsPage.statusOptions.rejected")}
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label className="font-medium">
                                {t("applicationsPage.messages.addNote")}
                              </Label>
                              <Textarea
                                placeholder="Add a note about this application..."
                                value={editingApplication?.note || ""}
                                onChange={(e) => {
                                  if (editingApplication) {
                                    setEditingApplication({
                                      ...editingApplication,
                                      note: e.target.value,
                                    });
                                  }
                                }}
                              />
                              <Button
                                onClick={() => {
                                  if (editingApplication) {
                                    updateApplication();
                                  }
                                }}
                                disabled={updatingStatus}
                                className="w-full"
                              >
                                {updatingStatus ? "Updating..." : "Update"}
                              </Button>
                            </div>

                            {application?.note && (
                              <div className="space-y-2">
                                <h4 className="font-medium">
                                  {t("applicationsPage.messages.currentNote")}
                                </h4>
                                <p className="text-sm text-muted-foreground">{application.note}</p>
                              </div>
                            )}
                          </DialogDescription>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : user?.role === "admin" ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("applicationsPage.tableHeaders.candidate")}</TableHead>
                  <TableHead>{t("applicationsPage.tableHeaders.cv")}</TableHead>
                  <TableHead>{t("applicationsPage.tableHeaders.position")}</TableHead>
                  <TableHead>{t("applicationsPage.tableHeaders.company")}</TableHead>
                  <TableHead>{t("applicationsPage.tableHeaders.appliedOn")}</TableHead>
                  <TableHead>{t("applicationsPage.tableHeaders.status")}</TableHead>
                  <TableHead>{t("applicationsPage.tableHeaders.actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">
                          {application.candidate.firstName} {application.candidate.lastName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {application.candidate.email}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {application.candidate.cvFileName ? (
                        <Button
                          className="w-24"
                          onClick={() => handleViewCV(application.candidate.id)}
                        >
                          {t("applicationsPage.messages.viewCV")}
                        </Button>
                      ) : (
                        <Button variant="secondary" className="w-24">
                          {t("applicationsPage.messages.noCV")}
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>{application.opportunity.title}</TableCell>
                    <TableCell>{application.opportunity.company.companyName}</TableCell>
                    <TableCell>{formatDate(application.createdAt)}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(application.status)}>
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dialog
                          open={isDialogOpen && editingApplication?.id === application.id}
                          onOpenChange={(open) => {
                            setIsDialogOpen(open);
                            if (open) {
                              setEditingApplication(application);
                            } else {
                              setEditingApplication(null);
                            }
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              {t("applicationsPage.actions.manage")}
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>
                                {t("applicationsPage.messages.manageApplication")}
                              </DialogTitle>
                            </DialogHeader>
                            <DialogDescription className="space-y-4 py-4">
                              <DialogContent className="max-w-md">
                                <DialogHeader>
                                  <DialogTitle>
                                    {t("applicationsPage.messages.manageApplication")}
                                  </DialogTitle>
                                </DialogHeader>
                                <DialogDescription className="space-y-4 py-4">
                                  {editingApplication?.message && (
                                    <div className="space-y-2">
                                      <Label className="font-medium">
                                        {" "}
                                        {t("applicationsPage.messages.cMessages")}
                                      </Label>
                                      <Label className="text-sm text-muted-foreground">
                                        {editingApplication.message}
                                      </Label>
                                    </div>
                                  )}

                                  <div className="space-y-2">
                                    <Label className="font-=">
                                      {" "}
                                      {t("applicationsPage.messages.updateStatus")}
                                    </Label>
                                    <Select
                                      value={editingApplication?.status}
                                      onValueChange={(value) => {
                                        if (editingApplication) {
                                          setEditingApplication({
                                            ...editingApplication,
                                            status: value as Application["status"],
                                          });
                                        }
                                      }}
                                      disabled={updatingStatus}
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="pending">
                                          {t("applicationsPage.statusOptions.pending")}
                                        </SelectItem>
                                        <SelectItem value="accepted">
                                          {t("applicationsPage.statusOptions.accepted")}
                                        </SelectItem>
                                        <SelectItem value="rejected">
                                          {t("applicationsPage.statusOptions.rejected")}
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  <div className="space-y-2">
                                    <Label className="font-medium">
                                      {t("applicationsPage.messages.addNote")}
                                    </Label>
                                    <Textarea
                                      placeholder="Add a note about this application..."
                                      value={editingApplication?.note || ""}
                                      onChange={(e) => {
                                        if (editingApplication) {
                                          setEditingApplication({
                                            ...editingApplication,
                                            note: e.target.value,
                                          });
                                        }
                                      }}
                                    />
                                    <Button
                                      onClick={() => {
                                        if (editingApplication) {
                                          updateApplication();
                                        }
                                      }}
                                      disabled={updatingStatus}
                                      className="w-full"
                                    >
                                      {updatingStatus ? "Updating..." : "Update"}
                                    </Button>
                                  </div>

                                  {application?.note && (
                                    <div className="space-y-2">
                                      <h4 className="font-medium">
                                        {t("applicationsPage.messages.currentNote")}
                                      </h4>
                                      <p className="text-sm text-muted-foreground">
                                        {application.note}
                                      </p>
                                    </div>
                                  )}
                                </DialogDescription>
                              </DialogContent>
                            </DialogDescription>
                          </DialogContent>
                        </Dialog>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              {t("applicationsPage.actions.delete")}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                {t("applicationsPage.deleteConfirmation.title")}
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                {t("applicationsPage.deleteConfirmation.description")}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>
                                {" "}
                                {t("applicationsPage.actions.cancel")}
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteApplication(application.id)}
                                className="bg-destructive text-destructive-foreground"
                              >
                                {t("applicationsPage.actions.delete")}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationsPage;
