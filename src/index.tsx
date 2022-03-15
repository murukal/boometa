// react
import ReactDOM from 'react-dom'
// router
import { BrowserRouter } from 'react-router-dom'
// redux
import { Provider } from 'react-redux'
// antd
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import { ConfigProvider } from 'antd'
// third
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
// project
import App from './App'
import store from './redux'
import reportWebVitals from './reportWebVitals'
import './styles/index.less'

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <ConfigProvider locale={zh_CN}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ConfigProvider>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
