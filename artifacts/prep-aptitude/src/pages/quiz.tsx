import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { getRandomQuestions, type Question } from "@/lib/data";
import { useProgress } from "@/hooks/use-progress";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, RotateCcw, XCircle, Home } from "lucide-react";
import confetti from "canvas-confetti";

export default function Quiz() {
  const searchParams = new URLSearchParams(window.location.search);
  const topic = searchParams.get("topic");
  const category = searchParams.get("category");
  const setId = searchParams.get("set");
  const countParam = searchParams.get("count");
  
  const [, navigate] = useLocation();
  const { recordAttempt } = useProgress();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  // Initialize quiz
  useEffect(() => {
    let qCount = 10; // Default
    if (countParam) qCount = parseInt(countParam);
    if (topic && !countParam) qCount = 5; // Shorter for topic practice

    const q = getRandomQuestions(qCount, { topic: topic || undefined, category: category || undefined });
    if (q.length === 0) {
      alert("No questions found for this selection.");
      navigate('/');
      return;
    }
    setQuestions(q);
  }, [topic, category, setId, countParam, navigate]);

  const handleSelectOption = (optIndex: number) => {
    if (isFinished) return;
    setAnswers(prev => ({ ...prev, [currentIndex]: optIndex }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const finishQuiz = () => {
    let finalScore = 0;
    const catStats: Record<string, { correct: number, total: number }> = {};

    questions.forEach((q, idx) => {
      // init category stat
      if (!catStats[q.category]) catStats[q.category] = { correct: 0, total: 0 };
      catStats[q.category].total += 1;

      if (answers[idx] === q.correctAnswerIndex) {
        finalScore += 1;
        catStats[q.category].correct += 1;
      }
    });

    setScore(finalScore);
    setIsFinished(true);

    const percentage = Math.round((finalScore / questions.length) * 100);
    
    // Save to progress
    recordAttempt({
      name: setId ? `Practice Set ${setId}` : topic ? `${topic} Practice` : 'Mixed Quiz',
      score: finalScore,
      totalQuestions: questions.length,
      percentage,
      categoryStats: catStats
    });

    if (percentage >= 80) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#6366f1', '#10b981']
      });
    }
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;
  const isAnswered = answers[currentIndex] !== undefined;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top Bar */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors">
            <ArrowLeft className="w-5 h-5" /> <span className="hidden sm:inline">Exit</span>
          </button>
          
          <div className="font-semibold">
            {isFinished ? "Results" : `Question ${currentIndex + 1} of ${questions.length}`}
          </div>

          <div className="w-16"></div> {/* Spacer */}
        </div>
        
        {/* Progress Bar */}
        {!isFinished && (
          <div className="w-full h-1 bg-white/5">
            <motion.div 
              className="h-full bg-primary" 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-8">
                <div className="flex gap-2 mb-4">
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-primary/10 text-primary border border-primary/20">
                    {currentQ.category}
                  </span>
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-white/5 text-muted-foreground border border-white/10">
                    {currentQ.topic}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-medium leading-relaxed whitespace-pre-line">
                  {currentQ.questionText}
                </h2>
              </div>

              <div className="space-y-4 mb-12">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = answers[currentIndex] === idx;
                  const alphabet = ['A', 'B', 'C', 'D'][idx];
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 ${
                        isSelected 
                          ? "border-primary bg-primary/10 shadow-[0_0_15px_-3px_rgba(59,130,246,0.3)]" 
                          : "border-border bg-card hover:border-primary/50 hover:bg-white/5"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${isSelected ? 'bg-primary text-white' : 'bg-white/10 text-muted-foreground'}`}>
                        {alphabet}
                      </div>
                      <span className="text-lg">{opt}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-border/50">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="px-6 py-3 rounded-xl font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 disabled:opacity-30 transition-all flex items-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" /> Previous
                </button>
                
                <button
                  onClick={handleNext}
                  disabled={!isAnswered}
                  className="px-8 py-3 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 disabled:opacity-50 transition-all flex items-center gap-2"
                >
                  {currentIndex === questions.length - 1 ? "Submit" : "Next"} <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card border border-border p-8 md:p-12 rounded-3xl shadow-2xl"
            >
              <div className="text-center mb-12">
                <h1 className="text-4xl font-display font-bold mb-4">Quiz Completed!</h1>
                <div className="inline-flex items-baseline justify-center gap-2">
                  <span className="text-6xl font-black text-primary">{score}</span>
                  <span className="text-2xl text-muted-foreground">/ {questions.length}</span>
                </div>
                <p className="mt-4 text-xl text-muted-foreground">
                  {score / questions.length >= 0.8 ? "Outstanding performance!" : 
                   score / questions.length >= 0.5 ? "Good job! Room for improvement." : 
                   "Keep practicing! You'll get better."}
                </p>
              </div>

              <div className="space-y-6 mb-12">
                <h3 className="text-xl font-bold border-b border-border pb-2">Review Answers</h3>
                {questions.map((q, idx) => {
                  const userAnswer = answers[idx];
                  const isCorrect = userAnswer === q.correctAnswerIndex;
                  return (
                    <div key={idx} className={`p-6 rounded-xl border ${isCorrect ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-rose-500/5 border-rose-500/20'}`}>
                      <div className="flex gap-4 items-start">
                        <div className="mt-1">
                          {isCorrect ? <CheckCircle2 className="w-6 h-6 text-emerald-500" /> : <XCircle className="w-6 h-6 text-rose-500" />}
                        </div>
                        <div>
                          <p className="font-medium mb-3">{idx+1}. {q.questionText}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                            {q.options.map((opt, optIdx) => {
                              let optClass = "text-muted-foreground";
                              if (optIdx === q.correctAnswerIndex) optClass = "text-emerald-500 font-bold";
                              else if (optIdx === userAnswer && !isCorrect) optClass = "text-rose-500 line-through";
                              
                              return (
                                <div key={optIdx} className={`text-sm ${optClass}`}>
                                  • {opt}
                                </div>
                              );
                            })}
                          </div>
                          {!isCorrect && (
                            <div className="text-sm bg-background/50 p-4 rounded-lg border border-border">
                              <span className="font-bold text-primary">Explanation:</span> {q.explanation}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => window.location.reload()} className="px-8 py-4 rounded-xl font-bold bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-center gap-2">
                  <RotateCcw className="w-5 h-5" /> Try Again
                </button>
                <button onClick={() => navigate('/practice-sets')} className="px-8 py-4 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg transition-colors flex items-center justify-center gap-2">
                   More Practice <ChevronRight className="w-5 h-5" />
                </button>
                <button onClick={() => navigate('/')} className="px-8 py-4 rounded-xl font-bold bg-transparent hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-2">
                   <Home className="w-5 h-5" /> Dashboard
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
