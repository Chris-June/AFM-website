"use client";

import { Navbar } from "@/components/layout/navbar";
import { ParallaxHero } from "@/components/home/parallax-hero";
import { GalleryCard } from "@/components/home/gallery-card";
import { HorizontalStories } from "@/components/home/horizontal-stories";
import { StatCounter } from "@/components/home/stat-counter";
import { LogoBanner } from "@/components/common/logo-banner";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Quote, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

// Canadian partner organizations
const partnerLogos = [
  { name: "CMHA", src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=200&auto=format&fit=crop" },
  { name: "CAMH", src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=200&auto=format&fit=crop" },
  { name: "Bell Let's Talk", src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=200&auto=format&fit=crop" },
  { name: "Kids Help Phone", src: "https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=200&auto=format&fit=crop" },
  { name: "Wellness Together Canada", src: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?q=80&w=200&auto=format&fit=crop" },
  { name: "Jack.org", src: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=200&auto=format&fit=crop" },
  { name: "Crisis Services Canada", src: "https://images.unsplash.com/photo-1590102426319-c98212cf4b45?q=80&w=200&auto=format&fit=crop" },
  { name: "Artists for Mental Health", src: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=200&auto=format&fit=crop" },
];

export default function Home() {
  // Fetch featured content from Convex
  const featuredArtworks = useQuery(api.arts.getFeaturedArt);
  const featuredWritings = useQuery(api.writings.getFeaturedWritings);
  const artistCount = useQuery(api.arts.getArtistCount);
  const artworkCount = useQuery(api.arts.getArtworkCount);
  const storiesCount = useQuery(api.writings.getWritingsCount);
  return (
    <div className="relative min-h-screen text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <ParallaxHero />

      {/* Featured Works Gallery */}
      <section className="relative py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          >
            <div>
              <span className="text-sm font-bold tracking-widest uppercase text-primary mb-4 block">
                Featured Collection
              </span>
              <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight">
                Curated Works
              </h2>
            </div>
            <Link
              href="/gallery"
              className="group inline-flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors"
            >
              View All Works
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Masonry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {featuredArtworks === undefined ? (
              <div className="col-span-3 flex justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : featuredArtworks.length === 0 ? (
              <div className="col-span-3 text-center py-16">
                <p className="text-muted-foreground">No featured works yet.</p>
              </div>
            ) : (
              featuredArtworks.slice(0, 5).map((work, index) => (
                <GalleryCard
                  key={work._id}
                  title={work.title}
                  artist={work.artist}
                  imageUrl={work.imageUrl}
                  type="art"
                  href="/gallery"
                  size={["large", "medium", "small", "wide", "medium"][index % 5] as "large" | "medium" | "small" | "wide"}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Latest Stories - Horizontal Scroll */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background accent */}
        <div className="absolute inset-0 bg-card/30" />
        
        <div className="relative max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
          >
            <div>
              <span className="text-sm font-bold tracking-widest uppercase text-primary mb-4 block">
                From the Community
              </span>
              <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight">
                Latest Stories
              </h2>
            </div>
            <Link
              href="/stories"
              className="group inline-flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors"
            >
              Read All Stories
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative max-w-7xl mx-auto">
          {featuredWritings === undefined ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : featuredWritings.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No featured stories yet.</p>
            </div>
          ) : (
            <HorizontalStories 
              stories={featuredWritings.slice(0, 4).map(w => ({
                id: w._id,
                title: w.title,
                excerpt: w.content.slice(0, 150) + "...",
                author: w.author,
                readTime: "5 min read"
              }))} 
            />
          )}
        </div>
      </section>

      {/* Community CTA Section */}
      <section className="relative py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Left: Image with decorative elements */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2671&auto=format&fit=crop"
                  alt="Artist at work"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
              </div>
              
              {/* Floating accent card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute -bottom-6 -right-6 md:right-6 bg-card rounded-2xl p-6 shadow-xl max-w-[250px]"
              >
                <Quote className="w-8 h-8 text-primary mb-3" />
                <p className="text-foreground font-serif italic text-lg leading-relaxed">
                  &ldquo;Art saved my life. Now I share it to save others.&rdquo;
                </p>
              </motion.div>

              {/* Decorative border */}
              <div className="absolute -inset-4 border border-primary/20 rounded-[2rem] -z-10" />
            </motion.div>

            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <span className="text-sm font-bold tracking-widest uppercase text-primary mb-4 block">
                  Join Our Community
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-tight mb-6">
                  Your Voice
                  <br />
                  <span className="italic text-primary">Matters</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  A Frame of Mind is more than a gallery—it&apos;s a sanctuary where artists 
                  and writers transform their mental health journey into creative expression. 
                  Every submission is handled with care and full attribution.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 py-8 border-y border-border/50">
                <StatCounter value={artistCount ?? 0} suffix="+" label="Artists" />
                <StatCounter value={artworkCount ?? 0} suffix="+" label="Artworks" />
                <StatCounter value={storiesCount ?? 0} suffix="+" label="Stories" />
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/submit"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "rounded-full px-10 h-14 text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
                  )}
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Submit Your Work
                </Link>
                <Link
                  href="/resources"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "rounded-full px-10 h-14 text-lg glass hover:bg-background/10 transition-all duration-300"
                  )}
                >
                  Explore Resources
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partner Logos Banner */}
      <section className="relative py-16 md:py-20 bg-muted/30 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <p className="text-center text-sm font-bold tracking-widest uppercase text-muted-foreground">
            Supported By Leading Canadian Organizations
          </p>
        </div>
        <LogoBanner logos={partnerLogos} speed={30} />
      </section>

      {/* Footer */}
      <footer className="relative border-t border-primary/10 bg-[rgba(10,10,11,0.84)] px-6 py-16 text-foreground backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <h3 className="mb-4 text-2xl font-serif font-bold text-foreground">
                A Frame <span className="italic">Of Mind</span>
              </h3>
              <p className="max-w-md leading-relaxed text-muted-foreground">
                A safe space dedicated to transforming mental health 
                through the power of human expression and creative community.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="mb-4 font-bold uppercase tracking-[0.18em] text-primary/90">Explore</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/gallery" className="text-muted-foreground transition-colors hover:text-primary">
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link href="/stories" className="text-muted-foreground transition-colors hover:text-primary">
                    Stories
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="text-muted-foreground transition-colors hover:text-primary">
                    Resources
                  </Link>
                </li>
                <li>
                  <Link href="/submit" className="text-muted-foreground transition-colors hover:text-primary">
                    Submit Work
                  </Link>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="mb-4 font-bold uppercase tracking-[0.18em] text-primary/90">Connect</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-8 md:flex-row">
            <p className="text-sm text-muted-foreground/80">
              © 2026 A Frame Of Mind. 
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="text-muted-foreground/80 transition-colors hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="#" className="text-muted-foreground/80 transition-colors hover:text-primary">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
