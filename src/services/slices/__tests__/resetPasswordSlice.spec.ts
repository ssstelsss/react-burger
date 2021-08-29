import reducer, {
  resetPasswordError,
  resetPasswordRequest,
  resetPasswordSuccess,
} from '../resetPasswordSlice'

const initialState = {
  resetPasswordRequest: false,
  resetPasswordSuccess: false,
  resetPasswordError: false,
}

describe('resetPasswordSlice', () => {
  it('initialState', () =>
    expect(reducer(undefined, { type: '__TEST__' })).toEqual(initialState))

  it('resetPasswordSuccess', () => {
    const reduce = reducer(initialState, resetPasswordSuccess())

    const result = {
      resetPasswordRequest: false,
      resetPasswordSuccess: true,
      resetPasswordError: false,
    }

    expect(reduce).toEqual(result)
  })

  it('resetPasswordRequest', () => {
    const reduce = reducer(initialState, resetPasswordRequest())

    const result = {
      resetPasswordRequest: true,
      resetPasswordError: false,
      resetPasswordSuccess: false,
    }

    expect(reduce).toEqual(result)
  })

  it('resetPasswordError', () => {
    const reduce = reducer(initialState, resetPasswordError())

    const result = {
      resetPasswordRequest: false,
      resetPasswordError: true,
      resetPasswordSuccess: false,
    }

    expect(reduce).toEqual(result)
  })
})
