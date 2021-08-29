import { IFeedOrder } from '../../../types'
import reducer, {
  setCurrentOrder,
  removeCurrentOrder,
} from '../currentOrderSlice'

const initialState = {
  order: {} as IFeedOrder,
  isOrder: false,
}

const testFeedOrder = {
  _id: '612a004615024d001b9d0e11',
  ingredients: [
    '60d3b41abdacab0026a733c8',
    '60d3b41abdacab0026a733c9',
    '60d3b41abdacab0026a733c7',
    '60d3b41abdacab0026a733c7',
  ],
  status: 'done',
  name: 'Бессмертный люминесцентный флюоресцентный бургер',
  createdAt: '2021-08-28T09:22:14.416Z',
  updatedAt: '2021-08-28T09:22:14.470Z',
  number: 2326,
}

describe('currentOrderSlice', () => {
  it('initialState', () =>
    expect(reducer(undefined, { type: '__TEST__' })).toEqual(initialState))

  it('set current order', () => {
    const reduce = reducer(initialState, setCurrentOrder(testFeedOrder))

    const result = {
      order: testFeedOrder,
      isOrder: true,
    }

    expect(reduce).toEqual(result)
  })

  it('remove current order', () => {
    const reduce = reducer(initialState, removeCurrentOrder())

    expect(reduce).toEqual(initialState)
  })
})
