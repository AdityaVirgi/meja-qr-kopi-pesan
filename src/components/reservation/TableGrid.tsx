
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Clock, AlertTriangle } from "lucide-react";
import { format } from "date-fns";
import { 
  Alert,
  AlertTitle,
  AlertDescription 
} from "@/components/ui/alert";
import { 
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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

interface TableCombination {
  tables: TableType[];
  totalCapacity: number;
}

const TableGrid = ({ tables }: TableGridProps) => {
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [partySize, setPartySize] = useState<number>(1);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [checkInTime, setCheckInTime] = useState<string>("12:00");
  const [checkOutTime, setCheckOutTime] = useState<string>("13:00");
  const [tableCombination, setTableCombination] = useState<TableCombination | null>(null);
  const [isLargePartyDialogOpen, setIsLargePartyDialogOpen] = useState(false);
  const navigate = useNavigate();

  const availableTables = tables.filter(table => table.isAvailable);
  
  // Filter tables that exactly match the party size
  const exactMatchTables = availableTables.filter(
    (table) => table.capacity === partySize
  );

  // Find table combinations for large parties
  const findTableCombinations = (size: number): TableCombination[] => {
    // Only process if it's a large group
    if (size <= 6) return [];
    
    const combinations: TableCombination[] = [];
    const availableTables = tables.filter(table => table.isAvailable);
    
    // Sort tables by capacity to optimize combinations
    const sortedTables = [...availableTables].sort((a, b) => b.capacity - a.capacity);
    
    // Simple greedy algorithm to find combinations
    const findCombination = (
      remainingSize: number, 
      startIdx: number, 
      currentTables: TableType[]
    ) => {
      // Base case: we've found a valid combination
      if (remainingSize <= 0) {
        combinations.push({
          tables: [...currentTables],
          totalCapacity: currentTables.reduce((sum, table) => sum + table.capacity, 0)
        });
        return;
      }
      
      // Try each available table starting from startIdx
      for (let i = startIdx; i < sortedTables.length; i++) {
        const table = sortedTables[i];
        currentTables.push(table);
        findCombination(remainingSize - table.capacity, i + 1, currentTables);
        currentTables.pop();
      }
    };
    
    findCombination(size, 0, []);
    
    // Sort combinations by how close they are to the requested size
    return combinations
      .filter(combo => combo.totalCapacity >= size)
      .sort((a, b) => a.totalCapacity - b.totalCapacity)
      .slice(0, 3); // Return top 3 closest matches
  };

  // Handle large party size input
  const handlePartySizeChange = (size: number) => {
    setPartySize(size);
    setSelectedTable(null);
    setTableCombination(null);
    
    // Check if this is a large party
    if (size > 6) {
      const combinations = findTableCombinations(size);
      if (combinations.length > 0) {
        setTableCombination(combinations[0]);
        setIsLargePartyDialogOpen(true);
      }
    }
  };

  const handleTableClick = (table: TableType) => {
    if (!table.isAvailable) {
      toast.error("This table is already reserved");
      return;
    }
    
    setSelectedTable(table.id);
    setTableCombination(null);
  };

  const handleCombinationSelect = (combination: TableCombination) => {
    setTableCombination(combination);
    setIsLargePartyDialogOpen(false);
  };

  const handleContinue = () => {
    if (tableCombination) {
      // Handle reservation for table combination
      const tableIds = tableCombination.tables.map(table => table.id);
      
      if (!date) {
        toast.error("Please select a date");
        return;
      }

      if (!checkInTime || !checkOutTime) {
        toast.error("Please select check-in and check-out times");
        return;
      }

      const reservationData = {
        tableIds: tableIds,
        date: date ? format(date, 'yyyy-MM-dd') : '',
        checkInTime,
        checkOutTime,
        partySize
      };

      console.log('Large party reservation data:', reservationData);
      toast.success(`Reserved ${tableIds.length} tables for your group of ${partySize}`);
      navigate(`/menu-order/${tableIds[0]}`);
      return;
    }
    
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
            onChange={(e) => handlePartySizeChange(parseInt(e.target.value) || 1)}
            className="w-full"
          />
        </div>

        {partySize > 6 && (
          <Alert variant="default" className="bg-yellow-50 border-yellow-200">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertTitle className="text-yellow-800">Large Party</AlertTitle>
            <AlertDescription className="text-yellow-700">
              Your party size exceeds our single table capacity. We'll need to reserve multiple tables for your group.
            </AlertDescription>
          </Alert>
        )}

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

      {/* Display info for regular tables or table combinations */}
      {tableCombination ? (
        <div className="mb-6 p-4 bg-coffee-light text-coffee-dark rounded-lg">
          <h3 className="font-medium text-center mb-2">Table Combination for {partySize} People</h3>
          <p className="text-sm text-center mb-4">
            Your party requires multiple tables. We've selected the best combination:
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {tableCombination.tables.map((table) => (
              <div 
                key={table.id} 
                className="p-3 bg-available/30 rounded-lg text-center"
              >
                <div className="w-12 h-12 mx-auto mb-1 rounded-full flex items-center justify-center text-white font-bold bg-available">
                  {table.number}
                </div>
                <p className="text-sm text-green-800">{table.capacity} seats</p>
              </div>
            ))}
          </div>
          
          <div className="mt-3 text-center">
            <p className="text-sm font-medium">
              Total capacity: {tableCombination.totalCapacity} seats
            </p>
          </div>
        </div>
      ) : (
        <div className="mb-6 p-4 bg-coffee-light text-coffee-dark rounded-lg text-center">
          <h3 className="font-medium">
            {partySize <= 6 
              ? `Tables Available for Exactly ${partySize} ${partySize === 1 ? 'Person' : 'People'}`
              : `Please select from available tables or use our suggested combinations`
            }
          </h3>
          {exactMatchTables.length === 0 && partySize <= 6 && (
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
      )}

      <div className="border-2 border-coffee-light p-6 rounded-lg bg-cream relative">
        <div className="absolute top-0 left-0 m-2 px-3 py-1 bg-coffee text-white rounded text-sm">
          Floor Plan
        </div>
        
        {/* Show regular table selection UI if not using a combination */}
        {!tableCombination && (
          <div className="grid grid-cols-3 gap-6 mb-8">
            {(partySize <= 6 ? exactMatchTables : availableTables).map((table) => (
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
        )}

        {/* Alternative display for combined tables */}
        {tableCombination && (
          <div className="grid grid-cols-3 gap-6 mb-8">
            {tableCombination.tables.map((table) => (
              <div 
                key={table.id} 
                className="relative p-4 rounded-lg bg-available/30 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-2 rounded-full flex items-center justify-center text-white font-bold bg-available">
                  {table.number}
                </div>
                <p className="text-sm text-green-800">{table.capacity} seats</p>
              </div>
            ))}
          </div>
        )}

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
          disabled={selectedTable === null && tableCombination === null}
        >
          {tableCombination ? "Reserve Multiple Tables" : "Continue to Menu"}
        </Button>
      </div>

      {/* Dialog for large party suggestions */}
      <AlertDialog open={isLargePartyDialogOpen} onOpenChange={setIsLargePartyDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Large Party Reservation</AlertDialogTitle>
            <AlertDialogDescription>
              Your party of {partySize} people exceeds our single table capacity. 
              We need to reserve multiple tables for your group.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          {findTableCombinations(partySize).length > 0 ? (
            <>
              <div className="py-4">
                <h4 className="font-medium text-sm mb-3">Suggested Table Combinations:</h4>
                
                <div className="space-y-3">
                  {findTableCombinations(partySize).map((combo, index) => (
                    <div 
                      key={index}
                      className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50"
                      onClick={() => handleCombinationSelect(combo)}
                    >
                      <div className="flex justify-between items-center">
                        <span>
                          <strong>{combo.tables.length} tables</strong>
                          <span className="mx-2">•</span>
                          <span>{combo.totalCapacity} total seats</span>
                        </span>
                        
                        <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                          {combo === tableCombination ? "Selected" : "Select"}
                        </span>
                      </div>
                      
                      <div className="flex gap-2 mt-2">
                        {combo.tables.map(table => (
                          <span key={table.id} className="text-xs bg-available/20 px-2 py-1 rounded">
                            Table #{table.number} ({table.capacity})
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => setIsLargePartyDialogOpen(false)}>
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </>
          ) : (
            <>
              <div className="py-4">
                <div className="flex items-start gap-3 p-3 bg-destructive/10 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-destructive">No Available Combination</p>
                    <p className="text-sm mt-1">
                      We don't have enough available tables to accommodate your party size at this time.
                      Please try a different date/time or contact us directly for special arrangements.
                    </p>
                  </div>
                </div>
              </div>
              
              <AlertDialogFooter>
                <AlertDialogAction onClick={() => setIsLargePartyDialogOpen(false)}>
                  Understand
                </AlertDialogAction>
              </AlertDialogFooter>
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TableGrid;
