
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Trash, ShoppingCart } from "lucide-react";
import { MenuItemType } from "../menu/MenuItem";
import { useNavigate } from "react-router-dom";

interface CartItem extends MenuItemType {
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  tableId?: number;
  onRemoveItem: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onClearCart: () => void;
}

const Cart = ({
  items,
  tableId,
  onRemoveItem,
  onUpdateQuantity,
  onClearCart,
}: CartProps) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState(0);

  // Calculate total whenever items change
  useEffect(() => {
    const newTotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(newTotal);
  }, [items]);

  const handleCheckout = () => {
    setOpen(false);
    navigate("/checkout", { 
      state: { 
        items, 
        total, 
        tableId 
      } 
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          className="relative bg-coffee hover:bg-coffee-dark text-white"
          size="icon"
        >
          <ShoppingCart className="h-5 w-5" />
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs h-5 w-5 rounded-full flex items-center justify-center">
              {items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Order</SheetTitle>
          {tableId && (
            <div className="text-sm text-muted-foreground">
              Table #{tableId}
            </div>
          )}
        </SheetHeader>

        <div className="flex-1 overflow-auto py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mb-2" strokeWidth={1.5} />
              <p className="text-muted-foreground">Your cart is empty</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-start justify-between border-b pb-4"
                >
                  <div className="flex items-start space-x-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 object-cover rounded-md"
                    />
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <span className="text-sm text-muted-foreground">
                        {formatPrice(item.price)} × {item.quantity}
                      </span>
                      <div className="mt-1 flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() =>
                            onUpdateQuantity(
                              item.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                        >
                          -
                        </Button>
                        <span className="text-sm">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() =>
                            onUpdateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="flex-col">
            <div className="flex justify-between py-4 border-t">
              <span className="font-medium">Total</span>
              <span className="font-bold">{formatPrice(total)}</span>
            </div>
            <div className="space-y-2">
              <Button
                onClick={handleCheckout}
                className="w-full bg-accent hover:bg-accent/90"
              >
                Checkout
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={onClearCart}
              >
                Clear Cart
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
