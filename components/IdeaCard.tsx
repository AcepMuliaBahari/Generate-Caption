import React, { useState } from 'react';

interface IdeaCardProps {
  idea: string;
  index: number;
}

const IdeaCard: React.FC<IdeaCardProps> = ({ idea, index }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(idea);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 flex flex-col justify-between shadow-lg hover:shadow-indigo-500/10 hover:border-indigo-500/50 transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex-grow">
        <span className="text-indigo-400 font-bold text-lg">#{index + 1}</span>
        <p className="mt-2 text-slate-300">{idea}</p>
      </div>
      <button
        onClick={handleCopy}
        className={`mt-4 w-full px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 ${
          copied
            ? 'bg-green-600 text-white'
            : 'bg-slate-700 text-slate-300 hover:bg-indigo-600 hover:text-white'
        }`}
      >
        {copied ? (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Disalin!</span>
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
            <span>Salin Ide</span>
          </>
        )}
      </button>
    </div>
  );
};

export default IdeaCard;
