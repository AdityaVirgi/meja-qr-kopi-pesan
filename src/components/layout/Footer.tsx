
import { Coffee } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-coffee-dark text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Coffee className="h-6 w-6" />
              <span className="text-xl font-bold">Kopi Pesan</span>
            </div>
            <p className="text-sm text-gray-300">
              Serving quality coffee and great experiences since 2022.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors text-sm">Home</Link></li>
              <li><Link to="/reservation" className="text-gray-300 hover:text-white transition-colors text-sm">Reservation</Link></li>
              <li><Link to="/menu" className="text-gray-300 hover:text-white transition-colors text-sm">Menu</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors text-sm">About</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Opening Hours</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-300">Monday - Friday: 7am - 9pm</li>
              <li className="text-gray-300">Saturday - Sunday: 8am - 10pm</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-300">Email: hello@kopipesan.com</li>
              <li className="text-gray-300">Phone: +62 123 456 7890</li>
              <li className="text-gray-300">Address: Jl. Coffee No. 123, Jakarta</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-700 text-center text-sm text-gray-300">
          <p>&copy; {new Date().getFullYear()} Kopi Pesan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
