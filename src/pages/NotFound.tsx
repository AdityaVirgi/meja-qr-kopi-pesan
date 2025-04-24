
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <h1 className="text-5xl font-bold mb-4 text-coffee-dark">404</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Oops! This page doesn't exist.
        </p>
        <div className="max-w-xs text-center mb-8">
          <p className="text-muted-foreground">
            The page you're looking for might have been moved or deleted.
          </p>
        </div>
        <Button asChild className="bg-coffee hover:bg-coffee-dark">
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
