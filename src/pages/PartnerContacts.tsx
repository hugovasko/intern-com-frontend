import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import candidatePartner from "@/assets/cont.svg";
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
    <section className="w-screen -mx-[50vw] left-[50%] relative p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 w-full">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Partner Contacts</h1>
          <div className="flex flex-col md:flex-row justify-between p-2 gap-8">
            <div className="flex-1">
              <h2 className="text-2xl  text-left font-bold mb-8 text-gray-800">
                Connect with Us and Let’s Collaborate!
              </h2>
              <p className="max-w-2xl mx-auto text-xl text-left font-semibold text-gray-600 mb-8">
                Have questions or need guidance? Whether you’re curious about partnership
                opportunities or looking for ways we can support your goals, we’re here to help.
                Reach out to us today—we’re excited to answer your questions, provide assistance,
                and work together to create meaningful connections and opportunities!
              </p>
              <img
                src={candidatePartner}
                alt="Partnership Opportunities"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="flex-1 md:text-left">
              <h2 className="text-2xl font-bold mb-8 text-gray-800">Contact Us</h2>
              <div className="space-y-4 text-left text-black-600 mb-8"></div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="block text-left mb-2">
                      First Name
                    </Label>
                    <Input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter first name"
                      required
                      className="bg-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="block text-left mb-2">
                      Last Name
                    </Label>
                    <Input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter last name"
                      required
                      className="bg-white"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="organizationName" className="block text-left mb-2">
                    Organization Name
                  </Label>
                  <Input
                    type="text"
                    id="organizationName"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleChange}
                    placeholder="Enter organization name"
                    required
                    className="bg-white"
                  />
                </div>

                <div>
                  <Label htmlFor="position" className="block text-left mb-2">
                    Position
                  </Label>
                  <Input
                    type="text"
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    placeholder="Enter your position"
                    required
                    className="bg-white"
                  />
                </div>

                <div>
                  <Label htmlFor="phoneNumber" className="block text-left mb-2">
                    Phone Number
                  </Label>
                  <Input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="bg-white"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="block text-left mb-2">
                    Email *
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    required
                    className="bg-white"
                  />
                </div>

                <div>
                  <Label htmlFor="subject" className="block text-left mb-2">
                    Subject of Your Inquiry *
                  </Label>
                  <Input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Enter the subject of your inquiry"
                    required
                    className="bg-white"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="block text-left mb-2">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Share the details of your inquiry"
                    required
                    className="resize-y bg-white"
                  />
                </div>

                <div className="flex justify-start">
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                    Submit
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


