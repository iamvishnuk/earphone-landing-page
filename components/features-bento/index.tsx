import ActiveNoiseCancellationCard from './active-noise-cancellation-card';
import BatteryChargeCard from './batter-charge-card';

const FeaturesBento = () => {
  return (
    <section className='max-w-9xl relative mx-auto mb-16 flex w-[97%] flex-col overflow-hidden rounded-[25px] bg-black p-6 text-white [corner-shape:bevel] sm:p-8 md:p-12 lg:mb-24'>
      <div className='relative z-10 flex flex-col items-start justify-between gap-4 border-b border-neutral-800/80 pb-6 md:flex-row md:items-center md:pb-8'>
        <div>
          <h2 className='font-saira mt-3 text-3xl font-bold tracking-wider sm:text-4xl md:text-5xl'>
            SMART FEATURES
          </h2>
        </div>
        <p className='font-inter max-w-sm text-left text-xs leading-relaxed text-neutral-400 md:text-right md:text-sm'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque
          nobis, a, ex ducimus amet, quisquam voluptatum eius temporibus
          voluptas voluptatum
        </p>
      </div>

      <div className='relative z-10 mt-8 grid grid-cols-1 gap-6 md:grid-cols-3'>
        <ActiveNoiseCancellationCard />
        <BatteryChargeCard />
      </div>
    </section>
  );
};

export default FeaturesBento;
