// src/pages/Home.tsx
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="text-center space-y-6 md:space-y-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
          Welcome to Internship Connect
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
          Discover exciting internship opportunities and full-time positions. Connect with leading
          companies and take the next step in your career.
        </p>

        <div className="space-y-8">
          <Button
            size="lg"
            onClick={() => navigate("/opportunities")}
            className="px-8 w-full sm:w-auto"
          >
            Browse Opportunities
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto px-4 mt-12">
            {/* For Candidates Card */}
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="text-xl md:text-2xl font-bold mb-4">For Candidates</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>Find your dream internship or job position.</p>
                <p>Apply directly to top companies.</p>
                <p>Track your applications in one place.</p>
              </div>
            </div>

            {/* For Companies Card */}
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="text-xl md:text-2xl font-bold mb-4">For Companies</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>Post opportunities and find talented candidates.</p>
                <p>Streamline your recruitment process.</p>
                <p>Connect with the best emerging talent.</p>
              </div>
            </div>
          </div>

          {/* Additional Features Section */}
          <div className="mt-12 pt-8 border-t">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Why Choose Us?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left max-w-5xl mx-auto">
              <div className="p-4">
                <h3 className="font-semibold mb-2">Easy Application</h3>
                <p className="text-muted-foreground">
                  Streamlined process to help you find and apply to opportunities quickly.
                </p>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">Quality Opportunities</h3>
                <p className="text-muted-foreground">
                  Curated listings from verified companies and organizations.
                </p>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">Career Growth</h3>
                <p className="text-muted-foreground">
                  Find opportunities that align with your career goals and aspirations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
