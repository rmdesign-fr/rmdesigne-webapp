import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/productService";
import ProductGrid from "../components/shop/ProductGrid";

const FILTERS = [
  { label: "Tous", value: "" },
  { label: "Vêtements", value: "vetements" },
  { label: "Accessoires", value: "accessoires" },
  { label: "Stickers", value: "stickers" },
  { label: "Lifestyle", value: "lifestyle" },
];

export default function ShopPage() {
  const [category, setCategory] = useState("");
  const { data: products, isLoading } = useQuery({
    queryKey: ["products", category],
    queryFn: () => getProducts(category || undefined),
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-16 bg-rm-dark"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl md:text-6xl tracking-wider mb-2 text-white">
            BOUTIQUE
          </h1>
          <p className="text-gray-400 text-lg">Goodies & Merch R.M_Design</p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setCategory(f.value)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all border ${
                category === f.value
                  ? "bg-rm-pink border-rm-pink text-white"
                  : "border-white/20 text-gray-300 hover:border-rm-pink/50 hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <ProductGrid products={products} loading={isLoading} />
      </div>
    </motion.div>
  );
}
