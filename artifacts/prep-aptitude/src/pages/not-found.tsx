import { Layout } from "@/components/layout";
import { Link } from "wouter";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-rose-500/10 text-rose-500 mb-6">
            <AlertCircle className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
          <p className="text-muted-foreground mb-8">The page you are looking for doesn't exist or has been moved.</p>
          <Link 
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    </Layout>
  );
}
