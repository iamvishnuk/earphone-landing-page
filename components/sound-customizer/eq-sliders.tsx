'use client';

import { RotateCcw } from 'lucide-react';
import { VerticalSlider } from './vertical-slider';

interface EqSlidersProps {
  bass: number;
  setBass: (value: number) => void;
  mids: number;
  setMids: (value: number) => void;
  treble: number;
  setTreble: (value: number) => void;
  onReset: () => void;
}

export function EqSliders({
  bass,
  setBass,
  mids,
  setMids,
  treble,
  setTreble,
  onReset
}: EqSlidersProps) {
  return (
    <div className='flex grow flex-col justify-between border border-neutral-800/80 bg-neutral-900/10 p-5 sm:p-6'>
      <div>
        <span className='font-saira text-xs font-semibold tracking-widest text-neutral-500 uppercase'>
          Hardware Levels
        </span>
        <h3 className='font-saira mt-1.5 text-xl font-bold tracking-tight'>
          Fine-Tuning
        </h3>
      </div>

      {/* Vertical sliders track layout */}
      <div className='flex items-center justify-between gap-4 px-4 py-8'>
        <VerticalSlider label='Bass' value={bass} onChange={setBass} />
        <VerticalSlider label='Mids' value={mids} onChange={setMids} />
        <VerticalSlider label='Treble' value={treble} onChange={setTreble} />
      </div>

      <button
        onClick={onReset}
        className='flex w-full cursor-pointer items-center justify-center gap-2 border border-neutral-800 bg-neutral-950/40 py-2.5 text-xs text-neutral-400 transition-colors duration-300 hover:border-neutral-700 hover:bg-orange-500 hover:text-white'
      >
        <RotateCcw className='h-3.5 w-3.5' />
        Reset to Signature
      </button>
    </div>
  );
}
