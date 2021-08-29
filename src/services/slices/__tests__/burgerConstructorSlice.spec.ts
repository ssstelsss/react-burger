import reducer, {
  addIngredient,
  removeIngredientByIndex,
  setBun,
  cleanConstructor,
} from '../burgerConstructorSlice'

const initialState = {
  bun: null,
  items: [],
  totalPrice: 0,
}

const state = {
  bun: null,
  items: [
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
  ],
  totalPrice: 315,
}

const testIngregient = {
  _id: '60d3b41abdacab0026a733cc',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  __v: 0,
}

const testBun = {
  _id: '60d3b41abdacab0026a733c6',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0,
}

describe('burgerConstructorSlice', () => {
  it('initialState', () =>
    expect(reducer(undefined, { type: '__TEST__' })).toEqual(initialState))

  it('add bun', () => {
    const reduce = reducer(initialState, setBun(testBun))

    const result = {
      bun: { ...testBun, uniqId: reduce.bun?.uniqId },
      items: [],
      totalPrice: testBun.price * 2,
    }

    expect(reduce).toEqual(result)
  })

  it('add ingredient', () => {
    const reduce = reducer(initialState, addIngredient(testIngregient))
    const result = {
      bun: initialState.bun,
      totalPrice: testIngregient.price,
      items: [{ ...testIngregient, uniqId: reduce.items[0]?.uniqId }],
    }
    expect(reduce).toEqual(result)
  })

  it('remove ingredienrt by index', () => {
    const reduce = reducer(state, removeIngredientByIndex(0))
    const result = { ...state, items: state.items.splice(1, 1), totalPrice: 15 }

    expect(reduce).toEqual(result)
  })

  it('clean store', () => {
    const reduce = reducer(state, cleanConstructor())

    expect(reduce).toEqual(initialState)
  })
})
