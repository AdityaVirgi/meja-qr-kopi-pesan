
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const ManualTableInput = () => {
  const [tableNumber, setTableNumber] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tableNum = parseInt(tableNumber);
    
    if (!tableNumber || isNaN(tableNum) || tableNum < 1 || tableNum > 12) {
      toast.error("Please enter a valid table number (1-12)");
      return;
    }

    navigate(`/menu-order/${tableNum}`);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Enter Table Number</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="number"
                  min="1"
                  max="12"
                  placeholder="Enter table number (1-12)"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-coffee hover:bg-coffee-dark"
              >
                Continue to Menu
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ManualTableInput;
