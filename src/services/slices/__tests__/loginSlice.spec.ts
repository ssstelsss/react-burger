import reducer, { loginSuccess, loginRequest, loginError } from '../loginSlice'

const initialState = {
  loginRequest: false,
  loginSuccess: false,
  loginError: false,
}

describe('loginSlice', () => {
  it('initialState', () =>
    expect(reducer(undefined, { type: '__TEST__' })).toEqual(initialState))

  it('loginSuccess', () => {
    const reduce = reducer(initialState, loginSuccess())

    const result = {
      loginRequest: false,
      loginSuccess: true,
      loginError: false,
    }

    expect(reduce).toEqual(result)
  })

  it('loginRequest', () => {
    const reduce = reducer(initialState, loginRequest())

    const result = {
      loginRequest: true,
      loginError: false,
      loginSuccess: false,
    }

    expect(reduce).toEqual(result)
  })

  it('loginError', () => {
    const reduce = reducer(initialState, loginError())

    const result = {
      loginRequest: false,
      loginError: true,
      loginSuccess: false,
    }

    expect(reduce).toEqual(result)
  })
})
