
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { MenuItemType } from "../menu/MenuItem";

interface CartItem extends MenuItemType {
  quantity: number;
}

interface CheckoutFormProps {
  items: CartItem[];
  total: number;
  tableId?: number;
  onComplete: () => void;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
}

const CheckoutForm = ({ items, total, tableId, onComplete }: CheckoutFormProps) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods: PaymentMethod[] = [
    { id: "gopay", name: "GoPay", icon: "/gopay-icon.png" },
    { id: "ovo", name: "OVO", icon: "/ovo-icon.png" },
    { id: "dana", name: "DANA", icon: "/dana-icon.png" },
    { id: "bca", name: "BCA Virtual Account", icon: "/bca-icon.png" },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!name || !email || !phone) {
        toast.error("Please fill in all the required fields");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!selectedPayment) {
        toast.error("Please select a payment method");
        return;
      }
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Payment successful!");
      onComplete();
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto">
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="pt-4">
                  <Button type="submit" className="w-full bg-coffee hover:bg-coffee-dark">
                    Continue
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedPayment === method.id
                      ? "border-coffee bg-coffee/10"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => setSelectedPayment(method.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center">
                      {/* Placeholder for payment icon */}
                      <span className="text-xs text-center">{method.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium">{method.name}</p>
                      <p className="text-xs text-muted-foreground">
                        No additional fee
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-4 flex space-x-2">
                <Button
                  variant="outline"
                  onClick={handlePrevStep}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={handleNextStep}
                  disabled={!selectedPayment}
                  className="flex-1 bg-coffee hover:bg-coffee-dark"
                >
                  Review Order
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Review Order</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Order Summary</h3>
                  <ul className="space-y-2 mb-3">
                    {items.map((item) => (
                      <li key={item.id} className="flex justify-between text-sm">
                        <span>
                          {item.name} × {item.quantity}
                        </span>
                        <span>{formatPrice(item.price * item.quantity)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t pt-2 flex justify-between font-medium">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Contact Information</h3>
                  <p className="text-sm">{name}</p>
                  <p className="text-sm">{email}</p>
                  <p className="text-sm">{phone}</p>
                </div>

                {tableId && (
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Reservation Details</h3>
                    <p className="text-sm">Table #{tableId}</p>
                  </div>
                )}

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Payment Method</h3>
                  <p className="text-sm">
                    {paymentMethods.find((m) => m.id === selectedPayment)?.name}
                  </p>
                </div>

                <div className="pt-4 flex space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevStep}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={isProcessing}
                    className="flex-1 bg-accent hover:bg-accent/90"
                  >
                    {isProcessing ? "Processing..." : "Pay Now"}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CheckoutForm;
