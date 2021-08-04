import { Redirect, Route } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserData } from '../../services/slices/getUserDataSlice'

export function ProtectedRoute({ children, forLoggined = true, redirectTo='/login', ...rest }) {
  const dispatch = useDispatch()
  let { isLogined } = useSelector(store => store.user)
  const [isUserLoaded, setUserLoaded] = useState(false)

  const init = useCallback(async () => {
    dispatch(getUserData())
    setUserLoaded(true)
  }, [dispatch])

  useEffect(() => {
    init()
  }, [init])

  if (!isUserLoaded) {
    return null
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLogined === forLoggined ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: redirectTo,
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}
