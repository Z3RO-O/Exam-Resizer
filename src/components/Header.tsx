import { Link } from 'react-router-dom';
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-4 py-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-lg font-semibold tracking-tight text-foreground hover:opacity-80 transition-opacity">
          Exam Image Resizer
        </Link>
        <div className="flex items-center gap-4">
          <AnimatedThemeToggler className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-muted transition-colors" variant="circle" />
        </div>
      </div>
    </header>
  );
};
