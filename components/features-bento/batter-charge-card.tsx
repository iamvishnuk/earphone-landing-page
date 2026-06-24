'use client';

import { Battery, Info, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

const BatteryChargeCard = () => {
  // 2. Battery Card State
  const [batteryPct, setBatteryPct] = useState(85);
  const [isBatteryHovered, setIsBatteryHovered] = useState(false);

  // Battery charging count-up simulation on hover
  useEffect(() => {
    if (isBatteryHovered) {
      setBatteryPct(0);
      let current = 0;
      const duration = 1000; // 1s
      const stepTime = 10;
      const totalSteps = duration / stepTime;
      const increment = 100 / totalSteps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= 100) {
          setBatteryPct(100);
          clearInterval(timer);
        } else {
          setBatteryPct(Math.floor(current));
        }
      }, stepTime);

      return () => clearInterval(timer);
    } else {
      // Animate back down to a realistic baseline
      let current = 100;
      const timer = setInterval(() => {
        current -= 1.5;
        if (current <= 85) {
          setBatteryPct(85);
          clearInterval(timer);
        } else {
          setBatteryPct(Math.floor(current));
        }
      }, 10);
      return () => clearInterval(timer);
    }
  }, [isBatteryHovered]);
  return (
    <div
      onMouseEnter={() => setIsBatteryHovered(true)}
      onMouseLeave={() => setIsBatteryHovered(false)}
      className='col-span-1 flex flex-col justify-between overflow-hidden border border-neutral-800/80 bg-neutral-900/20 p-5 transition-all duration-300 hover:border-orange-500/20 hover:bg-neutral-900/30 sm:p-6'
    >
      <div>
        <span className='font-saira text-xs font-semibold tracking-widest text-neutral-500 uppercase'>
          Power Cell
        </span>
        <h3 className='font-saira mt-2 text-xl font-bold tracking-tight sm:text-2xl'>
          Battery Endurance
        </h3>
        <p className='font-inter mt-1.5 text-xs text-neutral-400'>
          Hover to connect charger. Experience the high-density fast charging
          simulation.
        </p>
      </div>

      {/* Interactive charging animation */}
      <div className='my-6 flex items-center justify-center gap-6 py-4'>
        {/* Circular progress bar */}
        <div className='relative flex h-24 w-24 items-center justify-center'>
          <svg
            className='h-full w-full'
            viewBox='0 0 100 100'
            style={{ transform: 'rotate(-90deg)' }}
          >
            <circle
              cx='50'
              cy='50'
              r='42'
              fill='transparent'
              stroke='#1c1917'
              strokeWidth='6'
            />
            <circle
              cx='50'
              cy='50'
              r='42'
              fill='transparent'
              stroke={isBatteryHovered ? '#f97316' : '#22c55e'}
              strokeWidth='6'
              strokeDasharray='263.89'
              strokeDashoffset={263.89 - (263.89 * batteryPct) / 100}
              strokeLinecap='round'
              className='transition-all duration-300 ease-out'
            />
          </svg>
          {/* Inner content */}
          <div className='absolute flex flex-col items-center justify-center text-center'>
            <span className='font-saira text-2xl font-bold tracking-tighter'>
              {batteryPct}%
            </span>
            <span className='font-mono text-[8px] font-bold tracking-widest text-neutral-500 uppercase'>
              {isBatteryHovered ? 'Charging' : 'Ready'}
            </span>
          </div>
        </div>

        {/* Sparkles / status list */}
        <div className='flex flex-col gap-1.5'>
          <div className='flex items-center gap-1.5'>
            <Zap
              className={`h-4 w-4 ${isBatteryHovered ? 'animate-pulse text-orange-500' : 'text-neutral-500'}`}
            />
            <span className='font-mono text-xs text-neutral-300'>
              {isBatteryHovered ? 'Fast Charge' : 'Normal'}
            </span>
          </div>
          <div className='flex items-center gap-1.5'>
            <Battery className='h-4 w-4 text-green-500' />
            <span className='font-mono text-xs text-neutral-300'>
              32H Reserve
            </span>
          </div>
        </div>
      </div>

      <div>
        <div className='flex items-center justify-between border-t border-neutral-800/60 pt-3.5 text-xs text-neutral-500'>
          <div className='flex items-center gap-1'>
            <Info className='h-3 w-3 text-orange-500' />
            <span>10m Charge = 5h Playback</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatteryChargeCard;
