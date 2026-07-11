'use client';
import { useEffect } from 'react';

export function WaitlistForm() {
  useEffect(() => {
    // Load Tally embed script
    const script = document.createElement('script');
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up the script when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="w-full max-w-md mx-auto">
      {/* 
        TALLY EMBED PLACEHOLDER
        Replace the data-tally-src URL below with your own Tally form embed URL.
        You can get this from the "Share" > "Embed" section of your Tally form.
      */}
      <iframe 
        data-tally-src="https://tally.so/embed/7R58GR?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" 
        loading="lazy" 
        width="100%" 
        height="200" 
        frameBorder="0" 
        marginHeight={0} 
        marginWidth={0} 
        title="bẹrẹ Waitlist"
        className="bg-transparent"
      ></iframe>
      
    
    </div>
  );
}
