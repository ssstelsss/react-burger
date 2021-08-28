import reducer, {
  updateUserDataError,
  updateUserDataRequest,
  updateUserDataSuccess,
} from '../updateUserDataSlice'

const initialState = {
  updateUserDataRequest: false,
  updateUserDataSuccess: false,
  updateUserDataError: false,
}

describe('updateUserDataSlice', () => {
  it('initialState', () =>
    expect(reducer(undefined, { type: '__TEST__' })).toEqual(initialState))

  it('updateUserDataSuccess', () => {
    const reduce = reducer(initialState, updateUserDataSuccess())

    const result = {
      updateUserDataRequest: false,
      updateUserDataSuccess: true,
      updateUserDataError: false,
    }

    expect(reduce).toEqual(result)
  })

  it('updateUserDataRequest', () => {
    const reduce = reducer(initialState, updateUserDataRequest())

    const result = {
      updateUserDataRequest: true,
      updateUserDataError: false,
      updateUserDataSuccess: false,
    }

    expect(reduce).toEqual(result)
  })

  it('updateUserDataError', () => {
    const reduce = reducer(initialState, updateUserDataError())

    const result = {
      updateUserDataRequest: false,
      updateUserDataError: true,
      updateUserDataSuccess: false,
    }

    expect(reduce).toEqual(result)
  })
})
