export interface Product {
  id: number
  name: string
  description: string
  price: number
  imageUrl: string
}

export interface Category {
  id: number
  generalCategory: string
  name: string
  urlName: string
}