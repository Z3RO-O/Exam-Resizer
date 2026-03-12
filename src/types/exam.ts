export interface ImageRequirement {
  width: number;
  height: number;
  minSizeKB: number;
  maxSizeKB: number;
  format: 'jpeg' | 'png';
}

export interface ExamConfig {
  name: string;
  images: Record<string, ImageRequirement>;
}
