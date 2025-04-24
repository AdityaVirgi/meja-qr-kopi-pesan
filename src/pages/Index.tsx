import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { QrCode, CalendarDays, Coffee } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <CalendarDays className="h-10 w-10 text-coffee" />,
      title: "Table Reservation",
      description:
        "Reserve your favorite spot in our coffee shop and order in advance.",
      action: () => navigate("/reservation"),
    },
    {
      icon: <QrCode className="h-10 w-10 text-coffee" />,
      title: "QR Code Ordering",
      description:
        "Scan the QR code on your table to order directly from your seat.",
      action: () => navigate("/qr-scanner"),
    },
    {
      icon: <Coffee className="h-10 w-10 text-coffee" />,
      title: "View Our Menu",
      description:
        "Explore our handcrafted coffee drinks and delicious food items.",
      action: () => navigate("/menu"),
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-coffee-dark flex items-center bg-coffee-pattern">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        <div className="container mx-auto px-4 z-10 text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              alley.jkt
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200">
              NOTHING CAN SEPARATE YOU FROM ... COFFEE
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => navigate("/reservation")}
                className="bg-coffee hover:bg-coffee-dark text-white"
                size="lg"
              >
                Reserve a Table
              </Button>
              <Button
                onClick={() => navigate("/qr-scanner")}
                variant="outline"
                className="border-white text-white hover:bg-white/20"
                size="lg"
              >
                Scan QR Code
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-coffee-dark">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center text-coffee-dark">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-center mb-6">
                  {feature.description}
                </p>
                <div className="text-center">
                  <Button
                    onClick={feature.action}
                    className="bg-coffee hover:bg-coffee-dark"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-coffee-dark">
              About alley.jkt
            </h2>
            <p className="text-muted-foreground mb-8">
              alley.jkt is a modern coffee shop dedicated to providing a
              seamless experience for our customers. Our reservation and ordering
              system allows you to reserve tables, pre-order menu items, and
              enjoy your coffee without waiting in line.
            </p>
            <Button
              onClick={() => navigate("/about")}
              variant="outline"
              className="border-coffee text-coffee hover:bg-coffee/10"
            >
              Learn More About Us
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
