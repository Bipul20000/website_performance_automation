import { useState, useEffect } from 'react';
import { getNews } from '../api';

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

const getCategoryColor = (category) => {
  switch (category) {
    case 'launch': return 'bg-red-500 text-white';
    case 'event': return 'bg-blue-500 text-white';
    case 'award': return 'bg-amber-500 text-white';
    case 'corporate': return 'bg-gray-500 text-white';
    default: return 'bg-gray-500 text-white';
  }
};

export default function NewsSection() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getNews();
      setArticles(res.data.data);
    } catch (err) {
      setError('Failed to load news. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <section className="py-20 bg-light">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-dark">Latest News</h2>
        <div className="w-16 h-1 bg-primary mx-auto mt-3"></div>
        <p className="text-gray-500 text-center mt-2">Stay updated with MotoVerse</p>

        {error && (
          <div className="mt-12 text-center">
            <p className="text-red-500 text-sm">{error}</p>
            <button
              onClick={fetchNews}
              className="mt-3 px-5 py-2 bg-primary text-white text-sm font-medium rounded-full hover:bg-primary-dark transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {loading && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <div className="h-48 skeleton"></div>
                <div className="p-5 space-y-3">
                  <div className="h-3 w-1/4 skeleton rounded"></div>
                  <div className="h-5 w-3/4 skeleton rounded"></div>
                  <div className="h-3 w-full skeleton rounded"></div>
                  <div className="h-3 w-2/3 skeleton rounded"></div>
                  <div className="h-4 w-1/4 skeleton rounded mt-2"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <div
                key={article.id || article._id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="h-48 relative">
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-100 flex items-center justify-center">
                    <span className="text-5xl opacity-20">📰</span>
                  </div>
                  <span className={`absolute top-3 left-3 ${getCategoryColor(article.category)} px-3 py-1 rounded-full text-xs font-bold uppercase`}>
                    {article.category}
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    {formatDate(article.published_at)}
                  </p>
                  <h3 className="text-lg font-bold text-dark mt-1 line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <a
                    href="#"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:gap-2.5 transition-all"
                  >
                    Read More
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
