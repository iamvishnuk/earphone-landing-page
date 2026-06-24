'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { getSinePath } from '@/lib/utils';

const ActiveNoiseCancellationCard = () => {
  const [ancLevel, setAncLevel] = useState(80);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    let animId: number;
    const updatePhase = () => {
      setPhase((p) => (p + 0.07) % (Math.PI * 2));
      animId = requestAnimationFrame(updatePhase);
    };
    animId = requestAnimationFrame(updatePhase);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Calculate parameters for ANC waves
  const waveWidth = 320;
  const waveHeight = 80;
  const rawNoiseAmplitude = ((100 - ancLevel) / 100) * 22;
  const rawNoiseChaos = ((100 - ancLevel) / 100) * 6;

  // Active Cancellation generates opposite sine wave
  const noiseWave = getSinePath(
    rawNoiseAmplitude,
    4,
    phase,
    waveWidth,
    waveHeight,
    rawNoiseChaos
  );
  const antiNoiseWave = getSinePath(
    rawNoiseAmplitude,
    4,
    phase + Math.PI,
    waveWidth,
    waveHeight,
    rawNoiseChaos
  );

  // Resulting quiet line wave
  const resultAmplitude =
    ancLevel === 100 ? 0.8 : Math.max(0.8, 25 - (ancLevel / 100) * 25);
  const resultChaos = ancLevel === 100 ? 0 : Math.max(0, rawNoiseChaos * 0.1);
  const quietedWave = getSinePath(
    resultAmplitude,
    3.5,
    phase * 1.3,
    waveWidth,
    waveHeight,
    resultChaos
  );

  // Descriptive text for ANC
  const getAncModeText = () => {
    if (ancLevel === 100)
      return 'Silence: Max isolation achieved. -48dB attenuation';
    if (ancLevel > 70) return 'Smart ANC: High-frequency isolation active';
    if (ancLevel > 30) return 'Awareness: Medium environmental pass-through';
    if (ancLevel > 0) return 'Low ANC: Minimal dampening';
    return 'ANC Off: Ambient transparency active';
  };

  return (
    <div className='col-span-1 flex flex-col justify-between overflow-hidden border border-neutral-800/80 bg-neutral-900/20 p-5 transition-all duration-300 hover:border-orange-500/20 hover:bg-neutral-900/30 sm:p-6 md:col-span-2'>
      <div>
        <div className='flex items-center justify-between'>
          <span className='font-saira text-xs font-semibold tracking-widest text-neutral-500 uppercase'>
            Isolation Module
          </span>
          <span className='flex items-center gap-1.5 text-xs font-semibold text-orange-500'>
            {ancLevel === 100 ? (
              <VolumeX className='size-5' />
            ) : (
              <Volume2 className='size-5' />
            )}
            {ancLevel === 100 ? 'SILENT' : `ANC: ${ancLevel}%`}
          </span>
        </div>
        <h3 className='font-saira mt-2 text-xl font-bold tracking-tight sm:text-2xl'>
          Active Noise Cancellation
        </h3>
        <p className='font-inter mt-1.5 text-xs text-neutral-400 sm:text-sm'>
          Adjust the slider to simulate cancelling ambient noise. Watch the
          red/blue waveforms collapse into silence.
        </p>
      </div>

      {/* Wave Visualizer Container */}
      <div className='relative my-8 flex h-24 items-center justify-center overflow-hidden rounded-xl border border-neutral-800/50 bg-black/40 p-2'>
        <svg
          viewBox={`0 0 ${waveWidth} ${waveHeight}`}
          className='h-full w-full overflow-visible object-contain'
        >
          {/* Grid Lines */}
          <line
            x1='0'
            y1={waveHeight / 2}
            x2={waveWidth}
            y2={waveHeight / 2}
            stroke='#222'
            strokeWidth='1'
            strokeDasharray='4,4'
          />

          {/* Sound waves overlay */}
          <AnimatePresence>
            {ancLevel < 95 && (
              <>
                {/* Noise wave (Red-orange) */}
                <motion.path
                  d={noiseWave}
                  fill='none'
                  stroke='rgba(249, 115, 22, 0.4)'
                  strokeWidth='1.8'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                {/* Anti-noise wave (Cyan/Blue) */}
                <motion.path
                  d={antiNoiseWave}
                  fill='none'
                  stroke='rgba(59, 130, 246, 0.35)'
                  strokeWidth='1.8'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              </>
            )}
          </AnimatePresence>

          {/* Quieted output wave (White/Orange mix) */}
          <path
            d={quietedWave}
            fill='none'
            stroke={ancLevel === 100 ? '#f97316' : '#ffffff'}
            strokeWidth={ancLevel === 100 ? '2' : '2.2'}
            className='transition-all duration-300'
          />
        </svg>

        {/* Glowing active text indicator */}
        <div className='absolute right-2.5 bottom-1 font-mono text-[9px] tracking-widest text-neutral-500 uppercase'>
          Anti-Phase Output
        </div>
      </div>

      <div>
        <input
          type='range'
          min='0'
          max='100'
          value={ancLevel}
          onChange={(e) => setAncLevel(Number(e.target.value))}
          className='h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-neutral-800 accent-orange-500 focus:outline-none'
        />
        <div className='mt-2 flex items-center justify-between'>
          <span className='text-left font-mono text-[10px] tracking-wider text-neutral-500 uppercase'>
            0% Transp.
          </span>
          <span className='font-inter text-xs text-neutral-300 italic transition-all duration-200'>
            {getAncModeText()}
          </span>
          <span className='text-right font-mono text-[10px] tracking-wider text-neutral-500 uppercase'>
            100% Silent
          </span>
        </div>
      </div>
    </div>
  );
};

export default ActiveNoiseCancellationCard;
