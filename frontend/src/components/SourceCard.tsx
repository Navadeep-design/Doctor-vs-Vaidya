import { BookOpen } from 'lucide-react';

interface SourceCardProps {
  source: string;
}

export default function SourceCard({ source }: SourceCardProps) {
  return (
    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
      <BookOpen className="w-3 h-3 mr-1.5 text-gray-500" />
      {source}
    </span>
  );
}
