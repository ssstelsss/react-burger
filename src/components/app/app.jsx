import React, { useState, useEffect } from 'react'
import AppHeader from '../app-header/app-header'
import Constructor from '../constructor/constructor'
import { GET_INGREDIENTS_URL } from '../../utils/constants'
import { CODES } from '../../utils/errors'
import Error from '../error/error'

export default function App () {
  const [ingredients, setIngredients] = useState([])
  const [error, setError] = useState();
  
  
  useEffect(() => {
    fetch(GET_INGREDIENTS_URL)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        return Promise.reject(response.status)
      })
      .then(data => setIngredients(data.data))
      .catch(err => setError(CODES.SERVER_ERR))
  }, [])

  return (
    <div>
      <AppHeader/>
      {error
        ? <Error code={error}/>
        : <Constructor ingredients={ingredients}/>
      }
    </div>
  );
}
