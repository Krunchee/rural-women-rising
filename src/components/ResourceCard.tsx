'use client';
import Button from './Button';
import { Download, FileText, Folder, ExternalLink } from 'lucide-react';

interface ResourceCardProps {
  title: string;
  description: string;
  category: string;
  fileUrl?: string;
  createdAt?: string;
  downloadCount?: number;
  onClick?: () => void;
}

export default function ResourceCard({
  title,
  description,
  category,
  fileUrl,
  createdAt,
  downloadCount = 0,
  onClick
}: ResourceCardProps) {
  const getCategoryIcon = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'toolkit':
        return <Folder className="w-5 h-5" />;
      case 'guide':
        return <FileText className="w-5 h-5" />;
      case 'template':
        return <FileText className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'toolkit':
        return 'bg-primary text-white';
      case 'guide':
        return 'bg-secondary text-primary-dark';
      case 'template':
        return 'bg-primary/10 text-primary';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (fileUrl) {
      window.open(fileUrl, '_blank');
    }
  };

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex items-start gap-3 mb-4">
          {/* Category Icon */}
          <div className={`flex-shrink-0 p-3 rounded-lg ${getCategoryColor(category)}`}>
            {getCategoryIcon(category)}
          </div>

          <div className="flex-1">
            {/* Category Badge */}
            <div className={`inline-block text-xs font-bold px-2 py-1 rounded-full mb-2 ${getCategoryColor(category)}`}>
              {category.toUpperCase()}
            </div>

            <h3 className="text-xl font-bold mb-2 text-primary-dark group-hover:text-primary transition-colors">
              {title}
            </h3>
          </div>
        </div>

        <p className="text-gray-600 line-clamp-3 mb-4 leading-relaxed">
          {description}
        </p>

        {/* Resource Meta Info */}
        <div className="flex items-center justify-between text-sm text-primary/70 mb-4">
          {createdAt && (
            <span>
              Added {new Date(createdAt).toLocaleDateString()}
            </span>
          )}
          {downloadCount > 0 && (
            <span className="flex items-center gap-1">
              <Download className="w-3 h-3" />
              {downloadCount} downloads
            </span>
          )}
        </div>

        <div className="flex gap-2">
          {fileUrl ? (
            <>
              <Button
                variant="primary"
                size="sm"
                className="flex-1 flex items-center gap-2"
                onClick={handleDownload}
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Preview
              </Button>
            </>
          ) : (
            <Button variant="outline" size="sm" className="w-full">
              View Details
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
