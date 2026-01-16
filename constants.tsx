
import { Activity } from './types';

export const ACTIVITIES: Activity[] = [
  {
    id: '1',
    name: 'Capoeira',
    instructor: 'Welder',
    days: ['Segunda']
  },
  {
    id: '2',
    name: 'Karatê',
    instructor: 'Japa',
    days: ['Terça']
  },
  {
    id: '3',
    name: 'Boxe',
    instructor: 'Victor',
    days: ['Quarta']
  },
  {
    id: '4',
    name: 'Jiu-jitsu',
    instructor: 'Wendel',
    days: ['Quinta']
  },
  {
    id: '5',
    name: 'Ritmo dança',
    instructor: 'Lilian',
    days: ['Sexta']
  },
  {
    id: '6',
    name: 'Futebol',
    instructor: 'Italo',
    days: ['Segunda', 'Quarta', 'Quinta']
  },
  {
    id: '7',
    name: 'Pilates',
    instructor: 'Fernanda',
    days: ['Terça', 'Quinta']
  },
  {
    id: '8',
    name: 'Balé',
    instructor: 'Luana',
    days: ['Sábado']
  },
 
];

export const FORM_STEPS = [
  'Dados Pessoais',
  'Escolaridade',
  'Endereço & Moradia',
  'Dados Familiares',
  'Socioeconômico',
  'Atividade & Saúde',
  'Confirmação'
];
