export type TProduct = {
  name: string;
  imageUrl: string;
};

export const PRODUCTS_DATA: TProduct[] = [
  {
    name: 'Model SSR',
    imageUrl: '/earphone-model-ssr.webp'
  },
  {
    name: 'Model SKY',
    imageUrl: '/earphone-model-sky.webp'
  },
  {
    name: 'Model XRS',
    imageUrl: '/earphone-model-xrs.webp'
  }
];

export type Preset = {
  name: string;
  bass: number;
  mids: number;
  treble: number;
  description: string;
};

export const PRESETS: Preset[] = [
  {
    name: 'Signature Bass',
    bass: 88,
    mids: 45,
    treble: 65,
    description:
      'Deep, rich sub-bass with warm mids. Perfect for Hip-hop and EDM.'
  },
  {
    name: 'Studio Reference',
    bass: 50,
    mids: 50,
    treble: 50,
    description:
      'Flat frequency response. Accurate acoustic details for audio production.'
  },
  {
    name: 'Vocal Clarity',
    bass: 35,
    mids: 85,
    treble: 60,
    description:
      'Boosted mid-range frequencies. Clear vocals, podcasts, and audiobooks.'
  },
  {
    name: 'Treble Air',
    bass: 42,
    mids: 55,
    treble: 90,
    description:
      'Sparkling high-end details. Spacious soundstage for classical and jazz.'
  }
];
