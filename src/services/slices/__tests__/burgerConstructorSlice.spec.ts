import reducer, {
  addIngredient,
  removeIngredientByIndex,
  setBun,
  swapItems,
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
const ingregient = {
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

describe('burgerConstructorSlice', () => {
  it('initialState', () => expect(reducer(undefined, {})).toEqual(initialState))

  it('Должен добавить булку', () => {
    const payload = {
      type: 'bun',
      _id: 3000,
      price: 3444,
      image: 'src',
      name: 'name',
    }
    const reduce = reducer(initialState, addIngredient(payload))
    const result = {
      items: [],
      sum: payload.price * 2,
      bun: {
        _id: payload._id,
        price: payload.price,
        type: payload.type,
        name: payload.name,
        image: payload.image,
      },
    }
    expect(reduce).toEqual(result)
  })

  // it("Должен добавить item", () => {
  //   const payload = {type:'sause', _id:3020, price:344, image: 'src', name:'name'}
  //   const reduce = reducer(initialState, addIngredient(payload));
  //   const result = {
  //     bun: initialState.bun,
  //      sum: payload.price,
  //      items:{
  //         _id: ???
  //         id:payload._id,
  //         price: payload.price,
  //         type: payload.type,
  //         name: payload.name,
  //         image: payload.image,
  //     }};
  //   expect(reduce).toEqual(result);
  // });

  it('Должен удалить item', () => {
    const reduce = reducer(state, removeIngredient(ingregient))
    const result = { ...state, items: state.items.splice(1, 1), sum: 1000 }
    expect(reduce).toEqual(result)
  })
})