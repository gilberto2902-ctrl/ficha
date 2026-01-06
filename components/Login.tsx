
import React, { useState } from 'react';

interface LoginProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const Login: React.FC<LoginProps> = ({ onSuccess, onCancel }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'amor2026') {
      onSuccess();
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="flex items-center justify-center py-10 animate-in fade-in zoom-in-95 duration-500">
      <div className="bg-white w-full max-w-md rounded-[40px] p-10 shadow-2xl border border-white">
        <div className="text-center mb-10 mt-4">
          <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">ACESSO</h1>
          <h2 className="text-xl font-black text-slate-400 uppercase tracking-tight">Administrativo</h2>
          <p className="text-slate-300 text-[10px] font-bold uppercase tracking-[0.2em] mt-4">Associação Amor e Bondade</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider ml-1">Usuário</label>
            <div className="relative">
              <i className="fa-solid fa-user absolute left-5 top-1/2 -translate-y-1/2 text-slate-300"></i>
              <input 
                type="text"
                placeholder="Ex: admin"
                className="w-full pl-12 pr-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-slate-900 outline-none transition-all font-bold text-slate-800"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError(false); }}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider ml-1">Senha</label>
            <div className="relative">
              <i className="fa-solid fa-lock absolute left-5 top-1/2 -translate-y-1/2 text-slate-300"></i>
              <input 
                type="password"
                placeholder="••••••••"
                className={`w-full pl-12 pr-6 py-4 bg-slate-50 border-2 rounded-2xl outline-none transition-all font-bold text-slate-800 ${error ? 'border-red-500 animate-shake' : 'border-slate-100 focus:border-slate-900'}`}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(false); }}
                required
              />
            </div>
            {error && <p className="text-red-500 text-[10px] font-black uppercase text-center mt-2">Credenciais Inválidas</p>}
          </div>

          <div className="pt-4 flex flex-col gap-4">
            <button 
              type="submit"
              className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl active:scale-95"
            >
              Entrar no Sistema
            </button>
            <button 
              type="button"
              onClick={onCancel}
              className="w-full py-4 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-slate-600 transition-colors"
            >
              Voltar ao Formulário
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
