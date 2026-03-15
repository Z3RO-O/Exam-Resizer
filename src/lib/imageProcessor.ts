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

  const shouldResize = !!(requirement.width && requirement.height);
  const targetWidth = requirement.width ?? sourceW;
  const targetHeight = requirement.height ?? sourceH;

  if (shouldResize) {
    // Step-down scaling to prevent jagged edges if scaling down significantly
    while (sourceW / 2 >= targetWidth && sourceH / 2 >= targetHeight) {
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
  }

  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const ctx = canvas.getContext('2d')!;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // If resizing, use cover crop. If not, draw original.
  // Actually the cover crop logic works for both if targetWidth/Height = sourceW/H
  const scale = Math.max(targetWidth / sourceW, targetHeight / sourceH);
  const scaledW = sourceW * scale;
  const scaledH = sourceH * scale;
  const offsetX = (targetWidth - scaledW) / 2;
  const offsetY = (targetHeight - scaledH) / 2;

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
    width: targetWidth,
    height: targetHeight,
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
  let low = 0.05;
  let high = 1.0;
  let bestBlob: Blob | null = null;

  // Binary search for the highest quality that fits within maxSizeKB
  // Target a size that is 95% of the maxSizeKB to be safe but high quality
  const targetSize = maxSizeKB * 0.98;

  for (let i = 0; i < 8; i++) {
    const mid = (low + high) / 2;
    const blob = await canvasToBlob(canvas, mimeType, mid);
    const sizeKB = blob.size / 1024;

    if (sizeKB <= maxSizeKB) {
      bestBlob = blob;
      low = mid; // Try higher quality
      // If we are already very close to the target size, we can stop early
      if (sizeKB >= targetSize) break;
    } else {
      high = mid; // Need lower quality
    }
  }

  if (bestBlob) return bestBlob;

  // Final fallback: even at 0.05 it might be too large if the canvas is huge,
  // but for fixed exam dimensions this is unlikely.
  return await canvasToBlob(canvas, mimeType, 0.05);
}
