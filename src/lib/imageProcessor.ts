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
  let sourceImg: CanvasImageSource = img;
  let sourceW = img.width;
  let sourceH = img.height;

  // Step-down scaling to prevent jagged edges if scaling down significantly
  while (sourceW / 2 >= requirement.width && sourceH / 2 >= requirement.height) {
    const tempCanvas = document.createElement('canvas');
    const newW = Math.floor(sourceW / 2);
    const newH = Math.floor(sourceH / 2);
    tempCanvas.width = newW;
    tempCanvas.height = newH;
    
    const tCtx = tempCanvas.getContext('2d')!;
    tCtx.imageSmoothingEnabled = true;
    tCtx.imageSmoothingQuality = 'high';
    tCtx.drawImage(sourceImg, 0, 0, newW, newH);
    
    sourceImg = tempCanvas;
    sourceW = newW;
    sourceH = newH;
  }

  const canvas = document.createElement('canvas');
  canvas.width = requirement.width;
  canvas.height = requirement.height;

  const ctx = canvas.getContext('2d')!;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // Cover crop: scale to fill, then center-crop
  const scale = Math.max(
    requirement.width / sourceW,
    requirement.height / sourceH
  );
  const scaledW = sourceW * scale;
  const scaledH = sourceH * scale;
  const offsetX = (requirement.width - scaledW) / 2;
  const offsetY = (requirement.height - scaledH) / 2;

  const mimeType = requirement.format === 'png' ? 'image/png' : 'image/jpeg';

  // Draw white background mainly for JPEGs to prevent black background on transparent images
  if (mimeType !== 'image/png') {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.drawImage(sourceImg, offsetX, offsetY, scaledW, scaledH);

  // Search for the optimal quality to hit target file size
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
  let smallestBlob: Blob | null = null;

  // Step-down quality scan to find the actual maximum quality that fits
  for (let q = 1.0; q >= 0.05; q -= 0.05) {
    const quality = Math.round(q * 100) / 100;
    const blob = await canvasToBlob(canvas, mimeType, quality);
    const sizeKB = blob.size / 1024;

    if (!smallestBlob || blob.size < smallestBlob.size) {
      smallestBlob = blob; // Track smallest in case we NEVER meet the requirement
    }
    
    if (sizeKB <= maxSizeKB) {
      // We found a rough fit! Refine it for the absolute maximum quality.
      let bestFit = blob;
      for (let refineQ = quality + 0.04; refineQ > quality; refineQ -= 0.01) {
        const rQuality = Math.round(refineQ * 100) / 100;
        const rBlob = await canvasToBlob(canvas, mimeType, rQuality);
        if (rBlob.size / 1024 <= maxSizeKB) {
          return rBlob; 
        }
      }
      return bestFit;
    }
  }

  // If we couldn't meet the target size even at the lowest quality, return the smallest we got
  return smallestBlob!;
}
