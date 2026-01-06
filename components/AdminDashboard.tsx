
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

  const loadSubmissions = () => {
    const saved = localStorage.getItem('amor_bondade_submissions');
    if (saved) {
      setSubmissions(JSON.parse(saved));
    }
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  const handleDelete = (id: string | undefined) => {
    if (!id) return;
    
    // Pergunta de confirmação solicitada
    if (window.confirm('Tem certeza que deseja excluir?')) {
      const saved = localStorage.getItem('amor_bondade_submissions');
      const currentSubmissions: FormData[] = saved ? JSON.parse(saved) : [];
      const updated = currentSubmissions.filter(s => s.id !== id);
      
      localStorage.setItem('amor_bondade_submissions', JSON.stringify(updated));
      setSubmissions(updated);
    }
  };

  const filteredSubmissions = submissions.filter(s => 
    s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.cpf.includes(searchTerm) ||
    s.id?.includes(searchTerm)
  );

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">Painel Administrativo</h2>
          <p className="text-slate-500 font-bold text-sm uppercase tracking-widest mt-1">Gestão de Rematrículas 2026</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto items-center">
          <div className="relative w-full md:w-80">
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input 
              type="text" 
              placeholder="Buscar aluno ou CPF..."
              className="w-full pl-12 pr-4 py-3 bg-white border-2 border-slate-100 rounded-2xl focus:border-[#1d5ba5] outline-none transition-all font-bold text-slate-700 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Botão para sair da página do administrador */}
          <button 
            onClick={onLogout}
            className="px-6 py-3.5 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-black transition-all shadow-lg active:scale-95"
          >
            <i className="fa-solid fa-right-from-bracket"></i> Sair do Painel
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[30px] border border-slate-100 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Nº</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Data e Horário</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Aluno</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">CPF</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Atividades</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredSubmissions.length > 0 ? filteredSubmissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg font-black text-xs">
                      {sub.id}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs font-black text-slate-700">
                      {sub.submissionDate ? new Date(sub.submissionDate).toLocaleDateString('pt-BR') : '-'}
                    </p>
                    <p className="text-[10px] font-bold text-blue-600 uppercase">
                      <i className="fa-regular fa-clock mr-1"></i>
                      {sub.submissionDate ? new Date(sub.submissionDate).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : '-'}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-black text-slate-800 uppercase text-sm leading-tight">{sub.fullName}</p>
                    <p className="text-[10px] text-slate-400 font-bold">{sub.whatsapp || 'Sem contato'}</p>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-slate-500">{sub.cpf}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {sub.selectedActivities.map(sa => {
                        const act = ACTIVITIES.find(a => a.id === sa.activityId);
                        return (
                          <span key={sa.activityId} className="px-2 py-0.5 bg-blue-50 text-[#1d5ba5] text-[8px] font-black rounded-md uppercase border border-blue-100">
                            {act?.name}
                          </span>
                        );
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => onViewDetails(sub)}
                        className="w-10 h-10 flex items-center justify-center bg-blue-50 text-[#1d5ba5] rounded-xl hover:bg-[#1d5ba5] hover:text-white transition-all shadow-sm active:scale-90"
                        title="Ver Ficha"
                      >
                        <i className="fa-solid fa-eye"></i>
                      </button>
                      <button 
                        onClick={() => handleDelete(sub.id)}
                        className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all active:scale-90"
                        title="Apagar Registro"
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-6 py-24 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                        <i className="fa-solid fa-folder-open text-4xl"></i>
                      </div>
                      <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Nenhum cadastro encontrado</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 px-4">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Total de rematrículas: <span className="text-slate-900">{filteredSubmissions.length}</span>
        </p>
        <div className="flex gap-4">
          <button 
            onClick={() => {
              const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(submissions));
              const downloadAnchorNode = document.createElement('a');
              downloadAnchorNode.setAttribute("href", dataStr);
              downloadAnchorNode.setAttribute("download", `rematriculas_2026.json`);
              document.body.appendChild(downloadAnchorNode);
              downloadAnchorNode.click();
              downloadAnchorNode.remove();
            }}
            className="text-[10px] font-black text-[#1d5ba5] uppercase tracking-widest flex items-center gap-2 hover:bg-blue-50 px-4 py-2 rounded-xl transition-all"
          >
            <i className="fa-solid fa-file-export"></i> Exportar JSON
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
