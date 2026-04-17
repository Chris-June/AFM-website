"use client";

import { usePaginatedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Navbar } from "@/components/layout/navbar";
import { StoryItem } from "@/components/stories/story-item";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { ZenReadingMode } from "@/components/stories/zen-reading-mode";

export default function StoriesPage() {
  const { results, status, loadMore } = usePaginatedQuery(
    api.writings.getWritings,
    {},
    { initialNumItems: 12 }
  );

  const [selectedStory, setSelectedStory] = useState<typeof results[0] | null>(null);
  const [isZenModeOpen, setIsZenModeOpen] = useState(false);

  const handleOpenZenMode = (story: typeof results[0]) => {
    setSelectedStory(story);
    setIsZenModeOpen(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen overflow-hidden font-sans text-foreground"
    >
      <Navbar />
      
      <div className="max-w-[1400px] mx-auto pt-32 pb-32 px-6 md:px-12 relative z-10">
        
        {/* Editorial Header */}
        <header className="flex flex-col md:flex-row items-baseline justify-between gap-8 mb-20 border-b border-primary/30 pb-8">
           <div className="space-y-2">
             <div className="flex items-center gap-3 text-foreground/70">
               <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
               <span className="uppercase tracking-[0.3em] font-bold text-sm">The</span>
             </div>
             <h1 className="text-5xl md:text-7xl font-serif text-foreground tracking-tighter">
               FABLE <span className="italic">FOLIO</span>
             </h1>
           </div>
           
           <div className="flex gap-6 text-sm font-bold tracking-widest uppercase text-foreground/70">
              <span className="cursor-pointer hover:text-primary transition-colors">Library</span>
              <span className="cursor-pointer hover:text-primary transition-colors">Genres</span>
              <span className="cursor-pointer hover:text-primary transition-colors">My Tales</span>
           </div>
        </header>

        {results.length === 0 && status === "Exhausted" && (
          <div className="flex flex-col items-center justify-center py-32 text-center space-y-4 border border-dashed border-primary/30 rounded-lg opacity-80">
            <p className="text-2xl font-serif italic text-foreground">The folios are empty today.</p>
            <p className="text-foreground/70">Pen your thoughts and begin the anthology.</p>
          </div>
        )}

        {/* Masonry Layout */}
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
          {results.map((story) => (
            <div key={story._id} className="break-inside-avoid">
               <StoryItem
                 title={story.title}
                 author={story.author}
                 excerpt={story.content}
                 type={story.type}
                 onClick={() => handleOpenZenMode(story)}
               />
            </div>
          ))}
        </div>

        <ZenReadingMode 
           isOpen={isZenModeOpen}
           onClose={() => setIsZenModeOpen(false)}
           story={selectedStory ? {
             title: selectedStory.title,
             author: selectedStory.author,
             content: selectedStory.content,
             type: selectedStory.type
           } : null}
        />

        {status === "LoadingMore" && (
          <div className="flex justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-foreground/70" />
          </div>
        )}

        {status === "CanLoadMore" && (
          <div className="flex justify-center pt-20">
            <Button 
              onClick={() => loadMore(12)}
              variant="outline"
              size="lg"
              className="rounded-full px-12 h-14 bg-transparent border-foreground/40 text-foreground hover:bg-foreground/10 hover:border-foreground transition-all italic font-serif tracking-wide shadow-sm"
            >
              Turn the Page
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
