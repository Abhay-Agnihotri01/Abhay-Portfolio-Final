import { useState, useEffect, useCallback } from 'react';
import defaultPortfolioData from '@src/data/defaultPortfolioData';

const LOCAL_STORAGE_KEY = 'abhay_portfolio_data';
const EVENT_NAME = 'portfolio_data_changed';

// In-memory cache for fast client transitions
let cachedData = null;

function getInitialPortfolioData() {
  if (typeof window !== 'undefined') {
    if (cachedData) return cachedData;
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        cachedData = JSON.parse(stored);
        return cachedData;
      }
    } catch (e) {
      // ignore
    }
  }
  return defaultPortfolioData;
}

function usePortfolioData() {
  const [data, setData] = useState(getInitialPortfolioData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sync with API on mount
  useEffect(() => {
    let isMounted = true;

    const fetchLatest = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/content');
        if (res.ok) {
          const freshData = await res.json();
          if (isMounted && freshData && typeof freshData === 'object') {
            cachedData = freshData;
            setData(freshData);
            try {
              localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(freshData));
            } catch (err) {
              // ignore storage quota error
            }
          }
        }
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchLatest();

    // Listen to local changes from admin panel
    const handleDataChanged = () => {
      try {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          cachedData = parsed;
          setData(parsed);
        }
      } catch (err) {
        // ignore
      }
    };

    window.addEventListener(EVENT_NAME, handleDataChanged);
    window.addEventListener('storage', handleDataChanged);

    return () => {
      isMounted = false;
      window.removeEventListener(EVENT_NAME, handleDataChanged);
      window.removeEventListener('storage', handleDataChanged);
    };
  }, []);

  const saveContent = useCallback(async (newContent, token) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ content: newContent, token })
      });

      const resData = await res.json();

      if (!res.ok || !resData.success) {
        throw new Error(resData.error || 'Failed to save content');
      }

      cachedData = newContent;
      setData(newContent);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newContent));
      window.dispatchEvent(new Event(EVENT_NAME));

      return { success: true, message: resData.message || 'Saved successfully!' };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const resetContent = useCallback(async (token) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch('/api/admin/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ token })
      });

      const resData = await res.json();
      if (!res.ok || !resData.success) {
        throw new Error(resData.error || 'Failed to reset content');
      }

      cachedData = defaultPortfolioData;
      setData(defaultPortfolioData);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultPortfolioData));
      window.dispatchEvent(new Event(EVENT_NAME));

      return { success: true, message: 'Reset to defaults successfully!' };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    data: data || defaultPortfolioData,
    loading,
    error,
    saveContent,
    resetContent
  };
}

export default usePortfolioData;
