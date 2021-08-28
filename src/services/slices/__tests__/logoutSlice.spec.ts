import reducer, {
  logoutSuccess,
  logoutRequest,
  logoutError,
} from '../logoutSlice'

const initialState = {
  logoutRequest: false,
  logoutSuccess: false,
  logoutError: false,
}

describe('logoutSlice', () => {
  it('initialState', () =>
    expect(reducer(undefined, { type: '__TEST__' })).toEqual(initialState))

  it('logoutSuccess', () => {
    const reduce = reducer(initialState, logoutSuccess())

    const result = {
      logoutRequest: false,
      logoutSuccess: true,
      logoutError: false,
    }

    expect(reduce).toEqual(result)
  })

  it('logoutRequest', () => {
    const reduce = reducer(initialState, logoutRequest())

    const result = {
      logoutRequest: true,
      logoutError: false,
      logoutSuccess: false,
    }

    expect(reduce).toEqual(result)
  })

  it('logoutError', () => {
    const reduce = reducer(initialState, logoutError())

    const result = {
      logoutRequest: false,
      logoutError: true,
      logoutSuccess: false,
    }

    expect(reduce).toEqual(result)
  })
})
