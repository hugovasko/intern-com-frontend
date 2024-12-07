// src/pages/Profile.tsx
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Profile() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="font-medium">Name</label>
              <p>
                {user?.firstName} {user?.lastName}
              </p>
            </div>
            <div>
              <label className="font-medium">Email</label>
              <p>{user?.email}</p>
            </div>
            <div>
              <label className="font-medium">Role</label>
              <p className="capitalize">{user?.role}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
