
export interface Activity {
  id: string;
  name: string;
  instructor: string;
  schedule: string[];
  days: string[];
}

export interface SelectedActivity {
  activityId: string;
  timeSlot: string;
}

export interface FormData {
  id?: string;
  submissionDate?: string;
  // Seção 1: Dados Pessoais
  fullName: string;
  birthPlace: string;
  birthDate: string;
  age: string;
  rg: string;
  issuingBody: string;
  issueDate: string;
  cpf: string;
  gender: 'M' | 'F' | '';
  hasChildren: 'Sim' | 'Não' | '';
  childrenCount: string;
  isDisabled: boolean;
  disabilityType: string;

  // Seção 2: Escolaridade
  schoolName: string;
  schoolingLevel: string;
  schoolGrade: string;
  schoolPeriod: 'Manhã' | 'Tarde' | 'Noite' | 'Integral' | '';
  extraCourseStatus: 'Sim' | 'Não' | '';
  extraCourseName: string;

  // Seção 3: Endereço & Moradia
  address: string;
  addressNo: string;
  city: string;
  neighborhood: string;
  complement: string;
  zipCode: string;
  referencePoint: string;
  whatsapp: string;
  email: string;
  parentWhatsapp: string;
  telRecado: string;
  housingType: 'Própria' | 'Alugada' | 'Financiada/CDHU' | 'Cedida' | '';
  housingValue: string;
  cedidaBy: string;
  constructionType: 'Bloco' | 'Madeira' | 'Mista' | 'Palafita' | '';
  roomCount: string;
  parentsLiveTogether: 'Sim' | 'Não' | '';
  peopleInHouse: string;
  livesWith: string[]; // ['Mãe', 'Pai', 'Irmãos', 'Avós', 'Filho', 'Madrasta', 'Padrasto', 'Outros']

  // Seção 4: Familiares
  fatherName: string;
  fatherBirthDate: string;
  fatherDeceased: 'Sim' | 'Não' | '';
  fatherProfession: string;
  fatherSalary: string;
  fatherUnemployed: 'Sim' | 'Não' | '';
  
  motherName: string;
  motherBirthDate: string;
  motherDeceased: 'Sim' | 'Não' | '';
  motherProfession: string;
  motherSalary: string;
  motherUnemployed: 'Sim' | 'Não' | '';

  // Seção 5: Socioeconômico
  workingCountRegistered: string;
  workingCountAutonomous: string;
  pensionCount: string;
  familyIncome: '1-3' | '3-5' | '5+' | '';
  hasMedicalInsurance: 'Sim' | 'Não' | '';
  crasReferenced: 'Sim' | 'Não' | '';
  crasDetails: string;
  hasCadUnico: 'Sim' | 'Não' | '';
  benefits: {
    bolsaJovem: string;
    bolsaFamilia: string;
    bpcLoas: string;
    auxAluguel: string;
  };

  // Seção 6: Saúde & Atividades
  healthTreatment: 'Sim' | 'Não' | '';
  healthDetails: string;
  continuousMedication: 'Sim' | 'Não' | '';
  medicationDetails: string;
  selectedActivities: SelectedActivity[];

  // Seção 7: Confirmação
  imageRightsConsent: boolean;
  veracityConsent: boolean;
}