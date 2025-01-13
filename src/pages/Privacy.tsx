import React from "react";
import { useTranslation } from "react-i18next";

const PrivacyPolicy: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl text-primary font-bold mb-6">{t("privacyPolicy.title")}</h1>
      <p className="mb-4">
      {t("privacyPolicy.welcome")}
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">{t("privacyPolicy.informationTitle")}</h2>
      <p className="mb-4">
      {t("privacyPolicy.informationContent")}
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>{t("privacyPolicy.personalData")}</li>
        <li>{t("privacyPolicy.usageData")}</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">{t("privacyPolicy.howUseTitle")}</h2>
      <p className="mb-4">
      {t("privacyPolicy.howUseContent")} 
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>{t("privacyPolicy.usePoint1")}</li>
        <li>{t("privacyPolicy.usePoint2")}</li>
        <li>{t("privacyPolicy.usePoint3")}</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">{t("privacyPolicy.sharingTitle")}</h2>
      <p className="mb-4">
      {t("privacyPolicy.sharingContent")}
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">{t("privacyPolicy.rightsTitle")}</h2>
      <p className="mb-4">
      {t("privacyPolicy.rightsContent")}
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">{t("privacyPolicy.contactTitle")}</h2>
      <p className="mb-4">
      {t("privacyPolicy.contactContent")}
        <a href="mailto:support@intern.com" className="text-primary  underline"> {t("privacyPolicy.contactEmail")}</a>.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
