import { ParsedUrlQuery } from 'querystring'
import { TOKEN } from '../assets'

export const storeQueryParams = (queryParams: ParsedUrlQuery) => {
  let isRedirct = false
  const authentication = JSON.parse(queryParams.authentication?.toString() || JSON.stringify(null))

  if (authentication) {
    isRedirct = true
    setToken(authentication.token, !authentication.is_once)
  }

  return isRedirct
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
