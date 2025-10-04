
/* eslint-disable @next/next/no-img-element */
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import withAdminAuth from '@/components/with-admin-auth';

function AdminPicturesPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select an image to upload.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/admin/pictures", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Image upload failed");
      }

      const data = await response.json();
      setImageUrl(data.url);
      toast({
        title: "Upload Successful",
        description: "Image uploaded successfully!",
        variant: "success",
      });
    } catch (error: any) {
      toast({
        title: "Upload Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setFile(null); // Clear the selected file after upload attempt
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Pictures</CardTitle>
        <CardDescription>Upload, update, or delete images for your website.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input type="file" accept="image/*" onChange={handleFileChange} />
          <Button type="submit" disabled={uploading}>
            {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {uploading ? "Uploading..." : "Upload Image"}
          </Button>
        </form>
        {imageUrl && (
          <div className="mt-4">
            <p className="font-semibold">Uploaded Image URL:</p>
            <a href={imageUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline break-all">
              {imageUrl}
            </a>
            <img src={imageUrl} alt="Uploaded" className="mt-2 max-w-full h-auto" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default withAdminAuth(AdminPicturesPage);
