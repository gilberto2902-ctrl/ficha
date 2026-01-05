
import React, { useState, useEffect } from 'react';
import { FormData } from '../types';
import { ACTIVITIES } from '../constants';

interface AdminDashboardProps {
  onViewDetails: (data: FormData) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onViewDetails }) => {
  const [submissions, setSubmissions] = useState<FormData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('amor_bondade_submissions');
    if (saved) {
      setSubmissions(JSON.parse(saved));
    }
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja remover esta matrícula?')) {
      const updated = submissions.filter(s => s.id !== id);
      setSubmissions(updated);
      localStorage.setItem('amor_bondade_submissions', JSON.stringify(updated));
    }
  };

  const filteredSubmissions = submissions.filter(s => 
    s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.cpf.includes(searchTerm) ||
    s.id?.includes(searchTerm)
  );

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">Painel Administrativo</h2>
          <p className="text-slate-500 font-bold text-sm uppercase tracking-widest mt-1">Gestão de Rematrículas 2026</p>
        </div>
        <div className="relative w-full md:w-96">
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <input 
            type="text" 
            placeholder="Buscar por ID, nome ou CPF..."
            className="w-full pl-12 pr-4 py-3 bg-white border-2 border-slate-100 rounded-2xl focus:border-[#1d5ba5] outline-none transition-all font-bold text-slate-700 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-[30px] border border-slate-100 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">ID</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Data</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Aluno</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">CPF</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Atividades</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredSubmissions.length > 0 ? filteredSubmissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded font-black text-xs">
                      {sub.id}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-slate-500">
                    {sub.submissionDate ? new Date(sub.submissionDate).toLocaleDateString('pt-BR') : '-'}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-black text-slate-800 uppercase text-sm">{sub.fullName}</p>
                    <p className="text-[10px] text-slate-400 font-bold">{sub.whatsapp || 'Sem Telefone'}</p>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-600">{sub.cpf}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {sub.selectedActivities.map(sa => {
                        const act = ACTIVITIES.find(a => a.id === sa.activityId);
                        return (
                          <span key={sa.activityId} className="px-2 py-1 bg-blue-100 text-[#1d5ba5] text-[9px] font-black rounded-full uppercase">
                            {act?.name}
                          </span>
                        );
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => onViewDetails(sub)}
                        className="w-10 h-10 flex items-center justify-center bg-[#1d5ba5] text-white rounded-xl hover:bg-blue-800 transition-all shadow-md active:scale-90"
                        title="Ver Ficha Completa"
                      >
                        <i className="fa-solid fa-file-lines"></i>
                      </button>
                      <button 
                        onClick={() => handleDelete(sub.id!)}
                        className="w-10 h-10 flex items-center justify-center bg-red-100 text-red-500 rounded-xl hover:bg-red-200 transition-all active:scale-90"
                        title="Excluir"
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <i className="fa-solid fa-inbox text-5xl text-slate-200"></i>
                      <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Nenhuma rematrícula encontrada</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center px-4">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Total: {filteredSubmissions.length} registro(s)
        </p>
        <button 
          onClick={() => {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(submissions));
            const downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href", dataStr);
            downloadAnchorNode.setAttribute("download", `rematriculas_2026_${new Date().toLocaleDateString()}.json`);
            document.body.appendChild(downloadAnchorNode);
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
          }}
          className="text-xs font-black text-[#1d5ba5] uppercase tracking-widest flex items-center gap-2 hover:underline"
        >
          <i className="fa-solid fa-download"></i> Exportar Dados (JSON)
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
