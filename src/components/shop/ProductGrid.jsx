import ProductCard from './ProductCard'

export default function ProductGrid({ products, loading }) {
  const safeProducts = Array.isArray(products) ? products : []

  if (loading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-xl border border-white/10 animate-pulse">
            <div className="aspect-square bg-white/5" />
            <div className="p-4 space-y-3">
              <div className="h-5 bg-white/5 rounded w-3/4" />
              <div className="h-6 bg-white/5 rounded w-1/4" />
              <div className="h-10 bg-white/5 rounded" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (safeProducts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-rm-muted text-lg">Aucun produit disponible pour le moment.</p>
      </div>
    )
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {safeProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
