import reducer, { setCurrentIngredient, removeCurrentIngredient } from '../currentIngredientSlice'

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

const initialState = null
describe('currentIngredientSlice', () => {
  it('initialState', () =>
    expect(reducer(undefined, { type: '__TEST__' })).toEqual(initialState))

  it('set current ingredient', () => {
    const reduce = reducer(initialState, setCurrentIngredient(testIngregient))

    expect(reduce).toEqual(testIngregient)
  })

  it('clear ingredient', () => {
    const reduce = reducer(initialState, removeCurrentIngredient())

    expect(reduce).toEqual(initialState)
  })
})
