'use client';

import Image from 'next/image';
import { Send, ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className='max-w-9xl relative mx-auto mb-1 flex w-[97%] flex-col overflow-hidden rounded-b-[25px] border border-neutral-800/80 bg-black p-8 text-white [corner-shape:bevel] sm:p-10 md:p-12'>
      {/* Grid container */}
      <div className='relative z-10 grid grid-cols-1 gap-8 md:grid-cols-12'>
        {/* Brand details */}
        <div className='flex flex-col gap-4 md:col-span-4 lg:col-span-5'>
          <div className='group/logo flex w-fit cursor-pointer items-center gap-3'>
            <Image
              src='/earphone-logo.webp'
              alt='Model Earphone'
              width={16}
              height={18}
              className='object-contain transition-transform duration-300 group-hover/logo:scale-110 group-hover/logo:rotate-12'
              loading='lazy'
            />
            <span className='text-xs font-semibold tracking-widest text-white uppercase transition-colors duration-300 group-hover/logo:text-orange-500 sm:text-sm'>
              model ears
            </span>
          </div>
          <p className='font-inter max-w-[280px] text-xs leading-relaxed text-neutral-400'>
            Calibrated audio drivers crafted for creators, producers, and
            audiophiles.
          </p>
        </div>

        {/* Links Column */}
        <div className='flex flex-col gap-3 md:col-span-3 lg:col-span-3'>
          <span className='font-saira text-xs font-semibold tracking-widest text-neutral-500 uppercase'>
            Navigation
          </span>
          <ul className='font-inter flex flex-col gap-2 text-xs text-neutral-400'>
            {['Home', 'Products', 'Sound Tech', 'Features'].map((item) => (
              <li key={item}>
                <a
                  href='#'
                  className='relative inline-block transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-orange-500 after:transition-all after:duration-300 hover:text-orange-500 hover:after:w-full'
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Subscribe Column */}
        <div className='flex flex-col gap-3 md:col-span-5 lg:col-span-4'>
          <span className='font-saira text-xs font-semibold tracking-widest text-neutral-500 uppercase'>
            Stay Updated
          </span>
          <p className='font-inter text-xs leading-relaxed text-neutral-400'>
            Subscribe to receive firmware release details and sound presets
            alerts.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className='relative mt-1 flex items-center'
          >
            <input
              type='email'
              placeholder='Enter email'
              className='w-full rounded-lg border border-neutral-800 bg-neutral-900/60 py-2.5 pr-12 pl-4 text-xs text-white placeholder-neutral-500 transition-all duration-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none'
            />
            <button
              type='submit'
              className='group absolute right-1.5 rounded-md bg-orange-500 p-1.5 text-white transition-all duration-300 hover:scale-105 hover:bg-orange-600'
            >
              <Send className='h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
            </button>
          </form>
        </div>
      </div>

      {/* Divider */}
      <div className='relative z-10 my-8 border-t border-neutral-800/60' />

      {/* Bottom bar */}
      <div className='relative z-10 flex flex-col-reverse justify-between gap-6 sm:flex-row sm:items-center'>
        <span className='font-inter text-[10px] tracking-widest text-neutral-500 uppercase'>
          &copy; {new Date().getFullYear()} Model Ears. Crafted for excellence.
        </span>

        <div className='flex items-center gap-6'>
          {/* Social Links */}
          <div className='flex items-center gap-4 text-xs font-semibold tracking-widest text-neutral-500 uppercase'>
            {['Instagram', 'Twitter', 'YouTube'].map((social) => (
              <a
                key={social}
                href='#'
                className='relative py-1 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-orange-500 after:transition-all after:duration-300 hover:text-orange-500 hover:after:w-full'
              >
                {social}
              </a>
            ))}
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className='group flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/60 text-neutral-400 shadow-md transition-all duration-300 hover:scale-105 hover:border-orange-500 hover:bg-orange-500 hover:text-white'
            aria-label='Back to top'
          >
            <ArrowUp className='h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1' />
          </button>
        </div>
      </div>
    </footer>
  );
}
