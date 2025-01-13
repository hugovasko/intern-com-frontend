import { Link } from "react-router-dom";
import PartnerImage from "@/assets/Partners.svg";
import Logo from "@/assets/Logo.svg";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const Partners = () => {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
        <div className="flex-1 md:text-left">
          <h1 className="text-4xl font-bold mb-6 text-primary">{t("partners.title")}</h1>
          <div className="space-y-4 ">
            <p className="text-lg">{t("partners.p")}</p>
            <p className="text-lg">{t("partners.p1")}</p>
            <p className="text-lg">{t("partners.p2")}</p>
            <p className="text-lg font-semibold">{t("partners.p3")}</p>
          </div>
          <div className="mt-8 space-y-3">
            <div className="flex items-center text-green-600">
              <CheckCircle className="mr-3" size={24} />
              <span>{t("partners.t1")}</span>
            </div>
            <div className="flex items-center text-green-600">
              <CheckCircle className="mr-3" size={24} />
              <span>{t("partners.t2")}</span>
            </div>
            <div className="flex items-center text-green-600">
              <CheckCircle className="mr-3" size={24} />
              <span>{t("partners.t3")}</span>
            </div>
          </div>
          <br></br>
          <Link to="/partnercontacts">
            <Button className="mt-4  py-2  rounded-lg">{t("partners.t4")}</Button>
          </Link>
        </div>
        <div className="flex-1">
          <img
            src={PartnerImage}
            alt="Partners"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
      </div>
      <div className="bg-gray-50 rounded-lg w-full shadow-md p-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 flex justify-center items-center">
            {t("partners.h1")}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-6 text-primary"> {t("partners.h2")}</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <p  className="text-gray-800">
                  {t("partners.text")}
                  <br></br>
                  <br></br>
                  {t("partners.text1")}
                  <br></br>
                  <br></br>
                  {t("partners.text2")} <br></br>
                  <br></br>
                  {t("partners.text3")}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="space-y-4">
              <div className="flex items-center">
                <img src={Logo} alt="Logo" className="w-full h-auto object-cover rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Partners };
