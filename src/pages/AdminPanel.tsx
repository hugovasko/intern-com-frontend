// src/pages/AdminPanel.tsx
import { useEffect, useState } from "react";
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
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { User } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";

export function AdminPanel() {
  const { t } = useTranslation();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      const sortedUsers = response.data.sort((a: User, b: User) => a.id - b.id);
      setUsers(sortedUsers);
      setFilteredUsers(sortedUsers);
    } catch (error) {
      toast({
        title: t("adminPanel.error"),
        description: t("adminPanel.fetchError"),
        variant: "destructive",
      });
    }
  };

  const updateUserRole = async (userId: number, newRole: string) => {
    try {
      await api.patch(`/users/${userId}/role`, { role: newRole });
      toast({
        title: t("adminPanel.success"),
        description: t("adminPanel.roleUpdated"),
      });
      fetchUsers();
    } catch (error) {
      toast({
        title: t("adminPanel.error"),
        description: t("adminPanel.roleUpdateError"),
        variant: "destructive",
      });
    }
  };

  const deleteUser = async (userId: number) => {
    try {
      await api.delete(`/users/${userId}`);
      toast({
        title: t("adminPanel.success"),
        description: t("adminPanel.userDeleted"),
      });
      fetchUsers();
    } catch (error) {
      toast({
        title: t("adminPanel.error"),
        description: t("adminPanel.userDeleteError"),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t("adminPanel.userManagement")}</h1>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("adminPanel.searchPlaceholder")}
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("adminPanel.name")}</TableHead>
              <TableHead>{t("adminPanel.email")}</TableHead>
              <TableHead>{t("adminPanel.role")}</TableHead>
              <TableHead>{t("adminPanel.company")}</TableHead>
              <TableHead>{t("adminPanel.phone")}</TableHead>
              <TableHead>{t("adminPanel.joined")}</TableHead>
              <TableHead>{t("adminPanel.actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Select
                    defaultValue={user.role}
                    onValueChange={(value) => updateUserRole(user.id, value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="candidate">{t("adminPanel.candidate")}</SelectItem>
                      <SelectItem value="partner">{t("adminPanel.partner")}</SelectItem>
                      <SelectItem value="admin">{t("adminPanel.admin")}</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>{user.companyName || "-"}</TableCell>
                <TableCell>{user.phoneNumber || "-"}</TableCell>
                <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm" onClick={() => setUserToDelete(user)}>
                        {t("adminPanel.delete")}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>{t("adminPanel.confirmDeleteTitle")}</AlertDialogTitle>
                        <AlertDialogDescription>
                          {t("adminPanel.confirmDeleteDescription")}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>{t("adminPanel.cancel")}</AlertDialogCancel>
                        <Button
                          variant="destructive"
                          onClick={() => {
                            if (userToDelete) {
                              deleteUser(userToDelete.id);
                            }
                          }}
                        >
                          {t("adminPanel.delete")}
                        </Button>
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
