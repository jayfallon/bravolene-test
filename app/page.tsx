'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [sandwiches, setSandwiches] = useState<string[]>([]);
  const [newSandwich, setNewSandwich] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSandwiches();
  }, []);

  const fetchSandwiches = async () => {
    try {
      const res = await fetch('/api/sandwiches');
      const data = await res.json();
      setSandwiches(data.sandwiches || []);
    } catch (error) {
      console.error('Failed to fetch sandwiches:', error);
    }
  };

  const addSandwich = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSandwich.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/sandwiches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newSandwich }),
      });

      if (res.ok) {
        setNewSandwich('');
        await fetchSandwiches();
      }
    } catch (error) {
      console.error('Failed to add sandwich:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans flex items-center justify-center min-h-screen p-8">
      <main className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8 text-center">Sandwich Tracker</h1>

        <form onSubmit={addSandwich} className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={newSandwich}
              onChange={(e) => setNewSandwich(e.target.value)}
              placeholder="Enter sandwich name..."
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !newSandwich.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Adding...' : 'Add'}
            </button>
          </div>
        </form>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold mb-4">Sandwiches ({sandwiches.length})</h2>
          {sandwiches.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No sandwiches yet. Add one above!</p>
          ) : (
            <ul className="space-y-2">
              {sandwiches.map((sandwich, index) => (
                <li
                  key={index}
                  className="px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg"
                >
                  {sandwich}
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
