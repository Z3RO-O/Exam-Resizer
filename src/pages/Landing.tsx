import { motion } from 'framer-motion';
import { Image as ImageIcon, Zap, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import DotField from '@/components/DotField';
import { Header } from '@/components/Header';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import Footer from '@/components/Footer';

const Landing = () => {
  return (
    <div className='min-h-screen flex flex-col bg-background selection:bg-primary/20 relative overflow-hidden'>
      {/* Interactive Background */}
      <div className='absolute inset-0 z-0 pointer-events-none'>
        <DotField
          dotRadius={3}
          dotSpacing={40}
          bulgeStrength={67}
          glowRadius={160}
          sparkle
          waveAmplitude={0}
          cursorRadius={500}
          cursorForce={0.1}
          bulgeOnly
          gradientFrom='#A855F7'
          gradientTo='#B497CF'
          glowColor='#9679c8'
        />
      </div>

      {/* Foreground Content */}
      <div className='z-10 flex flex-col flex-1'>
        <Header />
        <main className='flex-1 flex flex-col'>
          {/* Hero Section */}
          <section className='flex-1 flex flex-col items-center justify-center text-center px-4 py-6 lg:py-8'>
            {/* Subtle overlay gradient to blend dots with content */}
            <div className='absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/10 via-background/40 to-background/80' />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className='max-w-3xl space-y-6'
            >
              <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance'>
                Perfect Dimensions for Every{' '}
                <span className='text-transparent bg-clip-text bg-linear-to-r from-primary to-primary/60'>
                  Government Exam
                </span>
              </h1>

              <p className='text-lg sm:text-xl text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed'>
                Instantly resize, compress, and format your photo and signature
                to meet strict government portal requirements. Processed locally
                in your browser.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className='mb-8'
              >
                <Link to='/resize'>
                  <InteractiveHoverButton>Get Started</InteractiveHoverButton>
                </Link>
              </motion.div>
            </motion.div>
            <div className='max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8'>
              <FeatureCard
                icon={<Zap className='w-8 h-8 text-amber-500' />}
                title='Lightning Fast'
                description='Resize and compress your images instantly. No waiting, no queue, just immediate results.'
                delay={0.1}
              />
              <FeatureCard
                icon={<ShieldCheck className='w-8 h-8 text-emerald-500' />}
                title='100% Private'
                description='Your images never leave your device. All processing happens entirely within your web browser.'
                delay={0.2}
              />
              <FeatureCard
                icon={<ImageIcon className='w-8 h-8 text-blue-500' />}
                title='Pixel Perfect'
                description='Automatically meet the exact pixel dimensions and file size limits required by exam portals.'
                delay={0.3}
              />
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className='flex flex-col items-center text-center p-6 rounded-2xl bg-background border shadow-sm hover:shadow-md transition-shadow'
  >
    <div className='mb-4 p-3 bg-muted rounded-full'>{icon}</div>
    <h3 className='text-xl font-semibold mb-2'>{title}</h3>
    <p className='text-muted-foreground text-balance leading-relaxed'>
      {description}
    </p>
  </motion.div>
);

export default Landing;
