import TeamPic from "@/assets/together.svg";
import mission from "@/assets/mission2.svg";
import { useTranslation } from "react-i18next";

const Us: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full">
      <div className="container mx-auto px-4 w-full">
        <section className="w-screen -mx-[50vw] left-[50%] relative bg-green-100 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 w-full ">
              <h1 className="text-5xl font-bold text-primary mb-6"> {t("us.title")}</h1>
              <p className="max-w-3xl mx-auto text-xl font-semibold text-gray-600">
                {t("us.description")}
                <br></br>
              </p>
              <div className="flex flex-col md:flex-row justify-between p-2 gap-8">
                <div className="flex-1 md:text-left">
                  <h2 className="text-4xl font-bold mb-8 text-primary">{t("us.h1")}</h2>
                  <div className="space-y-4 text-left text-black">
                    <p>{t("us.p1")}</p>
                    <p>{t("us.p2")}</p>
                    <p>{t("us.p3")}</p>
                    <p>{t("us.p4")}</p>
                    <p>{t("us.p5")}</p>
                  </div>
                </div>
                <div className="flex-1">
                  <img
                    src={TeamPic}
                    alt="Partners"
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-screen -mx-[50vw] left-[50%] relative p-5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 w-full ">
              <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
                <div className="flex-1 md:text-left">
                  <h2 className="text-4xl font-bold mb-6 text-primary">{t("us.h2")}</h2>
                  <div className="space-y-4 text-black-600">
                    <p>{t("us.text")}</p>
                    <p>{t("us.tit")}</p>
                    <ul>
                      <li>{t("us.li")}</li>
                      <li>{t("us.li2")}</li>
                      <li>{t("us.li3")}</li>
                      <li>{t("us.li4")}</li>
                    </ul>
                  </div>
                </div>
                <div className="flex-1">
                  <img
                    src={mission}
                    alt="mission"
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-screen -mx-[50vw] left-[50%] relative p-8 bg-green-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-8 text-gray-800">{t("us.h3")}</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="text-5xl font-bold text-green-500 mb-4">500+</div>
                  <h3 className="text-xl font-semibold text-gray-700">{t("us.p6")}</h3>
                  <p className="text-gray-500 mt-2">{t("us.p7")}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="text-5xl font-bold text-green-600 mb-4">75+</div>
                  <h3 className="text-xl font-semibold text-gray-700">{t("us.h4")}</h3>
                  <p className="text-gray-500 mt-2">{t("us.p8")}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="text-5xl font-bold text-green-700 mb-4">95%</div>
                  <h3 className="text-xl font-semibold text-gray-700">{t("us.h5")}</h3>
                  <p className="text-gray-500 mt-2">{t("us.p9")}</p>
                </div>
              </div>
              <div className="mt-12 max-w-3xl mx-auto">
                <p className="text-xl text-gray-600">{t("us.p10")}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export { Us };
