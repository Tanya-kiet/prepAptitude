import { Layout } from "@/components/layout";
import { TOPICS, type Category } from "@/lib/data";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ExternalLink, Play } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Topics() {
  const searchParams = new URLSearchParams(window.location.search);
  const initialCategory = searchParams.get("category") as Category | null;
  
  const categories = Object.keys(TOPICS) as Category[];
  const [activeCategory, setActiveCategory] = useState<Category>(
    initialCategory && categories.includes(initialCategory) ? initialCategory : categories[0]
  );
  const [, navigate] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="bg-background min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12">
            <h1 className="text-4xl font-display font-bold mb-4">Explore Topics</h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Master individual concepts before taking on full practice sets. Select a category below to view all available topics.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-border/50">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" 
                    : "bg-card text-muted-foreground hover:bg-white/10 hover:text-foreground border border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Topics Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {TOPICS[activeCategory].map((topic, idx) => (
                <div 
                  key={idx} 
                  className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl group flex flex-col h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white/5 text-xs font-medium text-muted-foreground border border-white/10">
                      {topic.questions} Questions
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-2">{topic.name}</h3>
                  <p className="text-sm text-muted-foreground mb-6 flex-grow">
                    Practice fundamental concepts and advanced problems for {topic.name}.
                  </p>
                  
                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border/50">
                    <button 
                      onClick={() => navigate(`/quiz?topic=${encodeURIComponent(topic.name)}&category=${encodeURIComponent(activeCategory)}`)}
                      className="flex-1 bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground py-2.5 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <Play className="w-4 h-4" /> Practice
                    </button>
                    <a 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); alert("This would link to external theory material."); }}
                      className="p-2.5 rounded-xl bg-white/5 text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
                      title="Read Theory"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </Layout>
  );
}
