import { useState, useEffect, useMemo } from 'react';
import { getDealers } from '../api';

export default function DealerLocator() {
  const [dealers, setDealers] = useState([]);
  const [allDealers, setAllDealers] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cities = useMemo(() => {
    const unique = [...new Set(allDealers.map(d => d.city))];
    return unique.sort();
  }, [allDealers]);

  const fetchDealers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getDealers();
      setAllDealers(res.data.data);
      setDealers(res.data.data);
    } catch (err) {
      setError('Failed to load dealers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDealers();
  }, []);

  useEffect(() => {
    if (!selectedCity) {
      setDealers(allDealers);
    } else {
      setDealers(allDealers.filter(d => d.city === selectedCity));
    }
  }, [selectedCity, allDealers]);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-dark">Find a Dealer</h2>
        <div className="w-16 h-1 bg-primary mx-auto mt-3"></div>
        <p className="text-gray-500 text-center mt-2">Visit your nearest MotoVerse showroom</p>

        {!loading && !error && cities.length > 0 && (
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedCity('')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCity === ''
                  ? 'bg-primary text-white'
                  : 'bg-white text-dark border border-gray-200 hover:border-primary hover:text-primary'
              }`}
            >
              All Cities
            </button>
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCity === city
                    ? 'bg-primary text-white'
                    : 'bg-white text-dark border border-gray-200 hover:border-primary hover:text-primary'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        )}

        {error && (
          <div className="mt-12 text-center">
            <p className="text-red-500 text-sm">{error}</p>
            <button
              onClick={fetchDealers}
              className="mt-3 px-5 py-2 bg-primary text-white text-sm font-medium rounded-full hover:bg-primary-dark transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {loading && (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-light rounded-2xl p-6 space-y-3">
                <div className="h-5 w-2/3 skeleton rounded"></div>
                <div className="h-4 w-full skeleton rounded"></div>
                <div className="h-4 w-1/2 skeleton rounded"></div>
                <div className="h-3 w-1/3 skeleton rounded"></div>
                <div className="h-4 w-1/3 skeleton rounded mt-2"></div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dealers.map((dealer) => (
              <div
                key={dealer.id || dealer._id}
                className="bg-light rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group relative"
              >
                {dealer.is_premia && (
                  <span className="absolute top-4 right-4 bg-gold/10 text-gold px-3 py-1 rounded-full text-xs font-bold">
                    ★ PREMIA
                  </span>
                )}
                <h3 className="text-lg font-bold text-dark group-hover:text-primary transition-colors">
                  {dealer.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500 flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mt-0.5 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  <span>{dealer.address}</span>
                </p>
                <p className="mt-2 text-sm text-gray-500 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                  <a href={`tel:${dealer.phone}`} className="hover:text-primary transition-colors">
                    {dealer.phone}
                  </a>
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  {dealer.city}, {dealer.state}
                </p>
                <div className="mt-4">
                  <a
                    href={`https://www.google.com/maps?q=${dealer.lat},${dealer.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:gap-2.5 transition-all"
                  >
                    Get Directions
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
