'use client';

import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { Seek } from '@/types/seek';
import SeekCard from '@/components/SeekCard';
import Link from 'next/link';
import { use } from 'react';

export default function ProfilePage({
  params,
}: {
  params: Promise<{ email: string }>;
}) {
  const resolvedParams = use(params);
  const [seeks, setSeeks] = useState<Seek[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const email = decodeURIComponent(resolvedParams.email);

  useEffect(() => {
    const fetchSeeks = async () => {
      try {
        const response = await axios.get(`/api/seeks/email/${encodeURIComponent(email)}`);
        setSeeks(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch seeks. Please try again later.');
        if (err instanceof AxiosError) {
          console.error('Error fetching seeks:', err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSeeks();
  }, [email]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto py-8 text-center">
        Loading seeks...
      </div>
    );
  }

  const userName = seeks.length > 0 ? seeks[0].name : 'User';

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="py-8">
          <Link 
            href="/"
            className="text-blue-500 hover:text-blue-600 mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {userName}'s Seeks
          </h1>
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-md mb-8">
              {error}
            </div>
          )}
          <div className="space-y-4">
            {seeks.length === 0 ? (
              <p className="text-gray-600">No seeks found.</p>
            ) : (
              seeks.map((seek) => (
                <SeekCard key={seek.id} seek={seek} />
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 