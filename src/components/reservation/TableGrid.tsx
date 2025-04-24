
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export interface TableType {
  id: number;
  number: number;
  capacity: number;
  isAvailable: boolean;
  position: { x: number; y: number };
}

interface TableGridProps {
  tables: TableType[];
}

const TableGrid = ({ tables }: TableGridProps) => {
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleTableClick = (table: TableType) => {
    if (!table.isAvailable) {
      toast.error("This table is already reserved");
      return;
    }
    
    setSelectedTable(table.id);
  };

  const handleContinue = () => {
    if (selectedTable === null) {
      toast.error("Please select a table first");
      return;
    }
    
    navigate(`/menu-order/${selectedTable}`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 p-4 bg-coffee-light text-coffee-dark rounded-lg text-center">
        <h3 className="font-medium">Please select a table</h3>
        <div className="flex items-center justify-center mt-3 space-x-6">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-available mr-2"></div>
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-occupied mr-2"></div>
            <span className="text-sm">Reserved</span>
          </div>
        </div>
      </div>

      <div className="border-2 border-coffee-light p-6 rounded-lg bg-cream relative">
        <div className="absolute top-0 left-0 m-2 px-3 py-1 bg-coffee text-white rounded text-sm">
          Floor Plan
        </div>
        
        <div className="grid grid-cols-3 gap-6 mb-8">
          {tables.map((table) => (
            <div 
              key={table.id} 
              className={`relative p-4 rounded-lg table-hover cursor-pointer text-center
                ${selectedTable === table.id ? "ring-2 ring-offset-2" : ""}
                ${table.isAvailable 
                  ? "bg-available/20 hover:bg-available/30 ring-available" 
                  : "bg-occupied/20 cursor-not-allowed ring-occupied"}`
                }
              onClick={() => handleTableClick(table)}
            >
              <div 
                className={`w-16 h-16 mx-auto mb-2 rounded-full flex items-center justify-center text-white font-bold
                  ${table.isAvailable ? "bg-available" : "bg-occupied"}`}
              >
                {table.number}
              </div>
              <p className={`text-sm ${table.isAvailable ? "text-green-800" : "text-red-800"}`}>
                {table.capacity} seats
              </p>
            </div>
          ))}
        </div>

        {/* Wall decorations */}
        <div className="border-t-4 border-coffee-dark w-full mb-6"></div>
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="h-4 bg-coffee rounded"></div>
          <div className="h-4 bg-coffee-dark rounded"></div>
          <div className="h-4 bg-coffee-dark rounded"></div>
          <div className="h-4 bg-coffee rounded"></div>
        </div>
        
        {/* Entrance */}
        <div className="w-32 h-8 mx-auto bg-coffee/20 border border-coffee rounded-t-lg flex items-center justify-center">
          <span className="text-xs text-coffee">Entrance</span>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <Button 
          onClick={handleContinue} 
          className="bg-coffee hover:bg-coffee-dark"
          disabled={selectedTable === null}
        >
          Continue to Menu
        </Button>
      </div>
    </div>
  );
};

export default TableGrid;
