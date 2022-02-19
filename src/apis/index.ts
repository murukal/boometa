// third
import { ApolloClient, InMemoryCache } from '@apollo/client'

// // 获取token信息
// const token = store.getState().userProfile.token

// if (token && config.headers) {
//   config.headers['Authorization'] = `Bearer ${token}`
// }

export const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache()
})
