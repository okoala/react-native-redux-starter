/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import React, { Component, PropTypes } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect, dispatch } from 'react-redux/native'
import { GraphQLConnector } from '../utils'
import * as TodoAction from '../actions/todo'
import TodoList from '../components/TodoList'

const {
  StyleSheet,
  Text,
  View,
} = React;

@connect(state => state)
export default class AppView extends Component {
  static propTypes = {
    endpoint: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    todo: PropTypes.object
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { dispatch, todo, endpoint } = this.props
    const bindedActions = bindActionCreators(TodoAction, dispatch)

    return (
      <GraphQLConnector endpoint={endpoint} dispatch={dispatch}>
        <View style={styles.container}>
          <Text style={styles.welcome}>
            React Native Redux Starter is Running Hot!
          </Text>
          <Text style={styles.instructions}>
            To get started, edit index.ios.js
          </Text>
          <Text style={styles.instructions}>
            Press Cmd+R to reload,{'\n'}
            Cmd+D or shake for dev menu
          </Text>
          <TodoList {...todo} actions={bindedActions} />
        </View>
      </GraphQLConnector>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})
