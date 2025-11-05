import React, { useState, useCallback } from 'react';
import { generateContentIdeas } from './services/geminiService';
import Header from './components/Header';
import IdeaCard from './components/IdeaCard';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [industry, setIndustry] = useState<string>('');
  const [ideas, setIdeas] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    if (!industry.trim()) {
      setError('Harap masukkan industri Anda.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setIdeas([]);

    try {
      const generatedIdeas = await generateContentIdeas(industry);
      setIdeas(generatedIdeas);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan yang tidak diketahui.');
    } finally {
      setIsLoading(false);
    }
  }, [industry]);

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <Header />

        <main className="mt-12">
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <label htmlFor="industry-input" className="block text-center text-lg font-medium text-slate-300 mb-4">
              Masukkan industri atau jenis bisnis Anda
            </label>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                id="industry-input"
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="Contoh: kedai kopi, butik pakaian, agen travel..."
                className="flex-grow w-full px-5 py-3 bg-slate-800 border-2 border-slate-700 rounded-full text-white placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center justify-center gap-2 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 disabled:bg-slate-700 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/50"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner />
                    <span>Memproses...</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    <span>Buat Ide</span>
                  </>
                )}
              </button>
            </div>
            {error && <p className="text-center text-red-400 mt-4">{error}</p>}
          </form>

          <div className="mt-16">
            {ideas.length > 0 && (
              <>
                <h2 className="text-3xl font-bold text-center mb-8">30 Ide Konten untuk <span className="text-indigo-400">{industry}</span></h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {ideas.map((idea, index) => (
                    <IdeaCard key={index} index={index} idea={idea} />
                  ))}
                </div>
              </>
            )}
            {!isLoading && ideas.length === 0 && !error && (
                <div className="text-center text-slate-500 max-w-md mx-auto mt-20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    <h3 className="text-xl font-semibold text-slate-400">Siap untuk Ide Cemerlang?</h3>
                    <p className="mt-2">Masukkan industri bisnis Anda di atas untuk memulai. Dapatkan inspirasi konten media sosial untuk sebulan penuh dalam hitungan detik!</p>
                </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
