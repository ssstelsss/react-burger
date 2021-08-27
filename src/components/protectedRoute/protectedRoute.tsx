import { Redirect, Route, RouteProps } from 'react-router-dom'
import { useEffect, useState, useCallback, FC } from 'react'
import { getUserData } from '../../services/slices/getUserDataSlice'
import { useAppDispatch, useAppSelector } from '../../services'

interface IProtectedRouteProps extends RouteProps {
  forLoggined?: boolean
  redirectTo?: string
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({
  children,
  forLoggined = true,
  redirectTo = '/login',
  ...rest
}) => {
  const dispatch = useAppDispatch()
  const { isLogined } = useAppSelector(store => store.user)
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

export default ProtectedRoute
