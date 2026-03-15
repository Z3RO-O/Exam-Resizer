import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Download, RotateCcw, Heart, Github } from 'lucide-react';
import { toast } from 'sonner';
import { exams } from '@/config/exams';
import { resizeImage, type ResizeResult } from '@/lib/imageProcessor';
import UploadBox from '@/components/UploadBox';
import ExamSelector from '@/components/ExamSelector';
import ImageTypeSelector from '@/components/ImageTypeSelector';
import PreviewPanel from '@/components/PreviewPanel';
import { Badge } from '@/components/ui/badge';

const examList = Object.keys(exams);

const Index = () => {
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
      toast.success('Image resized successfully', {
        description: `${res.width}×${res.height} px • ${res.sizeKB.toFixed(1)} KB`,
      });
    } catch {
      toast.error('Resize failed', {
        description: 'Please try a different image.',
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
      <main className='flex-1 px-4 py-8 flex flex-col'>
        <div className='max-w-5xl mx-auto flex-1 flex flex-col gap-8 w-full'>
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
                    <Badge key={id} variant='secondary'>
                      {exams[id].name}
                    </Badge>
                  ))}
                  <Badge variant='secondary'>+{examList.length - 5} more</Badge>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Card */}
          <Card className='rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,.05),0_1px_2px_0_rgba(0,0,0,.05)] p-6 flex-1 flex flex-col'>
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
                  className='flex-1 flex flex-col gap-6'
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
                        {requirement.width && requirement.height
                          ? `${requirement.width} × ${requirement.height} px`
                          : 'Original Dimensions'}
                      </span>
                      <span>
                        {requirement.minSizeKB}–{requirement.maxSizeKB} KB
                      </span>
                      <span className='uppercase'>
                        {requirement.format ?? 'jpeg'}
                      </span>
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
        </div>
      </main>
      <footer className='flex flex-col items-center justify-center p-3 gap-2 border-t'>
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
      </footer>
    </div>
  );
};

export default Index;
