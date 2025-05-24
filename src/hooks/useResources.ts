'use client';
import { useState, useEffect, useCallback } from 'react';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  fileUrl?: string;
  createdAt: string;
  updatedAt: string;
}

interface UseResourcesOptions {
  category?: string;
  limit?: number;
}

export function useResources(options: UseResourcesOptions = {}) {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchResources = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (options.category) {
        params.append('category', options.category);
      }
      if (options.limit) {
        params.append('limit', options.limit.toString());
      }

      const response = await fetch(`/api/resources?${params.toString()}`);

      if (!response.ok) {
        throw new Error('Failed to fetch resources');
      }

      const data = await response.json();
      setResources(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [options.category, options.limit]);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  return { resources, loading, error, refetch: fetchResources };
}
