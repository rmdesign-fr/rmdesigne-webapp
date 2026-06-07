import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import StarRating from "../ui/StarRating";
import { getApprovedReviews } from "../../services/reviewService";

export default function ReviewsCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: getApprovedReviews,
  });

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % reviews.length),
    [reviews.length],
  );
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + reviews.length) % reviews.length),
    [reviews.length],
  );

  useEffect(() => {
    if (paused || reviews.length <= 1) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [paused, next, reviews.length]);

  useEffect(() => {
    setCurrent(0);
  }, [reviews.length]);

  if (isLoading || !reviews.length) return null;

  const review = reviews[current];

  return (
    <section id="avis" className="py-20 md:py-28 bg-rm-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl md:text-5xl tracking-wider text-gray-900">
            AVIS
          </h2>
          <div className="w-16 h-1 bg-rm-light-blue mx-auto mt-3" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative glass-card overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="grid md:grid-cols-2">
            {/* Image side */}
            <div className="aspect-square md:aspect-auto overflow-hidden bg-gray-100">
              {review.images && review.images.length > 0 ? (
                <motion.img
                  key={current}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  src={review.images[0]}
                  alt={review.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full min-h-[250px] flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                  <span className="font-display text-8xl text-white/10">
                    R.M
                  </span>
                </div>
              )}
            </div>

            {/* Text side */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-rm-muted text-xs tracking-widest uppercase mb-3 font-mono">
                  CLIENT POUR {review.service.toUpperCase()}
                </p>
                <h3 className="font-display text-2xl md:text-3xl tracking-wide mb-4 text-gray-900">
                  {review.name}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg mb-6">
                  &ldquo;{review.text}&rdquo;
                </p>
                <StarRating rating={review.rating} />
              </motion.div>
            </div>
          </div>

          {/* Navigation arrows – only when multiple reviews */}
          {reviews.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              >
                <HiChevronLeft className="text-xl" />
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              >
                <HiChevronRight className="text-xl" />
              </button>
            </>
          )}
        </motion.div>

        {/* Dots – only when multiple reviews */}
        {reviews.length > 1 && (
          <div className="flex justify-center gap-3 mt-6">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === current
                    ? "bg-gray-800 scale-125"
                    : "bg-gray-400 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
