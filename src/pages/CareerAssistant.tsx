import career from "../assets/careers.svg";
import { CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FileText, Star, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const CareerAssistant = () => {
  const { t } = useTranslation();
  const cvGuidelines = [
    {
      title: t("career.h1"),
      description: t("career.p1"),
    },
    {
      title: t("career.h2"),
      description: t("career.p2"),
    },
    {
      title: t("career.h3"),
      description: t("career.p3"),
    },
    {
      title: t("career.h4"),
      description: t("career.p4"),
    },
  ];
  const mainSections = [
    {
      title: t("career.h22"),
      items: [t("career.p22"), t("career.p23"), t("career.p24"), t("career.p25"), t("career.p26")],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
        <div className="flex-1 md:text-left">
          <h1 className="text-4xl font-bold mb-6 text-primary">{t("careerassistant.title")}</h1>
          <p>
            <div className="mt-8 space-y-3">
              <div className="flex items-center text-primary">
                <CheckCircle className="mr-3" size={24} />
                <span className="text-xl"> {t("careerassistant.p")}</span>
              </div>
            </div>
            <br />
            <strong>{t("careerassistant.h1")} </strong> {t("careerassistant.p1")}
            <br />
            <br />
            <strong>{t("careerassistant.h2")}</strong> {t("careerassistant.p2")}
            <br />
            <br />
            <div className="mt-8 space-y-3">
              <div className="flex items-center text-primary">
                <CheckCircle className="mr-3" size={24} />
                <span className="text-xl"> {t("careerassistant.h3")}</span>
              </div>
            </div>
            <br />
            <br />
            <strong>{t("careerassistant.h4")}</strong> {t("careerassistant.p4")}
            <br />
            <br />
            <strong>{t("careerassistant.h5")}</strong> {t("careerassistant.p5")}
            <br />
            <br />
            <div className="mt-8 space-y-3">
              <div className="flex items-center text-primary">
                <CheckCircle className="mr-3" size={24} />
                <span className="text-xl">{t("careerassistant.h6")}</span>
              </div>
            </div>
            <br />
            <strong>{t("careerassistant.h7")}</strong> {t("careerassistant.p7")}
            <br />
            <br />
            <strong>{t("careerassistant.h8")}</strong> {t("careerassistant.p8")}
            <br />
            <br />
            <div className="mt-8 space-y-3">
              <div className="flex items-center text-primary">
                <CheckCircle className="mr-3" size={24} />
                <span className="text-xl">{t("careerassistant.h9")}</span>
              </div>
            </div>
            <br />
            <strong>{t("careerassistant.h10")}</strong> {t("careerassistant.p10")}
            <br />
            <br />
            <strong>{t("careerassistant.h11")}</strong> {t("careerassistant.p11")}
            <br />
            <br />
            <strong>{t("careerassistant.h12")}</strong> {t("careerassistant.p12")}
          </p>
          <br />
          <br />
        </div>
        <div className="flex-1 relative  ">
          <img src={career} alt="Partners" className="w-full h-auto object-cover " />
          <p>
            <div className="mt-8 space-y-3">
              <div className="flex items-center text-primary">
                <CheckCircle className="mr-3" size={24} />
                <span className="text-xl">{t("careerassistant.h13")}</span>
              </div>
            </div>
            <br />
            <strong>{t("careerassistant.h14")}</strong>
            {t("careerassistant.h14")}
            <br />
            <br />
            <strong>{t("careerassistant.h15")}</strong> {t("careerassistant.p15")}
            <br />
            <br />
            <strong>{t("careerassistant.h16")}</strong> {t("careerassistant.p16")}
            <br />
            <br />
            <div className="mt-8 space-y-3">
              <div className="flex items-center text-primary">
                <CheckCircle className="mr-3" size={24} />
                <span className="text-xl">{t("careerassistant.h17")}</span>
              </div>
            </div>
            <br />
            <strong>{t("careerassistant.h18")}</strong>
            {t("careerassistant.p18")}
            <br />
            <br />
            <strong>{t("careerassistant.h19")}</strong>
            {t("careerassistant.p19")}
            <br />
            <br />
            <div className="mt-8 space-y-3">
              <div className="flex items-center text-primary">
                <CheckCircle className="mr-3" size={24} />
                <span className="text-xl">{t("careerassistant.h20")}</span>
              </div>
            </div>
            <br />
            <br />
            <strong>{t("careerassistant.h21")}</strong> {t("careerassistant.p21")}
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-1">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-2">
          {/* Original content */}
          <div className="flex-1 md:text-left">
            <h1 className="text-4xl font-bold mb-6 text-primary">{t("career.title")}</h1>

            <div className="prose max-w-none">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
                <h2 className="text-2xl text-primary font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle className="text-primary" size={24} />
                  {t("career.h10")}
                </h2>

                <p className="text-gray-700 mb-6">
                {t("career.h18")}
                </p>

                <div className="space-y-6">
                  <div className="mt-8 space-y-4 ">
                    <div className="bg-primary/5 p-4 rounded-lg">
                      <h3 className="font-semibold text-primary  flex items-center gap-2">
                        <CheckCircle className="text-primary" size={20} />
                        {t("career.h9")}
                      </h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li> {t("career.p27")}</li>
                        <li>{t("career.h20")}</li>
                        <li>{t("career.h16")}</li>
                        <li>{t("career.h21")}</li>
                        <li>{t("career.h17")}</li>
                      </ul>
                    </div>
                  </div>
                  {mainSections.map((section, index) => (
                    <Card key={index} className="border-l-4 border-l-primary">
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-2">{section.title}</h3>

                        {section.items && (
                          <ul className="space-y-2 mt-2">
                            {section.items.map((item, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <ArrowRight size={16} className="text-primary flex-shrink-0" />
                                <span className="text-muted-foreground">{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            {/* CV Guidelines Section */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
              <div className="flex items-center gap-3 ">
                <FileText className="text-primary" size={28} />
                <h2 className="text-2xl text-primary font-semibold mb-4 flex items-center gap-2 ">
                {t("career.h12")}
                </h2>
              </div>

              <div className="space-y-6">
                {cvGuidelines.map((guideline, index) => (
                  <Card key={index} className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Star className="text-primary mt-1" size={20} />
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{guideline.title}</h3>
                          <p className="text-muted-foreground">{guideline.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CareerAssistant };
