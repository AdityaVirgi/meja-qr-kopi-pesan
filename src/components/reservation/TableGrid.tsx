import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Clock } from "lucide-react";
import { format } from "date-fns";

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
  const [partySize, setPartySize] = useState<number>(1);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [checkInTime, setCheckInTime] = useState<string>("12:00");
  const [checkOutTime, setCheckOutTime] = useState<string>("13:00");
  const navigate = useNavigate();

  const filteredTables = tables.filter(
    (table) => table.isAvailable && table.capacity === partySize
  );

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

    if (!date) {
      toast.error("Please select a date");
      return;
    }

    if (!checkInTime || !checkOutTime) {
      toast.error("Please select check-in and check-out times");
      return;
    }

    const reservationData = {
      tableId: selectedTable,
      date: date ? format(date, 'yyyy-MM-dd') : '',
      checkInTime,
      checkOutTime,
      partySize
    };

    console.log('Reservation data:', reservationData);
    
    navigate(`/menu-order/${selectedTable}`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Number of People</label>
          <Input
            type="number"
            min="1"
            value={partySize}
            onChange={(e) => setPartySize(parseInt(e.target.value) || 1)}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Date</label>
          <div className="border rounded-lg p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              disabled={(date) => date < new Date()}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Check-in Time</label>
            <div className="relative">
              <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                type="time"
                value={checkInTime}
                onChange={(e) => setCheckInTime(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Check-out Time</label>
            <div className="relative">
              <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                type="time"
                value={checkOutTime}
                onChange={(e) => setCheckOutTime(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 p-4 bg-coffee-light text-coffee-dark rounded-lg text-center">
        <h3 className="font-medium">Tables Available for Exactly {partySize} {partySize === 1 ? 'Person' : 'People'}</h3>
        {filteredTables.length === 0 && (
          <p className="text-sm text-red-600 mt-2">
            No tables available for exactly {partySize} people. Please adjust your party size.
          </p>
        )}
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
          {filteredTables.map((table) => (
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
                Exactly {table.capacity} seats
              </p>
            </div>
          ))}
        </div>

        <div className="border-t-4 border-coffee-dark w-full mb-6"></div>
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="h-4 bg-coffee rounded"></div>
          <div className="h-4 bg-coffee-dark rounded"></div>
          <div className="h-4 bg-coffee-dark rounded"></div>
          <div className="h-4 bg-coffee rounded"></div>
        </div>
        
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
