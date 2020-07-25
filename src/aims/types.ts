export interface Aim {
  id: string
  title: string
  efforts: Array<Effort>
}

export interface AimInput {
  title: string
}

export interface Effort {
  id: string
  amount: number
  achievedAt: Date
}
