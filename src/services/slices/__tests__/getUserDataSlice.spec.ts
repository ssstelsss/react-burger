import reducer, {
  getUserDataError,
  getUserDataRequest,
  getUserDataSuccess,
} from '../getUserDataSlice'

const initialState = {
  getUserDataRequest: false,
  getUserDataSuccess: false,
  getUserDataError: false,
}

describe('getUserDataSlice', () => {
  it('initialState', () =>
    expect(reducer(undefined, { type: '__TEST__' })).toEqual(initialState))

  it('getUserDataSuccess', () => {
    const reduce = reducer(initialState, getUserDataSuccess())

    const result = {
      getUserDataRequest: false,
      getUserDataError: false,
      getUserDataSuccess: true,
    }

    expect(reduce).toEqual(result)
  })

  it('getUserDataRequest', () => {
    const reduce = reducer(initialState, getUserDataRequest())

    const result = {
      getUserDataRequest: true,
      getUserDataError: false,
      getUserDataSuccess: false,
    }

    expect(reduce).toEqual(result)
  })

  it('getUserDataError', () => {
    const reduce = reducer(initialState, getUserDataError())

    const result = {
      getUserDataRequest: false,
      getUserDataError: true,
      getUserDataSuccess: false,
    }

    expect(reduce).toEqual(result)
  })
})
