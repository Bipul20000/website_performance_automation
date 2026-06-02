import { useState, useEffect } from 'react';
import { getProducts } from '../api';

const formatPrice = (price) => {
  if (price >= 100000) return `₹${(price / 100000).toFixed(2)}L`;
  return `₹${price.toLocaleString('en-IN')}`;
};

const tabs = [
  { key: 'motorcycle', label: 'Motorcycles' },
  { key: 'scooter', label: 'Scooters' },
  { key: 'electric', label: 'Electric' },
];

const badgeStyles = {
  new: 'bg-primary text-white',
  premia: 'bg-gold text-dark',
  bestseller: 'bg-green text-white',
};

export default function ProductsSection({ defaultCategory }) {
  const [activeTab, setActiveTab] = useState(defaultCategory || 'motorcycle');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getProducts(activeTab)
      .then(res => {
        setProducts(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load products');
        setLoading(false);
      });
  }, [activeTab]);

  return (
    <section className="py-20 bg-light">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-center text-dark">Our Lineup</h2>
        <div className="w-16 h-1 bg-primary mx-auto mt-3" />
        <p className="text-gray-500 text-center mt-2">Discover your perfect ride</p>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mt-10 mb-12">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all text-sm ${
                activeTab === tab.key
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'bg-white text-dark hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <div className="skeleton h-48 w-full" />
                <div className="p-5 space-y-3">
                  <div className="skeleton h-5 w-3/4" />
                  <div className="skeleton h-4 w-1/2" />
                  <div className="skeleton h-4 w-2/3" />
                  <div className="flex gap-2 mt-4">
                    <div className="skeleton h-10 flex-1" />
                    <div className="skeleton h-10 flex-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
            <button
              onClick={() => setActiveTab(activeTab)}
              className="mt-4 text-primary underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Product Cards */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <div
                key={product.id || product.slug}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                {/* Image Area */}
                <div className="h-48 relative overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 flex items-center justify-center">
                    <span className="text-6xl opacity-20">🏍️</span>
                  </div>
                  {product.badge && (
                    <span
                      className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                        badgeStyles[product.badge] || 'bg-gray-500 text-white'
                      }`}
                    >
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-dark">{product.name}</h3>
                  <div className="flex gap-4 mt-2 text-sm text-gray-500">
                    {activeTab === 'electric' ? (
                      <>
                        <span>Range: {product.range_km} km</span>
                        <span>Power: {product.power_bhp} BHP</span>
                      </>
                    ) : (
                      <>
                        <span>{product.engine_cc}cc</span>
                        <span>{product.torque_nm} Nm</span>
                      </>
                    )}
                  </div>
                  <p className="mt-3 text-primary font-bold text-lg">
                    {formatPrice(product.price_min)} — {formatPrice(product.price_max)}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 py-2.5 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-colors text-sm text-center">
                      Explore
                    </button>
                    <button className="flex-1 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors text-sm text-center">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
