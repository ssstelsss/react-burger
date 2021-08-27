import { REFRESH_TOKEN_URL } from './constants'
import { setCookie } from './cookies'

const checkResponse = (res: any) => {
  return res.ok
    ? res.json()
    : res.json().then((err: any) => Promise.reject(err))
}

export const refreshToken = (): Promise<any> => {
  return fetch(REFRESH_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset-utf-8',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  }).then(checkResponse)
}

export const fetchWithRefresh = async (url: string, options: any) => {
  try {
    const res = await fetch(url, options)
    return await checkResponse(res)
  } catch (err) {
    if (err.message === 'jwt expired') {
      const refreshData = await refreshToken()
      localStorage.setItem('refreshToken', refreshData.refreshToken)
      setCookie('accessToken', refreshData.accessToken)
      options.headers.authorization = refreshData.accessToken
      const res = await fetch(url, options)
      return await checkResponse(res)
    } else {
      return Promise.reject(err)
    }
  }
}
