"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  {
    id: 1,
    name: "Anjali Verma",
    role: "CTO, FutureSoft",
    message:
      "Aayan Infotech transformed our digital experience—highly reliable and creative. Their team delivered beyond our expectations with innovative solutions that significantly improved our user engagement metrics.",
    imgSrc:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80",
  },
  {
    id: 2,
    name: "Rahul Mehra",
    role: "Founder, StartZen",
    message:
      "Their professionalism and technical depth helped us scale quickly. We achieved 3x faster load times and 40% higher conversion rates after implementing their recommendations.",
    imgSrc:
      "https://images.unsplash.com/photo-1502767089025-6572583495b4?auto=format&fit=crop&w=160&q=80",
  },
  {
    id: 3,
    name: "Sneha Rao",
    role: "Product Manager, HealthCare AI",
    message:
      "We were impressed by their commitment and support throughout our product cycle. Their expertise in AI integration helped us achieve regulatory approval 2 months ahead of schedule.",
    imgSrc:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=160&q=80",
  },
  {
    id: 4,
    name: "Vikram Patel",
    role: "Director, FinTech Global",
    message:
      "The security solutions implemented by Aayan Infotech have been rock solid. We've had zero breaches since deployment, giving our customers complete peace of mind.",
    imgSrc:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=160&q=80",
  },
  {
    id: 5,
    name: "Priya Sharma",
    role: "E-commerce Lead, Trendsetters",
    message:
      "Our mobile app performance increased dramatically after their optimization. User retention rates improved by 65% and app store ratings jumped to 4.9 stars.",
    imgSrc:
      "https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?auto=format&fit=crop&w=160&q=80",
  },
];

const TestimonialSection = () => {
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
          },
        }
      );
    }
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      const cards = carouselRef.current.querySelectorAll(".testimonial-card");
      gsap.to(cards, {
        xPercent: -activeIndex * 100,
        duration: 0.8,
        ease: "power3.inOut",
      });
    }
  }, [activeIndex]);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
    startAutoSlide();
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-block relative mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 relative z-10">
            Testimonials
          </h2>
          <div className="absolute bottom-0 left-0 right-0 h-3 bg-indigo-500/20 dark:bg-indigo-400/30 z-0"></div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-16 text-lg">
          Hear what industry leaders and valued clients say about our services
        </p>

        <div
          className="relative overflow-hidden py-6"
          onMouseEnter={stopAutoSlide}
          onMouseLeave={startAutoSlide}
        >
          <div
            ref={carouselRef}
            className="flex transition-transform duration-500 ease-in-out"
          >
            {testimonials.map(({ id, name, role, message, imgSrc }) => (
              <div
                key={id}
                className="testimonial-card flex-shrink-0 w-full px-4"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transform transition duration-300 max-w-4xl mx-auto">
                  <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
                    <img
                      src={imgSrc}
                      alt={name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-indigo-100 dark:border-gray-700"
                    />
                    <div className="text-center md:text-left">
                      <p className="font-bold text-xl text-gray-800 dark:text-white">
                        {name}
                      </p>
                      <p className="text-indigo-600 dark:text-indigo-400 font-medium">
                        {role}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed italic relative pl-6 before:content-['“'] before:absolute before:left-0 before:top-0 before:text-5xl before:text-indigo-400/30 before:font-serif">
                    {message}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 p-3 rounded-full shadow-lg z-10 transition-all"
            onClick={() =>
              goToSlide((activeIndex - 1 + testimonials.length) % testimonials.length)
            }
            aria-label="Previous testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-800 dark:text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 p-3 rounded-full shadow-lg z-10 transition-all"
            onClick={() =>
              goToSlide((activeIndex + 1) % testimonials.length)
            }
            aria-label="Next testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-800 dark:text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-10 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index === activeIndex
                  ? "bg-indigo-600 w-6"
                  : "bg-gray-300 dark:bg-gray-700"
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
