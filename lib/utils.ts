import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Help functions for ANC wave path calculation
export const getSinePath = (
  amplitude: number,
  frequency: number,
  phase: number,
  width: number,
  height: number,
  noise = 0
): string => {
  const points = [];
  const midY = height / 2;
  for (let x = 0; x <= width; x += 3) {
    const angle = (x / width) * Math.PI * 2 * frequency + phase;
    let y = midY + Math.sin(angle) * amplitude;
    if (noise > 0) {
      y += Math.sin(angle * 2.3) * noise * 0.45;
      y += Math.cos(angle * 4.7) * noise * 0.25;
    }
    points.push(`${x},${y}`);
  }
  return `M ${points.join(' L ')}`;
};
