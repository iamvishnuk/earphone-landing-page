'use client';

import { motion } from 'motion/react';

interface EqCurveGraphProps {
  bass: number;
  mids: number;
  treble: number;
}

export function EqCurveGraph({ bass, mids, treble }: EqCurveGraphProps) {
  // Generate SVG path for the frequency curve
  const width = 600;
  const height = 240;
  const midY = height / 2;

  // Map slider values (0-100) to SVG Y-coordinates (where 240 is bottom, 0 is top)
  const yBass = height - 30 - (bass / 100) * 180;
  const yMids = height - 30 - (mids / 100) * 180;
  const yTreble = height - 30 - (treble / 100) * 180;

  // Bezier curve segments connecting the points
  const pathStr = `M 0 ${midY} C 70 ${midY}, 100 ${yBass}, 160 ${yBass} C 220 ${yBass}, 260 ${yMids}, 300 ${yMids} C 340 ${yMids}, 380 ${yTreble}, 440 ${yTreble} C 500 ${yTreble}, 530 ${midY}, 600 ${midY}`;
  const fillPathStr = `${pathStr} L 600 ${height} L 0 ${height} Z`;

  return (
    <div className='relative my-8 flex items-center justify-center overflow-hidden rounded-xl border border-neutral-800/50 bg-black/40 p-4'>
      {/* Frequency Bands Markers */}
      <div className='pointer-events-none absolute inset-0 flex justify-between px-[16%] opacity-20'>
        <div className='h-full w-px border-dashed border-neutral-700 bg-white' />
        <div className='h-full w-px border-dashed border-neutral-700 bg-white' />
        <div className='h-full w-px border-dashed border-neutral-700 bg-white' />
      </div>

      {/* dB Grid Horizontal Lines */}
      <div className='pointer-events-none absolute inset-0 flex flex-col justify-between py-[12%] opacity-15'>
        <div className='h-px w-full bg-white' />
        <div className='h-px w-full bg-white' />
        <div className='h-px w-full bg-white' />
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className='relative z-10 h-full w-full overflow-visible object-contain'
      >
        <defs>
          <linearGradient
            id='eq-gradient'
            x1='0'
            y1='0'
            x2='0'
            y2='1'
          >
            <stop
              offset='0%'
              stopColor='#f97316'
              stopOpacity='0.25'
            />
            <stop
              offset='100%'
              stopColor='#f97316'
              stopOpacity='0'
            />
          </linearGradient>
        </defs>

        {/* Area under the curve */}
        <motion.path
          animate={{ d: fillPathStr }}
          transition={{ type: 'spring', stiffness: 70, damping: 14 }}
          fill='url(#eq-gradient)'
        />

        {/* Glowing response path curve */}
        <motion.path
          animate={{ d: pathStr }}
          transition={{ type: 'spring', stiffness: 70, damping: 14 }}
          fill='none'
          stroke='#f97316'
          strokeWidth='3.5'
        />

        {/* Control points handles */}
        {/* Bass Handle */}
        <motion.circle
          animate={{ cy: yBass }}
          transition={{ type: 'spring', stiffness: 70, damping: 14 }}
          cx='160'
          r='6.5'
          fill='#ffffff'
          stroke='#f97316'
          strokeWidth='3'
          className='cursor-pointer'
          whileHover={{ scale: 1.4 }}
        />

        {/* Mids Handle */}
        <motion.circle
          animate={{ cy: yMids }}
          transition={{ type: 'spring', stiffness: 70, damping: 14 }}
          cx='300'
          r='6.5'
          fill='#ffffff'
          stroke='#f97316'
          strokeWidth='3'
          className='cursor-pointer'
          whileHover={{ scale: 1.4 }}
        />

        {/* Treble Handle */}
        <motion.circle
          animate={{ cy: yTreble }}
          transition={{ type: 'spring', stiffness: 70, damping: 14 }}
          cx='440'
          r='6.5'
          fill='#ffffff'
          stroke='#f97316'
          strokeWidth='3'
          className='cursor-pointer'
          whileHover={{ scale: 1.4 }}
        />
      </svg>

      {/* Labels on the graph */}
      <div className='pointer-events-none absolute bottom-1.5 left-0 flex w-full justify-between px-6 font-mono text-[6px] tracking-wider text-neutral-500 uppercase sm:text-[9px]'>
        <span>Bass (20Hz - 250Hz)</span>
        <span>Midrange (250Hz - 4kHz)</span>
        <span>Treble (4kHz - 20kHz)</span>
      </div>

      <div className='pointer-events-none absolute top-3 left-3 font-mono text-[9px] text-neutral-500 uppercase'>
        +12 dB
      </div>
      <div className='pointer-events-none absolute top-[48%] left-3 font-mono text-[9px] text-neutral-600 uppercase'>
        0 dB
      </div>
      <div className='pointer-events-none absolute bottom-5 left-3 font-mono text-[9px] text-neutral-500 uppercase'>
        -12 dB
      </div>
    </div>
  );
}
