
import Layout from "@/components/layout/Layout";
import { Coffee } from "lucide-react";

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center text-coffee-dark">
            About Kopi Pesan
          </h1>

          <div className="flex justify-center mb-10">
            <div className="p-4 bg-coffee text-white rounded-full">
              <Coffee className="h-16 w-16" />
            </div>
          </div>

          <div className="prose prose-coffee mx-auto">
            <p className="text-lg mb-6">
              Kopi Pesan is a modern coffee shop dedicated to providing a
              seamless experience for our customers. We combine the artistry of
              traditional coffee-making with innovative technology to create a
              unique dining experience.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-coffee-dark">Our Story</h2>
            <p className="mb-6">
              Founded in 2022, Kopi Pesan began with a simple idea: to make
              enjoying quality coffee more convenient. Our founder, a passionate
              coffee enthusiast, noticed how much time people spent waiting in
              line at coffee shops and wanted to create a solution.
            </p>
            <p className="mb-6">
              The answer was an integrated reservation and ordering system that
              allows customers to reserve tables, pre-order their favorite
              drinks, and enjoy a hassle-free experience at our coffee shop.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-coffee-dark">Our Coffee</h2>
            <p className="mb-6">
              At Kopi Pesan, we source beans from sustainable farms across
              Indonesia and around the world. Our coffee is ethically sourced and
              carefully roasted in small batches to ensure the highest quality
              and flavor.
            </p>
            <p className="mb-6">
              Our skilled baristas are trained in the art of coffee preparation,
              ensuring that every cup meets our exacting standards.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-coffee-dark">Our Technology</h2>
            <p className="mb-6">
              We pride ourselves on our innovative ordering system, which
              includes:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>
                Web-based table reservations with interactive floor plans
              </li>
              <li>
                Pre-ordering capability for quick service upon arrival
              </li>
              <li>
                QR code scanning at tables for convenient in-store ordering
              </li>
              <li>
                Integrated payment systems supporting multiple payment methods
              </li>
              <li>
                Automated order tracking and notification system
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-coffee-dark">Visit Us</h2>
            <p>
              We invite you to experience Kopi Pesan for yourself. Whether you're
              looking for a quiet spot to work, a place to meet friends, or just
              need your daily coffee fix, we have you covered.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
