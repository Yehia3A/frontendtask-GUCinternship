export type Category = 'Work' | 'Personal' | 'Family'

export interface Contact {
  id: number
  name: string
  email: string
  phone: string
  category: Category
}
