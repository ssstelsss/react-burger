import { Redirect, Route, RouteProps } from 'react-router-dom'
import { useEffect, FC } from 'react'
import { getUserData } from '../../services/slices/getUserDataSlice'
import { useAppDispatch, useAppSelector } from '../../services'

interface IProtectedRouteProps extends RouteProps {
  forLoggined?: boolean
  redirectTo?: string
  withoutVerify? : boolean
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({
  children,
  forLoggined = true,
  redirectTo = '/login',
  withoutVerify,
  ...rest
}) => {
  const dispatch = useAppDispatch()
  const { isLogined } = useAppSelector(store => store.user)
  const getUserDataRequest = useAppSelector(store => store.getUserData.getUserDataRequest)

  useEffect(() => {
    dispatch(getUserData())
  }, [dispatch])

  if (!withoutVerify && getUserDataRequest ) {
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
