
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(false);
  const { items = [], total = 0, tableId } = location.state || {};

  const handleComplete = () => {
    setIsCompleted(true);
  };

  const handleContinue = () => {
    navigate("/");
  };

  if (!items.length && !isCompleted) {
    // Handle case when checkout is accessed directly without items
    return (
      <Layout>
        <div className="container mx-auto px-4 py-10">
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">
                  Your cart is empty. Please add items before checkout.
                </p>
                <Button onClick={() => navigate("/menu")} className="bg-coffee hover:bg-coffee-dark">
                  Browse Menu
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 text-center text-coffee-dark">
          {isCompleted ? "Payment Successful" : "Checkout"}
        </h1>

        {isCompleted ? (
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">Thank You!</h2>
                <p className="text-muted-foreground mb-6">
                  Your order has been confirmed. We've sent a confirmation to your email.
                </p>
                {tableId && (
                  <p className="text-sm mb-6">
                    Your reservation for Table #{tableId} is confirmed.
                  </p>
                )}
                <Button onClick={handleContinue} className="bg-coffee hover:bg-coffee-dark">
                  Return to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <CheckoutForm
            items={items}
            total={total}
            tableId={tableId}
            onComplete={handleComplete}
          />
        )}
      </div>
    </Layout>
  );
};

export default Checkout;
