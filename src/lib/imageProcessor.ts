import type { ImageRequirement } from '@/types/exam';

export interface ResizeResult {
  blob: Blob;
  width: number;
  height: number;
  sizeKB: number;
  dataUrl: string;
}

export async function resizeImage(
  file: File,
  requirement: ImageRequirement
): Promise<ResizeResult> {
  const img = await loadImage(file);
  const canvas = document.createElement('canvas');
  canvas.width = requirement.width;
  canvas.height = requirement.height;

  const ctx = canvas.getContext('2d')!;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // Cover crop: scale to fill, then center-crop
  const scale = Math.max(
    requirement.width / img.width,
    requirement.height / img.height
  );
  const scaledW = img.width * scale;
  const scaledH = img.height * scale;
  const offsetX = (requirement.width - scaledW) / 2;
  const offsetY = (requirement.height - scaledH) / 2;

  ctx.drawImage(img, offsetX, offsetY, scaledW, scaledH);

  const mimeType = requirement.format === 'png' ? 'image/png' : 'image/jpeg';

  // Binary search for quality to hit target file size
  let blob: Blob;
  if (mimeType === 'image/png') {
    blob = await canvasToBlob(canvas, mimeType, 1);
  } else {
    blob = await compressToTargetSize(canvas, mimeType, requirement.maxSizeKB);
  }

  const dataUrl = URL.createObjectURL(blob);
  const sizeKB = blob.size / 1024;

  return {
    blob,
    width: requirement.width,
    height: requirement.height,
    sizeKB,
    dataUrl,
  };
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      blob => {
        if (blob) resolve(blob);
        else reject(new Error('Failed to create blob'));
      },
      type,
      quality
    );
  });
}

async function compressToTargetSize(
  canvas: HTMLCanvasElement,
  mimeType: string,
  maxSizeKB: number
): Promise<Blob> {
  let lo = 0.1;
  let hi = 1.0;
  let bestBlob = await canvasToBlob(canvas, mimeType, hi);

  // If already under limit at max quality, return
  if (bestBlob.size / 1024 <= maxSizeKB) return bestBlob;

  // Binary search for 10 iterations
  for (let i = 0; i < 10; i++) {
    const mid = (lo + hi) / 2;
    const blob = await canvasToBlob(canvas, mimeType, mid);
    const sizeKB = blob.size / 1024;

    if (sizeKB <= maxSizeKB) {
      bestBlob = blob;
      lo = mid;
    } else {
      hi = mid;
    }
  }

  return bestBlob;
}
