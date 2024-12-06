import React from 'react';
import { 
  Target, 
  Users, 
  Award, 
  Rocket, 
  Globe, 
  Heart, 
  BookOpen, 
  CheckCircle 
} from 'lucide-react';

const teamMembers = [
  {
    name: "Emily Rodriguez",
    role: "Founder & CEO",
    bio: "Tech entrepreneur with 10+ years of experience in talent development",
    image: "/api/placeholder/300/300"
  },
  {
    name: "Michael Chen",
    role: "Chief Technology Officer",
    bio: "Innovative tech leader passionate about connecting talent with opportunities",
    image: "/api/placeholder/300/300"
  },
  {
    name: "Sarah Thompson",
    role: "Head of Partnerships",
    bio: "Expert in building strategic connections between companies and young professionals",
    image: "/api/placeholder/300/300"
  },
  {
    name: "David Kim",
    role: "Community Director",
    bio: "Dedicated to empowering young talents and fostering professional growth",
    image: "/api/placeholder/300/300"
  }
];

const Us: React.FC = () => {
  return (
  
    <div className="container mx-auto px-4 py-12 " >
      <section className="text-center mb-16  ">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">About Intern.com</h1>
        <p className="max-w-3xl mx-auto text-xl text-gray-600">
          We are a passionate team dedicated to bridging the gap between talented young professionals 
          and innovative companies, creating meaningful career opportunities.
        </p>
      </section>
      

      {/* Core Values */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Core Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              icon: <Users className="text-green-600" size={40} />, 
              title: "Empowerment", 
              description: "Believing in the potential of every young professional" 
            },
            { 
              icon: <Award className="text-green-600" size={40} />, 
              title: "Excellence", 
              description: "Striving for the highest quality in everything we do" 
            },
            { 
              icon: <Globe className="text-green-600" size={40} />, 
              title: "Innovation", 
              description: "Constantly adapting and creating new solutions" 
            }
          ].map((value, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-center mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">{value.title}</h3>
              <p className="text-gray-50">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Members */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Meet Our Team</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow"
            >
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
              <p className="text-blue-600 mb-3">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Impact and Achievements */}
      <section className="bg-gray-50 p-12 rounded-lg" style={{ backgroundColor: '#d4f7e5' }}>
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-0">Our Impact</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              icon: <Heart className="text-red-600" size={40} />, 
              number: "5000+", 
              label: "Careers Launched" 
            },
            { 
              icon: <BookOpen className="text-green-600" size={40} />, 
              number: "250+", 
              label: "Partner Companies" 
            },
            { 
              icon: <CheckCircle className="text-blue-600" size={40} />, 
              number: "90%", 
              label: "Successful Placements" 
            }
          ].map((stat, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-lg shadow-md text-center"
            >
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <div className="text-4xl font-bold text-gray-800 mb-2">{stat.number}</div>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
    
  );
};

export { Us };