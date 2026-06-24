'use client';

import Image from 'next/image';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useRef, MouseEvent } from 'react';

const Hero = () => {
  const containerRef = useRef<null | HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = {
    type: 'spring',
    stiffness: 100,
    damping: 20,
    mass: 0.5
  };

  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const { clientX, clientY } = e;
    const rect = containerRef.current.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const offsetX = clientX - centerX;
    const offsetY = clientY - centerY;

    // Move the image slightly towards the cursor (e.g. 5% of the distance)
    const strength = 0.05;

    x.set(offsetX * strength);
    y.set(offsetY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className='max-w-9xl relative mx-auto mb-10 flex w-[97%] flex-col pt-5'>
      <div
        ref={containerRef}
        className='group relative h-[380px] w-full overflow-hidden rounded-[25px] bg-black [corner-shape:bevel] sm:h-[480px] md:h-[560px] lg:h-[648px]'
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();

          e.currentTarget.style.setProperty(
            '--x',
            `${e.clientX - rect.left}px`
          );

          e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
          handleMouseMove(e);
        }}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className='pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100'
          style={{
            background:
              'radial-gradient(600px circle at var(--x) var(--y), rgba(249,115,22,0.15), transparent 80%)'
          }}
        />
        <div className='flex items-center justify-center gap-3 pt-8 sm:gap-4 sm:pt-10'>
          <Image
            src={'/earphone-logo.webp'}
            alt='Model Earphone'
            width={16}
            height={18}
            className='object-contain'
            loading='lazy'
          />
          <span className='text-xs font-semibold tracking-widest text-white uppercase sm:text-sm'>
            model ears
          </span>
        </div>

        {/* Heading */}
        <div className='absolute inset-0 flex items-center pl-[6%] sm:pl-[8%] md:pl-[10%] lg:pl-[20%]'>
          <h2 className='text-center text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-9xl'>
            MODEL <br /> XRS
          </h2>
        </div>

        {/* Bottom-right info */}
        <div className='absolute right-4 bottom-6 flex max-w-[180px] flex-col gap-3 sm:right-6 sm:bottom-8 sm:max-w-[220px] sm:gap-4 md:right-10 md:bottom-10 md:max-w-xs md:gap-5'>
          <p className='font-robooto text-right text-xs leading-normal tracking-normal text-[#555555] sm:text-sm'>
            Lorem ipsum linus Karlsson Alexandra Sjöberg i Signe Björk, Michael
            Jonsson. Viktor Blom Alexander Engström. Adam Gustavsson Astrid
            Lindgren. Adam Sundberg Viola Nyberg
          </p>
          <div className='flex items-center justify-end gap-3 sm:gap-5'>
            <span className='font-saira text-lg text-white sm:text-xl md:text-2xl'>
              $169.99
            </span>
            <button className='rounded-full bg-orange-500 px-5 py-2.5 text-xs font-medium tracking-wider text-white capitalize transition-all duration-300 hover:shadow-[0_0_25px_var(--color-orange-500)] sm:px-7 sm:py-3'>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Hero earphone image overlay */}
      <div className='pointer-events-none absolute inset-0 top-5 z-10 flex w-full items-center justify-center'>
        <div className='w-[80%] sm:w-[75%] md:w-[70%] lg:w-full'>
          <motion.div
            className='relative w-fit transition-transform'
            style={{ x: xSpring, y: ySpring }}
          >
            <Image
              src={'/hero-earphone-img.webp'}
              alt='Model Earphone'
              width={1143}
              height={803}
              className='object-contain'
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
