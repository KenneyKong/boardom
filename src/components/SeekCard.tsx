import { Seek } from '@/types/seek';
import Link from 'next/link';

export default function SeekCard({ seek }: { seek: Seek }) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="border border-amber-900/30 rounded bg-black/90 p-4 space-y-2 shadow-inner shadow-amber-900/10">
      <div className="flex justify-between items-start">
        <div>
          <Link 
            href={`/profile/${encodeURIComponent(seek.email)}`}
            className="font-mono text-amber-400 hover:text-amber-300 text-lg font-bold tracking-wide"
          >
            {seek.name}
          </Link>
        </div>
        <span className="text-sm text-amber-700/80 font-mono">
          {formatDate(seek.createdAt)}
        </span>
      </div>
      
      <p className="text-amber-200/90 font-mono">{seek.content}</p>
      
      <div className="flex flex-wrap gap-2">
        {seek.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-amber-900/20 text-blue-400 px-2 py-0.5 rounded text-sm font-mono border border-amber-900/30"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
} 