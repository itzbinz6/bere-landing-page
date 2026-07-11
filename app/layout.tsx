import type {Metadata} from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'bẹrẹ | AI-Powered Startup Intelligence for Africa',
  description: 'An AI-powered startup intelligence platform that gives African founders the data, tools, and intelligence to build businesses that survive and scale.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body suppressHydrationWarning className="font-sans antialiased text-stone-900 bg-stone-50 selection:bg-orange-200 selection:text-orange-900">
        {children}
      </body>
    </html>
  );
}
