# Database Integration Guide

If you decide to move away from the embedded Tally form and manage your waitlist data internally, you will need to integrate a database. Here is a step-by-step guide on how to set up a database in this Next.js project.

## 1. Choose a Database Provider
You have two main paths:
- **Firebase (NoSQL):** Great for simple waitlists and integrates easily. (You used this previously).
- **Supabase (PostgreSQL):** An open-source Firebase alternative with a relational Postgres database. Excellent if you plan to build a complex SaaS platform later.

## 2. Setting Up Environment Variables
You will need to securely store your database connection strings. 
Create a file named `.env.local` in the root of your project and add your keys.
*(Note: Never commit `.env.local` to GitHub!)*

```env
# Example for Supabase
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key" # For server-side only!

# Example for Firebase
FIREBASE_PROJECT_ID="your-project-id"
FIREBASE_CLIENT_EMAIL="your-client-email"
FIREBASE_PRIVATE_KEY="your-private-key"
```

## 3. Install Required SDKs
Depending on your choice, install the database client by opening your terminal and running:

```bash
# For Supabase
npm install @supabase/supabase-js

# OR For Firebase Admin (Server-side)
npm install firebase-admin
```

## 4. Create a Next.js API Route (Backend)
Since your database credentials must remain secure, you cannot write to the database directly from the frontend (Client Components) safely without Row Level Security (RLS). An API route is the safest approach.

Create a file at `/app/api/waitlist/route.ts`:

### Example: Supabase Implementation
```typescript
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with the service role key to bypass RLS on the server
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    
    // Insert the email into a "waitlist" table in Supabase
    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ email }]);
      
    if (error) throw error;
    
    return NextResponse.json({ success: true, message: 'Added to waitlist' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
```

## 5. Update the Frontend Component
Replace the Tally iframe in `/components/ui/waitlist-form.tsx` with a native React form that sends data to your new API route.

```tsx
'use client';
import { useState } from 'react';

export function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="py-4 px-6 bg-green-50 border border-green-200 text-green-800 rounded-lg font-medium">
        You're on the list. We'll reach out soon.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Enter your email" 
        required 
        className="flex-1 px-4 py-3 rounded-lg border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
      <button 
        type="submit" 
        disabled={status === 'loading'}
        className="px-6 py-3 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-700 transition-all disabled:opacity-70"
      >
        {status === 'loading' ? 'Submitting...' : 'Join Waitlist'}
      </button>
    </form>
  );
}
```
