import { motion } from 'framer-motion';
import { ArrowRight, Image as ImageIcon, Zap, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Heart, Github } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      <Header />
      
      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-6 lg:py-12 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="max-w-3xl space-y-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary"
            >
              🚀 Fast, Free, & Secure
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              Perfect Dimensions for Every <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">Government Exam</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed">
              Instantly resize, compress, and format your photo and signature to meet strict government portal requirements. Processed locally in your browser.
            </p>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <Button asChild size="lg" className="h-12 px-8 rounded-full font-semibold text-md w-full sm:w-auto shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
                <Link to="/resize">
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-8 bg-muted/30 border-t">
          <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap className="w-8 h-8 text-amber-500" />}
              title="Lightning Fast"
              description="Resize and compress your images instantly. No waiting, no queue, just immediate results."
              delay={0.1}
            />
            <FeatureCard 
              icon={<ShieldCheck className="w-8 h-8 text-emerald-500" />}
              title="100% Private"
              description="Your images never leave your device. All processing happens entirely within your web browser."
              delay={0.2}
            />
            <FeatureCard 
              icon={<ImageIcon className="w-8 h-8 text-blue-500" />}
              title="Pixel Perfect"
              description="Automatically meet the exact pixel dimensions and file size limits required by exam portals."
              delay={0.3}
            />
          </div>
        </section>
      </main>

      <footer className="py-6 border-t bg-background">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
            Made with <Heart className="w-4 h-4 fill-red-500 text-red-500" /> by{' '}
            <a href="https://github.com/Z3RO-O" target="_blank" rel="noopener noreferrer" className="text-foreground hover:underline">
              Z3RO-O
            </a>
          </p>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Exam Image Resizer. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="flex flex-col items-center text-center p-6 rounded-2xl bg-background border shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="mb-4 p-3 bg-muted rounded-full">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground text-balance leading-relaxed">{description}</p>
  </motion.div>
);

export default Landing;
