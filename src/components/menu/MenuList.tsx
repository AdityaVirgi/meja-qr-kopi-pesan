
import { useState } from "react";
import MenuItem, { MenuItemType } from "./MenuItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MenuListProps {
  items: MenuItemType[];
  onAddToCart: (item: MenuItemType, quantity: number) => void;
}

const MenuList = ({ items, onAddToCart }: MenuListProps) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Get unique categories from menu items
  const categories = ["all", ...new Set(items.map((item) => item.category))];

  // Filter items by active category
  const filteredItems =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <div>
      <Tabs defaultValue="all" onValueChange={setActiveCategory} className="mb-6">
        <TabsList className="w-full max-w-md mx-auto">
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className="flex-1 capitalize"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <MenuItem key={item.id} item={item} onAddToCart={onAddToCart} />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No items found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default MenuList;
