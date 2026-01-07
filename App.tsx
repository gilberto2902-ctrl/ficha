
import React, { useState, useEffect, useRef } from 'react';
import Input from './components/Input';
import StepProgress from './components/StepProgress';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';
import { ACTIVITIES, FORM_STEPS } from './constants';
import { FormData, SelectedActivity } from './types';

const INITIAL_DATA: FormData = {
  fullName: '', birthPlace: '', birthDate: '', age: '', rg: '', issuingBody: '', issueDate: '', cpf: '', gender: '',
  hasChildren: '', childrenCount: '', isDisabled: '', disabilityType: '', schoolName: '', schoolingLevel: '',
  schoolGrade: '', schoolPeriod: '', extraCourseStatus: '', extraCourseName: '', address: '', addressNo: '',
  city: 'Guarulhos', neighborhood: '', complement: '', zipCode: '', referencePoint: '', whatsapp: '', email: '',
  parentWhatsapp: '', telRecado: '', housingType: '', housingValue: '', cedidaBy: '', constructionType: '',
  roomCount: '', parentsLiveTogether: '', peopleInHouse: '', livesWith: [], fatherName: '', fatherBirthDate: '',
  fatherDeceased: 'Não', fatherProfession: '', fatherSalary: '', fatherUnemployed: 'Não', motherName: '',
  motherBirthDate: '', motherDeceased: 'Não', motherProfession: '', motherSalary: '', motherUnemployed: 'Não',
  workingCountRegistered: '', workingCountAutonomous: '', pensionCount: '', familyIncome: '', hasMedicalInsurance: 'Não',
  crasReferenced: 'Não', crasDetails: '', hasCadUnico: '', benefits: { bolsaFamilia: '', bpcLoas: '', idJovem: '', outros: '' },
  healthTreatment: 'Não', healthDetails: '', continuousMedication: 'Não', medicationDetails: '', selectedActivities: [],
  imageRightsConsent: false, veracityConsent: false
};

const DocumentPreview: React.FC<{ data: FormData; onClose: () => void; isAdmin: boolean; onFinalConfirm: () => void }> = ({ data, onClose, isAdmin, onFinalConfirm }) => {
  const formattedTime = data.submissionDate 
    ? new Date(data.submissionDate).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : '--:--:--';
  const formattedDate = data.submissionDate 
    ? new Date(data.submissionDate).toLocaleDateString('pt-BR')
    : '--/--/----';

  const handleDownloadPDF = () => {
    const element = document.getElementById('printable-root');
    if (!element) {
      window.print();
      return;
    }

    // Ajustamos as margens e a escala para garantir que o conteúdo não seja cortado à direita
    const opt = {
      margin: [10, 10, 10, 10], // Aumentamos as margens de segurança (topo, esquerda, baixo, direita)
      filename: `FICHA_2026_${data.fullName.replace(/\s+/g, '_').toUpperCase()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true, 
        letterRendering: true,
        scrollY: 0,
        scrollX: 0,
        backgroundColor: '#ffffff'
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // @ts-ignore
    if (window && (window as any).html2pdf) {
      // @ts-ignore
      window.html2pdf().set(opt).from(element).save();
    } else {
      window.print();
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-slate-900/95 backdrop-blur-xl flex items-center justify-center p-0 md:p-6 print-container overflow-y-auto">
      <div className="bg-white w-full max-w-4xl min-h-screen md:min-h-0 md:rounded-[40px] shadow-2xl animate-in print-content mb-10 overflow-hidden">
        
        <div className="sticky top-0 bg-white border-b border-slate-100 p-6 flex justify-between items-center z-10 no-print">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            <h3 className="font-black uppercase tracking-widest text-[10px] text-slate-400">
              Visualização da Ficha Digital
            </h3>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition-all">
            <i className="fa-solid fa-xmark text-slate-400"></i>
          </button>
        </div>

        <div className="p-4 md:p-8 bg-slate-50 overflow-y-auto max-h-[75vh] no-print">
           <p className="text-[10px] font-bold text-slate-400 text-center uppercase mb-4">Confira os dados abaixo antes de gerar o PDF</p>
        </div>

        {/* 
          Ajuste de largura: A4 tem 210mm. 
          Definimos a largura do conteúdo para 190mm para deixar 10mm de margem em cada lado, 
          evitando que o conteúdo encoste ou saia pela direita.
        */}
        <div id="printable-root" className="bg-white p-[5mm] mx-auto" style={{ width: '190mm' }}>
          <div className="border-4 border-slate-900 p-8 relative flex flex-col">
            <div className="flex justify-between items-start mb-8">
               <div className="flex items-center gap-4">
                 <div>
                   <h1 className="text-xl font-black uppercase text-slate-900 leading-none">Associação Amor e Bondade</h1>
                   <p className="text-[10px] font-bold text-slate-500 uppercase mt-1 tracking-widest">Ficha de Inscrição 2026 - Digital</p>
                 </div>
               </div>
               <div className="border-2 border-slate-900 px-6 py-4 rounded-lg text-center bg-slate-50">
                 <p className="text-[8px] font-black uppercase text-slate-400 mb-1">Inscrição Nº</p>
                 <p className="text-xl font-black text-slate-900">{data.id}</p>
                 <p className="text-[7px] font-bold text-slate-400 uppercase mt-1">Hora: {formattedTime}</p>
               </div>
            </div>

            <div className="space-y-6 text-[11px] leading-relaxed">
              <section>
                <h4 className="font-black uppercase text-[#1d5ba5] mb-2 border-b-2 border-slate-900 pb-1">1. Dados do Aluno</h4>
                <div className="grid grid-cols-2 gap-y-2">
                  <p className="col-span-2"><strong>NOME DO ALUNO:</strong> {data.fullName.toUpperCase()}</p>
                  <p><strong>DATA DE NASCIMENTO:</strong> {data.birthDate} ({data.age} ANOS)</p>
                  <p><strong>CPF:</strong> {data.cpf}</p>
                  <p><strong>RG:</strong> {data.rg || '---'}</p>
                  <p><strong>SEXO:</strong> {data.gender === 'F' ? 'FEMININO' : 'MASCULINO'}</p>
                  <p><strong>DEFICIENTE:</strong> {data.isDisabled === 'Sim' ? `SIM - ${data.disabilityType}` : 'NÃO'}</p>
                </div>
              </section>

              <section>
                <h4 className="font-black uppercase text-[#1d5ba5] mb-2 border-b-2 border-slate-900 pb-1">2. Escolaridade</h4>
                <div className="grid grid-cols-2 gap-y-2">
                  <p className="col-span-2"><strong>ESCOLA:</strong> {data.schoolName.toUpperCase()}</p>
                  <p><strong>SÉRIE EM 2026:</strong> {data.schoolGrade}</p>
                  <p><strong>PERÍODO:</strong> {data.schoolPeriod.toUpperCase()}</p>
                </div>
              </section>

              <section>
                <h4 className="font-black uppercase text-[#1d5ba5] mb-2 border-b-2 border-slate-900 pb-1">3. Endereço e Moradia</h4>
                <div className="grid grid-cols-2 gap-y-2">
                  <p className="col-span-2"><strong>ENDEREÇO:</strong> {data.address}, {data.addressNo} - {data.neighborhood}</p>
                  <p><strong>MORADIA:</strong> {data.housingType}</p>
                  <p><strong>CONSTRUÇÃO:</strong> {data.constructionType}</p>
                  <p className="col-span-2"><strong>CONTATO WHATSAPP:</strong> {data.whatsapp}</p>
                </div>
              </section>

              <section>
                <h4 className="font-black uppercase text-[#1d5ba5] mb-2 border-b-2 border-slate-900 pb-1">4. Benefícios Sociais</h4>
                <div className="grid grid-cols-2 gap-y-2">
                  <p><strong>BOLSA FAMÍLIA:</strong> {data.benefits.bolsaFamilia}</p>
                  <p><strong>BPC/LOAS:</strong> {data.benefits.bpcLoas}</p>
                  <p><strong>ID JOVEM:</strong> {data.benefits.idJovem}</p>
                  <p><strong>OUTROS:</strong> {data.benefits.outros}</p>
                </div>
              </section>

              <section>
                <h4 className="font-black uppercase text-[#1d5ba5] mb-2 border-b-2 border-slate-900 pb-1">5. Atividades Selecionadas para 2026</h4>
                <div className="grid grid-cols-1 gap-2 bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <div className="flex flex-wrap gap-4">
                    {data.selectedActivities.map(sa => {
                      const act = ACTIVITIES.find(a => a.id === sa.activityId);
                      return act ? (
                        <div key={act.id} className="bg-white border-2 border-slate-900 px-4 py-2 rounded font-black uppercase text-[10px] shadow-sm">
                          {act.name}
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              </section>

              <div className="pt-12 border-t border-slate-200 flex justify-between items-end mt-auto">
                <div className="space-y-1">
                   <p className="font-black uppercase text-[8px] text-slate-400">Data e Hora do Cadastro:</p>
                   <p className="text-[10px] font-black text-slate-900">{formattedDate} às {formattedTime}</p>
                   <p className="text-[7px] text-slate-300 font-bold uppercase italic">Validado via Plataforma Digital Amor e Bondade</p>
                </div>
                <div className="text-center w-64">
                  <div className="border-t-2 border-slate-900 mt-4 pt-2 font-black uppercase text-[9px]">Assinatura do Responsável</div>
                  <p className="text-[7px] text-slate-400 mt-1 uppercase font-bold">Identificado via CPF: {data.cpf}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 bg-white border-t border-slate-100 no-print">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <button 
              onClick={handleDownloadPDF} 
              className="py-5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-3 active:scale-95"
            >
              <i className="fa-solid fa-file-pdf text-xl"></i> Baixar em PDF
            </button>
            <button 
              onClick={onFinalConfirm} 
              className="py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-black transition-all flex items-center justify-center gap-3 active:scale-95"
            >
              <i className="fa-solid fa-check text-xl"></i> Finalizar Cadastro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [view, setView] = useState<'form' | 'admin' | 'login' | 'success'>('form');
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [showDocPreview, setShowDocPreview] = useState(false);
  const [previewData, setPreviewData] = useState<FormData | null>(null);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const authStatus = sessionStorage.getItem('amor_bondade_auth');
    if (authStatus === 'true') setIsAuth(true);
  }, []);

  const handleInputChange = (field: keyof FormData, value: any) => setFormData(prev => ({ ...prev, [field]: value }));
  const handleBenefitChange = (benefit: keyof FormData['benefits'], value: string) => setFormData(prev => ({ ...prev, benefits: { ...prev.benefits, [benefit]: value } }));

  const toggleActivity = (activityId: string) => {
    const isSelected = formData.selectedActivities.some(a => a.activityId === activityId);
    if (isSelected) {
      setFormData(prev => ({ ...prev, selectedActivities: prev.selectedActivities.filter(a => a.activityId !== activityId) }));
    } else {
      if (formData.selectedActivities.length >= 2) { alert("Máximo 2 atividades."); return; }
      setFormData(prev => ({ ...prev, selectedActivities: [...prev.selectedActivities, { activityId }] }));
    }
  };

  const handleNextStep = () => {
    if (step === 0 && (!formData.fullName.trim() || !formData.cpf.trim())) { alert('Nome e CPF obrigatórios.'); return; }
    setStep(s => Math.min(FORM_STEPS.length - 1, s + 1));
  };

  const handleFinalAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.selectedActivities.length === 0) { alert('Selecione pelo menos 1 atividade.'); setStep(5); return; }
    if (!formData.imageRightsConsent || !formData.veracityConsent) { alert('Aceite os termos para continuar.'); return; }
    
    const subDate = new Date().toISOString();
    const newId = `${new Date().getFullYear()}${Math.floor(1000 + Math.random() * 9000)}`;
    const newSub = { ...formData, id: newId, submissionDate: subDate };
    
    const saved = localStorage.getItem('amor_bondade_submissions');
    const subs = saved ? JSON.parse(saved) : [];
    subs.push(newSub);
    localStorage.setItem('amor_bondade_submissions', JSON.stringify(subs));
    
    setPreviewData(newSub);
    setShowDocPreview(true);
  };

  const MultiChoiceGroup = ({ label, options, value, onChange, gridCols = "grid-cols-2", colorClass = "bg-[#1d5ba5]" }: { label: string; options: string[]; value: string; onChange: (v: any) => void; gridCols?: string; colorClass?: string }) => (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase text-[#1d5ba5] tracking-widest">{label}</label>
      <div className={`grid ${gridCols} gap-2`}>
        {options.map(opt => (
          <button 
            key={opt} type="button" onClick={() => onChange(opt)}
            className={`py-3 px-4 rounded-xl border-2 font-bold text-[10px] uppercase transition-all ${value === opt ? `${colorClass} text-white border-transparent shadow-lg scale-[1.02]` : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200'}`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  const CheckboxGroup = ({ label, options, values, onChange }: { label: string; options: string[]; values: string[]; onChange: (v: string[]) => void }) => (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase text-[#1d5ba5] tracking-widest">{label}</label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {options.map(opt => (
          <button 
            key={opt} type="button" 
            onClick={() => {
              const newValues = values.includes(opt) ? values.filter(v => v !== opt) : [...values, opt];
              onChange(newValues);
            }}
            className={`py-3 px-4 rounded-xl border-2 font-bold text-[9px] uppercase transition-all ${values.includes(opt) ? 'bg-orange-500 text-white border-transparent shadow-md' : 'bg-white text-slate-400 border-slate-100'}`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 0: return (
        <div className="space-y-6 animate-in">
          <h2 className="text-xl font-black text-slate-800 uppercase">1. Dados do Aluno</h2>
          <Input label="Nome do Aluno" value={formData.fullName} onChange={e => handleInputChange('fullName', e.target.value)} required />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Naturalidade/UF" value={formData.birthPlace} onChange={e => handleInputChange('birthPlace', e.target.value)} />
            <Input label="Data de Nascimento" type="date" value={formData.birthDate} onChange={e => handleInputChange('birthDate', e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Idade Atual" type="number" value={formData.age} onChange={e => handleInputChange('age', e.target.value)} />
            <Input label="CPF" placeholder="000.000.000-00" value={formData.cpf} onChange={e => handleInputChange('cpf', e.target.value)} required />
          </div>
          <MultiChoiceGroup label="Sexo" options={['F', 'M']} value={formData.gender} onChange={v => handleInputChange('gender', v)} />
          <div className="grid grid-cols-2 gap-4 items-end">
            <MultiChoiceGroup label="Deficiente?" options={['Sim', 'Não']} value={formData.isDisabled} onChange={v => handleInputChange('isDisabled', v)} />
            {formData.isDisabled === 'Sim' && <Input label="Qual deficiência?" value={formData.disabilityType} onChange={e => handleInputChange('disabilityType', e.target.value)} />}
          </div>
        </div>
      );
      case 1: return (
        <div className="space-y-6 animate-in">
          <h2 className="text-xl font-black text-slate-800 uppercase">2. Escolaridade</h2>
          <Input label="Nome da Escola" value={formData.schoolName} onChange={e => handleInputChange('schoolName', e.target.value)} />
          <Input label="Série em 2026" value={formData.schoolGrade} onChange={e => handleInputChange('schoolGrade', e.target.value)} />
          <MultiChoiceGroup label="Período" options={['Manhã', 'Tarde', 'Noite', 'Integral', 'Não']} value={formData.schoolPeriod} onChange={v => handleInputChange('schoolPeriod', v)} />
        </div>
      );
      case 2: return (
        <div className="space-y-6 animate-in">
          <h2 className="text-xl font-black text-slate-800 uppercase">3. Endereço & Moradia</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-3"><Input label="Logradouro" value={formData.address} onChange={e => handleInputChange('address', e.target.value)} /></div>
            <Input label="Nº" value={formData.addressNo} onChange={e => handleInputChange('addressNo', e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Bairro" value={formData.neighborhood} onChange={e => handleInputChange('neighborhood', e.target.value)} />
            <Input label="Cidade" value={formData.city} onChange={e => handleInputChange('city', e.target.value)} />
          </div>
          <Input label="WhatsApp para Contato" value={formData.whatsapp} onChange={e => handleInputChange('whatsapp', e.target.value)} placeholder="(11) 90000-0000" />
          <MultiChoiceGroup label="Tipo de Moradia" options={['Própria', 'Alugada', 'Financiada/CDHU', 'Cedida']} value={formData.housingType} onChange={v => handleInputChange('housingType', v)} />
          <MultiChoiceGroup label="Tipo de Construção" options={['Bloco', 'Madeira', 'Mista', 'Palafita']} value={formData.constructionType} onChange={v => handleInputChange('constructionType', v)} />
        </div>
      );
      case 3: return (
        <div className="space-y-6 animate-in">
          <h2 className="text-xl font-black text-slate-800 uppercase">4. Dados Familiares</h2>
          <Input label="Nome do Pai" value={formData.fatherName} onChange={e => handleInputChange('fatherName', e.target.value)} />
          <Input label="Nome da Mãe" value={formData.motherName} onChange={e => handleInputChange('motherName', e.target.value)} />
          <div className="bg-slate-50 p-6 rounded-[32px] space-y-4 border-2 border-slate-100">
             <p className="font-black text-[10px] text-blue-600 uppercase">Composição Familiar</p>
             <CheckboxGroup label="Mora Com" options={['Mãe', 'Pai', 'Irmãos', 'Avós', 'Filho', 'Madrasta', 'Padrasto', 'Outros']} values={formData.livesWith} onChange={v => handleInputChange('livesWith', v)} />
          </div>
        </div>
      );
      case 4: return (
        <div className="space-y-6 animate-in">
          <h2 className="text-xl font-black text-slate-800 uppercase">5. Socioeconômico (Benefícios)</h2>
          <div className="bg-slate-50 p-6 rounded-[32px] border-2 border-slate-100 space-y-6">
            <MultiChoiceGroup label="Recebe Bolsa Família?" options={['Sim', 'Não']} value={formData.benefits.bolsaFamilia} onChange={v => handleBenefitChange('bolsaFamilia', v)} colorClass="bg-green-600" />
            <MultiChoiceGroup label="Recebe BPC/LOAS?" options={['Sim', 'Não']} value={formData.benefits.bpcLoas} onChange={v => handleBenefitChange('bpcLoas', v)} colorClass="bg-green-600" />
            <MultiChoiceGroup label="Possui ID Jovem?" options={['Sim', 'Não']} value={formData.benefits.idJovem} onChange={v => handleBenefitChange('idJovem', v)} colorClass="bg-green-600" />
            <MultiChoiceGroup label="Outros Benefícios?" options={['Sim', 'Não']} value={formData.benefits.outros} onChange={v => handleBenefitChange('outros', v)} colorClass="bg-green-600" />
          </div>
        </div>
      );
      case 5: return (
        <div className="space-y-6 animate-in">
          <h2 className="text-xl font-black text-slate-800 uppercase">6. Atividade & Saúde</h2>
          <div className="bg-white border-2 border-slate-100 p-6 rounded-[32px] space-y-4 shadow-sm">
            <MultiChoiceGroup label="Tratamento Médico?" options={['Sim', 'Não']} value={formData.healthTreatment} onChange={v => handleInputChange('healthTreatment', v)} />
            <MultiChoiceGroup label="Medicação Contínua?" options={['Sim', 'Não']} value={formData.continuousMedication} onChange={v => handleInputChange('continuousMedication', v)} />
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase text-blue-600">Selecione até 2 Atividades</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {ACTIVITIES.map(act => (
                <button key={act.id} type="button" onClick={() => toggleActivity(act.id)} className={`p-4 text-left border-2 rounded-2xl transition-all ${formData.selectedActivities.some(a => a.activityId === act.id) ? 'bg-[#1d5ba5] text-white border-transparent shadow-md' : 'bg-white text-slate-700 border-slate-100 hover:border-slate-200'}`}>
                  <p className="font-black text-xs uppercase">{act.name}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      );
      case 6: return (
        <div className="space-y-6 animate-in">
          <h2 className="text-xl font-black text-slate-800 uppercase">7. Confirmação Final</h2>
          <div className="bg-white p-8 rounded-[32px] border-4 border-slate-50 space-y-8 shadow-inner">
            <p className="text-[11px] font-bold text-slate-400 leading-relaxed italic uppercase">DECLARO A VERACIDADE DAS INFORMAÇÕES ACIMA DECLARADA E ME COMPROMETO A MANTER AS MESMAS ATUALIZADAS. CASO SEJA DETECTADO QUALQUER INVERACIDADE, O CANDIDATO SERÁ DESLIGADO DO PROCESSO A QUALQUER MOMENTO.</p>
            <label className="flex items-start gap-4 cursor-pointer group">
              <input type="checkbox" checked={formData.imageRightsConsent} onChange={e => handleInputChange('imageRightsConsent', e.target.checked)} className="w-6 h-6 accent-blue-600 cursor-pointer mt-1" />
              <span className="text-[11px] font-black uppercase text-slate-600 leading-tight">Autorizo o uso de imagem e voz para fins institucionais da Amor e Bondade.</span>
            </label>
            <label className="flex items-start gap-4 cursor-pointer group">
              <input type="checkbox" checked={formData.veracityConsent} onChange={e => handleInputChange('veracityConsent', e.target.checked)} className="w-6 h-6 accent-orange-500 cursor-pointer mt-1" />
              <span className="text-[11px] font-black uppercase text-slate-600 leading-tight">Declaro que li e concordo com todos os termos e veracidades.</span>
            </label>
          </div>
        </div>
      );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center pb-20">
      {showDocPreview && previewData && (
        <DocumentPreview data={previewData} isAdmin={view === 'admin'} onClose={() => { setShowDocPreview(false); if(view === 'form'){ setView('success'); setFormData(INITIAL_DATA); setStep(0); } }} onFinalConfirm={() => { setView('success'); setShowDocPreview(false); }} />
      )}
      <div className="w-full max-w-5xl px-4 py-8">
        {view === 'form' ? (
          <div className="animate-in">
            <header className="mb-10 text-center">
              <h1 className="text-4xl md:text-7xl font-black text-[#1d5ba5] uppercase tracking-tighter leading-none">Amor e Bondade</h1>
              <p className="text-orange-500 font-bold uppercase tracking-[0.4em] text-[10px] mt-2">Rematrícula 2026</p>
            </header>
            <main className="bg-white rounded-[48px] p-6 md:p-14 shadow-2xl border-4 border-white relative">
              <StepProgress currentStep={step} />
              <form onSubmit={handleFinalAction}>
                <div className="min-h-[450px]">{renderStep()}</div>
                <div className="flex justify-between mt-12 pt-8 border-t border-slate-50">
                  <button type="button" onClick={() => setStep(s => Math.max(0, s-1))} className={`px-8 py-3 rounded-2xl font-black text-xs uppercase transition-all ${step === 0 ? 'invisible' : 'bg-slate-50 text-slate-300 hover:bg-slate-100 hover:text-slate-900'}`}>Anterior</button>
                  {step < FORM_STEPS.length - 1 ? (
                    <button type="button" onClick={handleNextStep} className="px-12 py-4 bg-[#1d5ba5] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-blue-800 transition-all">Próximo Passo</button>
                  ) : (
                    <button type="submit" className="px-12 py-5 bg-orange-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-orange-700 transition-all">Gerar Ficha Digital</button>
                  )}
                </div>
              </form>
            </main>
          </div>
        ) : view === 'success' ? (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-in">
            <div className="w-32 h-32 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-6xl mb-8 shadow-inner border-2 border-green-100"><i className="fa-solid fa-check"></i></div>
            <h2 className="text-5xl font-black text-slate-900 uppercase tracking-tighter">Inscrição Enviada!</h2>
            <button onClick={() => { setView('form'); setStep(0); setFormData(INITIAL_DATA); }} className="mt-12 px-14 py-5 bg-[#1d5ba5] text-white rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-blue-800 transition-all">Nova Inscrição</button>
          </div>
        ) : view === 'login' ? (
          <Login onSuccess={() => { setIsAuth(true); sessionStorage.setItem('amor_bondade_auth', 'true'); setView('admin'); }} onCancel={() => setView('form')} />
        ) : (
          <AdminDashboard onViewDetails={(data) => { setPreviewData(data); setShowDocPreview(true); }} onLogout={() => { setIsAuth(false); setView('form'); }} />
        )}
      </div>
      <footer className="mt-auto py-10 w-full flex flex-col md:flex-row items-center justify-center gap-6 text-slate-300 font-bold text-[10px] uppercase tracking-widest">
        <p>© 2025 Associação Amor e Bondade</p>
        <div className="flex gap-4">
          <button onClick={() => setView('form')} className="hover:text-[#1d5ba5] transition-colors">Formulário</button>
          <button onClick={() => isAuth ? setView('admin') : setView('login')} className="hover:text-slate-900 transition-colors">Administração</button>
        </div>
      </footer>
    </div>
  );
};

export default App;
