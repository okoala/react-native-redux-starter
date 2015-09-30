import 'whatwg-fetch'
import React from 'react-native'
import App from '../views/App'
import { Provider } from 'react-redux/native'
import configureStore from '../configureStore'

export default class react_native_redux_starter extends React.Component {
  render () {
    return (
      <Provider store={configureStore()} >
        {() => <App endpoint='/graphql'/>}
      </Provider>
    )
  }
}
