import { Layout } from "@/components/layout";
import { PRACTICE_SETS } from "@/lib/data";
import { Clock, HelpCircle, PlayCircle, ShieldAlert, Target, Zap } from "lucide-react";
import { useLocation } from "wouter";

export default function PracticeSets() {
  const [, navigate] = useLocation();

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'Medium': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      case 'Hard': return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
      default: return 'text-primary bg-primary/10 border-primary/20';
    }
  };

  const getDifficultyIcon = (diff: string) => {
    switch (diff) {
      case 'Easy': return <Zap className="w-5 h-5" />;
      case 'Medium': return <Target className="w-5 h-5" />;
      case 'Hard': return <ShieldAlert className="w-5 h-5" />;
      default: return <PlayCircle className="w-5 h-5" />;
    }
  };

  const sections = ['Easy', 'Medium', 'Hard'];

  return (
    <Layout>
      <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16">
          <h1 className="text-4xl font-display font-bold mb-4">Mixed Practice Sets</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Simulate real exam conditions with sets containing mixed questions from all categories. Choose your difficulty and start testing your overall readiness.
          </p>
        </div>

        <div className="space-y-16">
          {sections.map(section => (
            <div key={section}>
              <div className="flex items-center gap-3 mb-6 pb-2 border-b border-border">
                {getDifficultyIcon(section)}
                <h2 className="text-2xl font-bold">{section} Level</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PRACTICE_SETS.filter(s => s.difficulty === section).map(set => (
                  <div key={set.id} className="bg-card border border-border hover:border-border/80 rounded-2xl p-6 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
                    {/* Decorative gradient blob */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
                    
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getDifficultyColor(set.difficulty)}`}>
                          {set.difficulty}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-4">{set.name}</h3>
                      
                      <div className="flex items-center gap-6 mb-8 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <HelpCircle className="w-4 h-4" />
                          <span>{set.questions} Qs</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{set.time}</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => navigate(`/quiz?set=${set.id}&count=${set.questions}`)}
                        className="w-full py-3 rounded-xl font-bold bg-white/5 hover:bg-primary text-foreground hover:text-primary-foreground border border-white/10 hover:border-primary transition-all flex items-center justify-center gap-2"
                      >
                        Start Set <PlayCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </Layout>
  );
}
