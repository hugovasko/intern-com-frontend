import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import candidate from "@/assets/contacts.svg";
import { useTranslation } from "react-i18next";

interface CandidateContact {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes?: string;
}

const CandidateContacts: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<CandidateContact>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
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
    console.log("Submitted Candidate Contact:", formData);

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      notes: "",
    });
  };

  return (
    <section className="relative p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 w-full">
          <h1 className="text-4xl font-bold text-primary ">{t("candidateContacts.title")}</h1>
          <p className="max-w-3xl mx-auto text-xl font-semibold mb-8">
            {t("candidateContacts.description")}
          </p>

          <div className="flex flex-col md:flex-row justify-between p-2 gap-8">
            <div className="flex-1 md:text-left">
              <h2 className="text-2xl font-bold mb-8 text-primary">{t("candidateContacts.contactUs")}</h2>
              <div className="space-y-4 text-left text-black-600 mb-8">
                <p>{t("candidateContacts.intro1")}</p>
                <p>{t("candidateContacts.intro2")}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="block text-left mb-2">
                      {t("candidateContacts.firstName")}
                    </Label>
                    <Input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder={t("candidateContacts.firstName")}
                      required
                      className="bg-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="block text-left mb-2">
                      {t("candidateContacts.lastName")}
                    </Label>
                    <Input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder={t("candidateContacts.lastName")}
                      required
                      className="bg-white"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="block text-left mb-2">
                    {t("candidateContacts.email")}
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t("candidateContacts.email")}
                    required
                    className="bg-white"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="block text-left mb-2">
                    {t("candidateContacts.phone")}
                  </Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t("candidateContacts.phone")}
                    className="bg-white"
                  />
                </div>

                <div>
                  <Label htmlFor="notes" className="block text-left mb-2">
                    {t("candidateContacts.notes")}
                  </Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder={t("candidateContacts.notesPlaceholder")}
                    className="resize-y bg-white"
                  />
                </div>

                <div className="flex justify-start">
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                    {t("candidateContacts.submit")}
                  </Button>
                </div>
              </form>
            </div>

            <div className="flex-1">
              <img src={candidate} alt="Candidate" className="w-full h-auto object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { CandidateContacts };
