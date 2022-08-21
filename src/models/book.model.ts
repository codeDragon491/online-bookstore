
export interface Book {
    discountSet: string
    id: number
    imageUrl: string
    price: number
    stockQuantity: number
    title: string
    quantity?: number
  }

  export interface BookRef {
    id: number
    quantity: number
  }