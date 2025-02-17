// AboutUs.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Award, ArrowRight } from 'lucide-react';
import NavBar from '../components/NavBar';
import Background from '../components/Background';
import lenny from '../assets/Lenny.jpg';
import adron from '../assets/Adron.jpg';
import sid from '../assets/Sidh.jpg';

const TeamMember = ({ name, role, description, image }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="relative group"
  >
    <div className="relative overflow-hidden rounded-xl">
      <img 
        src={image}
        alt={name}
        className="w-full h-[400px] object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-blue-400 font-medium">{role}</p>
        <p className="mt-2 text-gray-200 text-sm">{description}</p>
      </div>
    </div>
  </motion.div>
);

const ValueCard = ({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="p-6 rounded-xl backdrop-blur-sm bg-white/10 shadow-xl"
  >
    <div className="flex items-start gap-4">
      <div className="p-3 rounded-lg bg-blue-500/20 mt-1">
        <Icon className="w-6 h-6 text-blue-500" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  </motion.div>
);

const AboutUs = () => {
  const [darkMode, setDarkMode] = useState(false);

  const teamMembers = [
    {
      name: "Lenny Dany Derek D",
      role: "Developer",
      description: "a 17-year-old first-year student at SRM University, passionate about full-stack development, tech, and finance, with a strong interest in Python, React, and backend development.",
      image: lenny
    },
    {
      name: "Sidhanth Bibi",
      role: "Developer",
      description: "a tech-savvy student and aspiring full-stack developer, exploring Python, React, backend development, and finance while balancing studies and personal projects.",
      image: sid
    },
    {
      name: "Adorn S George",
      role: "Developer",
      description: "diving into Express.js and MongoDB, working on projects like an expense tracker and a financial responsibility website, while exploring ways to earn through blogging, AdSense, and stock investments.",
      image: adron
    }
  ];

  const values = [
    {
      icon: Users,
      title: "Customer First",
      description: "We prioritize our users' needs in every decision we make, ensuring the best trading experience possible."
    },
    {
      icon: Target,
      title: "Innovation Driven",
      description: "Constantly pushing boundaries to bring cutting-edge trading technology to our platform."
    },
    {
      icon: Award,
      title: "Excellence in Service",
      description: "Committed to providing exceptional support and maintaining the highest standards in the industry."
    }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      <Background darkMode={darkMode} />
      <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="pt-32 px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl font-bold mb-6">
              Our Mission to
              <span className="text-blue-500"> Transform Trading</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We're building the future of trading technology, making professional-grade tools accessible to everyone.
            </p>
          </motion.div>

          {/* Team Section - Moved up for more prominence */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-center mb-12">Meet Our Development Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <TeamMember {...member} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <ValueCard {...value} />
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Join Our Journey</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Be part of the revolution in trading technology. We're always looking for talented individuals to join our team.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-lg bg-blue-500 text-white font-medium flex items-center gap-2 mx-auto hover:bg-blue-600 transition-colors"
            >
              View Opportunities
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AboutUs;