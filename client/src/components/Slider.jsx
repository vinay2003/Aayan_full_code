import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(0);
  const [animating, setAnimating] = useState(false);
  const frontRef = useRef(null);
  const backRef = useRef(null);
  const textRef = useRef(null);

  const images = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=900&auto=format&fit=crop&q=60",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=900&auto=format&fit=crop&q=60",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&auto=format&fit=crop&q=60",
    },
  ];

  const animateSlide = (nextIndex) => {
    if (animating) return;
    setAnimating(true);

    setPrev(current);
    setCurrent(nextIndex);

    const tl = gsap.timeline({
      onComplete: () => setAnimating(false),
    });

    // Animate text out
    tl.to(textRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    });

    // Animate image crossfade
    tl.fromTo(
      frontRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.inOut" },
      "<"
    );

    // Animate text in
    tl.fromTo(
      textRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", delay: 0.2 },
      "-=0.2"
    );
  };

  const nextSlide = () => {
    const nextIndex = (current + 1) % images.length;
    animateSlide(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = (current - 1 + images.length) % images.length;
    animateSlide(prevIndex);
  };

  useEffect(() => {
    const auto = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(auto);
  }, [current]);

  return (
    <section id="hero">
      <div className="relative w-full h-screen overflow-hidden bg-black text-white">
        {/* BACK image */}
        <div
          ref={backRef}
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{ backgroundImage: `url(${images[prev].url})` }}
        />

        {/* FRONT image */}
        <div
          ref={frontRef}
          className="absolute inset-0 bg-cover bg-center opacity-0"
          style={{ backgroundImage: `url(${images[current].url})` }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/80 z-10" />

        {/* Text */}
        <div
          ref={textRef}
          className="absolute z-20 top-1/2 left-10 transform -translate-y-1/2 max-w-lg"
        >
          <h2 className="text-green-400 text-5xl md:text-7xl font-bold mb-4">
            SLIDER
          </h2>
          <h3 className="text-4xl md:text-6xl font-bold mb-4">
            IMAGE {images[current].id}
          </h3>
          <p className="mb-6 text-lg md:text-xl">
            Experience the magic of technology through vivid visuals.
          </p>
          <div className="flex gap-4">
            <button className="px-5 py-2 border border-white hover:bg-white hover:text-black transition">
              See More
            </button>
            <button className="px-5 py-2 border border-green-400 text-green-400 hover:bg-green-400 hover:text-white transition">
              Subscribe
            </button>
          </div>
        </div>

        {/* Arrows */}
        <div className="absolute z-30 bottom-10 left-1/2 transform -translate-x-1/2 flex gap-6">
          <button
            onClick={prevSlide}
            className="w-12 h-12 rounded-full bg-green-500 hover:bg-white hover:text-black text-white font-bold transition"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            className="w-12 h-12 rounded-full bg-green-500 hover:bg-white hover:text-black text-white font-bold transition"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
