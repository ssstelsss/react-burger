export interface IIngredient {
  _id: string
  calories: number
  carbohydrates: number
  fat: number
  image: string
  image_large: string
  image_mobile: string
  name: string
  price: number
  proteins: number
  type: string
  uniqId?: string
}

export interface IFeedOrder {
  _id: string
  createdAt: string
  ingredients: string[]
  name: string
  number: number
  status: string
  updatedAt: string
}

export interface IOrder {
  success: boolean
  name: string
  order: {
    _id: string
    ingredients: IIngredient[]
    owner: {
      name: string
      email: string
      createdAt: string
      updatedAt: string
    }
    status: string
    name: string
    createdAt: string
    updatedAt: string
    number: number
    price: number
  }
}
