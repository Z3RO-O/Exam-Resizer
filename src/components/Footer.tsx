import { Heart, Github } from 'lucide-react';

const Footer = () => {
  return (
    <div className='flex flex-col items-center justify-center p-3 gap-2 border-t z-20 bg-background/95 backdrop-blur'>
      <p className='text-sm font-medium text-center text-muted-foreground flex items-center gap-1.5'>
        Made with <Heart className='w-4 h-4 fill-red-500 text-red-500' /> by{' '}
        <a
          href='https://github.com/Z3RO-O/Exam-Resizer'
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center text-foreground text-center gap-1'
        >
          <span>Z3RO-O</span>
          <Github className='w-4 h-4' />
        </a>
      </p>
      <p className='text-xs text-center text-muted-foreground/80 font-semibold'>
        Your images are processed in your browser and never stored on our
        servers.
      </p>
    </div>
  );
};

export default Footer;
