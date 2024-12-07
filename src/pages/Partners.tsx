import { Link } from "react-router-dom";
import PartnerImage from "@/assets/Partners.svg";
import Logo from "@/assets/Logo.svg";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const Partners = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
        <div className="flex-1 md:text-left">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">Partners</h1>
          <div className="space-y-4 text-gray-600">
            <p className="text-lg">
              Our mission is to connect young graduates with their first professional opportunities,
              while helping businesses discover and attract the most responsible, motivated, and
              capable candidates.
            </p>
            <p className="text-lg">
              We understand the needs and challenges faced by young people, having walked the same
              path ourselves. We know how crucial it is to take the right first step.
            </p>
            <p className="text-lg">
              Intern.com is an innovative platform designed for those entering the job market and
              for employers eager to identify and nurture the leaders of tomorrow.
            </p>
            <p className="text-lg font-semibold">
              We're here to support you. The next move is yours!
            </p>
          </div>
          <div className="mt-8 space-y-3">
            <div className="flex items-center text-green-600">
              <CheckCircle className="mr-3" size={24} />
              <span className="text-gray-700">Proven Market Success</span>
            </div>
            <div className="flex items-center text-green-600">
              <CheckCircle className="mr-3" size={24} />
              <span className="text-gray-700">Investment in Next Generation</span>
            </div>
            <div className="flex items-center text-green-600">
              <CheckCircle className="mr-3" size={24} />
              <span className="text-gray-700">Personalized Support</span>
            </div>
          </div>
          <br></br>
          <Link to="/partnercontacts">
            <Button className="mt-4  py-2  rounded-lg">Become Partner!</Button>
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
            Our Commitment to Excellence
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-6 text-gray-800"> Our policy</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <p>
                  At Intern.com, we are committed to collaborating exclusively with the best
                  companies and organizations—those that have demonstrated their success in both the
                  market and society. <br></br>
                  <br></br>Our partners are passionate about investing in the next generation, with
                  many already actively contributing to their development.<br></br>
                  <br></br> The seamless registration process and the personalized support we
                  provide form the foundation of our partnership approach. <br></br>
                  <br></br>We value maintaining a personal connection with each of our clients,
                  ensuring we effectively address their unique needs and expectations.
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
