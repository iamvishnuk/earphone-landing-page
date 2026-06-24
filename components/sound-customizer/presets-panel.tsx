'use client';

import { Sparkles } from 'lucide-react';
import { Preset, PRESETS } from '@/lib/data';

interface PresetsPanelProps {
  activePreset: string;
  onApplyPreset: (preset: Preset) => void;
}

export function PresetsPanel({
  activePreset,
  onApplyPreset
}: PresetsPanelProps) {
  // Info label for current settings
  const getPresetDescription = () => {
    const active = PRESETS.find((p) => p.name === activePreset);
    if (active) return active.description;
    return 'Custom equalizer profile. Tailor your listening experience.';
  };

  return (
    <div className='flex grow flex-col justify-between border border-neutral-800/80 bg-neutral-900/10 p-5 sm:p-6'>
      <div>
        <span className='font-saira text-xs font-semibold tracking-widest text-neutral-500 uppercase'>
          Sound Presets
        </span>
        <h3 className='font-saira mt-1.5 text-xl font-bold tracking-tight'>
          Acoustic Curves
        </h3>
      </div>

      {/* Presets Grid */}
      <div className='my-5 grid grid-cols-2 gap-2.5'>
        {PRESETS.map((preset) => (
          <button
            key={preset.name}
            onClick={() => onApplyPreset(preset)}
            className={`flex cursor-pointer flex-col items-start justify-between border p-3 text-left transition-all ${
              activePreset === preset.name
                ? 'border-orange-500 bg-orange-500/10 text-white'
                : 'border-neutral-800 bg-black/30 text-neutral-400 hover:border-neutral-700 hover:text-white'
            }`}
          >
            <span className='font-saira text-[11px] font-bold tracking-wider uppercase'>
              {preset.name}
            </span>
            <span className='mt-1 font-mono text-[8px] opacity-70'>
              {preset.bass}/{preset.mids}/{preset.treble}
            </span>
          </button>
        ))}
      </div>

      {/* Preset description info box */}
      <div className='flex items-center gap-2 border border-neutral-800/60 bg-black/40 p-3'>
        <Sparkles className='mt-0.5 h-4.5 w-4.5 shrink-0 text-orange-500' />
        <p className='font-inter text-[11px] leading-normal text-neutral-400'>
          {getPresetDescription()}
        </p>
      </div>
    </div>
  );
}
