import { useState } from "react";
import { Button } from "@/components/ui/button";

const Community = () => {
  const [activeSection, setActiveSection] = useState<null | "Events" | "Discussions" | "Resources">(
    null
  );

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
      <h1 className="text-3xl font-bold text-center">Welcome to Our Community</h1>
      <p className="text-center text-gray-600 max-w-lg">
        Connect, share, and grow with others. Our community is a place where ideas flourish and
        connections are made.
      </p>
      <Button className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
        Join Us
      </Button>
      <div className="flex flex-wrap justify-center gap-6 mt-5">
        <div className="p-4 border border-gray-300 rounded-lg shadow-md w-60 text-center">
          <h2 className="text-xl font-semibold">Events</h2>
          <p className="text-gray-500 mt-2">Discover upcoming events in our community.</p>
          <Button
            onClick={() => setActiveSection("Events")}
            className="mt-3 bg-green-500 text-white hover:bg-green-600"
          >
            Learn More
          </Button>
        </div>
        <div className="p-4 border border-gray-300 rounded-lg shadow-md w-60 text-center">
          <h2 className="text-xl font-semibold">Discussions</h2>
          <p className="text-gray-500 mt-2">Join the conversation and share your thoughts.</p>
          <Button
            onClick={() => setActiveSection("Discussions")}
            className="mt-3 bg-green-500 text-white hover:bg-green-600"
          >
            Learn More
          </Button>
        </div>
        <div className="p-4 border border-gray-300 rounded-lg shadow-md w-60 text-center">
          <h2 className="text-xl font-semibold">Resources</h2>
          <p className="text-gray-500 mt-2">Access valuable resources and tools.</p>
          <Button
            onClick={() => setActiveSection("Resources")}
            className="mt-3 bg-green-500 text-white hover:bg-green-600"
          >
            Learn More
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
