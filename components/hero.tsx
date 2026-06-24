import Image from 'next/image';

const Hero = () => {
  return (
    <section className='max-w-9xl relative mx-auto mb-10 flex w-[97%] flex-col pt-5'>
      <div className='relative h-[380px] w-full rounded-[25px] bg-black sm:h-[480px] md:h-[560px] lg:h-[648px] [corner-shape:bevel]'>
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
            <span className='font-saira text-lg text-white sm:text-xl md:text-2xl'>$169.99</span>
            <button className='rounded-full bg-orange-500 px-5 py-2.5 text-xs font-medium tracking-wider text-white capitalize transition-all duration-300 hover:shadow-[0_0_25px_var(--color-orange-500)] sm:px-7 sm:py-3'>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Hero earphone image overlay */}
      <div className='pointer-events-none absolute inset-0 top-5 z-10 flex w-full items-center justify-center'>
        <div className='w-[80%] sm:w-[75%] md:w-[70%] lg:w-full'>
          <Image
            src={'/hero-earphone-img.webp'}
            alt='Model Earphone'
            width={1143}
            height={803}
            className='object-contain'
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
