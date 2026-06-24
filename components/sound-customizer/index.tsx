'use client';

import { useState, useEffect } from 'react';
import { Preset, PRESETS } from '@/lib/data';
import { EqCurveGraph } from './eq-curve-graph';
import { SpectrumAnalyzer } from './spectrum-analyzer';
import { EqSliders } from './eq-sliders';
import { PresetsPanel } from './presets-panel';

export default function SoundCustomizer() {
  const [bass, setBass] = useState(88);
  const [mids, setMids] = useState(45);
  const [treble, setTreble] = useState(65);
  const [activePreset, setActivePreset] = useState<string>('Signature Bass');

  // Handle preset clicks
  const applyPreset = (preset: Preset) => {
    setActivePreset(preset.name);
    // Smoothly set the state values
    setBass(preset.bass);
    setMids(preset.mids);
    setTreble(preset.treble);
  };

  // If the user manually shifts sliders, clear the active preset highlight if it doesn't match
  useEffect(() => {
    const matchingPreset = PRESETS.find(
      (p) => p.bass === bass && p.mids === mids && p.treble === treble
    );
    if (matchingPreset) {
      setActivePreset(matchingPreset.name);
    } else {
      setActivePreset('');
    }
  }, [bass, mids, treble]);

  return (
    <section className='max-w-9xl relative mx-auto mb-20 flex w-[97%] flex-col overflow-hidden rounded-[25px] bg-black p-6 text-white [corner-shape:bevel] sm:p-8 md:p-12'>
      {/* Radial aura glow */}
      <div className='pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_30%_80%,rgba(249,115,22,0.06),transparent_50%)]' />

      {/* Header */}
      <div className='relative z-10 flex flex-col items-start justify-between gap-4 border-b border-neutral-800/80 pb-6 md:flex-row md:items-center md:pb-8'>
        <h2 className='font-saira mt-3 text-3xl font-bold tracking-wider sm:text-4xl md:text-5xl'>
          SOUND CUSTOMIZER
        </h2>
        <p className='font-inter max-w-sm text-left text-xs leading-relaxed text-neutral-400 md:text-right md:text-sm'>
          Shape your sound. Adjust frequency response nodes or select acoustic
          presets to calibrate the Model XRS drivers.
        </p>
      </div>

      {/* Workspace Grid */}
      <div className='relative z-10 mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12'>
        {/* Left Column: EQ curve visualizer */}
        <div className='flex flex-col justify-between border border-neutral-800/80 bg-neutral-900/10 p-5 sm:p-6 lg:col-span-8'>
          <div>
            <div className='flex items-center justify-between'>
              <span className='font-saira text-left text-xs font-semibold tracking-widest text-neutral-500 uppercase'>
                Frequency Response Curve
              </span>
              <span className='text-right font-mono text-xs tracking-widest text-orange-500 uppercase'>
                Active Profile: {activePreset || 'Custom EQ'}
              </span>
            </div>
            <p className='font-inter mt-1.5 text-xs text-neutral-400'>
              The curve represents decibel output (dB) across low (bass), middle
              (vocals), and high (treble) frequencies.
            </p>
          </div>

          {/* SVG EQ Curve Graph */}
          <EqCurveGraph
            bass={bass}
            mids={mids}
            treble={treble}
          />

          {/* Simulated spectrum analyzer */}
          <SpectrumAnalyzer
            bass={bass}
            mids={mids}
            treble={treble}
          />
        </div>

        {/* Right Column: Controls, sliders, and presets */}
        <div className='flex flex-col gap-6 lg:col-span-4'>
          {/* Sliders Panel */}
          <EqSliders
            bass={bass}
            setBass={setBass}
            mids={mids}
            setMids={setMids}
            treble={treble}
            setTreble={setTreble}
            onReset={() => applyPreset(PRESETS[0])}
          />

          {/* Presets Selection Panel */}
          <PresetsPanel
            activePreset={activePreset}
            onApplyPreset={applyPreset}
          />
        </div>
      </div>
    </section>
  );
}
