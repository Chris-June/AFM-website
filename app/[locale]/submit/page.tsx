"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Heart } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  type: z.enum(["artwork", "writing"]),
  title: z.string().min(2, "Title must be at least 2 characters."),
  contentOrUrl: z.string().min(10, "Please provide more details or a valid link."),
});

export default function SubmitPage() {
  const submitWork = useMutation(api.writings.submitArtworkOrWriting);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      type: "artwork",
      title: "",
      contentOrUrl: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await submitWork(values);
      toast.success("Submission received!", {
        description: "Your work has been safely received. We'll be in touch soon.",
      });
      form.reset();
    } catch (error) {
      toast.error("Something went wrong.", {
        description: "Please try again later.",
      });
    }
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12">
      <Navbar />
      
      <div className="max-w-3xl mx-auto space-y-12">
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Heart className="h-4 w-4" />
            <span>Community Space</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight italic">
            Share Your <span className="text-primary">Voice</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Your journey is unique, and your expression matters. 
            Submit your work to be featured on A Frame Of Mind. 
            All submissions are handled with care and full attribution.
          </p>
        </header>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 glass p-8 md:p-12 rounded-[40px] border-border/50">
            <div className="grid md:grid-cols-2 gap-8">
              <FormField
                control= {form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name or pseudonym" {...field} className="rounded-2xl h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com" {...field} className="rounded-2xl h-12" />
                    </FormControl>
                    <FormDescription>For internal contact only.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Work Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-2xl h-12">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="artwork">Visual Artwork</SelectItem>
                        <SelectItem value="writing">Written Work</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title of your work" {...field} className="rounded-2xl h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="contentOrUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>The Work</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Paste your poem/writing, or provide a link (Google Drive, Dropbox, etc.) to your visual artwork."
                      className="min-h-[160px] rounded-2xl p-4 resize-none"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Max 5000 characters or a link to your asset.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              size="lg" 
              className="w-full rounded-full h-14 text-lg font-bold transition-all hover:scale-[1.02]"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Submitting..." : "Send to AFM"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
