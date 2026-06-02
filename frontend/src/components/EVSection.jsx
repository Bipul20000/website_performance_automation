import { useState, useEffect } from 'react';
import { getProducts } from '../api';

const formatPrice = (price) => {
  if (price >= 100000) return `₹${(price / 100000).toFixed(2)}L`;
  return `₹${price.toLocaleString('en-IN')}`;
};

export default function EVSection() {
  const [evProducts, setEvProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts('electric')
      .then(res => {
        setEvProducts(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load electric vehicles');
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <h2 className="text-4xl font-bold">
          <span className="text-dark">Ride </span>
          <span className="text-green">Electric</span>
        </h2>
        <div className="w-16 h-1 bg-green mt-3" />
        <p className="text-gray-500 mt-2">
          Zero emissions. Maximum thrill. The future of mobility is here.
        </p>

        {/* Loading State */}
        {loading && (
          <div className="mt-12 space-y-16">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${
                  i % 2 !== 0 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="lg:w-1/2 w-full">
                  <div className="skeleton aspect-video rounded-2xl w-full" />
                </div>
                <div className="lg:w-1/2 w-full space-y-4">
                  <div className="skeleton h-6 w-24 rounded-full" />
                  <div className="skeleton h-8 w-3/4" />
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="skeleton h-20 rounded-xl" />
                    <div className="skeleton h-20 rounded-xl" />
                    <div className="skeleton h-20 rounded-xl" />
                    <div className="skeleton h-20 rounded-xl" />
                  </div>
                  <div className="flex gap-2 mt-6">
                    <div className="skeleton h-8 w-20 rounded-full" />
                    <div className="skeleton h-8 w-24 rounded-full" />
                    <div className="skeleton h-8 w-20 rounded-full" />
                  </div>
                  <div className="skeleton h-12 w-40 rounded-full mt-6" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {/* EV Cards */}
        {!loading && !error && (
          <div className="mt-12">
            {evProducts.map((product, index) => (
              <div
                key={product.id || product.slug}
                className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 mb-16 last:mb-0 ${
                  index % 2 !== 0 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image Side */}
                <div className="lg:w-1/2 w-full">
                  <div className="aspect-video rounded-2xl bg-gradient-to-br from-green/10 to-green/5 flex items-center justify-center">
                    <span className="text-8xl">⚡</span>
                  </div>
                </div>

                {/* Content Side */}
                <div className="lg:w-1/2 w-full">
                  <span className="inline-block bg-green/10 text-green px-3 py-1 rounded-full text-xs font-bold uppercase mb-3">
                    Electric
                  </span>
                  <h3 className="text-3xl font-bold text-dark">{product.name}</h3>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-light rounded-xl p-4">
                      <div className="text-2xl font-bold text-green">{product.range_km} km</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">Range</div>
                    </div>
                    <div className="bg-light rounded-xl p-4">
                      <div className="text-2xl font-bold text-green">{product.power_bhp} BHP</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">Power</div>
                    </div>
                    <div className="bg-light rounded-xl p-4">
                      <div className="text-2xl font-bold text-green">{product.torque_nm} Nm</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">Torque</div>
                    </div>
                    <div className="bg-light rounded-xl p-4">
                      <div className="text-2xl font-bold text-green">{formatPrice(product.price_min)}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">Price</div>
                    </div>
                  </div>

                  {/* Features */}
                  {product.features && product.features.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {product.features.map((feature, fIdx) => (
                        <span
                          key={fIdx}
                          className="bg-green/10 text-green-dark text-xs px-3 py-1.5 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* CTA */}
                  <button className="mt-6 inline-flex items-center gap-2 bg-green text-white px-6 py-3 rounded-full font-medium hover:bg-green-dark transition-colors">
                    Explore Vida
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
