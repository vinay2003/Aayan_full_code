import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Carousel() {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  // Fetch images from API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/images");
        const data = await res.json();
        setImages(data);
      } catch (err) {
        console.error("Failed to fetch images:", err);
      }
    };
    fetchImages();
  }, []);

  const nextSlide = () => {
    const nextIndex = (current + 1) % images.length;
    animateSlide(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = (current - 1 + images.length) % images.length;
    animateSlide(prevIndex);
  };

  const animateSlide = (nextIndex) => {
    const tl = gsap.timeline();

    tl.to(imageRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.5,
      ease: "power2.out",
    });

    tl.to(
      textRef.current,
      {
        y: 20,
        opacity: 0,
        duration: 0.3,
      },
      "<"
    );

    tl.add(() => setCurrent(nextIndex));

    tl.fromTo(
      imageRef.current,
      { opacity: 0, scale: 1.05 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power2.inOut",
      }
    );

    tl.fromTo(
      textRef.current,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        delay: 0.2,
        ease: "power2.out",
      },
      "<"
    );
  };

  useEffect(() => {
    const auto = setInterval(() => {
      if (images.length > 0) nextSlide();
    }, 7000);
    return () => clearInterval(auto);
  }, [current, images]);

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen text-white bg-black">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white">
      {/* Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 bg-center bg-cover transition-all duration-700"
        style={{
          backgroundImage: `url(${images[current].url})`,
        }}
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/80 z-10" />

      {/* Text Content */}
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
          Experience the magic of nature through high-definition visuals.
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

      {/* Navigation Buttons */}
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
  );
}
