import career from "../assets/careers.svg";
import { CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const CareerAssistant = () => {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
        <div className="flex-1 md:text-left">
          <h1 className="text-4xl font-bold mb-6 text-primary">{t("careerassistant.title")}</h1>
          <p>
            <div className="mt-8 space-y-3">
              <div className="flex items-center text-green-600">
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
              <div className="flex items-center text-green-600">
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
              <div className="flex items-center text-green-600">
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
              <div className="flex items-center text-green-600">
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
              <div className="flex items-center text-green-600">
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
              <div className="flex items-center text-green-600">
                <CheckCircle className="mr-3" size={24} />
                <span className="text-xl">
                  {t("careerassistant.h17")}
                </span>
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
              <div className="flex items-center text-green-600">
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
    </div>
  );
};

export { CareerAssistant };
