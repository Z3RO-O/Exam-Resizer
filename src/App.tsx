import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import Index from '@/pages/Index.tsx';
import NotFound from '@/pages/NotFound.tsx';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Index />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path='*' element={<NotFound />} />
    </Routes>
    <Toaster richColors toastOptions={{}} />
  </BrowserRouter>
);

export default App;
