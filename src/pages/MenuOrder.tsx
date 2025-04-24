
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import MenuList from "@/components/menu/MenuList";
import Cart from "@/components/cart/Cart";
import { MenuItemType } from "@/components/menu/MenuItem";
import { toast } from "sonner";

interface CartItem extends MenuItemType {
  quantity: number;
}

const MenuOrder = () => {
  const { tableId } = useParams<{ tableId: string }>();
  const [searchParams] = useSearchParams();
  const fromQr = searchParams.get("source") === "qr";
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (tableId && fromQr) {
      toast.success(`Table #${tableId} selected via QR code`);
    }
  }, [tableId, fromQr]);

  // Mock menu items data
  const menuItems: MenuItemType[] = [
    {
      id: 1,
      name: "Espresso",
      description: "Strong coffee brewed by forcing hot water through finely-ground coffee beans.",
      price: 25000,
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-4.0.3",
      category: "coffee",
    },
    {
      id: 2,
      name: "Cappuccino",
      description: "Equal parts espresso, steamed milk, and milk foam.",
      price: 35000,
      image: "https://images.unsplash.com/photo-1534778101976-62847782c213?ixlib=rb-4.0.3",
      category: "coffee",
    },
    {
      id: 3,
      name: "Latte",
      description: "Espresso with steamed milk and a light layer of foam.",
      price: 35000,
      image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?ixlib=rb-4.0.3",
      category: "coffee",
    },
    {
      id: 4,
      name: "Green Tea",
      description: "Freshly brewed green tea, served hot or cold.",
      price: 28000,
      image: "https://images.unsplash.com/photo-1556682851-2ded4aae60a2?ixlib=rb-4.0.3",
      category: "non-coffee",
    },
    {
      id: 5,
      name: "Chocolate Croissant",
      description: "Buttery, flaky pastry filled with rich chocolate.",
      price: 22000,
      image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?ixlib=rb-4.0.3",
      category: "pastry",
    },
    {
      id: 6,
      name: "Chicken Sandwich",
      description: "Grilled chicken with lettuce, tomato, and special sauce.",
      price: 45000,
      image: "https://images.unsplash.com/photo-1554433607-66b5efe9d304?ixlib=rb-4.0.3",
      category: "food",
    },
  ];

  const handleAddToCart = (item: MenuItemType, quantity: number) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItemIndex !== -1) {
        // Item already exists in cart, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Item not in cart, add it
        return [...prevItems, { ...item, quantity }];
      }
    });
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
    toast.info("Cart cleared");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-coffee-dark">Order Menu</h1>
            {tableId && (
              <p className="text-muted-foreground">
                For Table #{tableId} {fromQr && "(via QR)"}
              </p>
            )}
          </div>
          <div className="flex items-center">
            <Cart
              items={cartItems}
              tableId={tableId ? parseInt(tableId) : undefined}
              onRemoveItem={handleRemoveItem}
              onUpdateQuantity={handleUpdateQuantity}
              onClearCart={handleClearCart}
            />
          </div>
        </div>

        <MenuList items={menuItems} onAddToCart={handleAddToCart} />
      </div>
    </Layout>
  );
};

export default MenuOrder;
