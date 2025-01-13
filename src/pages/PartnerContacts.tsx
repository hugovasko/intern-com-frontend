import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import candidatePartner from "@/assets/cont.svg";
import { useTranslation } from "react-i18next";

interface PartnerContacts {
  firstName: string;
  lastName: string;
  organizationName: string;
  position: string;
  phoneNumber: string;
  email: string;
  subject: string;
  message: string;
}

const PartnerContacts: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<PartnerContacts>({
    firstName: "",
    lastName: "",
    organizationName: "",
    position: "",
    phoneNumber: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted Partner Contact:", formData);

    setFormData({
      firstName: "",
      lastName: "",
      organizationName: "",
      position: "",
      phoneNumber: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section className="relative p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 w-full">
          <h1 className="text-4xl font-bold text-primary mb-6">{t("partnerContacts.title")}</h1>
          <div className="flex flex-col md:flex-row justify-between p-2 gap-8">
            <div className="flex-1">
              <h2 className="text-2xl text-left font-bold mb-8 text-primary">
                {t("partnerContacts.header")}
              </h2>
              <p className="max-w-2xl mx-auto text-xl text-left font-semibold ">
                {t("partnerContacts.description")}
              </p>
              <img
                src={candidatePartner}
                alt="Partnership Opportunities"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="flex-1 md:text-left">
              <h2 className="text-2xl font-bold mb-8 text-primary">
                {t("partnerContacts.contactUs")}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="block text-left mb-2">
                      {t("partnerContacts.firstName")}
                    </Label>
                    <Input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder={t("partnerContacts.firstName")}
                      required
                      className="bg-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="block text-left mb-2">
                      {t("partnerContacts.lastName")}
                    </Label>
                    <Input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder={t("partnerContacts.lastName")}
                      required
                      className="bg-white"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="organizationName" className="block text-left mb-2">
                    {t("partnerContacts.organizationName")}
                  </Label>
                  <Input
                    type="text"
                    id="organizationName"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleChange}
                    placeholder={t("partnerContacts.organizationName")}
                    required
                    className="bg-white"
                  />
                </div>
                <div>
                  <Label htmlFor="position" className="block text-left mb-2">
                    {t("partnerContacts.position")}
                  </Label>
                  <Input
                    type="text"
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    placeholder={t("partnerContacts.position")}
                    required
                    className="bg-white"
                  />
                </div>
                <div>
                  <Label htmlFor="phoneNumber" className="block text-left mb-2">
                    {t("partnerContacts.phoneNumber")}
                  </Label>
                  <Input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder={t("partnerContacts.phoneNumber")}
                    className="bg-white"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="block text-left mb-2">
                    {t("partnerContacts.email")} *
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t("partnerContacts.email")}
                    required
                    className="bg-white"
                  />
                </div>
                <div>
                  <Label htmlFor="subject" className="block text-left mb-2">
                    {t("partnerContacts.subject")} *
                  </Label>
                  <Input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={t("partnerContacts.subject")}
                    required
                    className="bg-white"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="block text-left mb-2">
                    {t("partnerContacts.message")} *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t("partnerContacts.messagePlaceholder")}
                    required
                    className="resize-y bg-white"
                  />
                </div>
                <div className="flex justify-start">
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                    {t("partnerContacts.submit")}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { PartnerContacts };
