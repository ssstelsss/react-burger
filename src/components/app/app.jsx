import React, { useEffect } from 'react'
import AppHeader from '../app-header/app-header'
import Constructor from '../constructor/constructor'
import Error from '../error/error'
import { useDispatch, useSelector } from 'react-redux'
import { getItems } from '../../services/slices/ingredientsSlice'

export default function App () {
  const error = useSelector(store => store.app.error);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getItems())
  }, [dispatch])

  return (
    <div>
      <AppHeader/>
      {error
        ? <Error code={error}/>
        : <Constructor/>
      }
    </div>
  );
}
