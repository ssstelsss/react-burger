import reducer, {
  ingredientsSuccess,
  ingredientsRequest,
  ingredientsError,
} from '../ingredientsSlice'

const initialState = {
  items: [],
  itemsRequest: false,
  itemsSuccess: false,
  itemsError: false,
}

const testIngredients = [
  {
    _id: '60d3b41abdacab0026a733d0',
    name: 'Хрустящие минеральные кольца',
    type: 'main',
    proteins: 808,
    fat: 689,
    carbohydrates: 609,
    calories: 986,
    price: 300,
    image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
    image_mobile:
      'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
    image_large:
      'https://code.s3.yandex.net/react/code/mineral_rings-large.png',
    __v: 0,
  },
  {
    _id: '60d3b41abdacab0026a733ce',
    name: 'Соус традиционный галактический',
    type: 'sauce',
    proteins: 42,
    fat: 24,
    carbohydrates: 42,
    calories: 99,
    price: 15,
    image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png',
    __v: 0,
  },
]

describe('ingredientsSlice', () => {
  it('initialState', () =>
    expect(reducer(undefined, { type: '__TEST__' })).toEqual(initialState))

  it('getUserDataSuccess', () => {
    const reduce = reducer(initialState, ingredientsSuccess(testIngredients))

    const result = {
      items: testIngredients,
      itemsRequest: false,
      itemsError: false,
      itemsSuccess: true,
    }

    expect(reduce).toEqual(result)
  })

  it('ingredientsRequest', () => {
    const reduce = reducer(initialState, ingredientsRequest())

    const result = {
      items: [],
      itemsRequest: true,
      itemsError: false,
      itemsSuccess: false,
    }

    expect(reduce).toEqual(result)
  })

  it('getUserDataError', () => {
    const reduce = reducer(initialState, ingredientsError())

    const result = {
      items: [],
      itemsRequest: false,
      itemsError: true,
      itemsSuccess: false,
    }

    expect(reduce).toEqual(result)
  })
})
