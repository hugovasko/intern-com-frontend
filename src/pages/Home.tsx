import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-16 pb-12 md:pt-24 md:pb-20">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            {t("home.hero.title")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("home.hero.description")}
          </p>
          <div className="pt-4">
            <Button size="lg" onClick={() => navigate("/opportunities")} className="px-8">
              <FileSearch className="mr-2 h-5 w-5" />
              {t("home.hero.button")}
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
                {t("home.hero.card1")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                <p className="text-muted-foreground">{t("home.hero.card1text1")}</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                <p className="text-muted-foreground">{t("home.hero.card1text2")}</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                <p className="text-muted-foreground">{t("home.hero.card1text3")}</p>
              </div>
              <Button
                variant="secondary"
                className="w-full mt-4"
                onClick={() => navigate("/auth/register")}
              >
                {t("home.hero.card1button")}
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
                {t("home.hero.card2")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                <p className="text-muted-foreground">{t("home.hero.card2text1")}</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                <p className="text-muted-foreground">{t("home.hero.card2text2")}</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                <p className="text-muted-foreground">{t("home.hero.card2text3")}</p>
              </div>
              <Button
                variant="secondary"
                className="w-full mt-4"
                onClick={() => navigate("/auth/partnerRegister")}
              >
                {t("home.hero.card2button")}
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">{t("home.hero.features.title")}</h2>
          <p className="text-muted-foreground mt-2">{t("home.hero.features.description")}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <Zap className="h-10 w-10 text-primary mb-2" />
              <CardTitle>{t("home.hero.features.card1")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t("home.hero.features.description1")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Target className="h-10 w-10 text-primary mb-2" />
              <CardTitle>{t("home.hero.features.card2")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t("home.hero.features.description2")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <LineChart className="h-10 w-10 text-primary mb-2" />
              <CardTitle>{t("home.hero.features.card3")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t("home.hero.features.description3")}</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
