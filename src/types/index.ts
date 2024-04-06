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

export interface OrderItem {
  id: number
  quantity: number
  productId: number
  purchaseOrderId: number
}

export interface Order {
  id: number
  createdAt: Date
  user: string
  state: string
  sum: number
  items: OrderItem[]
}

export interface User {
  username: string
  role: string
  firstName: string
  lastName: string
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


export type Sorting = "Od najtańszych" | "Od najdroższych" | "Od A do Z" | "Od Z do A"