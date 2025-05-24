'use client';
import { useState, useEffect, useCallback } from 'react';

interface Story {
  id: string;
  title: string;
  content: string;
  author: string;
  location: string;
  image?: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UseStoriesOptions {
  featured?: boolean;
  limit?: number;
}

export function useStories(options: UseStoriesOptions = {}) {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (options.featured !== undefined) {
        params.append('featured', options.featured.toString());
      }
      if (options.limit) {
        params.append('limit', options.limit.toString());
      }

      const response = await fetch(`/api/stories?${params.toString()}`);

      if (!response.ok) {
        throw new Error('Failed to fetch stories');
      }

      const data = await response.json();
      setStories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [options.featured, options.limit]);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  return { stories, loading, error, refetch: fetchStories };
}
