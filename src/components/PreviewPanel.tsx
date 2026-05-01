import type { ImageRequirement } from '@/types/exam';
import type { ResizeResult } from '@/lib/imageProcessor';

interface PreviewPanelProps {
  originalUrl: string;
  result: ResizeResult | null;
  requirement: ImageRequirement | null;
}

const PreviewPanel = ({
  originalUrl,
  result,
  requirement,
}: PreviewPanelProps) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
      <div className='space-y-2'>
        <p className='text-xs font-medium uppercase tracking-wider text-muted-foreground'>
          Original
        </p>
        <div className='bg-muted rounded-lg aspect-square flex items-center justify-center overflow-hidden'>
          <img
            src={originalUrl}
            alt='Original upload'
            className='max-w-full max-h-full object-contain'
            style={{
              outline: '1px solid rgba(0,0,0,0.1)',
              outlineOffset: '-1px',
            }}
          />
        </div>
      </div>

      <div className='space-y-2'>
        <p className='text-xs font-medium uppercase tracking-wider text-muted-foreground'>
          {result ? 'Resized' : 'Preview'}
        </p>
        <div className='bg-muted rounded-lg aspect-square flex items-center justify-center overflow-hidden'>
          {result ? (
            <img
              src={result.dataUrl}
              alt='Resized output'
              className='max-w-full max-h-full object-contain'
              style={{
                outline: '1px solid rgba(0,0,0,0.1)',
                outlineOffset: '-1px',
              }}
            />
          ) : (
            <p className='text-sm text-muted-foreground'>
              Select exam &amp; type to resize
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;
