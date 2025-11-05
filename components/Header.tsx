import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="inline-block bg-indigo-500/10 text-indigo-400 px-4 py-1 rounded-full text-sm font-semibold mb-4">
        Didukung oleh Gemini
      </div>
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
        Generator Postingan Media Sosial
      </h1>
      <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-slate-400">
        Kehabisan ide? Dapatkan 30 ide konten segar untuk kalender media sosial Anda hanya dengan satu klik.
      </p>
    </header>
  );
};

export default Header;
