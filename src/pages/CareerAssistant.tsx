import career from "../assets/careers.svg";
import { CheckCircle } from "lucide-react";

const CareerAssistant = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
        <div className="flex-1 md:text-left">
          <h1 className="text-4xl font-bold mb-6 text-primary">Career Assistant</h1>
          <p>
            <div className="mt-8 space-y-3">
              <div className="flex items-center text-green-600">
                <CheckCircle className="mr-3" size={24} />
                <span className="text-xl">Self-Assessment and Clarify Your Goals</span>
              </div>
            </div>
            <br />
            <strong>Understand Your Strengths: </strong>Reflect on what you're passionate about,
            what motivates you, and where your natural talents lie. Knowing these will help you
            identify the right career path.
            <br />
            <br />
            <strong>Set Clear Career Goals:</strong> Define both short-term and long-term goals.
            What do you want to achieve in the next 1-3 years? And where do you see yourself in 5-10
            years? Your goals will guide your decisions.
            <br />
            <br />
            <div className="mt-8 space-y-3">
              <div className="flex items-center text-green-600">
                <CheckCircle className="mr-3" size={24} />
                <span className="text-xl">Continuous Learning and Skill Development</span>
              </div>
            </div>
            <br />
            <br />
            <strong>Keep Learning:</strong> In today’s fast-changing job market, acquiring new
            skills is crucial. Take courses, attend workshops, and stay updated with industry
            trends.
            <br />
            <br />
            <strong>Build Expertise:</strong> Work on becoming an expert in a specific area that
            aligns with your passions. The more specialized your knowledge, the more valuable you
            become in that field.
            <br />
            <br />
            <div className="mt-8 space-y-3">
              <div className="flex items-center text-green-600">
                <CheckCircle className="mr-3" size={24} />
                <span className="text-xl">Gain Relevant Experience</span>
              </div>
            </div>
            <br />
            <strong>Start with Internships or Entry-Level Positions:</strong> These help you learn
            the ropes and gain exposure to real-world scenarios. Even if the role doesn’t seem
            perfect, it provides valuable experience.
            <br />
            <br />
            <strong>Volunteer:</strong> Volunteering can give you hands-on experience, especially in
            fields like HR or community engagement.
            <br />
            <br />
            <div className="mt-8 space-y-3">
              <div className="flex items-center text-green-600">
                <CheckCircle className="mr-3" size={24} />
                <span className="text-xl">Network and Build Relationships</span>
              </div>
            </div>
            <br />
            <strong>Connect with Industry Professionals:</strong> Attend events, join online
            communities, and engage on platforms like LinkedIn to meet people in your field.
            <br />
            <br />
            <strong>Seek Mentorship:</strong> Find mentors who can offer guidance, share their
            experiences, and help you navigate the challenges of your chosen career path.
            <br />
            <br />
            <strong>Develop a Personal Brand:</strong> Establish a presence in your field by writing
            articles, speaking at events, or sharing your work online.
          </p>
          <br />
          <br />
        </div>
        <div className="flex-1 relative  ">
          <img src={career} alt="Partners" className="w-full h-auto object-cover " />
          <p>
            <div className="mt-8 space-y-3">
              <div className="flex items-center text-green-600">
                <CheckCircle className="mr-3" size={24} />
                <span className="text-xl">Find the Right Career Fit</span>
              </div>
            </div>
            <br />
            <strong>Research Careers Thoroughly:</strong> Read about different careers, talk to
            people working in those fields, and consider what aligns with your values and skills.
            <br />
            <br />
            <strong>Test the Waters:</strong> Don’t be afraid to try out different roles or
            industries. The more you experience, the more you’ll learn about what excites and suits
            you.
            <br />
            <br />
            <strong>Work-Life Balance:</strong> Consider the lifestyle you want. Some careers may
            require more flexibility or long hours. Find a balance that supports your personal life
            and growth.
            <br />
            <br />
            <div className="mt-8 space-y-3">
              <div className="flex items-center text-green-600">
                <CheckCircle className="mr-3" size={24} />
                <span className="text-xl">Adapt and Stay Open to Change</span>
              </div>
            </div>
            <br />
            <strong>Be Open to New Opportunities:</strong> Sometimes the right career path isn't
            linear. Stay open to opportunities that align with your values.
            <br />
            <br />
            <strong>Embrace Failure as Learning:</strong> Setbacks are natural. What matters is how
            you respond and what you learn from the experience.
            <br />
            <br />
            <div className="mt-8 space-y-3">
              <div className="flex items-center text-green-600">
                <CheckCircle className="mr-3" size={24} />
                <span className="text-xl">Focus on Well-Being</span>
              </div>
            </div>
            <br />
            <br />
            <strong>Prioritize Mental and Physical Health:</strong> A fulfilling career goes hand in
            hand with a healthy lifestyle. Regular exercise, mindfulness, and time for yourself will
            improve your performance and happiness.
          </p>
        </div>
      </div>
    </div>
  );
};

export { CareerAssistant };
