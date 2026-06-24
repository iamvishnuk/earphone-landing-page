'use client';

interface VerticalSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

export function VerticalSlider({
  label,
  value,
  onChange,
  className = ''
}: VerticalSliderProps) {
  return (
    <div className={`relative flex h-44 flex-col items-center gap-14 ${className}`}>
      <div className='mt-16 flex h-1.5 rotate-270 items-center'>
        <input
          type='range'
          min='0'
          max='100'
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className='h-full w-full cursor-pointer appearance-none rounded-lg bg-neutral-800 accent-orange-500 focus:outline-none'
        />
      </div>
      <div className='z-10 mt-auto flex flex-col items-center pt-2'>
        <span className='font-saira text-xs font-semibold text-neutral-300'>
          {label}
        </span>
        <span className='mt-0.5 font-mono text-[10px] text-orange-500'>
          {value}%
        </span>
      </div>
    </div>
  );
}
