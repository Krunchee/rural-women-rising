'use client';
import { useState, useEffect, useCallback } from 'react';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  type: string;
  capacity?: number;
  createdAt: string;
  updatedAt: string;
}

interface UseEventsOptions {
  upcoming?: boolean;
  type?: string;
  limit?: number;
}

export function useEvents(options: UseEventsOptions = {}) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (options.upcoming !== undefined) {
        params.append('upcoming', options.upcoming.toString());
      }
      if (options.type) {
        params.append('type', options.type);
      }
      if (options.limit) {
        params.append('limit', options.limit.toString());
      }

      const response = await fetch(`/api/events?${params.toString()}`);

      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }

      const data = await response.json();
      setEvents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [options.upcoming, options.type, options.limit]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return { events, loading, error, refetch: fetchEvents };
}
