import { useCallback, useState, useRef } from 'react';
import { UploadCloud } from 'lucide-react';
import { motion } from 'framer-motion';

interface UploadBoxProps {
  onFileSelect: (file: File) => void;
}

const UploadBox = ({ onFileSelect }: UploadBoxProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(file.type)) return;
      if (file.size > 10 * 1024 * 1024) return;
      onFileSelect(file);
    },
    [onFileSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      className='w-full'
    >
      <div
        onDragOver={e => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`
          flex flex-col items-center justify-center gap-3 p-10 rounded-xl cursor-pointer
          border-2 border-dashed transition-colors duration-150
          ${isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50'}
        `}
      >
        <div className='w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center'>
          <UploadCloud className='w-6 h-6 text-primary' />
        </div>
        <div className='text-center'>
          <p className='font-semibold text-foreground'>
            Click to upload or drag and drop
          </p>
          <p className='text-sm text-muted-foreground mt-1'>
            PNG, JPG, JPEG up to 10MB
          </p>
        </div>
        <input
          ref={inputRef}
          type='file'
          accept='image/png,image/jpeg,image/jpg'
          className='hidden'
          onChange={e => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
      </div>
    </motion.div>
  );
};

export default UploadBox;
