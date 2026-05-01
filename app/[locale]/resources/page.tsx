"use client";

import { Navbar } from "@/components/layout/navbar";
import { ArrowUpRight, Search } from "lucide-react";
import { SelfCareToolkit } from "@/components/resources/self-care-toolkit";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useState, useMemo } from "react";

const articles = [
  {
    title: "Navigating Anxiety",
    summary: "Understanding the psychology of 'flow' and how it helps build cognitive resilience against stress.",
    category: "Mindfulness",
    author: "AFM Editorial",
  },
  {
    title: "Building Resilience",
    summary: "Practical tips for maintaining a consistent creative practice even during difficult mental health periods.",
    category: "Growth",
    author: "AFM Editorial",
  },
  {
    title: "The Art of Self-Compassion",
    summary: "How engaging in visual arts can lower cortisol levels and provide a non-verbal way to process emotion.",
    category: "Wellness",
    author: "AFM Editorial",
  },
];

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) return articles;
    const query = searchQuery.toLowerCase();
    return articles.filter(article => 
      article.title.toLowerCase().includes(query) ||
      article.summary.toLowerCase().includes(query) ||
      article.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen overflow-hidden font-sans text-foreground"
    >
      <Navbar />
      
      <div className="max-w-[1400px] mx-auto pt-32 pb-32 px-6 md:px-12 relative z-10 space-y-24">
        
        {/* Header Section */}
        <header className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
              Find Your Calm.<br/>
              Explore Resources for <span className="text-primary">Mental Well-being</span>
            </h1>
            <p className="text-xl text-foreground/80 leading-relaxed max-w-md">
              A curated space for articles, tools, and a community dedicated to your journey.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mt-8">
               <input 
                 type="text" 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 placeholder="Search articles, exercises, resources..." 
                 className="w-full bg-card text-foreground rounded-full pl-6 pr-12 py-4 outline-none placeholder:text-foreground/50 shadow-xl"
               />
               <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-background p-2 rounded-full text-foreground">
                 <Search className="w-5 h-5" />
               </div>
            </div>
          </div>
          
          {/* Abstract Leaf / Lotus Illustration Placeholder */}
          <div className="hidden md:flex justify-end opacity-80">
             <div className="relative w-72 h-72">
                <div className="absolute right-10 top-10 w-48 h-48 bg-card rounded-tl-full rounded-br-full opacity-20 transform rotate-45" />
                <div className="absolute right-20 top-20 w-40 h-40 bg-foreground rounded-tl-full rounded-br-full opacity-40 transform rotate-12" />
                <div className="absolute right-5 bottom-10 w-12 h-12 border-[6px] border-accent rounded-full" />
             </div>
          </div>
        </header>

        {/* Latest Articles Row */}
        <section className="space-y-10">
           <div className="flex flex-col items-center text-center space-y-2">
             <span className="text-sm font-bold tracking-widest uppercase text-foreground/60">Featured Articles</span>
             <h2 className="text-4xl font-serif text-foreground">Latest Resources & Guidance</h2>
             <p className="text-foreground/70">Discover insights for your mental health journey.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredArticles.length === 0 ? (
                <div className="col-span-3 text-center py-16">
                  <p className="text-muted-foreground">No articles found matching &quot;{searchQuery}&quot;</p>
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="mt-4 text-primary hover:underline"
                  >
                    Clear search
                  </button>
                </div>
              ) : (
                filteredArticles.map((article, i) => (
                 <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                   key={i}
                   className="card-cream group p-6 flex flex-col"
                 >
                    <div className="flex-1 space-y-4">
                       <h3 className="text-2xl font-bold font-serif text-foreground leading-tight">{article.title}</h3>
                       <div className="flex gap-2">
                          <span className="px-3 py-1 border border-foreground/20 rounded-full text-xs font-bold tracking-wider uppercase text-foreground/60">
                            {article.category}
                          </span>
                       </div>

                       <div className="mt-auto pt-6">
                          <button
                            onClick={() => toast.info("Full article coming soon!", { description: "We're working on detailed article pages." })}
                            className="w-full py-4 rounded-full bg-foreground/5 text-foreground font-bold tracking-wide hover:bg-foreground hover:text-card transition-colors flex items-center justify-center gap-2"
                          >
                            Explore <ArrowUpRight className="w-4 h-4" />
                          </button>
                       </div>
                    </div>
                 </motion.div>
              )))}
           </div>
        </section>

        <SelfCareToolkit />

      </div>
    </motion.div>
  );
}
