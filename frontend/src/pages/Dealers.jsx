import Navbar from '../components/Navbar';
import DealerLocator from '../components/DealerLocator';
import Footer from '../components/Footer';

export default function Dealers() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <DealerLocator />
      </div>
      <Footer />
    </div>
  );
}
