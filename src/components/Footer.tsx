import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";

const {t}= useTranslation()
const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-secondary py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left Section */}
        <div className="mb-4 md:mb-0">
          <h1 className="text-lg font-semibold">{t("footer.title")}</h1>
          <p className="text-sm">© {new Date().getFullYear()} {t("footer.description")}</p>
        </div>

        {/* Center Section: Navigation Links */}
        <div className="flex space-x-4 text-sm">
          <Link to="/us" className="w-full">
            <Button variant="ghost" className="w-full justify-start">
              {t("footer.aboutUs")}
            </Button>
          </Link>
          <Link to="/partnercontacts" className="w-full">
            <Button variant="ghost" className="w-full justify-start">
             {t("footer.contactUs")}
            </Button>
          </Link>
          <Link to="/privacy" className="w-full">
            <Button variant="ghost" className="w-full justify-start">
              {t("footer.privacyPolicy")}
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
