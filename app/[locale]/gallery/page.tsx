"use client";

import { usePaginatedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Navbar } from "@/components/layout/navbar";
import { GalleryItem } from "@/components/gallery/gallery-item";
import { GalleryLayeredStack } from "@/components/gallery/gallery-layered-stack";
import { Button } from "@/components/ui/button";
import { Loader2, ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { GalleryLightbox } from "@/components/gallery/gallery-lightbox";

export default function GalleryPage() {
  const { results, status, loadMore } = usePaginatedQuery(
    api.arts.getArt,
    {},
    { initialNumItems: 12 }
  );

  const [selectedArt, setSelectedArt] = useState<typeof results[0] | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Split results: First 4 for Curated Exhibitions, rest for the grid
  const featuredArt = results.slice(0, 4);
  const gridArt = results.slice(4);

  // Track scroll position to update pagination dots
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      const scrollLeft = carousel.scrollLeft;
      const itemWidth = 400; // min-w-[400px] + gap
      const index = Math.round(scrollLeft / itemWidth);
      setActiveIndex(Math.min(index, featuredArt.length - 1));
    };

    carousel.addEventListener('scroll', handleScroll, { passive: true });
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, [featuredArt.length]);

  const handleOpenLightbox = (art: typeof results[0]) => {
    setSelectedArt(art);
    setIsLightboxOpen(true);
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen overflow-hidden text-foreground"
    >
      <Navbar />
      
      <div className="relative z-10 pt-32 pb-32">
        {/* Curated Exhibitions Section */}
        <div className="max-w-[1400px] mx-auto space-y-8 px-6 md:px-12 mb-32">
           <div className="flex flex-col items-center text-center space-y-4">
             <h2 className="text-3xl md:text-4xl font-serif text-primary tracking-widest uppercase">
               Curated Exhibitions
             </h2>
             <p className="text-muted-foreground max-w-lg">
               Breathtaking 3D-like carousels and subtle textures continually re-engage on this virtual art gallery.
             </p>
           </div>
           
           {results.length > 0 && (
             <div className="relative group">
                <div 
                  ref={carouselRef}
                  className="flex gap-8 overflow-x-auto snap-x snap-mandatory py-12 px-4 hide-scrollbar"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {featuredArt.map((art, index) => (
                    <motion.div 
                      key={art._id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
                      className="min-w-[300px] md:min-w-[400px] snap-center shrink-0"
                    >
                      <GalleryItem
                        title={art.title}
                        artist={art.artist}
                        imageUrl={art.imageUrl}
                        type={art.type}
                        onClick={() => handleOpenLightbox(art)}
                        className="transform transition-transform duration-500 hover:scale-105"
                      />
                    </motion.div>
                  ))}
                </div>
                
                {/* Carousel Controls */}
                <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={scrollLeft} className="w-10 h-10 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center text-primary hover:bg-primary/40 backdrop-blur-md transition-all">
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={scrollRight} className="w-10 h-10 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center text-primary hover:bg-primary/40 backdrop-blur-md transition-all">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
             </div>
           )}
           
           {/* Pagination Dots Indicator */}
           <div className="flex justify-center gap-2 pt-4">
              {featuredArt.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    carouselRef.current?.scrollTo({
                      left: index * 400,
                      behavior: 'smooth'
                    });
                  }}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index === activeIndex ? 'bg-primary' : 'bg-foreground/30 hover:bg-foreground/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
           </div>
        </div>

        {/* New Acquisitions - Layered Stack */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 space-y-12">
          <div className="flex flex-col items-center text-center space-y-4">
             <h2 className="text-3xl font-serif text-primary tracking-widest uppercase mb-2">
               New Acquisitions
             </h2>
             <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
             <p className="text-muted-foreground max-w-lg mt-4">
               A recent works overview highlighting gold hover effects and glassmorphism.
             </p>
          </div>

          {results.length === 0 && status === "Exhausted" && (
            <div className="flex flex-col items-center justify-center py-32 text-center space-y-4 border border-foreground/20 rounded-[32px] opacity-50 bg-card/20">
              <p className="text-xl font-medium font-serif italic text-primary">The gallery is empty.</p>
              <p className="text-muted-foreground">Be the first to share your vision with the world.</p>
            </div>
          )}

          <GalleryLayeredStack artworks={gridArt} onItemClick={handleOpenLightbox} />
        </div>

        <GalleryLightbox 
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          art={selectedArt ? {
            title: selectedArt.title,
            artist: selectedArt.artist,
            description: selectedArt.description,
            imageUrl: selectedArt.imageUrl,
            type: selectedArt.type
          } : null}
        />

        {status === "LoadingMore" && (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {status === "CanLoadMore" && (
          <div className="flex justify-center pt-24 pb-12">
            <Button 
              onClick={() => loadMore(12)}
              variant="outline"
              size="lg"
              className="rounded-full px-12 h-14 bg-transparent border-primary/30 text-primary hover:bg-primary/10 hover:border-primary transition-all font-serif italic tracking-wide"
            >
              Discover More Works
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
