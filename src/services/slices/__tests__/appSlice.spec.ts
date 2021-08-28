import reducer, { setError, clearError } from '../appSlice'

const initialState = {
  error: '',
  loader: false,
}

describe('appSlice', () => {
  it('initialState', () =>
    expect(reducer(undefined, { type: '__TEST__' })).toEqual(initialState))

  it('set error', () => {
    const reduce = reducer(initialState, setError('test'))

    const result = {
      error: 'test',
      loader: false,
    }

    expect(reduce).toEqual(result)
  })

  it('clear error', () => {
    reducer(initialState, setError('test'))
    const reduce = reducer(initialState, clearError())

    const result = {
      error: '',
      loader: false,
    }

    expect(reduce).toEqual(result)
  })
})
