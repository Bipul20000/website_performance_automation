import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import ProductsSection from '../components/ProductsSection';
import PremiaSection from '../components/PremiaSection';
import EVSection from '../components/EVSection';
import OffersSection from '../components/OffersSection';
import DealerLocator from '../components/DealerLocator';
import NewsSection from '../components/NewsSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <section id="hero">
          <HeroBanner />
        </section>
        <section id="products">
          <ProductsSection />
        </section>
        <section id="premia">
          <PremiaSection />
        </section>
        <section id="electric">
          <EVSection />
        </section>
        <section id="offers">
          <OffersSection />
        </section>
        <section id="dealers">
          <DealerLocator />
        </section>
        <section id="news">
          <NewsSection />
        </section>
      </main>
      <Footer />
    </div>
  );
}
