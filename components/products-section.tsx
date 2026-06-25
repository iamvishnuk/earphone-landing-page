'use client';

import { useState, MouseEvent } from 'react';
import Image from 'next/image';
import { PRODUCTS_DATA } from '@/lib/data';
import { cn } from '@/lib/utils';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';

const ProductSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0
  });

  const total = PRODUCTS_DATA.length;

  const prev = () => setActiveIndex((i) => (i - 1 + total) % total);
  const next = () => setActiveIndex((i) => (i + 1) % total);

  const updateMousePosition = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();

    setTooltip({
      visible: true,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    });
  };

  const getSlideIndex = (offset: number) =>
    (activeIndex + offset + total) % total;

  const visibleIndices = [getSlideIndex(-1), activeIndex, getSlideIndex(1)];

  return (
    <section className='max-w-10xl flex w-full flex-col items-center px-4 pt-8 pb-20 sm:px-5 md:pt-12'>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className='mt-5 mb-6 sm:mt-10 sm:mb-10 md:mt-15 md:mb-10 lg:mt-20'
      >
        <p className='mx-auto max-w-xl text-center text-xs leading-5 font-medium text-[#555555] uppercase sm:max-w-2xl sm:text-sm md:max-w-3xl md:text-base md:leading-6'>
          Lorem ipsum linus Karlsson Alexandra Sjöberg i Signe Björk, Michael
          Jonsson.
          <br className='hidden md:block' />
          Viktor Blom Alexander Engström. Adam Gustavsson Astrid Lindgren. Adam
          <br className='hidden md:block' />
          Sundberg Viola Nyberg.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-220px' }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className='relative mt-6 flex w-full flex-col items-center sm:mt-10 md:mt-12'
      >
        <div className='pointer-events-none absolute top-0 left-0 flex w-full justify-center overflow-hidden select-none'>
          <h2 className='font-inter text-[15vw] leading-none font-extrabold whitespace-nowrap text-[#f2f2f2] uppercase lg:text-[12vw]'>
            Our Range
          </h2>
        </div>

        <div className='relative mx-auto w-full max-w-7xl'>
          <div className='flex w-full items-center justify-between gap-2 px-2 pt-10 sm:gap-4 sm:px-4 md:gap-8 md:px-20 md:pt-[12%] lg:gap-16'>
            {visibleIndices.map((index, positionIndex) => {
              const product = PRODUCTS_DATA[index];
              const isCenter = positionIndex === 1;

              return (
                <motion.div
                  layout
                  key={product.name}
                  animate={{
                    scale: isCenter ? 1 : 0.75,
                    opacity: isCenter ? 1 : 0.4
                  }}
                  whileHover={{
                    opacity: 1
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 220,
                    damping: 26,
                    layout: { type: 'spring', stiffness: 220, damping: 26 }
                  }}
                  onClick={() => {
                    if (positionIndex === 0) prev();
                    if (positionIndex === 2) next();
                  }}
                  className={cn(
                    'group relative cursor-pointer transition-[filter] duration-300 select-none',
                    isCenter
                      ? 'z-10 w-[56%] blur-none sm:w-[52%] md:w-[48%] lg:w-[45%]'
                      : 'w-[22%] blur-[2px] hover:blur-none sm:w-[18%] md:w-[15%]'
                  )}
                  onMouseEnter={() => {
                    if (isCenter) {
                      setTooltip((prev) => ({ ...prev, visible: true }));
                    }
                  }}
                  onMouseLeave={() => {
                    setTooltip((prev) => ({ ...prev, visible: false }));
                  }}
                  onMouseMove={(e) => {
                    if (isCenter) {
                      updateMousePosition(e);
                    }
                  }}
                >
                  {isCenter && (
                    <div className='absolute inset-0 -z-10 bg-[radial-gradient(circle,rgba(249,115,22,0.25)_0%,transparent_75%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                  )}

                  <div className='flex h-full w-full items-center justify-center'>
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={2500}
                      height={2500}
                      className='pointer-events-none object-contain select-none'
                      priority={isCenter}
                    />
                  </div>

                  {isCenter && tooltip.visible && (
                    <div
                      className='pointer-events-none absolute z-20 w-36 overflow-hidden rounded-full bg-orange-500 px-4 py-2 text-white'
                      style={{
                        left: tooltip.x + 20,
                        top: tooltip.y + 10
                      }}
                    >
                      <div className='animate-marquee flex w-max items-center text-xs font-semibold uppercase'>
                        <span>
                          Check this out. Check this out. Check this out.
                        </span>
                        <span>
                          Check this out. Check this out. Check this out.
                        </span>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className='relative flex flex-col items-center pt-10'
      >
        <div className='flex items-center'>
          <h3 className='font-saira text-4xl font-medium uppercase'>
            {PRODUCTS_DATA[activeIndex].name}
          </h3>
          <svg
            className={cn(
              'ml-2 hidden size-12 transition-all duration-500 md:block',
              tooltip.visible ? 'opacity-100' : 'opacity-0'
            )}
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2.5'
            strokeLinecap='square'
            strokeLinejoin='miter'
          >
            <line
              x1='7'
              y1='17'
              x2='17'
              y2='7'
            ></line>
            <polyline
              points='7 7 17 7 17 17'
              data-astro-cid-jxrlxyac=''
            ></polyline>
          </svg>
        </div>
        <div className='mt-5 flex items-center justify-center gap-6'>
          <button
            className='flex size-9 items-center justify-center rounded-full border border-orange-500 bg-white hover:cursor-pointer'
            onClick={prev}
          >
            <ChevronLeft className='text-orange-500' />
          </button>

          <button
            className='flex size-9 items-center justify-center rounded-full border border-orange-500 bg-white hover:cursor-pointer'
            onClick={next}
          >
            <ChevronRight className='text-orange-500' />
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default ProductSection;
