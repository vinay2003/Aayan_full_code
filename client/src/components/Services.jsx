import React from 'react';

const services = [
  {
    id: 1,
    title: "Web Development",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=800&auto=format&fit=crop",
    description: "Custom web applications built with modern technologies and cutting-edge frameworks"
  },
  {
    id: 2,
    title: "UI/UX Design",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
    description: "User-centered design solutions that drive engagement and deliver exceptional experiences"
  },
  {
    id: 3,
    title: "Mobile Development",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=800&auto=format&fit=crop",
    description: "Native and cross-platform mobile applications for iOS and Android platforms"
  },
  {
    id: 4,
    title: "Digital Solutions",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
    description: "End-to-end digital transformation services to modernize your business operations"
  },
  {
    id: 5,
    title: "Cloud Services",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=800&auto=format&fit=crop",
    description: "Scalable cloud infrastructure and deployment solutions for enterprise-grade applications"
  },
  {
    id: 6,
    title: "Consulting",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    description: "Strategic technology consulting and planning to accelerate your digital journey"
  }
];

const ServicesSection = () => {
  return (
    <section id='services' className="py-20 px-4 bg-white relative overflow-hidden">
      {/* Background Glow Elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#6366F1] rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-[#EC4899] rounded-full animate-bounce delay-700"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-[#FBBF24] rounded-full animate-ping delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Our Services
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#6366F1] to-[#EC4899] mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We provide comprehensive digital solutions to help your business thrive in the modern world with cutting-edge technology and innovative approaches.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-105"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'both'
              }}
            >
              <div className="relative h-48 sm:h-52 lg:h-56 overflow-hidden">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
                />

                {/* Dots */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-[#6366F1] rounded-full animate-ping opacity-75"></div>
                <div className="absolute bottom-4 left-4 w-2 h-2 bg-[#EC4899] rounded-full animate-bounce delay-300"></div>
              </div>

              <div className="p-6 lg:p-8">
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#6366F1] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm lg:text-base leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  {service.description}
                </p>

                {/* Progress Hover Bar */}
                <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#6366F1] to-[#EC4899] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out"></div>
                </div>
              </div>

              {/* Triangle */}
              <div className="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-t-[30px] border-t-[#6366F1]/10 group-hover:border-t-[#6366F1]/30 transition-colors duration-500"></div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button className="px-8 py-4 bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
            Explore All Services
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
