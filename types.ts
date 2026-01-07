
export interface Activity {
  id: string;
  name: string;
  instructor: string;
  days: string[];
}

export interface SelectedActivity {
  activityId: string;
}

export interface FormData {
  id?: string;
  submissionDate?: string;
  // 1. DADOS PESSOAIS
  fullName: string;
  birthPlace: string;
  birthDate: string;
  age: string;
  rg: string;
  issuingBody: string;
  issueDate: string;
  cpf: string;
  gender: 'F' | 'M' | '';
  hasChildren: 'Sim' | 'Não' | '';
  childrenCount: string;
  isDisabled: 'Sim' | 'Não' | '';
  disabilityType: string;

  // 2. ESCOLARIDADE
  schoolName: string;
  schoolingLevel: string;
  schoolGrade: string;
  schoolPeriod: 'Manhã' | 'Tarde' | 'Noite' | 'Integral' | 'Não' | '';
  extraCourseStatus: 'Cursando' | 'Concluído' | 'Não' | '';
  extraCourseName: string;

  // 3. ENDEREÇO
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
  livesWith: string[];

  // 4. FAMILIARES
  fatherName: string;
  fatherProfession: string;
  fatherBirthDate: string;
  fatherDeceased: 'Sim' | 'Não' | '';
  fatherSalary: string;
  fatherUnemployed: 'Sim' | 'Não' | '';
  
  motherName: string;
  motherProfession: string;
  motherBirthDate: string;
  motherDeceased: 'Sim' | 'Não' | '';
  motherSalary: string;
  motherUnemployed: 'Sim' | 'Não' | '';

  // 5. SOCIOECONÔMICO & COMPLEMENTARES
  workingCountRegistered: string;
  workingCountAutonomous: string;
  pensionCount: string;
  familyIncome: '1-3' | '3-5' | '5+' | '';
  hasMedicalInsurance: 'Sim' | 'Não' | '';
  crasReferenced: 'Sim' | 'Não' | '';
  crasDetails: string;
  hasCadUnico: string;
  benefits: {
    bolsaFamilia: 'Sim' | 'Não' | '';
    bpcLoas: 'Sim' | 'Não' | '';
    idJovem: 'Sim' | 'Não' | '';
    outros: 'Sim' | 'Não' | '';
  };

  // SAÚDE & ATIVIDADES
  healthTreatment: 'Sim' | 'Não' | '';
  healthDetails: string;
  continuousMedication: 'Sim' | 'Não' | '';
  medicationDetails: string;
  selectedActivities: SelectedActivity[];

  // CONFIRMAÇÃO
  imageRightsConsent: boolean;
  veracityConsent: boolean;
}
