import reducer, {
  registrationSuccess,
  registrationRequest,
  registrationError,
} from '../registrationSlice'

const initialState = {
  registrationRequest: false,
  registrationSuccess: false,
  registrationError: false,
}

describe('registrationSlice', () => {
  it('initialState', () =>
    expect(reducer(undefined, { type: '__TEST__' })).toEqual(initialState))

  it('orderSuccess', () => {
    const reduce = reducer(initialState, registrationSuccess())

    const result = {
      registrationRequest: false,
      registrationSuccess: true,
      registrationError: false,
    }

    expect(reduce).toEqual(result)
  })

  it('orderRequest', () => {
    const reduce = reducer(initialState, registrationRequest())

    const result = {
      registrationRequest: true,
      registrationError: false,
      registrationSuccess: false,
    }

    expect(reduce).toEqual(result)
  })

  it('orderError', () => {
    const reduce = reducer(initialState, registrationError())

    const result = {
      registrationRequest: false,
      registrationError: true,
      registrationSuccess: false,
    }

    expect(reduce).toEqual(result)
  })
})
