import { Layout } from "@/components/layout";
import { useProgress } from "@/hooks/use-progress";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Award, Brain, Target, Trash2, XCircle } from "lucide-react";

export default function Progress() {
  const { stats, attempts, clearProgress } = useProgress();

  // Format data for chart
  const recentAttempts = attempts.slice(0, 10).reverse();
  const chartData = recentAttempts.map((a, i) => ({
    name: `Quiz ${i+1}`,
    fullName: a.name,
    score: a.percentage
  }));

  return (
    <Layout>
      <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-display font-bold mb-2">Your Progress</h1>
            <p className="text-muted-foreground">Track your performance across all practice sessions.</p>
          </div>
          {attempts.length > 0 && (
            <button 
              onClick={() => {
                if(confirm("Are you sure you want to clear all history? This cannot be undone.")) {
                  clearProgress();
                }
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors border border-destructive/20 w-fit"
            >
              <Trash2 className="w-4 h-4" /> Clear History
            </button>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total Questions", value: stats.totalAttempted, icon: Brain, color: "text-blue-500", bg: "bg-blue-500/10" },
            { label: "Correct Answers", value: stats.totalCorrect, icon: Target, color: "text-emerald-500", bg: "bg-emerald-500/10" },
            { label: "Wrong Answers", value: stats.totalWrong, icon: XCircle, color: "text-rose-500", bg: "bg-rose-500/10" },
            { label: "Avg Accuracy", value: `${stats.averageAccuracy}%`, icon: Award, color: "text-amber-500", bg: "bg-amber-500/10" },
          ].map((stat, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
              </div>
              <div className="text-3xl font-bold">{stat.value}</div>
            </div>
          ))}
        </div>

        {attempts.length === 0 ? (
          <div className="bg-card border border-border rounded-3xl p-12 text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2">No data yet</h3>
            <p className="text-muted-foreground mb-6">Take a quiz or practice set to see your progress here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chart */}
            <div className="lg:col-span-2 bg-card border border-border rounded-3xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-6">Recent Performance (%)</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" stroke="#8b9bb4" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#8b9bb4" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                    <Tooltip 
                      cursor={{fill: 'rgba(255,255,255,0.05)'}}
                      contentStyle={{ backgroundColor: '#162032', borderColor: '#2a3b5c', borderRadius: '12px' }}
                      itemStyle={{ color: '#f8fafc' }}
                    />
                    <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.score >= 80 ? '#10b981' : entry.score >= 50 ? '#3b82f6' : '#f43f5e'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* History List */}
            <div className="bg-card border border-border rounded-3xl p-6 shadow-lg flex flex-col">
              <h3 className="text-xl font-bold mb-6">History</h3>
              <div className="flex-1 overflow-y-auto pr-2 space-y-4 max-h-[300px] custom-scrollbar">
                {attempts.map((attempt) => (
                  <div key={attempt.id} className="p-4 rounded-xl bg-background border border-border flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm mb-1">{attempt.name}</div>
                      <div className="text-xs text-muted-foreground">{new Date(attempt.date).toLocaleDateString()}</div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold ${attempt.percentage >= 80 ? 'text-emerald-500' : attempt.percentage >= 50 ? 'text-primary' : 'text-rose-500'}`}>
                        {attempt.percentage}%
                      </div>
                      <div className="text-xs text-muted-foreground">{attempt.score}/{attempt.totalQuestions} Correct</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
