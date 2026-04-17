"use client";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2, CheckCircle, Trash2, Database, BookOpen } from "lucide-react";
import Link from "next/link";

export default function SeedAdminPage() {
  const seedMutation = useMutation(api.seed.seedArtworks);
  const clearMutation = useMutation(api.seed.clearArtworks);
  const seedWritingsMutation = useMutation(api.seed.seedWritings);
  const clearWritingsMutation = useMutation(api.seed.clearWritings);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSeed = async () => {
    setStatus("loading");
    try {
      const result = await seedMutation({});
      setStatus("success");
      setMessage(result.message);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Failed to seed artworks");
    }
  };

  const handleClear = async () => {
    if (!confirm("Are you sure you want to clear all artworks? This cannot be undone.")) {
      return;
    }
    setStatus("loading");
    try {
      const result = await clearMutation({});
      setStatus("success");
      setMessage(result.message);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Failed to clear artworks");
    }
  };

  const handleSeedWritings = async () => {
    setStatus("loading");
    try {
      const result = await seedWritingsMutation({});
      setStatus("success");
      setMessage(result.message);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Failed to seed stories");
    }
  };

  const handleClearWritings = async () => {
    if (!confirm("Are you sure you want to clear all stories? This cannot be undone.")) {
      return;
    }
    setStatus("loading");
    try {
      const result = await clearWritingsMutation({});
      setStatus("success");
      setMessage(result.message);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Failed to clear stories");
    }
  };

  return (
    <div className="min-h-screen p-8 text-foreground">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold font-serif">Gallery Admin</h1>
          <p className="text-muted-foreground">
            Manage gallery and stories data for testing and development.
          </p>
        </div>

        {/* Artworks Section */}
        <div className="p-6 rounded-2xl border border-border bg-card space-y-6">
          <div className="flex items-center gap-3">
            <Database className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold">Gallery Artworks</h2>
          </div>
          
          <p className="text-muted-foreground">
            This will add 12 sample artworks to the database, including 4 featured pieces 
            for the carousel section. All images are sourced from Unsplash.
          </p>

          <div className="flex gap-4">
            <Button
              onClick={handleSeed}
              disabled={status === "loading"}
              size="lg"
              className="rounded-full"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Seeding...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Seed Artworks
                </>
              )}
            </Button>

            <Button
              onClick={handleClear}
              disabled={status === "loading"}
              variant="outline"
              size="lg"
              className="rounded-full"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>
        </div>

        {/* Writings Section */}
        <div className="p-6 rounded-2xl border border-border bg-card space-y-6">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold">Stories / Writings</h2>
          </div>
          
          <p className="text-muted-foreground">
            This will add 12 sample stories to the folio, including poems, blogs, and creative writing pieces. 
            4 pieces are marked as featured.
          </p>

          <div className="flex gap-4">
            <Button
              onClick={handleSeedWritings}
              disabled={status === "loading"}
              size="lg"
              className="rounded-full"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Seeding...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Seed Stories
                </>
              )}
            </Button>

            <Button
              onClick={handleClearWritings}
              disabled={status === "loading"}
              variant="outline"
              size="lg"
              className="rounded-full"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>
        </div>

        {status !== "idle" && message && (
          <div className={`p-4 rounded-xl ${
            status === "success" ? "bg-primary/10 text-primary" : 
            status === "error" ? "bg-destructive/10 text-destructive" : ""
          }`}>
            {message}
          </div>
        )}

        <div className="flex gap-4">
          <Link href="/gallery" className="text-primary hover:underline">
            View Gallery →
          </Link>
          <Link href="/stories" className="text-primary hover:underline">
            View Stories →
          </Link>
          <Link href="/" className="text-primary hover:underline">
            Back to Home →
          </Link>
        </div>
      </div>
    </div>
  );
}
