
import React, { useState, useEffect } from 'react';
import { FormData } from '../types';
import { ACTIVITIES } from '../constants';

interface AdminDashboardProps {
  onViewDetails: (data: FormData) => void;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onViewDetails, onLogout }) => {
  const [submissions, setSubmissions] = useState<FormData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('amor_bondade_submissions');
      if (saved) {
        setSubmissions(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Erro ao carregar submissões:", e);
      setSubmissions([]);
    }
  }, []);

  const handleDelete = (id: string | undefined) => {
    if (!id || !window.confirm('Excluir este registro permanentemente?')) return;
    const updated = submissions.filter(s => s.id !== id);
    localStorage.setItem('amor_bondade_submissions', JSON.stringify(updated));
    setSubmissions(updated);
  };

  const filtered = submissions.filter(s => 
    s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.cpf.includes(searchTerm)
  );

  return (
    <div className="animate-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Gestão de Rematrículas</h2>
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Controle Interno Amor e Bondade</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <input 
            type="text" 
            placeholder="Buscar por nome ou CPF..." 
            className="flex-1 md:w-64 px-4 py-2 bg-white border-2 border-slate-100 rounded-xl outline-none focus:border-blue-600 transition-all font-bold text-xs"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <button onClick={onLogout} className="px-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">Sair</button>
        </div>
      </div>

      <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-slate-400">Horário</th>
                <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-slate-400">Aluno / CPF</th>
                <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-slate-400 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length > 0 ? filtered.map(sub => (
                <tr key={sub.id} className="hover:bg-blue-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <p className="text-sm font-black text-[#1d5ba5]">{sub.submissionDate ? new Date(sub.submissionDate).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : '--:--'}</p>
                    <p className="text-[9px] text-slate-300 font-bold">{sub.submissionDate ? new Date(sub.submissionDate).toLocaleDateString('pt-BR') : ''}</p>
                  </td>
                  <td className="px-8 py-5">
                    <p className="font-black text-slate-800 uppercase text-xs leading-tight">{sub.fullName}</p>
                    <p className="text-[10px] text-slate-400 font-bold tracking-tighter">{sub.cpf}</p>
                  </td>
                  <td className="px-8 py-5 text-right space-x-2">
                    <button onClick={() => onViewDetails(sub)} className="w-10 h-10 inline-flex items-center justify-center bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"><i className="fa-solid fa-eye"></i></button>
                    <button onClick={() => handleDelete(sub.id)} className="w-10 h-10 inline-flex items-center justify-center bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><i className="fa-solid fa-trash"></i></button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={3} className="px-8 py-20 text-center text-slate-300 font-black uppercase text-xs tracking-widest">Nenhum registro encontrado</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
