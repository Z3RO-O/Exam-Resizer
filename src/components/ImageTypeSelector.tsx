import { exams } from '@/config/exams';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ImageTypeSelectorProps {
  examId: string;
  value: string;
  onChange: (imageType: string) => void;
}

const imageTypeLabels: Record<string, string> = {
  photo: 'Photo',
  signature: 'Signature',
  thumb: 'Thumb Impression',
};

const ImageTypeSelector = ({
  examId,
  value,
  onChange,
}: ImageTypeSelectorProps) => {
  const exam = exams[examId];
  if (!exam) return null;

  const imageTypes = Object.keys(exam.images);

  return (
    <div className='space-y-2'>
      <label className='text-xs font-medium uppercase tracking-wider text-muted-foreground'>
        Image Type
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className='h-12 rounded-lg'>
          <SelectValue placeholder='Choose image type...' />
        </SelectTrigger>
        <SelectContent>
          {imageTypes.map(type => (
            <SelectItem key={type} value={type}>
              {imageTypeLabels[type] || type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ImageTypeSelector;
