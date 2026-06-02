import { useState, useEffect } from 'react';
import { getActiveOffers } from '../api';

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

const getDiscountBadge = (offer) => {
  switch (offer.discount_type) {
    case 'cashback': return `₹${offer.discount_value.toLocaleString('en-IN')} CASHBACK`;
    case 'flat': return `₹${offer.discount_value.toLocaleString('en-IN')} OFF`;
    case 'percent': return `${offer.discount_value}% OFF`;
    case 'emi': return `0% EMI`;
    default: return 'SPECIAL OFFER';
  }
};

const getGradient = (type) => {
  switch (type) {
    case 'cashback': return 'from-emerald-500 to-green-600';
    case 'flat': return 'from-blue-500 to-indigo-600';
    case 'percent': return 'from-purple-500 to-violet-600';
    case 'emi': return 'from-orange-400 to-amber-500';
    default: return 'from-gray-500 to-gray-600';
  }
};

export default function OffersSection() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOffers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getActiveOffers();
      setOffers(res.data.data);
    } catch (err) {
      setError('Failed to load offers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  return (
    <section className="py-20 bg-light">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-dark">Current Offers</h2>
        <div className="w-16 h-1 bg-primary mx-auto mt-3"></div>
        <p className="text-gray-500 text-center mt-2">Don&apos;t miss out on these exclusive deals</p>

        {error && (
          <div className="mt-12 text-center">
            <p className="text-red-500 text-sm">{error}</p>
            <button
              onClick={fetchOffers}
              className="mt-3 px-5 py-2 bg-primary text-white text-sm font-medium rounded-full hover:bg-primary-dark transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {loading && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden shadow-sm">
                <div className="h-32 skeleton"></div>
                <div className="bg-white p-6 space-y-3">
                  <div className="h-4 w-3/4 skeleton rounded"></div>
                  <div className="h-3 w-full skeleton rounded"></div>
                  <div className="h-3 w-1/2 skeleton rounded"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {offers.map((offer) => (
              <div
                key={offer.id || offer._id}
                className="rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`bg-gradient-to-r ${getGradient(offer.discount_type)} p-6 text-white`}>
                  <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold">
                    {getDiscountBadge(offer)}
                  </span>
                  <h3 className="text-xl font-bold mt-3">{offer.title}</h3>
                </div>
                <div className="bg-white p-6">
                  <p className="text-gray-600 text-sm leading-relaxed">{offer.description}</p>
                  {offer.applicable_models && offer.applicable_models.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {offer.applicable_models.map((slug, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded text-xs">
                          {slug}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-gray-400 text-xs">Valid till: {formatDate(offer.valid_till)}</span>
                    <button className="text-sm font-medium text-primary hover:underline">Avail Now</button>
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
