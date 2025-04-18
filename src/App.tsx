
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Weather from "./pages/Weather";
import Crops from "./pages/Crops";
import Community from "./pages/Community";
import Schemes from "./pages/Schemes";
import NotFound from "./pages/NotFound";
import Market from "./pages/Market";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "./pages/dashboard";
import ProtectedRoute from "./components/ProtectedRoute";


const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
  <Route path="/" element={<Index />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />

  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />

  <Route path="/weather" element={<Weather />} />
  <Route path="/crops" element={<Crops />} />
  <Route path="/prices" element={<Market />} />
  <Route path="/market" element={<Market />} />
  <Route path="/community" element={<Community />} />
  <Route path="/schemes" element={<Schemes />} />
  <Route path="*" element={<NotFound />} />
</Routes>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
