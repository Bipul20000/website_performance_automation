import Navbar from '../components/Navbar';
import NewsSection from '../components/NewsSection';
import Footer from '../components/Footer';

export default function News() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <NewsSection />
      </div>
      <Footer />
    </div>
  );
}
