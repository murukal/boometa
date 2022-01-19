import { ParsedUrlQuery } from 'querystring'
import { TOKEN } from '../assets'

export const storeQueryParams = (queryParams: ParsedUrlQuery) => {
  const authentication = JSON.parse(queryParams.authentication?.toString() || JSON.stringify(null))

  authentication && setToken(authentication.token, !authentication.is_once)
}

export const setToken = (token: string, isAutoLogin: boolean) => {
  localStorage.removeItem(TOKEN)
  sessionStorage.removeItem(TOKEN)

  if (isAutoLogin) {
    localStorage.setItem(TOKEN, token)
  } else {
    sessionStorage.setItem(TOKEN, token)
  }
}
