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

export interface Opinion {
  id: number
  stars: number
  content: string
  createdAt: Date
  user: string
  productId: number
}

export interface User {
  username: string
  role: string
  firstName: string
}

export interface Address {
  id: number
  fullName: string
  street: string
  zipCode: string
  city: string
  phone: string
  email: string
  username: string
}

export interface Category {
  id: number
  generalCategory: string
  urlGeneralCategory: string
  name: string
  urlName: string
}