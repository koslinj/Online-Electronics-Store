export interface Product {
  id: number
  name: string
  description: string
  price: number
  imageUrl: string
  producerName: String
}

export interface Category {
  id: number
  generalCategory: string
  urlGeneralCategory: string
  name: string
  urlName: string
}