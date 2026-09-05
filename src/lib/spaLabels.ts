import type {
  Country,
  PriceLevel,
  SpaType,
  Treatment,
  WellnessGoal,
} from '../types/spa'

export const countryLabels: Record<Country, string> = {
  lithuania: 'Lietuva',
  latvia: 'Latvija',
  poland: 'Lenkija',
  czechia: 'Čekija',
  austria: 'Austrija',
  italy: 'Italija',
}

export const spaTypeLabels: Record<SpaType, string> = {
  'spa-hotel': 'SPA viešbutis',
  'wellness-retreat': 'Wellness retreatas',
  'thermal-resort': 'Termalus kurortas',
}

export const goalLabels: Record<WellnessGoal, string> = {
  relaxation: 'Atsipalaidavimas',
  health: 'Sveikata',
  beauty: 'Grožis',
  'weight-control': 'Svorio kontrolė',
  'sports-recovery': 'Atsigavimas po sporto',
}

export const treatmentLabels: Record<Treatment, string> = {
  massage: 'Masažas',
  sauna: 'Pirtis',
  pool: 'Baseinas',
  facial: 'Veido procedūros',
  'thermal-water': 'Termalinės / vandens procedūros',
}

export const priceLevelLabels: Record<PriceLevel, string> = {
  eur: '€ prieinama',
  eur2: '€€ vidutinė',
  eur3: '€€€ aukštesnė',
}
