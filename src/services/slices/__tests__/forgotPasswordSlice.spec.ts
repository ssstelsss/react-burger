import reducer, {
  forgotPasswordSuccess,
  forgotPasswordRequest,
  forgotPasswordError,
} from '../forgotPasswordSlice'

const initialState = {
  forgotPasswordRequest: false,
  forgotPasswordSuccess: false,
  forgotPasswordError: false,
}

describe('forgotPasswordSlice', () => {
  it('initialState', () =>
    expect(reducer(undefined, { type: '__TEST__' })).toEqual(initialState))

  it('forgotPasswordSuccess', () => {
    const reduce = reducer(initialState, forgotPasswordSuccess())

    const result = {
      forgotPasswordRequest: false,
      forgotPasswordSuccess: true,
      forgotPasswordError: false,
    }

    expect(reduce).toEqual(result)
  })

  it('forgotPasswordRequest', () => {
    const reduce = reducer(initialState, forgotPasswordRequest())

    const result = {
      forgotPasswordRequest: true,
      forgotPasswordError: false,
      forgotPasswordSuccess: false,
    }

    expect(reduce).toEqual(result)
  })

  it('forgotPasswordError', () => {
    const reduce = reducer(initialState, forgotPasswordError())

    const result = {
      forgotPasswordRequest: false,
      forgotPasswordError: true,
      forgotPasswordSuccess: false,
    }

    expect(reduce).toEqual(result)
  })
})
