import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import Landing from '@/pages/Landing.tsx';
import Resizer from '@/pages/Resizer.tsx';
import NotFound from '@/pages/NotFound.tsx';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/resize' element={<Resizer />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path='*' element={<NotFound />} />
    </Routes>
    <Toaster richColors toastOptions={{}} />
  </BrowserRouter>
);

export default App;
