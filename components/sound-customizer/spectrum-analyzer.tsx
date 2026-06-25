'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Volume2, Sparkles } from 'lucide-react';

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

  // Audio engine state
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const [playMode, setPlayMode] = useState<'scale' | 'slice'>('scale');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeHoverIndex, setActiveHoverIndex] = useState<number | null>(null);

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

  // Load and decode piano.mp3 on mount
  useEffect(() => {
    const AudioContextClass =
      window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) {
      console.warn('Web Audio API is not supported in this browser.');
      setIsLoading(false);
      return;
    }

    const ctx = new AudioContextClass();
    setAudioCtx(ctx);

    fetch('/audio/piano.mp3')
      .then((res) => {
        if (!res.ok) throw new Error('Audio file not found');
        return res.arrayBuffer();
      })
      .then((arrayBuffer) => ctx.decodeAudioData(arrayBuffer))
      .then((buffer) => {
        setAudioBuffer(buffer);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load piano.mp3:', err);
        setIsLoading(false);
      });

    return () => {
      if (ctx && ctx.state !== 'closed') {
        ctx.close().catch(console.error);
      }
    };
  }, []);

  const playNote = async (index: number) => {
    if (!audioCtx || !audioBuffer) return;

    try {
      if (audioCtx.state === 'suspended') {
        await audioCtx.resume();
      }
    } catch (e) {
      console.error('Failed to resume AudioContext:', e);
      return;
    }

    const source = audioCtx.createBufferSource();
    source.buffer = audioBuffer;

    const gainNode = audioCtx.createGain();
    source.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (playMode === 'scale') {
      // Piano notes major pentatonic scale offsets spanning 3 octaves
      const pentatonicOffsets = [
        -12,
        -10,
        -8,
        -5,
        -3, // Octave -1
        0,
        2,
        4,
        7,
        9, // Octave 0
        12,
        14,
        16,
        19,
        21,
        24 // Octave 1 & 2
      ];

      const offset = pentatonicOffsets[index];
      const pitchRatio = Math.pow(2, offset / 12);

      source.playbackRate.setValueAtTime(pitchRatio, now);

      // Start of clear note in piano.mp3 is 1.9s, natural decay 0.8s
      const sampleStart = 1.9;
      const sampleDuration = 0.8;

      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.25, now + 0.005);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + sampleDuration);

      const playbackDuration = sampleDuration / pitchRatio;
      source.start(now, sampleStart, sampleDuration);
      source.stop(now + playbackDuration);
    } else {
      // Timeline slice mode: split 6.06 seconds into 16 slices (~378ms each)
      const totalDuration = audioBuffer.duration;
      const sliceDuration = totalDuration / 16;
      const sampleStart = index * sliceDuration;

      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.25, now + 0.005);
      gainNode.gain.linearRampToValueAtTime(0.25, now + sliceDuration - 0.02);
      gainNode.gain.linearRampToValueAtTime(0.001, now + sliceDuration);

      source.start(now, sampleStart, sliceDuration);
      source.stop(now + sliceDuration);
    }
  };

  return (
    <div className='flex flex-col gap-3 rounded-xl border border-neutral-800/40 bg-neutral-950/40 p-4'>
      {/* Header controls */}
      <div className='flex flex-col gap-2 border-b border-neutral-800/20 pb-2.5 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex items-center gap-2'>
          <Volume2
            className={`h-4 w-4 shrink-0 transition-colors duration-300 ${
              isLoading ? 'animate-pulse text-neutral-600' : 'text-orange-500'
            }`}
          />
          <span className='font-mono text-[10px] font-semibold tracking-widest text-neutral-400 uppercase'>
            Spectrum visualizer
          </span>
          {isLoading ? (
            <span
              className='flex h-1.5 w-1.5 animate-pulse rounded-full bg-yellow-500'
              title='Loading audio...'
            />
          ) : (
            <span
              className='flex h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500'
              title='Sound board ready!'
            />
          )}
        </div>

        {/* Mode Selector */}
        <div className='flex w-fit items-center gap-1 rounded-lg border border-neutral-800/40 bg-neutral-900/60 p-0.5 text-[9px]'>
          <button
            onClick={() => setPlayMode('scale')}
            className={`cursor-pointer rounded px-2 py-0.5 font-mono font-medium tracking-wider uppercase transition-all duration-200 ${
              playMode === 'scale'
                ? 'bg-orange-500 text-black shadow-[0_0_8px_rgba(249,115,22,0.3)]'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Scale Mode
          </button>
          <button
            onClick={() => setPlayMode('slice')}
            className={`cursor-pointer rounded px-2 py-0.5 font-mono font-medium tracking-wider uppercase transition-all duration-200 ${
              playMode === 'slice'
                ? 'bg-orange-500 text-black shadow-[0_0_8px_rgba(249,115,22,0.3)]'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Slice Mode
          </button>
        </div>
      </div>

      {/* Visualizer bars */}
      <div className='relative flex h-14 w-full items-end gap-1.5 overflow-hidden px-1 py-1'>
        {visualizerHeights.map((h, i) => {
          const isHovered = activeHoverIndex === i;
          return (
            <motion.div
              key={i}
              onMouseEnter={() => {
                setActiveHoverIndex(i);
                playNote(i);
              }}
              onMouseLeave={() => {
                setActiveHoverIndex(null);
              }}
              animate={{
                height: h
              }}
              transition={{
                height: { type: 'tween', duration: 0.08 }
              }}
              className='relative w-full origin-bottom cursor-pointer rounded-t-[3px] bg-orange-500 transition-all hover:bg-orange-600'
              style={{ minHeight: '6px' }}
            >
              {isHovered && (
                <div className='absolute inset-x-0 top-0 h-[3px] rounded-t-[3px] bg-white' />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Footer information */}
      <div className='mt-0.5 flex items-center justify-between px-1 font-mono text-[7px] tracking-wider text-neutral-500 uppercase sm:text-[9px]'>
        <span className='text-left'>
          Hover bars left-to-right to sweep notes
        </span>
        <span className='text-right'>
          {isLoading ? (
            'Loading audio...'
          ) : (
            <span className='flex items-center gap-1 text-orange-500/80'>
              <Sparkles className='hidden h-2.5 w-2.5 sm:block' />
              {playMode === 'scale'
                ? 'Pentatonic Piano Scale'
                : 'Timeline Sprite Sheet'}
            </span>
          )}
        </span>
      </div>
    </div>
  );
}
