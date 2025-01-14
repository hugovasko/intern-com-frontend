// src/pages/ManageOpportunities.tsx
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import api from "@/lib/api";
import { Edit, Plus, Trash2 } from "lucide-react";
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
import { useAuth } from "@/contexts/AuthContext";
import { SubscriptionBanner } from "@/components/SubscriptionBanner";

const OPPORTUNITY_TYPES = [
  { value: "internship", label: "Internship" },
  { value: "full-time", label: "Full-time" },
] as const;

const opportunitySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  salary: z.string().optional(),
  type: z.enum(["internship", "full-time"], {
    required_error: "Please select a type",
  }),
  partnerId: z.number().optional(),
});

interface Partner {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  companyName?: string;
}

interface Company {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  companyName?: string;
}

interface Opportunity {
  id: number;
  title: string;
  description: string;
  location: string;
  salary?: number;
  type: string;
  createdAt: string;
  company: Company;
}

export function ManageOpportunities() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingOpportunity, setEditingOpportunity] = useState<Opportunity | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const form = useForm<z.infer<typeof opportunitySchema>>({
    resolver: zodResolver(opportunitySchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      salary: "",
      type: undefined,
      partnerId: undefined,
    },
  });

  const fetchPartners = async () => {
    if (isAdmin) {
      try {
        const response = await api.get("/users?role=partner");
        const sortedPartners = response.data.sort((a: Partner, b: Partner) => a.id - b.id);
        setPartners(sortedPartners);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch partners",
          variant: "destructive",
        });
      }
    }
  };

  useEffect(() => {
    fetchOpportunities();
    fetchPartners();
  }, []);

  useEffect(() => {
    if (editingOpportunity) {
      form.reset({
        title: editingOpportunity.title,
        description: editingOpportunity.description,
        location: editingOpportunity.location,
        salary: editingOpportunity.salary?.toString() || "",
        type: editingOpportunity.type as "internship" | "full-time",
      });
    }
  }, [editingOpportunity]);

  const fetchOpportunities = async () => {
    try {
      const endpoint = isAdmin ? "/opportunities" : "/opportunities/my-opportunities";
      const response = await api.get(endpoint);
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
    }
  };

  const onSubmit = async (values: z.infer<typeof opportunitySchema>) => {
    try {
      if (editingOpportunity) {
        await api.patch(`/opportunities/${editingOpportunity.id}`, {
          ...values,
          salary: Number(values.salary),
        });
        toast({
          title: "Success",
          description: "Opportunity updated successfully",
        });
      } else {
        const submitData = {
          ...values,
          partnerId: isAdmin ? values.partnerId : undefined,
        };
        await api.post("/opportunities", { ...submitData, salary: Number(submitData.salary) });
        toast({
          title: "Success",
          description: "Opportunity created successfully",
        });
      }
      setIsOpen(false);
      setEditingOpportunity(null);
      fetchOpportunities();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save opportunity",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/opportunities/${id}`);
      toast({
        title: "Success",
        description: "Opportunity deleted successfully",
      });
      fetchOpportunities();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete opportunity",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      {user?.role === "partner" && user?.subscriptionStatus !== "active" && (
        <SubscriptionBanner message="You need an active subscription to manage opportunities." />
      )}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {isAdmin ? "All Opportunities" : "Manage Opportunities"}
        </h1>
        <Dialog
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) {
              setEditingOpportunity(null);
              form.reset({
                title: "",
                description: "",
                location: "",
                salary: "",
                type: undefined,
                partnerId: undefined,
              });
            }
          }}
        >
          <DialogTrigger asChild>
            <Button disabled={user?.role === "partner" && user?.subscriptionStatus !== "active"}>
              <Plus className="mr-2 h-4 w-4" />
              Add Opportunity
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingOpportunity ? "Edit Opportunity" : "Create Opportunity"}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {isAdmin && !editingOpportunity && (
                  <FormField
                    control={form.control}
                    name="partnerId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Partner</FormLabel>
                        <Select
                          onValueChange={(value) => field.onChange(parseInt(value))}
                          defaultValue={field.value?.toString()}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a partner" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {partners.map((partner) => (
                              <SelectItem key={partner.id} value={partner.id.toString()}>
                                {partner.companyName || `${partner.firstName} ${partner.lastName}`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Software Engineer Intern" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the opportunity..."
                          className="h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="New York, NY" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="salary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salary (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="1000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select opportunity type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {OPPORTUNITY_TYPES.map(({ value, label }) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  {editingOpportunity ? "Update" : "Create"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              {isAdmin && <TableHead>Partner</TableHead>}
              <TableHead>Location</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {opportunities.map((opportunity) => (
              <TableRow key={opportunity.id}>
                <TableCell>{opportunity.title}</TableCell>
                {isAdmin && (
                  <TableCell>
                    {opportunity.company.companyName ||
                      `${opportunity.company.firstName} ${opportunity.company.lastName}`}
                  </TableCell>
                )}
                <TableCell>{opportunity.location}</TableCell>
                <TableCell className="capitalize">{opportunity.type}</TableCell>
                <TableCell>{opportunity.salary || "-"}</TableCell>
                <TableCell>{new Date(opportunity.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setEditingOpportunity(opportunity);
                      setIsOpen(true);
                    }}
                    disabled={user?.role === "partner" && user?.subscriptionStatus !== "active"}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="icon"
                        disabled={user?.role === "partner" && user?.subscriptionStatus !== "active"}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the
                          opportunity.
                          {isAdmin && (
                            <p className="mt-2 font-medium">
                              Company:{" "}
                              {opportunity.company.companyName ||
                                `${opportunity.company.firstName} ${opportunity.company.lastName}`}
                            </p>
                          )}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(opportunity.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
