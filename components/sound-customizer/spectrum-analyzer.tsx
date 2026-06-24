'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Volume2 } from 'lucide-react';

interface SpectrumAnalyzerProps {
  bass: number;
  mids: number;
  treble: number;
}

export function SpectrumAnalyzer({
  bass,
  mids,
  treble
}: SpectrumAnalyzerProps) {
  // Animation values for the visualizer bars
  const [visualizerHeights, setVisualizerHeights] = useState<number[]>(
    Array(16).fill(10)
  );

  // Simulate active spectrum analyzer bars reacting to the EQ values
  useEffect(() => {
    const interval = setInterval(() => {
      setVisualizerHeights(() => {
        return Array(16)
          .fill(0)
          .map((_, index) => {
            // Left bars react to Bass, center to Mids, right to Treble
            let baseVal = 20;
            if (index < 5) {
              baseVal = (bass / 100) * 55;
            } else if (index < 11) {
              baseVal = (mids / 100) * 50;
            } else {
              baseVal = (treble / 100) * 60;
            }
            // Add some jitter for realistic waveform look
            const jitter = Math.random() * 15;
            return Math.max(5, Math.min(75, baseVal + jitter));
          });
      });
    }, 100);

    return () => clearInterval(interval);
  }, [bass, mids, treble]);

  return (
    <div className='flex items-center gap-4 rounded-xl border border-neutral-800/40 bg-neutral-950/40 p-3.5'>
      <Volume2 className='h-4 w-4 shrink-0 text-orange-500' />
      <div className='flex h-10 w-full items-end gap-1 overflow-hidden px-1'>
        {visualizerHeights.map((h, i) => (
          <motion.div
            key={i}
            animate={{ height: h }}
            transition={{ type: 'tween', duration: 0.1 }}
            className='w-full rounded-t-sm bg-orange-500/80 hover:bg-orange-400'
            style={{ minHeight: '4px' }}
          />
        ))}
      </div>
      <span className='hidden shrink-0 font-mono text-[9px] tracking-widest text-neutral-500 uppercase sm:block'>
        Spectrum Analyzer
      </span>
    </div>
  );
}
