import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductsSection from '../components/ProductsSection';
import Footer from '../components/Footer';

export default function Products() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <ProductsSection defaultCategory={category || 'motorcycle'} />
      </div>
      <Footer />
    </div>
  );
}
