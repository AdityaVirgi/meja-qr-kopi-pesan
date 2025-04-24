
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Coffee, Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Coffee className="h-8 w-8 text-coffee" />
          <span className="text-2xl font-bold text-coffee-dark">Kopi Pesan</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground hover:text-coffee transition-colors">
            Home
          </Link>
          <Link to="/reservation" className="text-foreground hover:text-coffee transition-colors">
            Reservation
          </Link>
          <Link to="/menu" className="text-foreground hover:text-coffee transition-colors">
            Menu
          </Link>
          <Link to="/about" className="text-foreground hover:text-coffee transition-colors">
            About
          </Link>
          <Button variant="default" className="bg-coffee hover:bg-coffee-dark text-white">
            Order Now
          </Button>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 py-4 bg-background border-t border-border">
          <nav className="flex flex-col space-y-4">
            <Link
              to="/"
              className="px-4 py-2 text-foreground hover:bg-muted rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/reservation"
              className="px-4 py-2 text-foreground hover:bg-muted rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Reservation
            </Link>
            <Link
              to="/menu"
              className="px-4 py-2 text-foreground hover:bg-muted rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Menu
            </Link>
            <Link
              to="/about"
              className="px-4 py-2 text-foreground hover:bg-muted rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Button
              variant="default"
              className="bg-coffee hover:bg-coffee-dark text-white w-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              Order Now
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
