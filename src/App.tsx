import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Reservation from "./pages/Reservation";
import MenuOrder from "./pages/MenuOrder";
import Checkout from "./pages/Checkout";
import QRScanner from "./pages/QRScanner";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import ManualTableInput from "./pages/ManualTableInput";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/menu-order/:tableId" element={<MenuOrder />} />
          <Route path="/menu-order/manual" element={<ManualTableInput />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/qr-scanner" element={<QRScanner />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
