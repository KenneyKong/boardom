'use client';

import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { Seek, SeekFormData } from '@/types/seek';
import SeekCard from './SeekCard';
import CreateSeek from './CreateSeek';

export default function SeekWall() {
  const [seeks, setSeeks] = useState<Seek[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSeeks();
  }, []);

  const fetchSeeks = async () => {
    try {
      const response = await axios.get('/api/seeks');
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

  const handleCreateSeek = async (formData: SeekFormData) => {
    try {
      const response = await axios.post('/api/seeks', formData);
      const newSeek = response.data;
      setSeeks((prevSeeks) => [newSeek, ...prevSeeks]);
      setError(null);
    } catch (err) {
      setError('Failed to create seek. Please try again.');
      if (err instanceof AxiosError) {
        console.error('Error creating seek:', err.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto py-8 text-center">
        Loading seeks...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-8">
          {error}
        </div>
        <CreateSeek onSubmit={handleCreateSeek} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="bg-black/80 border-2 border-amber-900/50 rounded-lg p-6 shadow-lg shadow-black/50">
        <CreateSeek onSubmit={handleCreateSeek} />
      </div>
      
      <div className="bg-black/80 border-2 border-amber-900/50 rounded-lg p-4 space-y-3 shadow-lg shadow-black/50">
        {seeks.map((seek) => (
          <SeekCard key={seek.id} seek={seek} />
        ))}
      </div>
    </div>
  );
} 