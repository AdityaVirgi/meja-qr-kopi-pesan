
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Minus } from "lucide-react";
import { toast } from "sonner";

export interface MenuItemType {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface MenuItemProps {
  item: MenuItemType;
  onAddToCart: (item: MenuItemType, quantity: number) => void;
}

const MenuItem = ({ item, onAddToCart }: MenuItemProps) => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    onAddToCart(item, quantity);
    setQuantity(1);
    toast.success(`${item.name} added to cart`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  return (
    <Card className="menu-card overflow-hidden h-full flex flex-col">
      <div className="relative h-48">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-coffee text-white px-2 py-1 rounded-md text-xs">
          {item.category}
        </div>
      </div>
      <CardContent className="pt-4 flex-1 flex flex-col">
        <h3 className="font-bold text-lg mb-1">{item.name}</h3>
        <p className="text-muted-foreground text-sm mb-3 flex-1">
          {item.description}
        </p>
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-3">
            <span className="font-bold text-coffee-dark">
              {formatPrice(item.price)}
            </span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={decreaseQuantity}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={increaseQuantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button
            onClick={handleAddToCart}
            className="w-full bg-coffee hover:bg-coffee-dark"
          >
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuItem;
