export interface Product {
  id: number
  name: string
  categoryName: string
  categoryUrl: string
  description: string
  price: number
  imageUrl: string
  filterNames: string[],
  filterValues: string[]
}

export interface Category {
  id: number
  generalCategory: string
  urlGeneralCategory: string
  name: string
  urlName: string
}