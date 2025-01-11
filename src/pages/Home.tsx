import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Briefcase,
  FileSearch,
  LineChart,
  Users,
  BuildingIcon,
  GraduationCap,
  CheckCircle,
  Zap,
  Target,
} from "lucide-react";

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-16 pb-12 md:pt-24 md:pb-20">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Welcome to Internship Connect
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover exciting internship opportunities and full-time positions. Connect with leading
            companies and take the next step in your career.
          </p>
          <div className="pt-4">
            <Button size="lg" onClick={() => navigate("/opportunities")} className="px-8">
              <FileSearch className="mr-2 h-5 w-5" />
              Browse Opportunities
            </Button>
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="relative overflow-hidden border-primary/20 hover:border-primary/50 transition-colors">
            <div className="absolute top-0 right-0 p-3 text-primary/10">
              <GraduationCap className="h-24 w-24" />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Users className="h-6 w-6 mr-2" />
                For Candidates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                <p className="text-muted-foreground">Find your dream internship or job position</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                <p className="text-muted-foreground">Apply directly to top companies</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                <p className="text-muted-foreground">Track your applications in one place</p>
              </div>
              <Button
                variant="secondary"
                className="w-full mt-4"
                onClick={() => navigate("/auth/register")}
              >
                Sign Up as Candidate
              </Button>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-primary/20 hover:border-primary/50 transition-colors">
            <div className="absolute top-0 right-0 p-3 text-primary/10">
              <BuildingIcon className="h-24 w-24" />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Briefcase className="h-6 w-6 mr-2" />
                For Companies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                <p className="text-muted-foreground">
                  Post opportunities and find talented candidates
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                <p className="text-muted-foreground">Streamline your recruitment process</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                <p className="text-muted-foreground">Connect with the best emerging talent</p>
              </div>
              <Button
                variant="secondary"
                className="w-full mt-4"
                onClick={() => navigate("/auth/partnerRegister")}
              >
                Join as Company
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Why Choose Us?</h2>
          <p className="text-muted-foreground mt-2">
            We make it easy to connect talent with opportunities
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <Zap className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Easy Application</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Streamlined process to help you find and apply to opportunities quickly.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Target className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Quality Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Curated listings from verified companies and organizations.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <LineChart className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Career Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Find opportunities that align with your career goals and aspirations.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
