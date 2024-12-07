import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Candidate from "@/assets/contacts.svg";

interface CandidateContact {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes?: string;
}

const CandidateContacts: React.FC = () => {
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
    <section className="w-screen -mx-[50vw] left-[50%] relative  p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 w-full">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">Contacts</h1>
          <p className="max-w-3xl mx-auto text-xl font-semibold text-gray-600 mb-8">
            Don’t hesitate to send us your message right now—we’re here to assist you!
          </p>
          <div className="flex flex-col md:flex-row justify-between p-2 gap-8">
            <div className="flex-1 md:text-left">
              <h2 className="text-2xl font-bold mb-8 text-gray-800">Contact Us</h2>
              <div className="space-y-4 text-left text-black-600 mb-8">
                <p>
                  Whether you have questions, need guidance, or want to explore exciting internship
                  opportunities, we’re here for you.
                </p>
                <p>
                  Don’t wait—reach out today and let us help you shape your professional journey!
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
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
                  <Label htmlFor="email" className="block text-left mb-2">
                    Email
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
                  <Label htmlFor="phone" className="block text-left mb-2">
                    Phone Number
                  </Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="bg-white"
                  />
                </div>

                <div>
                  <Label htmlFor="notes" className="block text-left mb-2">
                    Additional Notes
                  </Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Share Your Journey or Ask Us Anything!"
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
            <div className="flex-1">
              <img src={Candidate} alt="Candidate" className="w-full h-auto object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { CandidateContacts };
