import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Download, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { exams } from '@/config/exams';
import { resizeImage, type ResizeResult } from '@/lib/imageProcessor';
import UploadBox from '@/components/UploadBox';
import ExamSelector from '@/components/ExamSelector';
import ImageTypeSelector from '@/components/ImageTypeSelector';
import PreviewPanel from '@/components/PreviewPanel';

const examList = Object.keys(exams);

const Index = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string>('');
  const [examId, setExamId] = useState('');
  const [imageType, setImageType] = useState('');
  const [result, setResult] = useState<ResizeResult | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleFileSelect = useCallback((f: File) => {
    setFile(f);
    setOriginalUrl(URL.createObjectURL(f));
    setResult(null);
  }, []);

  const handleExamChange = useCallback((id: string) => {
    setExamId(id);
    setImageType('');
    setResult(null);
  }, []);

  const handleImageTypeChange = useCallback((type: string) => {
    setImageType(type);
    setResult(null);
  }, []);

  const requirement =
    examId && imageType ? exams[examId]?.images[imageType] : null;

  const canResize = file && examId && imageType && requirement && !processing;

  const handleResize = useCallback(async () => {
    if (!file || !requirement) return;
    setProcessing(true);
    try {
      const res = await resizeImage(file, requirement);
      setResult(res);
      toast({
        title: 'Image resized successfully',
        description: `${res.width}×${res.height} px • ${res.sizeKB.toFixed(1)} KB`,
      });
    } catch {
      toast({
        title: 'Resize failed',
        description: 'Please try a different image.',
        variant: 'destructive',
      });
    } finally {
      setProcessing(false);
    }
  }, [file, requirement, toast]);

  const handleDownload = useCallback(() => {
    if (!result) return;
    const a = document.createElement('a');
    a.href = result.dataUrl;
    const ext = requirement?.format === 'png' ? 'png' : 'jpg';
    a.download = `${exams[examId]?.name || 'resized'}_${imageType}.${ext}`;
    a.click();
  }, [result, requirement, examId, imageType]);

  const handleReset = useCallback(() => {
    setFile(null);
    setOriginalUrl('');
    setExamId('');
    setImageType('');
    setResult(null);
  }, []);

  return (
    <div className='min-h-screen flex flex-col'>
      {/* Header */}
      <header className='border-b py-4 px-4'>
        <div className='max-w-5xl mx-auto'>
          <h1 className='text-lg font-semibold tracking-tight text-foreground'>
            Exam Image Resizer
          </h1>
        </div>
      </header>

      {/* Main */}
      <main className='flex-1 px-4 py-8'>
        <div className='max-w-5xl mx-auto flex flex-col gap-8'>
          {/* Hero - only when no file */}
          <AnimatePresence>
            {!file && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className='text-center space-y-2'
              >
                <h2 className='text-2xl sm:text-3xl font-semibold tracking-tight text-balance text-foreground'>
                  Government Exam Image &amp; Signature Resizer
                </h2>
                <p className='text-muted-foreground text-pretty max-w-lg mx-auto'>
                  Instantly resize your photo and signature to the exact
                  requirements for any government exam.
                </p>
                <div className='flex flex-wrap justify-center gap-2 pt-2'>
                  {examList.slice(0, 5).map(id => (
                    <span
                      key={id}
                      className='text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground font-medium'
                    >
                      {exams[id].name}
                    </span>
                  ))}
                  <span className='text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground font-medium'>
                    +{examList.length - 5} more
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Card */}
          <Card className='rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,.05),0_1px_2px_0_rgba(0,0,0,.05)] p-6 space-y-6'>
            <AnimatePresence mode='wait'>
              {!file ? (
                <UploadBox key='upload' onFileSelect={handleFileSelect} />
              ) : (
                <motion.div
                  key='editor'
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                  className='space-y-6'
                >
                  {/* Selectors */}
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <ExamSelector value={examId} onChange={handleExamChange} />
                    {examId && (
                      <ImageTypeSelector
                        examId={examId}
                        value={imageType}
                        onChange={handleImageTypeChange}
                      />
                    )}
                  </div>

                  {/* Requirements badge */}
                  {requirement && (
                    <div className='flex flex-wrap gap-3 text-sm text-muted-foreground tabular-nums'>
                      <span>
                        {requirement.width} × {requirement.height} px
                      </span>
                      <span>
                        {requirement.minSizeKB}–{requirement.maxSizeKB} KB
                      </span>
                      <span className='uppercase'>{requirement.format}</span>
                    </div>
                  )}

                  {/* Preview */}
                  <PreviewPanel
                    originalUrl={originalUrl}
                    result={result}
                    requirement={requirement}
                  />

                  {/* Actions */}
                  <div className='flex flex-wrap gap-3'>
                    {!result ? (
                      <Button
                        onClick={handleResize}
                        disabled={!canResize}
                        className='h-12 px-6 rounded-lg font-semibold active:scale-[0.98] transition-transform'
                      >
                        {processing && (
                          <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                        )}
                        {processing ? 'Resizing...' : 'Resize & Download'}
                      </Button>
                    ) : (
                      <>
                        <Button
                          onClick={handleDownload}
                          className='h-12 px-6 rounded-lg font-semibold active:scale-[0.98] transition-transform'
                        >
                          <Download className='w-4 h-4 mr-2' />
                          Download
                        </Button>
                        <Button
                          variant='outline'
                          onClick={handleReset}
                          className='h-12 px-6 rounded-lg font-semibold'
                        >
                          <RotateCcw className='w-4 h-4 mr-2' />
                          Start Over
                        </Button>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>

          {/* Privacy notice */}
          <p className='text-xs text-center text-muted-foreground'>
            Your images are processed in your browser and never stored on our
            servers.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
