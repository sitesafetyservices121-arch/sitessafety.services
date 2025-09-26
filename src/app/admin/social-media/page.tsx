"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface SocialMediaLinks {
  twitter: string;
  facebook: string;
  linkedin: string;
}

export default function AdminSocialMediaPage() {
  const [links, setLinks] = useState<SocialMediaLinks>({ twitter: "", facebook: "", linkedin: "" });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchLinks = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/admin/social-media");
        if (response.ok) {
          const data = await response.json();
          setLinks(data);
        }
      } catch (error) {
        console.error("Failed to fetch social media links:", error);
        toast({
          title: "Error",
          description: "Failed to load social media links.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchLinks();
  }, [toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLinks((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/admin/social-media", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(links),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update social media links");
      }

      toast({
        title: "Success",
        description: "Social media links updated successfully!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Social Media</CardTitle>
        <CardDescription>Update links and credentials for your social media accounts.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="twitter">Twitter URL</Label>
            <Input
              id="twitter"
              name="twitter"
              type="url"
              placeholder="https://twitter.com/yourprofile"
              value={links.twitter}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="facebook">Facebook URL</Label>
            <Input
              id="facebook"
              name="facebook"
              type="url"
              placeholder="https://facebook.com/yourprofile"
              value={links.facebook}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="linkedin">LinkedIn URL</Label>
            <Input
              id="linkedin"
              name="linkedin"
              type="url"
              placeholder="https://linkedin.com/in/yourprofile"
              value={links.linkedin}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Updating..." : "Update Social Media Links"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
