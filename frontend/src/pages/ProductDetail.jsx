import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getProductBySlug } from '../api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const formatPrice = (price) => {
  if (price >= 100000) return `₹${(price / 100000).toFixed(2)}L`;
  return `₹${price.toLocaleString('en-IN')}`;
};

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getProductBySlug(slug)
      .then(res => { setProduct(res.data.data); setLoading(false); })
      .catch(() => { setError('Product not found'); setLoading(false); });
  }, [slug]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 lg:px-8">
        {loading && (
          <div className="space-y-6">
            <div className="skeleton h-8 w-1/3" />
            <div className="skeleton h-64 w-full" />
            <div className="skeleton h-4 w-2/3" />
          </div>
        )}
        {error && <p className="text-center text-red-500 py-12">{error}</p>}
        {product && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 flex items-center justify-center">
              <span className="text-8xl opacity-20">🏍️</span>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-bold text-dark">{product.name}</h1>
                {product.badge && (
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    product.badge === 'new' ? 'bg-primary text-white' :
                    product.badge === 'premia' ? 'bg-gold text-dark' :
                    'bg-green text-white'
                  }`}>{product.badge}</span>
                )}
              </div>
              <p className="text-2xl text-primary font-bold mt-4">
                {formatPrice(product.price_min)} — {formatPrice(product.price_max)}
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                {product.engine_cc > 0 && (
                  <div className="bg-light rounded-xl p-4">
                    <p className="text-2xl font-bold text-dark">{product.engine_cc}cc</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">Engine</p>
                  </div>
                )}
                <div className="bg-light rounded-xl p-4">
                  <p className="text-2xl font-bold text-dark">{product.power_bhp} BHP</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">Power</p>
                </div>
                <div className="bg-light rounded-xl p-4">
                  <p className="text-2xl font-bold text-dark">{product.torque_nm} Nm</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">Torque</p>
                </div>
                {product.is_electric && (
                  <div className="bg-light rounded-xl p-4">
                    <p className="text-2xl font-bold text-green">{product.range_km} km</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">Range</p>
                  </div>
                )}
              </div>
              {product.features?.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-semibold text-dark mb-3">Key Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.features.map((f, i) => (
                      <span key={i} className="bg-light text-gray-600 text-xs px-3 py-1.5 rounded-full">{f}</span>
                    ))}
                  </div>
                </div>
              )}
              {product.colors?.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold text-dark mb-3">Available Colors</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((c, i) => (
                      <span key={i} className="border border-gray-200 text-gray-600 text-xs px-3 py-1.5 rounded-full">{c}</span>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex gap-3 mt-8">
                <button className="flex-1 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors">
                  Book Now
                </button>
                <button className="flex-1 py-3 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-colors">
                  Book Test Ride
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
