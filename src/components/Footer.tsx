import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-600 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left Section */}
        <div className="mb-4 md:mb-0">
          <h1 className="text-lg font-semibold">Intern.com</h1>
          <p className="text-sm">© {new Date().getFullYear()} All Rights Reserved.</p>
        </div>

        {/* Center Section: Navigation Links */}
        <div className="flex space-x-4 text-sm">
          <Link to="/us" className="w-full">
            <Button variant="ghost" className="w-full justify-start">
              About Us
            </Button>
          </Link>
          <Link to="/partnercontacts" className="w-full">
            <Button variant="ghost" className="w-full justify-start">
              Contact Us
            </Button>
          </Link>
          <Link to="/privacy" className="w-full">
            <Button variant="ghost" className="w-full justify-start">
              Privacy Policy
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
