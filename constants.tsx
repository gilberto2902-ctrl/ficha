
import { Activity } from './types';

export const ACTIVITIES: Activity[] = [
  {
    id: '1',
    name: 'Capoeira',
    instructor: 'Welder',
    days: ['Segunda'],
    schedule: ['19:30']
  },
  {
    id: '2',
    name: 'Karatê',
    instructor: 'Japa',
    days: ['Terça'],
    schedule: ['19:00']
  },
  {
    id: '3',
    name: 'Boxe',
    instructor: 'Victor',
    days: ['Quarta'],
    schedule: ['19:30']
  },
  {
    id: '4',
    name: 'Jiu-jitsu',
    instructor: 'Wendel',
    days: ['Quinta'],
    schedule: ['19:30']
  },
  {
    id: '5',
    name: 'Ritmo dança',
    instructor: 'Lilian',
    days: ['Sexta'],
    schedule: ['17:30']
  },
  {
    id: '6',
    name: 'Futebol',
    instructor: 'Italo',
    days: ['Segunda', 'Quarta', 'Quinta'],
    schedule: ['08:00', '16:30']
  },
  {
    id: '7',
    name: 'Pilates',
    instructor: 'Fernanda',
    days: ['Terça', 'Quinta'],
    schedule: ['08:00', '09:00']
  },
  {
    id: '8',
    name: 'Balé',
    instructor: 'Luana',
    days: ['Sábado'],
    schedule: ['09:00', '10:30']
  },
  {
    id: '9',
    name: 'Hip Hop',
    instructor: 'Jhonatan, Flávia e Ewentor',
    days: ['Sábado'],
    schedule: ['16:00']
  }
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
