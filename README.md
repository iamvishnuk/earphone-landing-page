# Model XRS Earphones Landing Page

An interactive, premium product showcase and hardware simulation landing page for **Model XRS Earphones**. Built with modern web development frameworks, the application offers an engaging user experience with dynamic animations, audio presets manipulation, and real-time noise cancellation simulations.

---

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

- **Node.js**: Version `20.x` or higher is recommended.
- **pnpm**: Fast, disk-space-efficient package manager. Install it globally via npm if you don't have it:
  ```bash
  npm install -g pnpm
  ```

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   cd earphone-landing-page
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

### Running the Application

* **Development Server**: Run the project locally with hot-reloading:
  ```bash
  pnpm dev
  ```
  Once started, open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

* **Production Build**: Compile the app for production and test the build output:
  ```bash
  pnpm build
  pnpm start
  ```

* **Linting**: Run ESLint checks across the codebase:
  ```bash
  pnpm lint
  ```

---

## 🏗️ Architectural Notes & Technical Stack

The project represents a modern, responsive, and performance-oriented frontend application. Below is a breakdown of the design patterns and technologies used:

### 1. Framework & Core Routing
- **Next.js 16 (App Router)**: Configured using Next.js's app directory structure for simplified layouts, page routing, and built-in optimization tools.
- **React 19 & TypeScript**: Leverages the latest React updates alongside strict TypeScript typing to ensure code safety, clean data structures (`lib/data.ts`), and autocompletion support.

### 2. Styling System
- **Tailwind CSS v4**: Built with Tailwind CSS v4, which introduces PostCSS processing optimization and the `@theme inline` directive configuration inside `app/globals.css`.
- **Dynamic Layout & Tokens**: Includes support for bespoke container constraints (`max-w-8xl` and `max-w-9xl` wrappers), typography rules (using custom loaded Google Fonts: *Inter*, *Roboto*, *Saira*), and specialized CSS shapes like custom corner bevel effects (`[corner-shape:bevel]`).

### 3. Motion & Animation
- **Framer Motion (`motion/react`)**: Powering interactive transitions, layout changes, scroll-linked fade-ins, and complex spring physics.
- **Interactive Mouse Tracking**: The Hero section captures cursor movements to displace background gradients and layer illustrations dynamically, giving a 3D parallax feel.
- **Product Carousel**: Responsive carousel transitions that scale and fade out side-products dynamically using Framer Motion's `layout` transitions and spring physics.

### 4. Interactive Simulation Modules
- **Sound Customizer (Equalizer & Graph)**:
  - **Dynamic SVG Bezier Curve**: Renders an EQ curve using custom mathematical coordinates. The graph nodes (`EqCurveGraph`) adjust live to slider movements representing Bass, Midrange, and Treble.
  - **Web Audio API Soundboard**: Under `components/sound-customizer/spectrum-analyzer.tsx`, the application uses the browser's Web Audio API to decode and trigger audio snippets (`piano.mp3`). It supports:
    - *Scale Mode*: Generates pentatonic scale offsets across three octaves dynamically adjusting `playbackRate`.
    - *Slice Mode*: Slices the track timeline chronologically on-demand.
  - **Interactive Spectrum Analyzer**: Simulates real-time audio frequencies pulsing in response to active bass, mids, and treble configurations.
- **Smart Features (Bento Grid)**:
  - **Active Noise Cancellation (ANC) Waveform Simulator**: Generates real-time sine and anti-phase waveforms (`components/features-bento/active-noise-cancellation-card.tsx`) using mathematical amplitude, frequency, and phase-shifting functions in `lib/utils.ts`. The waveforms collapse dynamically as attenuation levels approach 100%.
  - **Battery Charge Simulator**: Uses dynamic React intervals to animate battery percentage levels and state updates whenever the mouse hovers over the power card, simulating high-density fast charging.

### 5. File Structure
- `app/`: Entry points, layouts (`layout.tsx`), and global styles (`globals.css`).
- `components/`: Modular UI blocks (Hero section, product list, footer) and nested simulation subsystems (Sound Customizer, Features Bento grid).
- `lib/`: Helper methods (SVG curve computation in `utils.ts`) and global content data (`data.ts`).
- `public/`: High-resolution product images (WebP format), vector graphics (SVG), and audio assets (`.mp3`).

