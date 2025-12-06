import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { TestimonialItem } from "../types";

interface TestimonialSliderProps {
  testimonials: TestimonialItem[];
}

export const TestimonialSlider: React.FC<TestimonialSliderProps> = ({ testimonials }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Rotate every 5 seconds

    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="w-full max-w-4xl mx-auto h-[300px] md:h-[350px] relative flex flex-col items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute w-full px-4"
        >
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 p-8 md:p-12 text-center border border-slate-100 relative">
            {/* Quote Icon */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-accent text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg shadow-accent/30">
              <Quote className="w-6 h-6 fill-current" />
            </div>

            {/* Stars Decoration */}
            <div className="flex justify-center gap-1 mb-6 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            {/* Quote Text */}
            <p className="text-xl md:text-2xl font-medium text-slate-800 leading-relaxed mb-8 italic">
              "{testimonials[index].quote}"
            </p>

            {/* Author Info */}
            <div className="flex flex-col items-center">
              <div className="h-1 w-12 bg-accent/30 rounded-full mb-4"></div>
              <h4 className="text-lg font-bold text-slate-900">{testimonials[index].author}</h4>
              <p className="text-sm text-accent font-semibold uppercase tracking-wider">{testimonials[index].role}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Pagination Indicators */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 translate-y-12">
        {testimonials.map((_, i) => (
            <button
                key={i}
                onClick={() => setIndex(i)}
                className={`transition-all duration-300 rounded-full ${i === index ? 'w-8 h-2 bg-accent' : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'}`}
                aria-label={`Go to testimonial ${i + 1}`}
            />
        ))}
      </div>
    </div>
  );
};