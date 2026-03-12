import { exams } from '@/config/exams';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ExamSelectorProps {
  value: string;
  onChange: (examId: string) => void;
}

const ExamSelector = ({ value, onChange }: ExamSelectorProps) => {
  return (
    <div className='space-y-2'>
      <label className='text-xs font-medium uppercase tracking-wider text-muted-foreground'>
        Select Exam
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className='h-12 rounded-lg'>
          <SelectValue placeholder='Choose an exam...' />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(exams).map(([id, exam]) => (
            <SelectItem key={id} value={id}>
              {exam.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ExamSelector;
