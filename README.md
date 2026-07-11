# bẹrẹ Landing Page

An AI-powered Startup Intelligence and Sustainability Platform for African founders.

## Local Development

To run this project locally, follow these steps:

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
1. Clone the repository to your local machine.
2. Install the dependencies:
   ```bash
   npm install
   ```

### Running the App
1. Start the Next.js development server:
   ```bash
   npm run dev
   ```
2. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Technologies Used
- Next.js 15 (App Router)
- React 19
- Tailwind CSS v4
- Motion (Framer Motion)
- Lucide React Icons

### Project Structure
- `/app`: Next.js App Router pages and layouts. The main landing page is in `/app/page.tsx`.
- `/components`: Reusable UI components (like the waitlist form, interactive carousels, animated sections, etc.).
- `/public`: Static assets (images, icons).
- `/lib`: Helper utilities and configuration scripts.

---

## 🔑 API Keys & Database Connections

**Do I need an API key?**
**No.** Because we removed the Firebase backend integration in favor of embedding a third-party form, this application is now a **100% Client-Side / Static Website**. 

You do **not** need any environment variables, `.env` files, API keys, or database setup (no Firebase, no SQL, etc.) to run this site or collect waitlist emails.

---

## 📝 Waitlist Setup (Tally Integration)

We integrated **Tally.so** to handle your waitlist signups natively within the landing page. It is embedded as an `iframe` and requires zero backend code.

### How to connect your Tally form:
1. Create a free account at [Tally.so](https://tally.so/) and create your waitlist form.
2. In the Tally dashboard, go to your form's **Share** > **Embed** tab.
3. You will see an embed code. Look for the URL inside `data-tally-src="..."`. It will look something like: `https://tally.so/embed/mBpZqR?...` where `mBpZqR` is your **Form ID**.
4. Open the file: `/components/ui/waitlist-form.tsx` in your code editor.
5. Locate the `<iframe>` tag and replace `YOUR_FORM_ID` in the `data-tally-src` attribute with your actual Form ID.
6. Delete the placeholder text `<div>` directly below the iframe (the one that says "Tally form placeholder...").
7. That's it! When users submit their email on your site, the data will go straight to your Tally dashboard.

---

## 🎨 Customizing Content & Images
This project is built to be easily customizable. Here is a guide on where and how to adjust different parts of the code:

#### 1. Adjusting Cards & Carousel Text
To edit the text, wording, or descriptions inside the interactive cards (such as the "bẹrẹ Risk Profile" features or the "7 Meridian dimensions"):
- Open `/app/page.tsx`
- Search for the specific text you want to change (e.g., "bẹrẹ Risk Profile").
- The data is structured in `.map()` loops arrays inside `InteractiveCarousel` components. You can directly edit the `name`, `desc`, and `id` properties within those arrays.

#### 2. Changing Card Images
The interactive cards feature background/banner images. 
- In `/app/page.tsx`, look for the array objects containing the `img: '...'` property.
- Replace the URL inside the `img` property with your new image URL.
- *Note:* If you are using images from new external domains (not Unsplash or Pexels), you must add those domains to the `remotePatterns` array in `next.config.ts`.

#### 3. Slideshows and Animations
- **Using Local Images for Hero:** If you want to use pictures from your local PC instead of external URLs:
  1. Open the `/public` folder in the project.
  2. Drag and drop your images there (e.g., `hero1.jpg`, `hero2.jpg`).
  3. Open `/app/page.tsx`, and in the `heroImages` array, update the URLs to point to your local paths (e.g., change `"https://images.../..."` to `"/hero1.jpg"`). Keep the leading slash!
- **Using a Video for the Hero Section:** If you want a full-screen background video instead of an image slideshow:
  1. Add your `.mp4` or `.webm` video to the `/public` folder (e.g., `/public/hero-video.mp4`).
  2. Open `/app/page.tsx` and locate the `<motion.img />` elements rendering the hero images.
  3. Replace the `heroImages.map(...)` block with a single video tag:
     ```tsx
     <video 
       src="/hero-video.mp4" 
       autoPlay 
       loop 
       muted 
       playsInline 
       className="absolute inset-0 w-full h-full object-cover -z-10"
     />
     ```
- **Hero Image Slideshow:** The background slideshow at the top of the page is controlled by the `heroImages` array at the top of `/app/page.tsx`. Update these URLs to change the hero sequence.
- **Carousel Animation Behavior:** The swiping, autoplay speed, and layout for the interactive cards are managed in `/components/ui/interactive-carousel.tsx`. 
  - To change the **autoplay speed**, search for `7000` (which is 7 seconds) inside the `useEffect` hook in `/components/ui/interactive-carousel.tsx` and adjust it to your preferred timing in milliseconds.
  - The dragging logic and responsive scaling are also handled in this file using Framer Motion (`<motion.div>`).

#### 4. Custom Social Media Logos
The current footer uses simple outline icons from `lucide-react` (Twitter/X, Instagram, LinkedIn). To use the *actual* brand logos:
1. Download the SVG versions of the brand logos (you can find these at sites like [Simple Icons](https://simpleicons.org/)).
2. Place the SVGs in your `/public` folder (e.g., `/public/x-logo.svg`, `/public/ig-logo.svg`, `/public/linkedin-logo.svg`).
3. Open `/app/page.tsx` and locate the Footer section at the bottom.
4. Replace the `<Twitter />`, `<Instagram />`, etc., with an `<img>` tag and wrap it in an anchor link:
   ```tsx
   <a href="https://x.com/yourhandle" target="_blank" rel="noopener noreferrer">
     <img src="/x-logo.svg" alt="X (Twitter)" className="w-6 h-6 hover:opacity-80 transition-opacity" />
   </a>
   ```

#### 5. General Text & Typography
- For any other text (headlines, subheadlines, "Why Africa First", footer), open `/app/page.tsx` and directly edit the HTML-like tags (JSX) containing the text.
- To modify the fonts, edit `/app/layout.tsx`. The project uses **Inter** (sans-serif) and **Plus Jakarta Sans** (display).

### Typography
This project uses the following Google Fonts:
- **Inter** (sans-serif) for general UI text and body paragraphs.
- **Plus Jakarta Sans** (display) for headings and prominent typographical elements.

---

## 📱 Responsive Design

**Is this site adaptable to different screen sizes?**
**Yes, it is fully responsive and mobile-friendly!** 

**How it was done:**
This is handled primarily through **Tailwind CSS** using mobile-first breakpoint prefixes. 
- **Mobile-First Default:** By default, all CSS classes apply to mobile screens (e.g., `flex-col` stacks elements vertically on mobile).
- **Responsive Prefixes:** We use classes like `sm:`, `md:`, `lg:`, and `xl:` to change layouts as the screen gets bigger.
  - Example: `flex-col sm:flex-row` means "stack vertically on mobile, but display side-by-side on small desktop screens and larger".
  - Example: `w-full md:w-1/2` means "take up 100% width on mobile, but 50% width on desktop".
- **Framer Motion Scaling:** The interactive carousels dynamically calculate the `window.innerWidth` (in `/components/ui/interactive-carousel.tsx`) to adjust card sizing and dragging constraints perfectly whether you are swiping on a phone or dragging on a desktop monitor.
