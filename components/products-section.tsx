'use client';

import { useState, MouseEvent } from 'react';
import Image from 'next/image';
import { PRODUCTS_DATA } from '@/lib/data';
import { cn } from '@/lib/utils';
import { ChevronRight, ChevronLeft } from 'lucide-react';

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

  return (
    <section className='max-w-10xl flex w-full flex-col items-center px-4 pt-8 pb-20 sm:px-5 md:pt-12'>
      <div className='mt-10 mb-6 sm:mt-16 sm:mb-10 md:mt-20 md:mb-10'>
        <p className='mx-auto max-w-xl text-center text-xs leading-6 font-medium text-[#555555] uppercase sm:max-w-2xl sm:text-sm md:max-w-3xl md:text-base'>
          Lorem ipsum linus Karlsson Alexandra Sjöberg i Signe Björk, Michael
          Jonsson.{' '}
          <span className='hidden sm:inline'>
            Viktor Blom Alexander Engström. Adam Gustavsson Astrid Lindgren.
            Adam Sundberg Viola Nyberg.
          </span>
        </p>
      </div>

      <div className='relative mt-6 flex w-full flex-col items-center sm:mt-10 md:mt-12'>
        <div className='pointer-events-none absolute top-0 left-0 flex w-full justify-center overflow-hidden select-none'>
          <h2 className='font-inter xs:text-[5rem] text-[3rem] leading-none font-extrabold whitespace-nowrap text-[#f2f2f2] uppercase sm:text-[8rem] md:text-[11rem]'>
            Our Range
          </h2>
        </div>

        <div className='relative mx-auto w-full max-w-7xl'>
          <div className='flex w-full items-center justify-between gap-2 px-2 pt-10 sm:gap-4 sm:px-4 md:gap-8 md:px-20 md:pt-[12%] lg:gap-16'>
            <div
              onClick={() => prev()}
              className='w-[22%] hover:cursor-pointer sm:w-[18%] md:w-[15%]'
            >
              <Image
                src={PRODUCTS_DATA[getSlideIndex(-1)].imageUrl}
                alt={PRODUCTS_DATA[getSlideIndex(-1)].name}
                width={2500}
                height={2500}
                className='scale-75 object-contain opacity-40 blur-[2px] transition-all duration-300 hover:opacity-100 hover:blur-none'
              />
            </div>

            <div
              className='t relative w-[56%] hover:cursor-pointer sm:w-[52%] md:w-[48%] lg:w-[45%]'
              onMouseEnter={() =>
                setTooltip((prev) => ({ ...prev, visible: true }))
              }
              onMouseLeave={() =>
                setTooltip((prev) => ({ ...prev, visible: false }))
              }
              onMouseMove={(e) => updateMousePosition(e)}
            >
              <Image
                src={PRODUCTS_DATA[activeIndex].imageUrl}
                alt={PRODUCTS_DATA[activeIndex].name}
                width={2500}
                height={2500}
                className='object-contain'
                priority
              />

              {tooltip.visible && (
                <div
                  className='pointer-events-none absolute z-20 w-36 overflow-hidden rounded-full bg-orange-500 px-4 py-2 text-white'
                  style={{
                    left: tooltip.x + 20,
                    top: tooltip.y + 10
                  }}
                >
                  <div className='animate-marquee flex w-max items-center text-xs font-semibold uppercase'>
                    <span>Check this out. Check this out. Check this out.</span>
                    <span>Check this out. Check this out. Check this out.</span>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => next()}
              className='w-[22%] hover:cursor-pointer sm:w-[18%] md:w-[15%]'
            >
              <Image
                src={PRODUCTS_DATA[getSlideIndex(1)].imageUrl}
                alt={PRODUCTS_DATA[getSlideIndex(1)].name}
                width={2500}
                height={2500}
                className='scale-75 object-contain opacity-40 blur-[2px] transition-all duration-300 hover:opacity-100 hover:blur-none'
              />
            </button>
          </div>
        </div>
      </div>
      <div className='relative flex flex-col items-center pt-10'>
        <div className='flex items-center'>
          <h3 className='font-robooto text-4xl font-medium uppercase'>
            {PRODUCTS_DATA[getSlideIndex(activeIndex)].name}
          </h3>
          <svg
            className={cn(
              'ml-2 size-12 transition-all duration-500',
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
      </div>
    </section>
  );
};

export default ProductSection;
