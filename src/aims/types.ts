export interface Aim {
  id: string
  title: string
  efforts: Array<Effort>
}

export interface AimInput {
  id: string
  title: string
}

export interface Effort {
  id: string
  amount: number
  achievedAt: Date
}
