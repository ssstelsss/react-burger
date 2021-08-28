import reducer, { setUserData, logoutUser } from '../userSlice'

const initialState = {
  isLogined: false,
  loginRequest: false,
  loginSuccess: false,
  loginError: false,
  email: '',
  name: '',
}

const testUser = {
  email: 'test@test.test',
  name: 'test name',
}

describe('userSlice', () => {
  it('initialState', () =>
    expect(reducer(undefined, { type: '__TEST__' })).toEqual(initialState))

  it('setUserData', () => {
    const reduce = reducer(initialState, setUserData(testUser))

    const result = {
      ...initialState,
      ...testUser,
      isLogined: true,
    }

    expect(reduce).toEqual(result)
  })

  it('logoutUser', () => {
    reducer(initialState, logoutUser())
    const reduce = reducer(initialState, logoutUser())

    const result = {
      ...initialState,
    }

    expect(reduce).toEqual(result)
  })
})
