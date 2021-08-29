import reducer, { openOrderModal, closeOrderModal } from '../orderModalSlice'

const initialState = {
  isOrderModalOpen: false,
}

describe('orderModalSlice', () => {
  it('initialState', () =>
    expect(reducer(undefined, { type: '__TEST__' })).toEqual(initialState))

  it('openOrderModal', () => {
    const reduce = reducer(initialState, openOrderModal())

    const result = {
      isOrderModalOpen: true,
    }

    expect(reduce).toEqual(result)
  })

  it('closeOrderModal', () => {
    const reduce = reducer(initialState, closeOrderModal())

    const result = {
      isOrderModalOpen: false,
    }

    expect(reduce).toEqual(result)
  })
})
