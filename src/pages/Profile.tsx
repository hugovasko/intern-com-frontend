// src/pages/Profile.tsx
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState, useRef, useEffect } from "react";
import { Eye, Upload, Trash2, Save, FilePenLine } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";

interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  companyCoordinates: string;
}

export function Profile() {
  const { user, setUser } = useAuth();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isReplacingCV, setIsReplacingCV] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    companyCoordinates: "",
  });
  const [initialFormData, setInitialFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    companyCoordinates: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      const clonedData: FormData = structuredClone({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phoneNumber: user.phoneNumber || "",
        companyCoordinates: user.companyCoordinates || "",
      });
      setInitialFormData(clonedData);
      setFormData(clonedData);
    }
  }, [user]);

  const hasChanges = () => {
    return JSON.stringify(formData) !== JSON.stringify(initialFormData);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === "application/pdf" || file.type.includes("word"))) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or Word document",
        variant: "destructive",
      });
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !user) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64File = e.target?.result?.toString().split(",")[1];
      if (!base64File) return;

      const cvUploadData = {
        fileName: selectedFile.name,
        mimeType: selectedFile.type,
        fileBase64: base64File,
      };

      try {
        const response = await api.post(`/users/${user.id}/cv`, cvUploadData);
        setUser({
          ...user,
          ...response.data,
        });
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        toast({
          title: "Success",
          description: "CV uploaded successfully",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to upload CV",
          variant: "destructive",
        });
      }
    };
    reader.readAsDataURL(selectedFile);
    handleCancel();
  };

  const handleRemoveCV = async () => {
    if (!user?.id) return;
    try {
      const response = await api.delete(`/users/${user.id}/cv`);
      setUser({
        ...user,
        ...response.data,
      });
      toast({
        title: "Success",
        description: "CV removed successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove CV",
        variant: "destructive",
      });
    }
  };

  const handleViewCV = async () => {
    if (!user?.id) return;
    try {
      const response = await api.get(`/users/${user.id}/cv`);
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

  const previewSelectedFile = () => {
    if (!selectedFile) return;
    const fileURL = URL.createObjectURL(selectedFile);
    window.open(fileURL, "_blank");
  };

  const handleProfileUpdate = async () => {
    if (!user?.id) return;
    try {
      const response = await api.patch(`/users/${user.id}`, formData);
      setUser({
        ...user,
        ...response.data,
      });
      setIsEditingProfile(false);
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    if (initialFormData) {
      setFormData(initialFormData);
    }
    setIsEditingProfile(false);
    setIsReplacingCV(false);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Profile
              <div className="flex gap-2">
                {isEditingProfile ? (
                  <>
                    <Button variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleProfileUpdate}
                      disabled={!hasChanges()}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" onClick={() => setIsEditingProfile(true)}>
                    Edit Profile
                  </Button>
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>First Name</Label>
                {isEditingProfile ? (
                  <Input
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                ) : (
                  <p className="mt-1">{user?.firstName}</p>
                )}
              </div>
              <div>
                <Label>Last Name</Label>
                {isEditingProfile ? (
                  <Input
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                ) : (
                  <p className="mt-1">{user?.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <Label>Phone Number</Label>
              {isEditingProfile ? (
                <Input
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                />
              ) : (
                <p className="mt-1">{user?.phoneNumber || "Not provided"}</p>
              )}
            </div>

            <div>
              <Label>Email</Label>
              <p className="mt-1">{user?.email}</p>
            </div>

            {user?.role === "candidate" && (
              <div className="space-y-4 flex flex-col">
                <Label>CV Document</Label>

                {isReplacingCV ? (
                  // CV upload form is active
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileSelect}
                        ref={fileInputRef}
                        className="flex-1"
                      />
                      {selectedFile && (
                        <div className="grid grid-cols-2 sm:flex gap-2">
                          <Button onClick={previewSelectedFile}>
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </Button>
                          <Button onClick={handleUpload}>
                            <Upload className="h-4 w-4 mr-2" />
                            Upload
                          </Button>
                        </div>
                      )}
                    </div>
                    <Button variant="outline" onClick={handleCancel} className="w-full sm:w-auto">
                      Cancel
                    </Button>
                  </div>
                ) : user?.cvFileName ? (
                  // User has CV and not replacing - show view, replace, remove options
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <span className="break-all">{user.cvFileName}</span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full sm:w-auto">
                      <Button onClick={handleViewCV}>
                        <Eye className="h-4 w-4 mr-2" />
                        View CV
                      </Button>
                      <Button onClick={() => setIsReplacingCV(true)}>
                        <FilePenLine className="h-4 w-4 mr-2" />
                        Replace CV
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={handleRemoveCV}
                        className="col-span-2 sm:col-span-1"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove CV
                      </Button>
                    </div>
                  </div>
                ) : (
                  // No CV and not replacing - show upload button
                  <Button onClick={() => setIsReplacingCV(true)}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload CV
                  </Button>
                )}
              </div>
            )}
            {user?.role === "partner" &&  <div>
                <Label>Coordinates</Label>
                {isEditingProfile ? (
                  <Input
                    value={formData.companyCoordinates}
                    onChange={(e) => setFormData({ ...formData, companyCoordinates: e.target.value })}
                  />
                ) : (
                  <p className="mt-1">{user?.companyCoordinates}</p>
                )}
              </div>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
