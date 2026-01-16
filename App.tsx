
import React, { useState, useEffect } from 'react';
import { CHAMPIONS } from './constants';
import { AppState, Champion } from './types';
import { getChampionInsights } from './geminiService';

const App: React.FC = () => {
  const [currentState, setCurrentState] = useState<AppState>(AppState.HOME);
  const [selectedChampion, setSelectedChampion] = useState<Champion | null>(null);
  const [insights, setInsights] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [timerProgress, setTimerProgress] = useState(0);

  // Automatic prank trigger with progress bar
  useEffect(() => {
    if (currentState === AppState.HOME || currentState === AppState.DETAILS) {
      const duration = 3500;
      const interval = 50;
      const steps = duration / interval;
      let currentStep = 0;

      const progressInterval = setInterval(() => {
        currentStep++;
        setTimerProgress((currentStep / steps) * 100);
      }, interval);

      const timer = setTimeout(() => {
        setCurrentState(AppState.SIGNUP);
        clearInterval(progressInterval);
      }, duration);

      return () => {
        clearTimeout(timer);
        clearInterval(progressInterval);
      };
    }
  }, [currentState]);

  const handleSelectChampion = async (champ: Champion) => {
    setSelectedChampion(champ);
    setLoading(true);
    setCurrentState(AppState.DETAILS);
    const text = await getChampionInsights(champ.name);
    setInsights(text || '');
    setLoading(false);
  };

  const handleGoHome = () => {
    setCurrentState(AppState.HOME);
    setSelectedChampion(null);
    setInsights('');
    setTimerProgress(0);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentState(AppState.REVEAL);
  };

  if (currentState === AppState.REVEAL) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#010a13] overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-3xl w-full text-center space-y-10 animate-in fade-in zoom-in duration-1000 relative z-10">
          <div className="relative inline-block group">
             <div className="absolute -inset-6 bg-gradient-to-r from-pink-600 via-red-500 to-rose-600 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 animate-spin-slow"></div>
             <div className="relative w-64 h-64 rounded-full border-4 border-[#c8aa6e] overflow-hidden shadow-[0_0_50px_rgba(236,72,153,0.3)]">
               <img 
                 src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=600" 
                 alt="Love Heart" 
                 className="w-full h-full object-cover"
               />
             </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl md:text-8xl font-black gold-gradient italic tracking-tighter drop-shadow-2xl">
              Surpresa, {userName}!
            </h1>
            <p className="text-[#c8aa6e] font-bold uppercase tracking-[0.5em] text-xs">O Vencedor do Meu Coração</p>
          </div>
          
          <div className="bg-[#091428]/80 backdrop-blur-lg border-2 border-[#c8aa6e] p-12 rounded-2xl shadow-[0_0_80px_rgba(200,170,110,0.15)] relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#c8aa6e] to-transparent"></div>
            <p className="text-3xl md:text-5xl leading-tight text-[#f0e6d2] font-serif italic relative z-10">
              "Você procurava as builds invencíveis... mas a verdade é que <span className="text-pink-400 not-italic font-black border-b-4 border-pink-400/30">você já é o amor da minha vida</span>. Obrigado por estar comigo todos os dias, obrigado por ser meu e eu sou todo seu."
            </p>
            <div className="mt-12 flex items-center justify-center space-x-8">
              <div className="text-pink-500 text-7xl animate-bounce drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]">❤️</div>
            </div>
          </div>
          
          <div className="pt-10">
            <button 
              onClick={handleGoHome}
              className="px-16 py-5 bg-gradient-to-r from-[#c8aa6e] to-[#785a28] text-black font-black uppercase tracking-[0.3em] hover:scale-105 transition-all duration-300 rounded-sm shadow-2xl active:scale-95"
            >
              Voltar ao Início do App
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#010a13] text-[#f0e6d2] font-sans selection:bg-[#c8aa6e] selection:text-black">
      {/* Progress Bar for Auto-Prank */}
      {(currentState === AppState.HOME || currentState === AppState.DETAILS) && (
        <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-gray-900">
          <div 
            className="h-full bg-gradient-to-r from-[#c8aa6e] to-red-600 transition-all duration-100 ease-linear shadow-[0_0_10px_#c8aa6e]"
            style={{ width: `${timerProgress}%` }}
          ></div>
        </div>
      )}

      {/* Header */}
      <nav className="border-b border-[#1e2328] bg-[#091428]/95 backdrop-blur-lg px-8 py-5 sticky top-0 z-50 flex justify-between items-center shadow-2xl">
        <div className="flex items-center space-x-6 group">
          <div className="w-12 h-12 border-2 border-[#c8aa6e] flex items-center justify-center rotate-45 group-hover:rotate-0 transition-all duration-700">
            <span className="-rotate-45 font-black text-2xl text-[#c8aa6e] group-hover:rotate-0">L</span>
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter uppercase gold-gradient cursor-pointer" onClick={handleGoHome}>
              GOD-TIER ANALYTICS
            </h1>
            <p className="text-[9px] text-red-500 font-bold tracking-[0.3em] -mt-1 uppercase animate-pulse">Sessão Privada: Admin Only</p>
          </div>
        </div>
        <div className="hidden lg:flex items-center space-x-10 text-[10px] font-black uppercase tracking-[0.2em]">
          <span className="text-[#c8aa6e] border-b-2 border-[#c8aa6e] pb-1 cursor-pointer" onClick={handleGoHome}>Campeões</span>
          <span className="text-gray-500 hover:text-white transition-colors cursor-not-allowed">Tier List Global</span>
          <span className="text-gray-500 hover:text-white transition-colors cursor-not-allowed">Pro Logs</span>
          <div className="bg-red-600/20 border border-red-600 text-red-500 px-4 py-2 rounded-sm text-[9px]">
            CONEXÃO SEGURA
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6 md:p-12">
        {currentState === AppState.HOME && (
          <div className="space-y-20">
            <header className="text-center space-y-6 animate-in fade-in slide-in-from-top-10 duration-1000">
              <div className="inline-block px-6 py-1.5 border-2 border-red-600 text-red-600 text-[11px] font-black uppercase tracking-[0.4em] mb-4 bg-red-600/5 shadow-[0_0_20px_rgba(220,38,38,0.2)]">
                DATABASE VAZADO • PATCH 15.01
              </div>
              <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter gold-gradient drop-shadow-2xl">
                Meta Desbloqueado
              </h2>
              <p className="text-[#a09b8c] max-w-3xl mx-auto text-xl leading-relaxed italic font-light">
                "As builds que a Riot não quer que você use. Baseado em algoritmos de vitória 100% garantida."
              </p>
              <div className="flex justify-center items-center space-x-6 py-4">
                <div className="h-[2px] w-24 bg-gradient-to-r from-transparent to-[#785a28]"></div>
                <div className="w-3 h-3 bg-[#c8aa6e] rotate-45 animate-spin-slow"></div>
                <div className="h-[2px] w-24 bg-gradient-to-l from-transparent to-[#785a28]"></div>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {CHAMPIONS.map((champ, idx) => (
                <div 
                  key={champ.id}
                  onClick={() => handleSelectChampion(champ)}
                  className="group relative hextech-border bg-[#091428] cursor-pointer transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden"
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-[#010a13] z-10"></div>
                  <div className="absolute top-4 left-4 z-20">
                     <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-sm shadow-lg uppercase tracking-widest">Leaked Stats</span>
                  </div>
                  <div className="h-80 overflow-hidden relative">
                    <img 
                      src={champ.image} 
                      alt={champ.name} 
                      className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-110" 
                    />
                  </div>
                  <div className="p-8 space-y-4 relative z-20 -mt-20">
                    <div>
                      <h3 className="text-3xl font-black uppercase tracking-tight text-[#c8aa6e] group-hover:text-white transition-colors">{champ.name}</h3>
                      <p className="text-xs text-[#785a28] font-bold uppercase tracking-[0.2em]">{champ.title}</p>
                    </div>
                    <div className="bg-black/60 backdrop-blur-md p-4 border-l-2 border-[#c8aa6e]">
                      <h4 className="text-[10px] text-[#c8aa6e] font-black uppercase mb-1">Curiosidade Oculta:</h4>
                      <p className="text-sm text-gray-300 italic leading-snug line-clamp-3">
                        {champ.lore}
                      </p>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                       <span className="text-[10px] font-black text-[#c8aa6e] uppercase tracking-widest">Ver Build Winrate 98%</span>
                       <div className="w-8 h-[1px] bg-[#785a28]"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentState === AppState.DETAILS && selectedChampion && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 animate-in fade-in slide-in-from-bottom-12 duration-700">
            <div className="lg:col-span-4 space-y-10">
              <div className="hextech-border p-4 bg-[#091428] shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                <img src={selectedChampion.image} alt={selectedChampion.name} className="w-full aspect-[4/5] object-cover rounded-sm" />
              </div>
              
              <div className="bg-[#091428] p-10 border border-[#1e2328] relative">
                <h3 className="text-[#c8aa6e] uppercase font-black tracking-widest mb-6 flex items-center text-sm">
                  <span className="w-3 h-3 bg-[#c8aa6e] mr-3 rotate-45"></span> Lore Secreta
                </h3>
                <p className="text-lg text-[#a09b8c] leading-relaxed italic font-light">"{selectedChampion.lore}"</p>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-10">
              <div className="bg-[#091428] p-12 border border-[#c8aa6e]/20 shadow-2xl relative">
                <h2 className="text-5xl font-black gold-gradient uppercase mb-10 tracking-tighter italic">Análise de Dados Pro</h2>
                
                {loading ? (
                  <div className="animate-pulse space-y-8">
                    <div className="h-8 bg-[#1e2328] w-3/4 rounded-sm"></div>
                    <div className="h-5 bg-[#1e2328] w-full rounded-sm"></div>
                    <div className="h-5 bg-[#1e2328] w-5/6 rounded-sm"></div>
                  </div>
                ) : (
                  <div className="prose prose-invert max-w-none text-[#f0e6d2] text-xl leading-relaxed font-light border-l-4 border-[#c8aa6e] pl-8">
                    {insights}
                  </div>
                )}

                <div className="mt-20 relative">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#091428] px-6 text-red-500 text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">
                    CONTEÚDO BLOQUEADO
                  </div>
                  
                  <div className="relative p-16 rounded-sm bg-[#010a13] border-2 border-dashed border-[#785a28]/40 overflow-hidden group">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center text-center p-12 z-10">
                      <div className="w-20 h-20 rounded-full border-2 border-red-600 flex items-center justify-center mb-8">
                        <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <h4 className="text-3xl font-black uppercase gold-gradient mb-4">Acesso Negado</h4>
                      <p className="text-lg text-gray-400 mb-10 max-w-lg">Detectamos que você não possui uma assinatura <strong>Riot Challenger Pass</strong>. Inscreva-se agora para ver a build completa do {selectedChampion.name}.</p>
                      
                      <button 
                        onClick={() => setCurrentState(AppState.SIGNUP)}
                        className="px-14 py-5 bg-gradient-to-r from-[#c8aa6e] via-[#f0e6d2] to-[#785a28] text-black font-black uppercase tracking-widest hover:brightness-110 transition-all transform hover:scale-105 shadow-[0_0_40px_rgba(200,170,110,0.3)] text-lg"
                      >
                        Desbloquear Grátis
                      </button>
                    </div>

                    <div className="blur-3xl opacity-5 grayscale pointer-events-none">
                      <div className="grid grid-cols-6 gap-6 mb-10">
                        {[1,2,3,4,5,6].map(i => <div key={i} className="aspect-square bg-gray-700"></div>)}
                      </div>
                      <div className="h-10 bg-gray-700 w-full mb-4"></div>
                      <div className="h-10 bg-gray-700 w-3/4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentState === AppState.SIGNUP && (
          <div className="max-w-2xl mx-auto animate-in fade-in zoom-in duration-500 py-12">
            <div className="bg-[#091428] border-2 border-[#c8aa6e] p-16 shadow-[0_0_150px_rgba(0,0,0,0.9)] relative">
              <div className="absolute top-0 left-0 w-full h-2 bg-red-600"></div>
              
              <div className="text-center mb-16">
                <h2 className="text-4xl font-black uppercase gold-gradient tracking-tight italic">Última Validação</h2>
                <p className="text-xs text-red-500 mt-4 font-bold uppercase tracking-[0.4em]">Autenticação Riot Games Necessária</p>
              </div>

              <form onSubmit={handleSignupSubmit} className="space-y-10">
                <div className="space-y-3">
                  <label className="text-xs uppercase font-black tracking-widest text-[#c8aa6e]">Nome de Invocador (IGN)</label>
                  <input 
                    required
                    type="text" 
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="EX: HIDE ON BUSH"
                    className="w-full bg-[#010a13] border-2 border-[#1e2328] p-5 focus:border-[#c8aa6e] transition-all outline-none text-[#f0e6d2] font-black placeholder-gray-800 text-xl tracking-widest"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs uppercase font-black tracking-widest text-[#c8aa6e]">Email de Acesso</label>
                  <input 
                    required
                    type="email" 
                    placeholder="SEUEMAIL@GMAIL.COM"
                    className="w-full bg-[#010a13] border-2 border-[#1e2328] p-5 focus:border-[#c8aa6e] transition-all outline-none text-[#f0e6d2] font-black placeholder-gray-800 text-xl tracking-widest"
                  />
                </div>
                <div className="space-y-6 pt-10 text-center">
                  <button 
                    type="submit"
                    className="w-full py-6 bg-gradient-to-r from-red-700 via-red-500 to-red-800 text-white font-black uppercase tracking-[0.3em] hover:brightness-125 transition-all shadow-[0_10px_50px_rgba(220,38,38,0.4)] text-2xl"
                  >
                    Confirmar Registro
                  </button>
                  <p className="text-[10px] text-[#785a28] font-bold uppercase tracking-widest">
                    Estabelecendo conexão com os servidores da Riot...
                  </p>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-[#1e2328] p-20 text-center text-[#a09b8c] bg-[#091428]/50">
        <div className="max-w-5xl mx-auto space-y-10">
          <p className="uppercase font-black tracking-[0.8em] text-[11px]">© 2025 GOD-TIER DATABASE • PRIVATE ACCESS</p>
          <div className="flex justify-center space-x-12 text-[10px] font-black uppercase tracking-widest opacity-60">
            <span className="hover:text-red-500 cursor-pointer">Segurança Avançada</span>
            <span className="hover:text-red-500 cursor-pointer">Suporte Pro</span>
            <span className="hover:text-red-500 cursor-pointer">Jan 2025 Update</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
