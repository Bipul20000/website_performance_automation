import { useState, useEffect } from 'react';
import { getFeaturedProducts } from '../api';

const formatPrice = (price) => {
  if (price >= 100000) return `₹${(price / 100000).toFixed(2)}L`;
  return `₹${price.toLocaleString('en-IN')}`;
};

export default function PremiaSection() {
  const [premiaProducts, setPremiaProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeaturedProducts()
      .then(res => {
        const filtered = (res.data.data || []).filter(p => p.badge === 'premia');
        setPremiaProducts(filtered);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-20 bg-dark text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div>
          <span className="text-gold text-sm uppercase tracking-widest font-medium">Hero</span>
          <h2 className="text-5xl font-black mt-1 text-gold">Premia</h2>
          <p className="text-gray-400 mt-3 max-w-lg">
            A new horizon of experiences. Crafted for those who demand the extraordinary.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="mt-12 flex gap-6 overflow-x-auto pb-4 hide-scrollbar">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="min-w-[340px] md:min-w-[400px] bg-dark-light rounded-2xl overflow-hidden flex-shrink-0"
              >
                <div className="skeleton-dark h-56 w-full" />
                <div className="p-6 space-y-3">
                  <div className="skeleton-dark h-6 w-3/4" />
                  <div className="skeleton-dark h-4 w-1/2" />
                  <div className="skeleton-dark h-4 w-2/3" />
                  <div className="skeleton-dark h-10 w-32 mt-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Premia Cards */}
        {!loading && (
          <div className="mt-12 flex gap-6 overflow-x-auto pb-4 hide-scrollbar">
            {premiaProducts.map(product => (
              <div
                key={product.id || product.slug}
                className="min-w-[340px] md:min-w-[400px] bg-dark-light rounded-2xl overflow-hidden group flex-shrink-0"
              >
                {/* Image Area */}
                <div className="h-56 bg-gradient-to-br from-dark-lighter to-dark flex items-center justify-center">
                  <span className="text-7xl opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-500">
                    🏍️
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white">{product.name}</h3>
                  <p className="text-gold text-sm mt-1">
                    {product.engine_cc}cc • {product.cooling_type || 'Liquid Cooled'}
                  </p>
                  <p className="mt-2 text-gray-400 text-sm">
                    {formatPrice(product.price_min)} — {formatPrice(product.price_max)}
                  </p>
                  <button className="mt-4 inline-flex items-center gap-2 text-gold font-medium hover:gap-3 transition-all">
                    Know More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
