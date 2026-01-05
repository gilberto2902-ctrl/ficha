
import React, { useState, useEffect } from 'react';
import Input from './components/Input';
import StepProgress from './components/StepProgress';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';
import { ACTIVITIES, FORM_STEPS } from './constants';
import { FormData, SelectedActivity } from './types';

const INITIAL_DATA: FormData = {
  fullName: '',
  birthPlace: '',
  birthDate: '',
  age: '',
  rg: '',
  issuingBody: '',
  issueDate: '',
  cpf: '',
  gender: '',
  hasChildren: '',
  childrenCount: '',
  isDisabled: false,
  disabilityType: '',
  schoolName: '',
  schoolingLevel: '',
  schoolGrade: '',
  schoolPeriod: '',
  extraCourseStatus: '',
  extraCourseName: '',
  address: '',
  addressNo: '',
  city: 'Guarulhos',
  neighborhood: '',
  complement: '',
  zipCode: '',
  referencePoint: '',
  whatsapp: '',
  email: '',
  parentWhatsapp: '',
  telRecado: '',
  housingType: '',
  housingValue: '',
  cedidaBy: '',
  constructionType: '',
  roomCount: '',
  parentsLiveTogether: '',
  peopleInHouse: '',
  livesWith: [],
  fatherName: '',
  fatherBirthDate: '',
  fatherDeceased: 'Não',
  fatherProfession: '',
  fatherSalary: '',
  fatherUnemployed: 'Não',
  motherName: '',
  motherBirthDate: '',
  motherDeceased: 'Não',
  motherProfession: '',
  motherSalary: '',
  motherUnemployed: 'Não',
  workingCountRegistered: '',
  workingCountAutonomous: '',
  pensionCount: '',
  familyIncome: '',
  hasMedicalInsurance: 'Não',
  crasReferenced: 'Não',
  crasDetails: '',
  hasCadUnico: 'Não',
  benefits: { bolsaJovem: '', bolsaFamilia: '', bpcLoas: '', auxAluguel: '' },
  healthTreatment: 'Não',
  healthDetails: '',
  continuousMedication: 'Não',
  medicationDetails: '',
  selectedActivities: [],
  imageRightsConsent: false,
  veracityConsent: false
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

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBenefitChange = (benefit: keyof FormData['benefits'], value: string) => {
    setFormData(prev => ({
      ...prev,
      benefits: { ...prev.benefits, [benefit]: value }
    }));
  };

  const toggleActivity = (activityId: string) => {
    const isSelected = formData.selectedActivities.some(a => a.activityId === activityId);
    if (isSelected) {
      setFormData(prev => ({
        ...prev,
        selectedActivities: prev.selectedActivities.filter(a => a.activityId !== activityId)
      }));
    } else {
      if (formData.selectedActivities.length >= 2) {
        alert("Você pode selecionar no máximo 2 atividades.");
        return;
      }
      const activity = ACTIVITIES.find(a => a.id === activityId);
      if (activity) {
        setFormData(prev => ({
          ...prev,
          selectedActivities: [...prev.selectedActivities, { activityId, timeSlot: activity.schedule[0] }]
        }));
      }
    }
  };

  const saveSubmission = (data: FormData) => {
    const saved = localStorage.getItem('amor_bondade_submissions');
    const submissions: any[] = saved ? JSON.parse(saved) : [];
    const counter = parseInt(localStorage.getItem('amor_bondade_id_counter') || '0') + 1;
    const id = counter.toString().padStart(2, '0');
    localStorage.setItem('amor_bondade_id_counter', counter.toString());
    
    const newSubmission = { ...data, id, submissionDate: new Date().toISOString() };
    submissions.push(newSubmission);
    localStorage.setItem('amor_bondade_submissions', JSON.stringify(submissions));
    return newSubmission;
  };

  const handleFinalAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imageRightsConsent || !formData.veracityConsent) {
      alert('É necessário aceitar os termos de compromisso.');
      return;
    }
    const savedData = saveSubmission(formData);
    setPreviewData(savedData);
    setShowDocPreview(true);
  };

  const YesNoToggle = ({ label, value, onChange, colorClass = "bg-blue-600" }: { label: string, value: string | boolean, onChange: (val: any) => void, colorClass?: string }) => {
    const isYes = value === 'Sim' || value === true;
    return (
      <div className="flex flex-col gap-1 w-full">
        <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1">{label}</label>
        <div className="flex gap-2">
          <button 
            type="button" 
            onClick={() => onChange(typeof value === 'boolean' ? true : 'Sim')} 
            className={`flex-1 py-3 rounded-2xl font-black text-xs uppercase tracking-widest border-2 transition-all ${isYes ? `${colorClass} border-transparent text-white shadow-lg` : 'border-slate-100 text-slate-300 hover:border-slate-200 bg-white'}`}
          >
            Sim
          </button>
          <button 
            type="button" 
            onClick={() => onChange(typeof value === 'boolean' ? false : 'Não')} 
            className={`flex-1 py-3 rounded-2xl font-black text-xs uppercase tracking-widest border-2 transition-all ${!isYes ? `${colorClass} border-transparent text-white shadow-lg` : 'border-slate-100 text-slate-300 hover:border-slate-200 bg-white'}`}
          >
            Não
          </button>
        </div>
      </div>
    );
  };

  const DocumentPreview = ({ data, onClose, isAdmin }: { data: FormData, onClose: () => void, isAdmin: boolean }) => {
    const handlePrint = () => window.print();

    const handleFinalConfirm = () => {
      if (!isAdmin) {
        setView('success');
      }
      onClose();
    };

    return (
      <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-0 md:p-4 print-container">
        <div className="bg-white w-full max-w-4xl max-h-screen md:max-h-[95vh] overflow-y-auto md:rounded-[40px] shadow-2xl animate-in zoom-in-95 duration-300 print-content">
          <div className="sticky top-0 bg-slate-900 text-white p-6 flex justify-between items-center z-10 no-print">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <i className="fa-solid fa-file-invoice text-xl"></i>
              </div>
              <h3 className="font-black uppercase tracking-widest text-sm">Visualizando Ficha Nº {data.id}</h3>
            </div>
            {!isAdmin && (
               <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                 <i className="fa-solid fa-xmark"></i>
               </button>
            )}
          </div>
          
          <div className="p-8 md:p-12 text-slate-800 bg-white relative">
            <div className="flex justify-between items-start border-b-2 border-slate-900 pb-8 mb-10">
               <div className="w-24 h-24 flex items-center justify-center border p-2">
                 <img src="https://i.ibb.co/LhyYx6B/logo-amor-bondade.png" alt="Logo" className="max-w-full h-auto grayscale" />
               </div>
               <div className="text-center flex-1 pt-2">
                 <h1 className="text-2xl font-black uppercase text-[#1d5ba5]">FICHA DE INSCRIÇÃO</h1>
                 <h2 className="text-lg font-bold uppercase">ASSOCIAÇÃO AMOR E BONDADE</h2>
                 <p className="text-[8px] font-bold text-slate-500 mt-1 uppercase">Unidade I - Guarulhos - SP</p>
               </div>
               <div className="w-28 border-4 border-slate-900 p-2 text-center rounded-xl bg-slate-50">
                 <p className="text-[8px] font-black uppercase text-slate-500">Inscrição nº</p>
                 <p className="text-3xl font-black">{data.id}</p>
               </div>
            </div>

            <div className="space-y-6 text-[10px] leading-tight">
              <section className="space-y-1">
                <h4 className="font-black border-b border-slate-900 uppercase">1. DADOS PESSOAIS DO ALUNO</h4>
                <div className="grid grid-cols-4 gap-2 border border-slate-900 p-2 rounded">
                  <div className="col-span-4 uppercase"><strong>NOME COMPLETO:</strong> {data.fullName}</div>
                  <div className="col-span-2 uppercase"><strong>NATURALIDADE/UF:</strong> {data.birthPlace}</div>
                  <div><strong>DATA NASC:</strong> {data.birthDate}</div>
                  <div><strong>IDADE:</strong> {data.age}</div>
                  <div><strong>RG:</strong> {data.rg}</div>
                  <div><strong>CPF:</strong> {data.cpf}</div>
                  <div className="col-span-2 uppercase"><strong>SEXO:</strong> {data.gender === 'M' ? '( ) F (X) M' : '(X) F ( ) M'}</div>
                </div>
              </section>

              <section className="space-y-1">
                <h4 className="font-black border-b border-slate-900 uppercase">2. ESCOLARIDADE</h4>
                <div className="grid grid-cols-2 gap-2 border border-slate-900 p-2 rounded">
                  <div className="col-span-2 uppercase"><strong>ESCOLA:</strong> {data.schoolName}</div>
                  <div className="uppercase"><strong>SÉRIE:</strong> {data.schoolGrade}</div>
                  <div className="uppercase"><strong>PERÍODO:</strong> {data.schoolPeriod}</div>
                </div>
              </section>

              <section className="space-y-1">
                <h4 className="font-black border-b border-slate-900 uppercase">3. ENDEREÇO E CONTATO</h4>
                <div className="grid grid-cols-4 gap-2 border border-slate-900 p-2 rounded">
                  <div className="col-span-3 uppercase"><strong>ENDEREÇO:</strong> {data.address}, {data.addressNo}</div>
                  <div><strong>CEP:</strong> {data.zipCode}</div>
                  <div className="col-span-2 uppercase"><strong>BAIRRO:</strong> {data.neighborhood}</div>
                  <div className="col-span-2"><strong>CONTATO:</strong> {data.whatsapp}</div>
                </div>
              </section>

              <section className="space-y-1">
                <h4 className="font-black border-b border-slate-900 uppercase">4. ATIVIDADES</h4>
                <div className="grid grid-cols-1 gap-1 border border-slate-900 p-2 rounded">
                  {data.selectedActivities.map(sa => {
                    const act = ACTIVITIES.find(a => a.id === sa.activityId);
                    return (
                      <div key={sa.activityId} className="flex justify-between items-center text-[9px]">
                        <span className="font-bold uppercase">● {act?.name}</span>
                        <span className="italic">Instrutor: {act?.instructor} | Horário: {sa.timeSlot}</span>
                      </div>
                    );
                  })}
                  {data.selectedActivities.length === 0 && <p className="italic text-slate-400">Nenhuma atividade selecionada</p>}
                </div>
              </section>

              <div className="text-center mt-12 space-y-4">
                <p className="text-[10px] font-bold">Guarulhos, {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                <div className="pt-10 flex justify-center">
                  <div className="w-72 border-t border-slate-900 text-center pt-1 font-black uppercase text-[8px]">Assinatura do Responsável</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 bg-slate-50 border-t border-slate-200 flex flex-wrap justify-center gap-4 no-print">
            {isAdmin ? (
              <>
                <button onClick={handlePrint} className="px-6 py-4 bg-blue-600 text-white rounded-2xl font-black text-[10px] flex items-center justify-center gap-3 flex-1 shadow-xl hover:bg-blue-700 active:scale-95 uppercase tracking-widest min-w-[150px]">
                  <i className="fa-solid fa-download"></i> Baixar PDF
                </button>
                <button onClick={handlePrint} className="px-6 py-4 bg-slate-700 text-white rounded-2xl font-black text-[10px] flex items-center justify-center gap-3 flex-1 shadow-xl hover:bg-slate-800 active:scale-95 uppercase tracking-widest min-w-[150px]">
                  <i className="fa-solid fa-print"></i> Imprimir Ficha
                </button>
                <button onClick={onClose} className="px-6 py-4 bg-slate-200 text-slate-600 rounded-2xl font-black text-[10px] flex-1 shadow-md hover:bg-slate-300 active:scale-95 uppercase tracking-widest min-w-[150px]">
                  Fechar
                </button>
              </>
            ) : (
              <button 
                onClick={handleFinalConfirm} 
                className="px-10 py-5 bg-green-600 text-white rounded-3xl font-black text-xs flex-1 shadow-2xl hover:bg-green-700 active:scale-95 uppercase tracking-widest transition-all"
              >
                Confirmar e Finalizar Envio
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderFormStep = () => {
    switch (step) {
      case 0: return (
        <div className="space-y-6 animate-in fade-in duration-300">
          <SectionHeader num={1} title="Identificação" colorClass="bg-blue-600" />
          <Input label="Nome Completo do Aluno" value={formData.fullName} onChange={e => handleInputChange('fullName', e.target.value)} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Data de Nascimento" type="date" value={formData.birthDate} onChange={e => handleInputChange('birthDate', e.target.value)} />
            <Input label="CPF" placeholder="000.000.000-00" value={formData.cpf} onChange={e => handleInputChange('cpf', e.target.value)} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input label="RG" value={formData.rg} onChange={e => handleInputChange('rg', e.target.value)} />
            <Input label="Naturalidade/UF" value={formData.birthPlace} onChange={e => handleInputChange('birthPlace', e.target.value)} />
            <Input label="Idade Atual" type="number" value={formData.age} onChange={e => handleInputChange('age', e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Sexo</label>
            <div className="flex gap-2">
              {['M', 'F'].map(s => (
                <button key={s} type="button" onClick={() => handleInputChange('gender', s)} className={`flex-1 py-3 rounded-2xl font-black text-xs uppercase tracking-widest border-2 transition-all ${formData.gender === s ? 'bg-blue-600 border-transparent text-white shadow-lg' : 'border-slate-100 text-slate-300 bg-white'}`}>
                  {s === 'M' ? 'Masculino' : 'Feminino'}
                </button>
              ))}
            </div>
          </div>
          <YesNoToggle label="Possui Alguma Deficiência?" value={formData.isDisabled} onChange={v => handleInputChange('isDisabled', v)} />
          {formData.isDisabled && <Input label="Descreva a Deficiência" value={formData.disabilityType} onChange={e => handleInputChange('disabilityType', e.target.value)} />}
        </div>
      );
      case 1: return (
        <div className="space-y-6">
          <SectionHeader num={2} title="Escola" colorClass="bg-orange-500" />
          <Input label="Nome da Unidade Escolar" value={formData.schoolName} onChange={e => handleInputChange('schoolName', e.target.value)} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Série em 2026" value={formData.schoolGrade} onChange={e => handleInputChange('schoolGrade', e.target.value)} />
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-500">Período Escolar</label>
              <div className="grid grid-cols-2 gap-2">
                {['Manhã', 'Tarde', 'Noite', 'Integral'].map(p => (
                  <button key={p} type="button" onClick={() => handleInputChange('schoolPeriod', p)} className={`py-2 rounded-xl text-[10px] font-black uppercase border-2 transition-all ${formData.schoolPeriod === p ? 'bg-orange-500 text-white border-transparent' : 'bg-white text-slate-300'}`}>{p}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
      case 2: return (
        <div className="space-y-6">
          <SectionHeader num={3} title="Localização" colorClass="bg-teal-500" />
          <div className="grid grid-cols-4 gap-4">
             <div className="col-span-3"><Input label="Logradouro (Rua/Av)" value={formData.address} onChange={e => handleInputChange('address', e.target.value)} /></div>
             <Input label="Nº" value={formData.addressNo} onChange={e => handleInputChange('addressNo', e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <Input label="Bairro" value={formData.neighborhood} onChange={e => handleInputChange('neighborhood', e.target.value)} />
             <Input label="CEP" value={formData.zipCode} onChange={e => handleInputChange('zipCode', e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <Input label="WhatsApp de Contato" placeholder="(11) 90000-0000" value={formData.whatsapp} onChange={e => handleInputChange('whatsapp', e.target.value)} />
             <Input label="Telefone de Recado" value={formData.telRecado} onChange={e => handleInputChange('telRecado', e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500">Situação da Moradia</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {['Própria', 'Alugada', 'Financiada', 'Cedida'].map(m => (
                <button key={m} type="button" onClick={() => handleInputChange('housingType', m)} className={`py-3 rounded-xl text-[10px] font-black uppercase border-2 transition-all ${formData.housingType === m ? 'bg-teal-600 text-white border-transparent' : 'bg-white text-slate-300'}`}>{m}</button>
              ))}
            </div>
          </div>
        </div>
      );
      case 3: return (
        <div className="space-y-6">
          <SectionHeader num={4} title="Composição Familiar" colorClass="bg-purple-600" />
          <div className="space-y-4 p-5 border-2 border-slate-50 rounded-[32px] bg-slate-50/50">
            <p className="font-black text-[10px] uppercase text-slate-400 mb-2">Responsável: Pai</p>
            <Input label="Nome Completo do Pai" value={formData.fatherName} onChange={e => handleInputChange('fatherName', e.target.value)} />
            <YesNoToggle label="O Pai é Falecido?" value={formData.fatherDeceased} onChange={v => handleInputChange('fatherDeceased', v)} colorClass="bg-purple-600" />
          </div>
          <div className="space-y-4 p-5 border-2 border-slate-50 rounded-[32px] bg-slate-50/50">
            <p className="font-black text-[10px] uppercase text-slate-400 mb-2">Responsável: Mãe</p>
            <Input label="Nome Completo da Mãe" value={formData.motherName} onChange={e => handleInputChange('motherName', e.target.value)} />
            <YesNoToggle label="A Mãe é Falecida?" value={formData.motherDeceased} onChange={v => handleInputChange('motherDeceased', v)} colorClass="bg-purple-600" />
          </div>
        </div>
      );
      case 4: return (
        <div className="space-y-6">
          <SectionHeader num={5} title="Socioeconômico" colorClass="bg-green-600" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <Input label="Trabalho Registrado (Qtd)" type="number" value={formData.workingCountRegistered} onChange={e => handleInputChange('workingCountRegistered', e.target.value)} />
             <Input label="Trabalho Autônomo (Qtd)" type="number" value={formData.workingCountAutonomous} onChange={e => handleInputChange('workingCountAutonomous', e.target.value)} />
          </div>
          <YesNoToggle label="Possui CadÚnico?" value={formData.hasCadUnico} onChange={v => handleInputChange('hasCadUnico', v)} colorClass="bg-green-600" />
          <div className="p-6 bg-green-50 rounded-[32px] space-y-4 border-2 border-green-100">
             <p className="font-black text-[11px] uppercase text-green-700 px-2 tracking-widest flex items-center gap-2">
               <i className="fa-solid fa-hand-holding-heart"></i> Benefícios (Mensal)
             </p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Bolsa Jovem" placeholder="R$ 0,00" value={formData.benefits.bolsaJovem} onChange={e => handleBenefitChange('bolsaJovem', e.target.value)} />
                <Input label="Bolsa Família" placeholder="R$ 0,00" value={formData.benefits.bolsaFamilia} onChange={e => handleBenefitChange('bolsaFamilia', e.target.value)} />
                <Input label="BPC / LOAS" placeholder="R$ 0,00" value={formData.benefits.bpcLoas} onChange={e => handleBenefitChange('bpcLoas', e.target.value)} />
                <Input label="Auxílio Aluguel" placeholder="R$ 0,00" value={formData.benefits.auxAluguel} onChange={e => handleBenefitChange('auxAluguel', e.target.value)} />
             </div>
          </div>
        </div>
      );
      case 5: return (
        <div className="space-y-6">
          <SectionHeader num={6} title="Atividades e Saúde" colorClass="bg-red-500" />
          <div className="p-1 bg-slate-100 rounded-[32px]">
            <div className="p-6 bg-white border-2 border-slate-100 rounded-[31px] grid grid-cols-1 md:grid-cols-3 gap-3">
               {ACTIVITIES.map(act => (
                 <button 
                   key={act.id} 
                   type="button" 
                   onClick={() => toggleActivity(act.id)} 
                   className={`p-4 text-left border-2 rounded-2xl transition-all ${formData.selectedActivities.some(a => a.activityId === act.id) ? 'bg-[#1d5ba5] border-transparent text-white shadow-lg' : 'bg-slate-50 border-slate-50 text-slate-700 hover:border-slate-200'}`}
                 >
                   <p className="font-black text-xs uppercase">{act.name}</p>
                   <p className="text-[9px] opacity-70 font-bold">{act.instructor}</p>
                 </button>
               ))}
            </div>
          </div>
          <div className="space-y-4">
            <YesNoToggle label="Realiza Tratamento Médico?" value={formData.healthTreatment} onChange={v => handleInputChange('healthTreatment', v)} colorClass="bg-red-500" />
            {formData.healthTreatment === 'Sim' && <Input label="Qual Tratamento?" value={formData.healthDetails} onChange={e => handleInputChange('healthDetails', e.target.value)} />}
            <YesNoToggle label="Medicação Contínua?" value={formData.continuousMedication} onChange={v => handleInputChange('continuousMedication', v)} colorClass="bg-red-500" />
            {formData.continuousMedication === 'Sim' && <Input label="Qual Medicamento?" value={formData.medicationDetails} onChange={e => handleInputChange('medicationDetails', e.target.value)} />}
          </div>
        </div>
      );
      case 6: return (
        <div className="space-y-6">
          <SectionHeader num={7} title="Termos Finais" colorClass="bg-slate-800" />
          <div className="p-8 bg-white border-2 border-slate-100 rounded-[32px] space-y-6">
             <label className="flex items-start gap-4 cursor-pointer group">
               <input type="checkbox" checked={formData.imageRightsConsent} onChange={e => handleInputChange('imageRightsConsent', e.target.checked)} className="w-6 h-6 mt-1 accent-[#1d5ba5] rounded-lg" />
               <span className="text-xs font-black uppercase text-slate-600 leading-relaxed">Autorizo o uso de imagem e voz para fins institucionais da Associação Amor e Bondade.</span>
             </label>
             <label className="flex items-start gap-4 cursor-pointer group">
               <input type="checkbox" checked={formData.veracityConsent} onChange={e => handleInputChange('veracityConsent', e.target.checked)} className="w-6 h-6 mt-1 accent-orange-500 rounded-lg" />
               <span className="text-xs font-black uppercase text-slate-600 leading-relaxed">Declaro que todas as informações prestadas são verdadeiras e completas.</span>
             </label>
          </div>
        </div>
      );
      default: return null;
    }
  };

  const SectionHeader = ({ num, title, colorClass }: { num: number, title: string, colorClass: string }) => (
    <div className="flex items-center gap-3 mb-6">
      <div className={`w-8 h-8 rounded-xl ${colorClass} text-white flex items-center justify-center font-black text-sm shadow-md`}>{num}</div>
      <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase">{title}</h2>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#f0f9ff]">
      {showDocPreview && previewData && (
        <DocumentPreview 
          data={previewData} 
          isAdmin={view === 'admin'} 
          onClose={() => { 
            setShowDocPreview(false); 
            setPreviewData(null); 
            if(view === 'form') {
              setFormData(INITIAL_DATA); 
              setStep(0);
            } 
          }} 
        />
      )}
      
      <div className="w-full max-w-5xl px-4 py-10">
        {view === 'form' ? (
          <div className="animate-in fade-in duration-500">
            <header className="mb-10 text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-[#1d5ba5] rounded-[24px] flex items-center justify-center text-white mb-6 shadow-2xl shadow-blue-200">
                <i className="fa-solid fa-heart-pulse text-4xl"></i>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-[#1d5ba5] uppercase tracking-tighter mb-2">Amor e Bondade</h1>
              <p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-[10px]">REMATRÍCULA ONLINE 2026</p>
            </header>

            <main className="bg-white rounded-[48px] p-6 md:p-12 shadow-2xl border-4 border-white/50">
              <StepProgress currentStep={step} />
              <form onSubmit={handleFinalAction}>
                <div className="min-h-[450px]">{renderFormStep()}</div>
                <div className="flex justify-between mt-12 pt-8 border-t border-slate-50">
                  <button 
                    type="button" 
                    onClick={() => setStep(s => Math.max(0, s-1))} 
                    disabled={step === 0} 
                    className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${step === 0 ? 'opacity-0' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
                  >
                    Voltar
                  </button>
                  {step < FORM_STEPS.length - 1 ? (
                    <button 
                      type="button" 
                      onClick={() => setStep(s => Math.min(FORM_STEPS.length-1, s+1))} 
                      className="px-10 py-4 bg-[#1d5ba5] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-blue-800 active:scale-95 transition-all"
                    >
                      Continuar
                    </button>
                  ) : (
                    <button 
                      type="submit" 
                      className={`px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl transition-all ${formData.imageRightsConsent && formData.veracityConsent ? 'bg-blue-600 text-white hover:scale-105 shadow-blue-200' : 'bg-slate-100 text-slate-300 cursor-not-allowed'}`}
                    >
                      Visualizar e Enviar Ficha
                    </button>
                  )}
                </div>
              </form>
            </main>
          </div>
        ) : view === 'success' ? (
          <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in-95 duration-500">
            <div className="w-32 h-32 bg-green-500 text-white rounded-[40px] flex items-center justify-center mb-10 shadow-2xl shadow-green-200">
              <i className="fa-solid fa-check text-6xl"></i>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-800 text-center uppercase tracking-tighter mb-4">Inscrição Enviada!</h2>
            <p className="text-slate-500 font-bold text-center max-w-md mb-12 uppercase text-xs tracking-widest leading-relaxed">
              Sua rematrícula para o ano de 2026 foi processada com sucesso. A Associação Amor e Bondade agradece sua participação!
            </p>
            <button 
              onClick={() => setView('form')}
              className="px-12 py-5 bg-slate-900 text-white rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl active:scale-95"
            >
              Fazer outra Rematrícula
            </button>
          </div>
        ) : view === 'login' ? (
          <Login 
            onSuccess={() => { setIsAuth(true); sessionStorage.setItem('amor_bondade_auth', 'true'); setView('admin'); }} 
            onCancel={() => setView('form')} 
          />
        ) : (
          <AdminDashboard onViewDetails={(data) => { setPreviewData(data); setShowDocPreview(true); }} />
        )}
      </div>

      <footer className="mt-auto py-12 w-full max-w-5xl px-6 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-slate-200/30">
        <div className="text-slate-300 text-[9px] font-black uppercase tracking-widest">© 2025 Associação Amor e Bondade - Unidade I - Guarulhos</div>
        <div className="flex gap-2">
          <button onClick={() => { setView('form'); setStep(0); setFormData(INITIAL_DATA); }} className={`px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${view === 'form' || view === 'success' ? 'bg-[#1d5ba5] text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}>Formulário</button>
          <button onClick={() => isAuth ? setView('admin') : setView('login')} className={`px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${view === 'admin' ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}>Administrador</button>
        </div>
      </footer>
    </div>
  );
};

export default App;
