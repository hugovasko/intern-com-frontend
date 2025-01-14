import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next"; 

const Community = () => {
  const [activeSection, setActiveSection] = useState<null | "Events" | "Discussions" | "Resources">(
    null
  );
const {t}= useTranslation()
  const renderSectionContent = () => {
    switch (activeSection) {
      case "Events":
        return (
          <p className="text-gray-700">
            Here are some upcoming community events you might be interested in!
          </p>
        );
      case "Discussions":
        return (
          <p className="text-gray-700">
            Join the ongoing discussions and share your thoughts with others!
          </p>
        );
      case "Resources":
        return (
          <p className="text-gray-700">Explore resources and tools to help you grow and succeed.</p>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col justify-center items-center m-5 gap-4">
      <h1 className="text-3xl font-bold text-center">{t("community.title")}</h1>
      <p className="text-center text-gray-600 max-w-lg">
       {t("community.description")}
      </p>
      <Button className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
        {t("community.button")}
      </Button>
      <div className="flex flex-wrap justify-center gap-6 mt-5">
        <div className="p-4 border border-gray-300 rounded-lg shadow-md w-60 text-center">
          <h2 className="text-xl font-semibold">{t("community.events")}</h2>
          <p className="text-gray-500 mt-2">{t("community.eventsDescription")}</p>
          <Button
            onClick={() => setActiveSection("Events")}
            className="mt-3 bg-green-500 text-white hover:bg-green-600"
          >
            {t("community.buttonEvents")}
          </Button>
        </div>
        <div className="p-4 border border-gray-300 rounded-lg shadow-md w-60 text-center">
          <h2 className="text-xl font-semibold">{t("community.discussions")}</h2>
          <p className="text-gray-500 mt-2">{t("community.disscussionsDescription")}</p>
          <Button
            onClick={() => setActiveSection("Discussions")}
            className="mt-3 bg-green-500 text-white hover:bg-green-600"
          >
            {t("community.buttonDiscussion")}
          </Button>
        </div>
        <div className="p-4 border border-gray-300 rounded-lg shadow-md w-60 text-center">
          <h2 className="text-xl font-semibold">{t("community.resources")}</h2>
          <p className="text-gray-500 mt-2">{t("community.resourcesDescription")}</p>
          <Button
            onClick={() => setActiveSection("Resources")}
            className="mt-3 bg-green-500 text-white hover:bg-green-600"
          >
            {t("community.buttonResources")}
          </Button>
        </div>
      </div>
      <div className="mt-6 p-4 border-t border-gray-300 w-full max-w-xl">
        {renderSectionContent()}
      </div>
    </div>
  );
};

export { Community };
