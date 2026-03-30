import { Layout } from "@/components/layout";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Brain, Calculator, LineChart, Target, Zap, Clock, Send } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Home() {
  const [, navigate] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFeedbackSent(true);
      setTimeout(() => setFeedbackSent(false), 3000);
    }, 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background z-0" />
        
        {/* Dynamic decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-50 animate-pulse" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '2s' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex-1 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                <Zap className="w-4 h-4" /> The New Standard in Practice
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold leading-tight mb-6">
                Master your <br />
                <span className="text-gradient">Aptitude Skills</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Practice thousands of premium quality questions. Improve your speed. Crack your placement tests and competitive exams with confidence.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <button 
                  onClick={() => navigate('/practice-sets')}
                  className="px-8 py-4 w-full sm:w-auto rounded-2xl font-semibold bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)] hover:shadow-[0_0_60px_-15px_rgba(59,130,246,0.6)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Start Practicing <ArrowRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => navigate('/topics')}
                  className="px-8 py-4 w-full sm:w-auto rounded-2xl font-semibold bg-white/5 hover:bg-white/10 text-foreground border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  Explore Topics
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex-1 w-full max-w-lg lg:max-w-none relative"
            >
              {/* Note: In a real environment, hero-bg.png would be loaded here. Falling back to a styled div if image fails */}
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl glass-card group">
                <img 
                  src={`${import.meta.env.BASE_URL}images/hero-bg.png`} 
                  alt="Platform visualization" 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                  <Target className="w-32 h-32 text-primary/20" />
                </div>
                
                {/* Floating stat card overlay */}
                <div className="absolute -bottom-6 -left-6 bg-card border border-white/10 p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce" style={{ animationDuration: '3s' }}>
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                    <LineChart className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Accuracy</div>
                    <div className="text-xl font-bold">94.2%</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-border/50 bg-white/5 backdrop-blur-md relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
            {[
              { label: "Questions", value: "5000+" },
              { label: "Topics Covered", value: "50+" },
              { label: "Difficulty Levels", value: "3 Levels" },
              { label: "Pricing", value: "Free Forever" }
            ].map((stat, i) => (
              <div key={i} className="text-center px-4">
                <div className="text-3xl font-display font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Master Every Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Comprehensive coverage of all major aptitude sections required for top-tier company placements.</p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { title: "Quantitative Aptitude", icon: Calculator, color: "text-blue-500", bg: "bg-blue-500/10", desc: "Numbers, algebra, geometry & more." },
              { title: "Logical Reasoning", icon: Brain, color: "text-purple-500", bg: "bg-purple-500/10", desc: "Puzzles, patterns & analytical thinking." },
              { title: "Verbal Ability", icon: BookOpen, color: "text-emerald-500", bg: "bg-emerald-500/10", desc: "Grammar, comprehension & vocabulary." },
              { title: "Data Interpretation", icon: LineChart, color: "text-orange-500", bg: "bg-orange-500/10", desc: "Charts, graphs & data analysis." }
            ].map((cat, i) => (
              <motion.div key={i} variants={itemVariants}>
                <Link href={`/topics?category=${encodeURIComponent(cat.title)}`}>
                  <div className="bg-card hover:bg-card/80 border border-border hover:border-primary/50 rounded-2xl p-6 h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer group">
                    <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110", cat.bg, cat.color)}>
                      <cat.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{cat.title}</h3>
                    <p className="text-muted-foreground text-sm">{cat.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quick Navigation Cards */}
      <section className="py-12 bg-white/[0.02] border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/topics" className="flex items-center gap-4 p-6 rounded-2xl bg-card border border-border hover:border-primary transition-all hover:shadow-md group">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg group-hover:text-primary transition-colors">Topic-wise Study</h3>
                <p className="text-sm text-muted-foreground">Focus on specific areas</p>
              </div>
            </Link>
            
            <Link href="/practice-sets" className="flex items-center gap-4 p-6 rounded-2xl bg-card border border-border hover:border-primary transition-all hover:shadow-md group">
              <div className="p-3 rounded-lg bg-accent/10 text-accent">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg group-hover:text-accent transition-colors">Mixed Practice Sets</h3>
                <p className="text-sm text-muted-foreground">Simulate real exams</p>
              </div>
            </Link>

            <Link href="/progress" className="flex items-center gap-4 p-6 rounded-2xl bg-card border border-border hover:border-primary transition-all hover:shadow-md group">
              <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-500">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg group-hover:text-emerald-500 transition-colors">Track Progress</h3>
                <p className="text-sm text-muted-foreground">Analyze your performance</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-display font-bold mb-4">We Value Your Feedback</h2>
              <p className="text-muted-foreground">Help us improve PrepAptitude to serve you better.</p>
            </div>
            
            {feedbackSent ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 p-8 rounded-2xl text-center"
              >
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                <p>Your feedback has been received. We appreciate your input.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Name</label>
                    <input required type="text" className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <input required type="email" className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Message</label>
                  <textarea required rows={4} className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none" placeholder="What can we improve?"></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? "Sending..." : "Send Feedback"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
