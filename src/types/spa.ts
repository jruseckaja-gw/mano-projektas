export type Country =
  | 'lithuania'
  | 'latvia'
  | 'poland'
  | 'czechia'
  | 'austria'
  | 'italy'

export type SpaType = 'spa-hotel' | 'wellness-retreat' | 'thermal-resort'

export type WellnessGoal =
  | 'relaxation'
  | 'health'
  | 'beauty'
  | 'weight-control'
  | 'sports-recovery'

export type Treatment =
  | 'massage'
  | 'sauna'
  | 'pool'
  | 'facial'
  | 'thermal-water'

export type PriceLevel = 'eur' | 'eur2' | 'eur3'

export type Spa = {
  id: string
  name: string
  country: Country
  city: string
  type: SpaType
  goals: WellnessGoal[]
  treatments: Treatment[]
  priceLevel: PriceLevel
  summary: string
  imageUrl: string
  websiteUrl: string
}

export type SpaFilters = {
  country?: Country
  type?: SpaType
  goal?: WellnessGoal
  treatment?: Treatment
  priceLevel?: PriceLevel
}
