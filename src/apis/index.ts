// third
import {
  ApolloClient,
  ApolloError,
  ApolloQueryResult,
  gql,
  InMemoryCache,
  MutationOptions,
  NetworkStatus,
  OperationVariables,
  QueryOptions
} from '@apollo/client'
import type { TypedDocumentNode } from '@apollo/client'
// project
import store from '../redux'

/**
 * 生成一个graphql请求客户端对象
 */
const token = store.getState().userProfile.token

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache(),
  headers: {
    ...(token && {
      Authorization: `Bearer ${token}`
    })
  }
})

export default client

export const fetcher = {
  /** 查询 */
  query: <T = any, V = OperationVariables>(options: QueryOptions<V, T>) =>
    client.query<T, V>(options).catch(
      (error: ApolloError): ApolloQueryResult<null> => ({
        data: null,
        error,
        loading: false,
        networkStatus: NetworkStatus.error
      })
    ),

  /** 变更 */
  mutate: <T = any, V = OperationVariables>(options: MutationOptions<T, V>) =>
    client.mutate<T, V>(options).catch((error: ApolloError) => ({
      data: null,
      error
    }))
}

/** 获取RSA公钥 */
const RSA_PUBLIC_KEY: TypedDocumentNode<string> = gql`
  query {
    rsaPublicKey
  }
`

export const getRsaPublicKey = async () =>
  await fetcher.query({
    query: RSA_PUBLIC_KEY
  })
